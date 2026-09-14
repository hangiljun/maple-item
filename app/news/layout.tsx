import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메이플스토리 소식·이벤트 정보',
  description: '메이플스토리 이벤트와 아이템 시세, 판매 전에 알아두면 좋은 정보를 정리합니다.',
  robots: { index: true, follow: true },
  openGraph: {
    title: '메이플스토리 소식·이벤트 정보',
    description: '메이플스토리 이벤트와 아이템 시세, 판매 전에 알아두면 좋은 정보.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

// 헤더/푸터/문의 CTA는 공용 SiteChrome(Navbar·Footer·FloatingKakaoButton)이 담당합니다.
// 소식 페이지 전용 레이아웃은 더 이상 별도의 헤더·푸터를 그리지 않습니다.
export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
