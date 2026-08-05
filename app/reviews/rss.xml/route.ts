import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const dynamic = 'force-dynamic'; // 매 요청마다 동적 생성
export const revalidate = 0; // 캐시 사용 안 함

const SITE_URL = 'https://mapleitem.co.kr';
const SITE_NAME = '메이플아이템 - 거래 후기';
const SITE_DESCRIPTION = '메이플아이템 실제 거래 후기';

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
  const reviewsQuery = query(
    collection(db, 'reviews'),
    orderBy('createdAt', 'desc'),
    limit(30)
  );

  const snapshot = await getDocs(reviewsQuery);
  const reviews = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as any[];

  const items = reviews;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/reviews</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/reviews/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(review => `
    <item>
      <title>${escapeXml(`${review.author}님의 거래 후기${review.server ? ` (${review.server})` : ''}`)}</title>
      <link>${SITE_URL}/reviews</link>
      <description>${escapeXml(review.content.substring(0, 200))}</description>
      <pubDate>${formatDate(review.date)}</pubDate>
      <guid isPermaLink="false">${SITE_URL}/reviews#${review.id}</guid>
      ${review.server ? `<category>${escapeXml(review.server)}</category>` : ''}
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
