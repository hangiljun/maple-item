'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navigation/navbar'
import { Footer } from '@/components/navigation/footer'
import { FloatingKakaoButton } from '@/components/floating-kakao-button'

// 여기 나열된 경로는 공식 사이트 헤더/푸터/플로팅 버튼 없이
// 완전히 독립된 화면으로 렌더링됩니다. (예: /home1 리뉴얼 비공개 미리보기)
const STANDALONE_PATH_PREFIXES = ['/home1']

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? ''
  const isStandalone = STANDALONE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (isStandalone) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingKakaoButton />
    </>
  )
}
