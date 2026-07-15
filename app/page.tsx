import dynamic from "next/dynamic";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메이플아이템 - 메이플스토리 급처템 고가구매',
  description: '메이플스토리 급처템을 빠르고 안전하게 고가로 구매합니다. 전서버 지원, 즉시 정산, 카카오톡 간편 거래.',
  keywords: ['메이플스토리', '메이플', '급처템', '아이템 구매', '메이플 급처', '아이템 판매', '메소', '고가구매', '메이플아이템'],
  openGraph: {
    title: '메이플아이템 - 메이플스토리 급처템 고가구매',
    description: '메이플스토리 급처템을 빠르고 안전하게 고가로 구매합니다. 전서버 지원, 즉시 정산, 카카오톡 간편 거래.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '메이플아이템',
    url: 'https://mapleitem.co.kr'
  },
  twitter: {
    card: 'summary_large_image',
    title: '메이플아이템 - 메이플스토리 급처템 고가구매',
    description: '메이플스토리 급처템을 빠르고 안전하게 고가로 구매합니다. 전서버 지원, 즉시 정산, 카카오톡 간편 거래.'
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '47'
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
