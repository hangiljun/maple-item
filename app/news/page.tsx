import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { NewsList } from './news-list';
import { listPost } from './news-utils';

export const revalidate = 60;
export const metadata: Metadata = {
  alternates: { canonical: 'https://mapleitem.co.kr/news' },
};

export default async function NewsPage() {
  const posts = await getAllPosts().then(data => data.map(listPost)).catch(() => null);
  return <NewsList initialPosts={posts} />;
}
