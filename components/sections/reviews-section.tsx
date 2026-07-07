"use client";

import { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
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
              <div className="flex text-[#FFB800] mb-3">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg mb-4 leading-relaxed text-gray-800">&ldquo;{review.content}&rdquo;</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{review.author}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[#FFB800] font-bold hover:text-[#FF9500] transition"
          >
            후기 전체보기 <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
