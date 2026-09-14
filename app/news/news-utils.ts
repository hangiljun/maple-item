import type { NewsPost } from '@/lib/types';

// Only plain display values cross the server/client boundary; Firestore timestamps stay on the server.
export function listPost(post: NewsPost): NewsPost {
  return {
    id: post.id, category: post.category, title: post.title,
    excerpt: post.excerpt, content: post.content, image: post.image,
    date: post.date, time: post.time, pinned: post.pinned,
    featured: post.featured, icon: post.icon, details: post.details, tag: post.tag,
  };
}

export function plainText(content: string): string {
  return content.replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*`>|_~]/g, '')
    .replace(/\s+/g, ' ').trim();
}

export function summary(post: NewsPost): string {
  return post.excerpt || plainText(post.content || '').slice(0, 150);
}

export function filterPosts(posts: NewsPost[], category: string, query: string): NewsPost[] {
  const term = query.trim().toLocaleLowerCase();
  return [...posts]
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
    .filter(post => (category === '전체' || post.category === category) &&
      `${post.title} ${post.excerpt || ''} ${plainText(post.content || '')}`.toLocaleLowerCase().includes(term));
}
