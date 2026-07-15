import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { FloatingKakaoButton } from "@/components/floating-kakao-button";
import { OrganizationSchema } from "@/components/organization-schema";
import "./globals.css";

const fredoka = Fredoka({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
});

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mapleitem.co.kr'),
  title: "메이플아이템 - 메이플 급처템 고가구매 | 빠르고 안전한 거래",
  description: "메이플스토리 급처템을 빠르고 안전하게 고가로 구매합니다. 전서버 지원, 즉시 정산, 카카오톡 간편 거래. 스카니아/루나/엘리시움/오로라 무기/방어구/장비 고가구매.",
  keywords: [
    "메이플스토리", "메이플", "급처템", "메이플 급처", "아이템 구매", "메이플아이템",
    "메이플 아이템 판매", "메이플 고가구매", "메이플 시세", "아이템 판매", "빠른 거래",
    "스카니아 서버", "루나 서버", "엘리시움 서버", "오로라 서버", "크로아 서버", "이노시스 서버",
    "메이플 무기 팔기", "메이플 장비 팔기", "스타포스", "잠재능력", "메이플 큐브",
    "메이플 아이템 팔기", "급처 구매", "메이플 템 판매", "메이플 정산"
  ],
  openGraph: {
    title: "메이플아이템 - 급처템 고가구매",
    description: "빠르고 안전한 거래! 전서버 즉시 구매",
    type: "website",
    locale: "ko_KR",
    siteName: "메이플아이템",
    url: "https://mapleitem.co.kr",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "메이플아이템 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플아이템 - 급처템 고가구매",
    description: "빠르고 안전한 거래! 전서버 즉시 구매",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased ${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <FloatingKakaoButton />
      </body>
    </html>
  );
}
