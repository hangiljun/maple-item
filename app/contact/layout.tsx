import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메이플 급처 구매 문의 - 카카오톡 간편 상담",
  description: "메이플 급처템 구매 문의는 카카오톡으로 간편하게. 아이템 스크린샷과 서버 정보를 보내면 실시간 시세를 확인해 빠르게 정산해드립니다. 365일 24시간 문의 가능.",
  alternates: {
    canonical: 'https://mapleitem.co.kr/contact'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "메이플 급처 구매 문의 - 카카오톡 간편 상담",
    description: "카톡으로 스크린샷·서버 정보 전송 시 실시간 시세 확인 후 빠른 정산.",
    url: "https://mapleitem.co.kr/contact",
    images: ['/og-image.png']
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플 급처 구매 문의 - 카카오톡 간편 상담",
    description: "카톡으로 스크린샷·서버 정보 전송 시 실시간 시세 확인 후 빠른 정산.",
    images: ['/og-image.png']
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
