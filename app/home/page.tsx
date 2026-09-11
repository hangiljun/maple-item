import { redirect } from 'next/navigation'

// 리뉴얼 미리보기 페이지가 /home1로 옮겨졌습니다.
export default function HomeRedirectPage() {
  redirect('/home1')
}
