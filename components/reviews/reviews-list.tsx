'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Review } from '@/lib/types';

type Props = {
  reviews: Review[];
};

export function ReviewsList({ reviews }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyReviewUrl = (reviewId: string) => {
    const url = `${window.location.origin}/reviews/${reviewId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(reviewId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {reviews.map((review) => (
        <Link
          key={review.id}
          href={`/reviews/${review.id}`}
          className="glass-small rounded-2xl p-6 hover:shadow-lg transition scroll-mt-24 block cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                {review.author[0]}
              </div>
              <div>
                <div className="font-bold text-gray-900">{review.author}</div>
                {review.server && <div className="text-sm text-gray-500">{review.server}</div>}
              </div>
            </div>
          </div>

          {/* 후기 내용 */}
          <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{review.content}</p>

          {/* 사진 */}
          {review.image && (
            <div className="mb-4">
              <img
                src={review.image}
                alt="거래 인증"
                className="w-full max-h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* 하단 정보 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-500">
              <span>{review.date}</span>
              <button className="text-gray-500 hover:text-[#FFB800] transition-colors">
                도움돼요 {review.likes}
              </button>
            </div>

            {/* URL 공유 버튼 */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                copyReviewUrl(review.id);
              }}
              className="text-gray-500 hover:text-[#FFB800] transition-colors"
              title="후기 URL 복사"
            >
              {copiedId === review.id ? (
                <span className="text-[#FFB800]">복사됨</span>
              ) : (
                <span>공유</span>
              )}
            </button>
          </div>
        </Link>
      ))}
    </>
  );
}
