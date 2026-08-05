import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = 'force-dynamic'; // 매 요청마다 동적 생성
export const revalidate = 0; // 캐시 사용 안 함

const SITE_URL = 'https://mapleitem.co.kr';
const SITE_NAME = '메이플아이템';
const SITE_DESCRIPTION = '메이플스토리 급처템 구매 - 빠르고 안전한 거래';

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

export async function GET() {
  // Firestore에서 직접 조회 (cache 무시)
  const postsQuery = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(30)
  );
  const reviewsQuery = query(
    collection(db, 'reviews'),
    orderBy('createdAt', 'desc'),
    limit(30)
  );

  const [postsSnapshot, reviewsSnapshot] = await Promise.all([
    getDocs(postsQuery),
    getDocs(reviewsQuery)
  ]);

  const posts = postsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];

  const reviews = reviewsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];

  // 뉴스 아이템
  const newsItems = posts.slice(0, 20).map(post => ({
    type: 'news',
    title: post.title,
    link: `${SITE_URL}/news/${post.id}`,
    description: post.excerpt || post.content.substring(0, 200).replace(/<[^>]*>/g, ''),
    pubDate: formatDate(post.date),
    guid: `${SITE_URL}/news/${post.id}`,
    date: new Date(post.date).getTime()
  }));

  // 후기 아이템
  const reviewItems = reviews.slice(0, 20).map(review => ({
    type: 'review',
    title: `${review.author}님의 거래 후기${review.server ? ` (${review.server})` : ''}`,
    link: `${SITE_URL}/reviews`,
    description: review.content.substring(0, 200),
    pubDate: formatDate(review.date),
    guid: `${SITE_URL}/reviews#${review.id}`,
    date: new Date(review.date).getTime()
  }));

  // 통합 및 최신순 정렬
  const allItems = [...newsItems, ...reviewItems]
    .sort((a, b) => b.date - a.date)
    .slice(0, 30);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${allItems.map(item => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, s-maxage=600'
    }
  });
}
