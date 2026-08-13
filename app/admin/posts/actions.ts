'use server';

import { revalidatePath } from 'next/cache';
import {
  createPost as createPostInFirestore,
  updatePost as updatePostInFirestore,
  deletePost as deletePostInFirestore,
  togglePinPost as togglePinPostInFirestore
} from '@/lib/posts';
import type { NewsPost } from '@/lib/types';

/**
 * 게시글 생성 서버 액션
 */
export async function createPostAction(postData: Omit<NewsPost, 'id'>) {
  try {
    const postId = await createPostInFirestore(postData);

    // 목록 + 상세 페이지 revalidate
    revalidatePath('/news');
    revalidatePath(`/news/${postId}`);

    return { success: true, id: postId };
  } catch (error) {
    console.error('게시글 생성 실패:', error);
    return { success: false, error: '게시글 생성에 실패했습니다.' };
  }
}

/**
 * 게시글 수정 서버 액션
 */
export async function updatePostAction(id: string, postData: Partial<NewsPost>) {
  try {
    await updatePostInFirestore(id, postData);

    // 목록 + 해당 상세 페이지 revalidate
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);

    return { success: true };
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    return { success: false, error: '게시글 수정에 실패했습니다.' };
  }
}

/**
 * 게시글 삭제 서버 액션
 */
export async function deletePostAction(id: string) {
  try {
    await deletePostInFirestore(id);

    // 목록 + 해당 상세 페이지 revalidate (404로 전환)
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);

    return { success: true };
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    return { success: false, error: '게시글 삭제에 실패했습니다.' };
  }
}

/**
 * 게시글 고정 토글 서버 액션
 */
export async function togglePinPostAction(id: string, currentPinned: boolean) {
  try {
    await togglePinPostInFirestore(id, currentPinned);

    // 목록 (정렬 순서 변경) + 해당 상세 페이지 (pinned 배지) revalidate
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);

    return { success: true };
  } catch (error) {
    console.error('고정 상태 변경 실패:', error);
    return { success: false, error: '고정 상태 변경에 실패했습니다.' };
  }
}
