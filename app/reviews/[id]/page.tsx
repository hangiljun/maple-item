import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getReview, incrementReviewViews } from '@/lib/posts';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

// SEO 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const review = await getReview(id);

    if (!review) {
      return {
        title: '후기를 찾을 수 없습니다 | 메이플아이템',
        description: '메이플스토리 아이템 거래 후기',
      };
    }

    const cleanText = (text: string) => text.replace(/[﻿​-‍￾￿]/g, '').trim();
    const title = `${cleanText(review.author)}님의 거래 후기 | 메이플아이템`;
    const description = cleanText(review.content.substring(0, 160));

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: review.image ? [review.image] : [],
        type: 'article',
        siteName: '메이플아이템',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: review.image ? [review.image] : [],
      },
    };
  } catch (error) {
    console.error('메타데이터 생성 실패:', error);
    return {
      title: '메이플아이템 후기',
      description: '메이플스토리 아이템 거래 후기',
    };
  }
}

// 동적 렌더링 강제 (새 리뷰 즉시 반영)
export const dynamic = 'force-dynamic';

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;
  const review = await getReview(id);

  if (!review) {
    notFound();
  }

  await incrementReviewViews(id);
  const title = (review.content || "").split("\n")[0].trim().slice(0, 45) || "거래 후기";

  // 구조화된 데이터 (Schema.org)
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    datePublished: review.date,
    reviewBody: review.content,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
  };

  return (
    <>
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="min-h-screen py-24 bg-white">
        <div className="rvw max-w-3xl mx-auto px-4 sm:px-6">
          <Link href="/reviews" className="rvw-d-back">← 목록으로</Link>
          <div className="rvw-d-meta">
            {review.server && <span className="rvw-srv">{review.server}</span>}
            <span>거래완료</span>
          </div>
          <div className="rvw-d-title">{title}</div>
          <div className="rvw-d-sub">
            <span>작성자 {review.author}</span>
            <span>{review.date}</span>
          </div>
          <div className="rvw-d-body">
            {review.content}
            {review.image && <img src={review.image} alt="거래 인증샷" />}
          </div>
          <div className="rvw-d-like"><span>👍 추천 {review.likes ?? 0}</span></div>
          <Link href="/reviews" className="rvw-d-back">← 목록으로</Link>
        </div>
      </div>
    </>
  );
}
