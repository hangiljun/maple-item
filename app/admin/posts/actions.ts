'use server';

import { revalidatePath } from 'next/cache';

/**
 * 게시글 목록 revalidation
 */
export async function revalidateNewsListAction() {
  revalidatePath('/news');
}

/**
 * 특정 게시글 revalidation
 */
export async function revalidateNewsPostAction(postId: string) {
  revalidatePath('/news');
  revalidatePath(`/news/${postId}`);
}
