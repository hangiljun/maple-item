'use server';

import { revalidatePath } from 'next/cache';
import { createReview } from '@/lib/posts';

export async function submitReview(data: {
  author: string;
  content: string;
  image?: string;
  server?: string;
}) {
  try {
    const reviewData: any = {
      author: data.author,
      content: data.content,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      helpful: false,
    };

    // undefined 필드 제거
    if (data.image) {
      reviewData.image = data.image;
    }
    if (data.server) {
      reviewData.server = data.server;
    }

    await createReview(reviewData);
    revalidatePath('/reviews');

    return { success: true };
  } catch (error) {
    console.error('후기 등록 실패:', error);
    return { success: false, error: '후기 등록에 실패했습니다.' };
  }
}
