import { getAllPosts } from '@/lib/posts';

export const revalidate = 600; // 10분마다 재생성

const SITE_URL = 'https://mapleitem.co.kr';
const SITE_NAME = '메이플아이템 - 소식정보';
const SITE_DESCRIPTION = '메이플스토리 최신 소식과 이벤트, 시세 정보';

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
  const posts = await getAllPosts();

  const items = posts.slice(0, 30);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/news</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/news/rss.xml" rel="self" type="application/rss+xml"/>
    ${items.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/news/${post.id}</link>
      <description>${escapeXml(post.excerpt || post.content.substring(0, 200).replace(/<[^>]*>/g, ''))}</description>
      <pubDate>${formatDate(post.date)}</pubDate>
      <guid isPermaLink="true">${SITE_URL}/news/${post.id}</guid>
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ''}
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
