import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { HomeContent } from './home-content'
import type { HomeNewsItem } from './home-news-section'

// 메인 "메이플 소식" 섹션 갱신 주기 (소식 게시판과 동일)
export const revalidate = 60

const HOME_NEWS_COUNT = 5

// 최신 소식 5개 — 제목·분류·날짜·대표 이미지만 클라이언트로 넘김
async function getLatestNews(): Promise<HomeNewsItem[]> {
  try {
    const posts = await getAllPosts()
    return [...posts]
      .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
      .slice(0, HOME_NEWS_COUNT)
      .map((post) => ({
        id: post.id,
        title: post.title,
        category: post.category,
        date: post.date,
        ...(post.image ? { image: post.image } : {}),
      }))
  } catch (error) {
    console.error('메인 소식 불러오기 실패:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: '메이플 아이템 정리 - 경매장 시세 기준 구매',
  description: '메이플스토리 아이템을 경매장 실시간 시세 기준으로 투명하게 구매합니다. 장비 한 개부터 통판매까지 카카오톡 상담으로 빠르고 안전하게. 스카니아·루나·크로아 등 전 월드 지원, 365일 24시간 문의 가능.',
  alternates: {
    canonical: 'https://mapleitem.co.kr',
  },
  openGraph: {
    title: '메이플 아이템 정리 - 경매장 시세 기준 구매',
    description: '경매장 시세 기준으로 투명하게. 장비 한 개부터 통판매까지 카톡 상담으로 빠르고 안전하게 정리하세요.',
    url: 'https://mapleitem.co.kr',
    images: [
      {
        url: '/og-image.png',
        width: 1424,
        height: 752,
        alt: '메이플아이템',
      },
    ],
  },
  twitter: {
    title: '메이플 아이템 정리 - 경매장 시세 기준 구매',
    description: '경매장 시세 기준으로 투명하게. 장비 한 개부터 통판매까지 카톡 상담으로 빠르고 안전하게 정리하세요.',
  },
}

export default async function Home() {
  const latestNews = await getLatestNews()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '메이플아이템',
    description: '메이플스토리 아이템 정리 및 구매 상담 서비스',
    url: 'https://mapleitem.co.kr',
    telephone: 'kakao:han8246',
    priceRange: '₩₩₩',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: '대한민국',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent latestNews={latestNews} />
    </>
  )
}
