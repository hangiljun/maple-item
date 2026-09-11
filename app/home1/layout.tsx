import type { Metadata } from 'next'

// 비공개 개발용 미리보기 페이지 — 검색엔진 색인 방지.
export const metadata: Metadata = {
  title: '메이플아이템 홈1 리뉴얼 미리보기 (비공개)',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function HomePreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
