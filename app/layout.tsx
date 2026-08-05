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
  metadataBase: new URL('https://mapleitem.co.kr'),
  title: {
    default: "메이플 급처템 구매 - 실시간 시세 정산 | 메이플아이템",
    template: "%s | 메이플아이템"
  },
  description: "메이플스토리 급처템을 경매장 실시간 시세 기준으로 빠르고 안전하게 구매합니다. 카카오톡 문의 시 평균 10분 내 정산 완료, 게임 내 직거래로 안전하게. 스카니아·루나·크로아 등 전 월드 지원, 365일 24시간 문의 가능.",
  robots: {
    index: true,
    follow: true
  },
  verification: {
    other: {
      "naver-site-verification": "37d7948031bb7b4ae444957a3fc27bd04544c782"
    }
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "메이플아이템",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메이플아이템"
      }
    ]
  },
  twitter: {
    card: "summary_large_image"
  }
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
