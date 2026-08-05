import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPost, getAllPosts, getAdjacentPosts } from '@/lib/posts';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ISR: 60초마다 재생성
export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  const description = (post.content || '').substring(0, 160) || post.title;

  return {
    title: `${post.title} | 메이플아이템 소식`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: post.image ? [post.image] : [],
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function NewsPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  // HTML 판별: 블록 태그로 시작하는 경우만 HTML로 간주 (마크다운 오판 방지)
  const isHTML = post.content ? /^\s*<(p|div|h[1-6]|ul|ol|table|blockquote|img)[\s>]/i.test(post.content) : false;

  // 이전/다음 글 직접 조회 (Firestore 쿼리 최적화)
  const { prevPost, nextPost } = post.createdAt ? await getAdjacentPosts(post) : { prevPost: null, nextPost: null };

  // 분류 배지 스타일
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "이벤트":
        return "bg-[#FAEEDA] text-[#854F0B] border-[#FAEEDA]";
      case "시세정보":
        return "bg-[#E6F1FB] text-[#0C447C] border-[#E6F1FB]";
      case "공지":
      default:
        return "bg-white text-gray-700 border-gray-300";
    }
  };

  // Article Schema.org 구조화 데이터
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date || new Date().toISOString().split('T')[0],
    dateModified: post.date || new Date().toISOString().split('T')[0],
    image: post.image || 'https://mapleitem.co.kr/logo.png',
    author: {
      '@type': 'Organization',
      name: '메이플아이템'
    },
    publisher: {
      '@type': 'Organization',
      name: '메이플아이템',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mapleitem.co.kr/logo.png'
      }
    },
    description: (post.content || post.title).substring(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mapleitem.co.kr/news/${post.id}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen py-24 bg-white">
        {/* 읽기 폭 제한 */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* 뒤로가기 */}
          <Link
            href="/news"
            className="inline-block text-gray-600 hover:text-gray-900 mb-6 transition text-sm"
          >
            ← 목록으로
          </Link>

          {/* 게시글 */}
          <article>
            {/* 헤더 */}
            <header className="mb-8">
              {/* 메타 */}
              <div className="flex items-center gap-2 mb-4">
                {post.category && (
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryBadgeClass(post.category)}`}>
                    {post.category}
                  </span>
                )}
                {post.date && (
                  <span className="text-sm text-gray-500">{post.date}</span>
                )}
              </div>

              {/* 제목 */}
              <h1 className="article-title">
                {post.title}
              </h1>

              {/* 대표 이미지 */}
              {post.image && (
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-[500px] object-cover"
                  />
                </div>
              )}
            </header>

            {/* 본문 */}
            <div className="prose max-w-none article-prose">
              {/* HTML 렌더 (기존 글 호환) vs 마크다운 렌더 (신규 글) */}
              {post.content ? (
                isHTML ? (
                  /* 기존 HTML 글: sanitize 후 렌더 */
                  <div className="overflow-x-auto">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content, {
                        ALLOWED_TAGS: [
                          'p', 'br', 'strong', 'em', 'u', 's',
                          'h2', 'h3',
                          'ul', 'ol', 'li',
                          'a',
                          'img',
                          'table', 'thead', 'tbody', 'tr', 'th', 'td',
                          'blockquote', 'code', 'pre',
                          'hr'
                        ],
                        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class', 'style'],
                        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
                        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
                        })
                      }}
                    />
                  </div>
                ) : (
                  /* 마크다운 글: ReactMarkdown + remarkGfm 직접 렌더 */
                  <div className="overflow-x-auto">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ h1: (props) => <h2 {...props} /> }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                )
              ) : (
                <p className="text-gray-500">본문이 없습니다.</p>
              )}
            </div>
          </article>

          {/* 하단 네비게이션 */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            {/* 이전/다음 글 */}
            {(prevPost || nextPost) && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  {prevPost && (
                    <Link href={`/news/${prevPost.id}`} className="block text-sm">
                      <span className="text-gray-500 mb-1 block">← 이전 글</span>
                      <span className="text-gray-900 hover:text-[#FFB800] transition line-clamp-1">
                        {prevPost.title}
                      </span>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {nextPost && (
                    <Link href={`/news/${nextPost.id}`} className="block text-sm">
                      <span className="text-gray-500 mb-1 block">다음 글 →</span>
                      <span className="text-gray-900 hover:text-[#FFB800] transition line-clamp-1">
                        {nextPost.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* 목록으로 버튼 */}
            <div className="text-center">
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-[#FFB800] text-white rounded-xl hover:bg-[#FF9500] transition font-medium"
              >
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
