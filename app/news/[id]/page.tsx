import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { getPost, getAdjacentPosts } from '@/lib/posts';
import { MarkdownContent } from '../article-content';
import { KAKAO_LINK } from '@/lib/constants';
import styles from '../news.module.css';
import { plainText } from '../news-utils';

export const revalidate = 60;
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  const description = post.excerpt || plainText(post.content || '').slice(0, 160);
  const url = `https://mapleitem.co.kr/news/${encodeURIComponent(post.id)}`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: { title: post.title, description, url, type: 'article', images: [post.image || '/og-image.png'] },
    twitter: { card: 'summary_large_image', title: post.title, description, images: [post.image || '/og-image.png'] },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();
  const { prevPost, nextPost } = await getAdjacentPosts(post);
  const isHTML = /^\s*<(p|div|h[1-6]|ul|ol|table|blockquote|img)[\s>]/i.test(post.content || '');
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || plainText(post.content || '').slice(0, 160),
    datePublished: post.createdAt?.toDate?.()?.toISOString() || post.date,
    dateModified: post.updatedAt?.toDate?.()?.toISOString() || post.date,
    image: post.image || 'https://mapleitem.co.kr/og-image.png',
    author: { '@type': 'Organization', name: '메이플아이템' },
    publisher: { '@type': 'Organization', name: '메이플아이템' },
    mainEntityOfPage: `https://mapleitem.co.kr/news/${encodeURIComponent(post.id)}`,
  };
  return <div className={styles.articleContainer}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} /><Link href="/news" className={styles.back}>← 소식 목록</Link><article>
    <header className={styles.articleHeader}><div className={styles.meta}><span className={styles.badge}>{post.category}</span><time dateTime={post.date}>{post.date}</time><span>메이플아이템</span></div><h1>{post.title}</h1>{post.excerpt && <p>{post.excerpt}</p>}</header>
    {post.image && <div className={styles.cover}><Image src={post.image} alt={post.title} width={800} height={480} unoptimized /></div>}
    {isHTML ? <div className={styles.prose} dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content, {
      allowedTags: ['p','br','strong','em','u','s','del','h2','h3','h4','h5','h6','ul','ol','li','a','img','table','thead','tbody','tr','th','td','blockquote','code','pre','hr'],
      allowedAttributes: { a: ['href','title'], img: ['src','alt'], th: ['colspan','rowspan'], td: ['colspan','rowspan'], ol: ['start'] },
      allowedSchemes: ['http','https','mailto'],
      transformTags: { h1: 'h2' },
    }) }} /> : <MarkdownContent content={post.content || ''} />}
  </article><aside className={styles.articleCta}><div><h2>아이템 판매를 생각하고 계신가요?</h2><p>서버와 아이템 정보를 보내주시면 상담을 도와드립니다.</p></div><a href={KAKAO_LINK} target="_blank" rel="noreferrer" className={styles.primary}>판매 상담하기 ↗</a></aside><nav className={styles.adjacent} aria-label="이전 다음 소식">{prevPost && <Link href={`/news/${prevPost.id}`}><span>이전 소식</span><strong>{prevPost.title}</strong></Link>}{nextPost && <Link href={`/news/${nextPost.id}`}><span>다음 소식</span><strong>{nextPost.title}</strong></Link>}</nav><Link href="/news" className={styles.secondary}>전체 소식 보기</Link></div>;
}
