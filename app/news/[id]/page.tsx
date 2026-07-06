import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPost, getAllPosts } from '@/lib/posts';
import { parseStyledText } from '@/lib/text-parser';
import { Sparkles, TrendingUp, AlertCircle, Newspaper, Calendar, Clock, Pin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

  return {
    title: `${post.title} | 메이플아이템 소식`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return Sparkles;
      case "TrendingUp": return TrendingUp;
      case "AlertCircle": return AlertCircle;
      default: return Newspaper;
    }
  };

  const Icon = getIcon(post.icon);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* 뒤로가기 */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          <span>소식 목록으로</span>
        </Link>

        {/* 게시글 */}
        <article className="glass rounded-3xl p-8 border-2 border-[#FFB800]/40 shadow-2xl">
          {/* 헤더 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] p-3 rounded-xl shadow-lg">
                <Icon className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-4 py-1.5 bg-purple-500/20 text-purple-700 rounded-lg text-sm font-bold border border-purple-300">
                    {post.category}
                  </span>
                  <span className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                    post.tag === "진행중" ? "bg-green-500/20 text-green-700 border-green-300" :
                    post.tag === "최신" ? "bg-blue-500/20 text-blue-700 border-blue-300" :
                    post.tag === "중요" ? "bg-red-500/20 text-red-700 border-red-300" :
                    "bg-gray-500/20 text-gray-700 border-gray-300"
                  }`}>
                    {post.tag}
                  </span>
                  {post.pinned && (
                    <span className="flex items-center gap-1 px-4 py-1.5 bg-red-500/20 text-red-700 rounded-lg text-sm font-bold border border-red-300">
                      <Pin size={14} />
                      공지
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h1
              className="text-4xl font-black mb-4"
              style={{
                color: post.titleColor || "#111827",
                fontSize: post.titleSize === "2xl" ? "36px" : post.titleSize === "xl" ? "32px" : post.titleSize === "lg" ? "28px" : "24px"
              }}
            >
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="font-medium">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="font-medium">{post.time}</span>
              </div>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            <div className="text-base leading-relaxed whitespace-pre-wrap text-gray-700 mb-6">
              {parseStyledText(post.content)}
            </div>

            {/* 이미지 */}
            {post.image && (
              <div className="my-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[600px] object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </article>

        {/* 목록으로 버튼 */}
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB800] text-white rounded-xl hover:bg-[#FF9500] transition font-semibold shadow-lg"
          >
            <ArrowLeft size={20} />
            소식 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
