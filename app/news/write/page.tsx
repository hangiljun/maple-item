import { redirect } from 'next/navigation'

// 게시글 작성은 관리자 페이지(/admin/posts)에서만 진행합니다.
export default function NewsWriteRedirectPage() {
  redirect('/news')
}
