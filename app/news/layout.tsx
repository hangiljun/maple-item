import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메이플스토리 소식·이벤트 정보",
  description: "메이플스토리 최신 소식과 진행 중인 이벤트, 아이템 시세 관련 정보를 정리합니다. 급처 거래에 도움이 되는 업데이트 소식을 빠르게 확인하세요.",
  alternates: {
    canonical: 'https://mapleitem.co.kr/news'
  },
  openGraph: {
    title: "메이플스토리 소식·이벤트 정보",
    description: "메이플 최신 소식·이벤트·시세 정보를 빠르게 확인하세요.",
    url: "https://mapleitem.co.kr/news"
  },
  twitter: {
    title: "메이플스토리 소식·이벤트 정보",
    description: "메이플 최신 소식·이벤트·시세 정보를 빠르게 확인하세요."
  }
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
