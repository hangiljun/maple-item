import dynamic from "next/dynamic";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메이플 급처템 구매 - 실시간 시세 정산',
  description: '메이플스토리 급처템을 경매장 실시간 시세 기준으로 빠르고 안전하게 구매합니다. 카카오톡 문의 시 평균 10분 내 정산 완료, 게임 내 직거래로 안전하게. 스카니아·루나·크로아 등 전 월드 지원, 365일 24시간 문의 가능.',
  alternates: {
    canonical: 'https://mapleitem.co.kr'
  },
  openGraph: {
    title: '메이플 급처템 구매 - 실시간 시세 정산',
    description: '메이플스토리 급처템 빠르고 안전하게 구매. 실시간 시세 확인 후 카톡 정산.',
    url: 'https://mapleitem.co.kr'
  },
  twitter: {
    title: '메이플 급처템 구매 - 실시간 시세 정산',
    description: '메이플스토리 급처템 빠르고 안전하게 구매. 실시간 시세 확인 후 카톡 정산.'
  }
};

import { HeroSection } from "@/components/hero/hero-section";
import { AdvantagesSection } from "@/components/sections/advantages-section";

const ProcessSection = dynamic(() => import("@/components/sections/process-section").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <div className="h-96" />,
});

const ServersSection = dynamic(() => import("@/components/sections/servers-section").then(mod => ({ default: mod.ServersSection })), {
  loading: () => <div className="h-96" />,
});

const ReviewsSection = dynamic(() => import("@/components/sections/reviews-section").then(mod => ({ default: mod.ReviewsSection })), {
  loading: () => <div className="h-96" />,
});

const CTASection = dynamic(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="h-48" />,
});

const SEOContent = dynamic(() => import("@/components/sections/seo-content").then(mod => ({ default: mod.SEOContent })), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '메이플아이템',
    description: '메이플스토리 급처템 고가구매 전문 업체',
    url: 'https://mapleitem.co.kr',
    telephone: 'kakao:han8246',
    priceRange: '₩₩₩',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: '대한민국'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Korea'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <AdvantagesSection />
      <ProcessSection />
      <ServersSection />
      <ReviewsSection />
      <CTASection />
      <SEOContent />
    </>
  );
}
