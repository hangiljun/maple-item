"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLatestReviews } from "@/lib/posts";
import type { Review } from "@/lib/types";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getLatestReviews(3);
        setReviews(data);
      } catch (error) {
        console.error("후기 불러오기 실패:", error);
      }
    };
    loadReviews();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#FFB800]/10 via-[#FF9500]/10 to-[#FFB6C1]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#FFB800] font-bold text-sm uppercase tracking-wider">Reviews</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2 mb-4">실제 이용자 후기</h2>
          <p className="text-gray-600">고객님들의 생생한 거래 경험</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="glass-small rounded-2xl p-6 hover:shadow-lg transition"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5 text-[#FFB800]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">5.0</span>
              </div>

              <p className="text-lg mb-4 leading-relaxed text-gray-800">&ldquo;{review.content}&rdquo;</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{review.author}</span>

                {/* Verified Badge */}
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded text-xs text-green-700 font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  거래인증
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#FFB800] font-bold hover:text-[#FF9500] transition"
          >
            후기 전체보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
