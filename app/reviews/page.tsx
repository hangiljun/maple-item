"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Calendar, TrendingUp, Share2, Check, Star } from "lucide-react";
import { KAKAO_LINK } from "@/lib/constants";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewsSEOContent } from "@/components/sections/reviews-seo-content";
import { getReviews } from "@/lib/reviews";
import type { Review } from "@/lib/types";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // 로컬 스토리지에서 후기 불러오기
  useEffect(() => {
    setMounted(true);
    setReviews(getReviews());
  }, []);

  const handleSubmitReview = (newReview: Omit<Review, "id" | "date" | "likes" | "helpful" | "server">) => {
    const review: Review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      helpful: false,
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    alert("후기가 등록되었습니다! 감사합니다 😊");
  };

  const copyReviewUrl = (reviewId: number) => {
    const url = `${window.location.origin}/reviews#review-${reviewId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(reviewId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const stats = [
    { label: "총 후기", value: `${reviews.length}`, icon: MessageSquare },
    { label: "총 거래", value: "1,800+", icon: TrendingUp },
    { label: "사기", value: "0건", icon: Star },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <MessageSquare className="text-[#FFB800]" size={36} />
            후기 게시판
          </h1>
          <p className="text-gray-600 text-lg">실제 이용자분들의 생생한 판매 후기</p>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-small rounded-xl p-6 text-center">
              <stat.icon className="mx-auto text-[#FFB800] mb-3" size={32} />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 후기 작성 폼 */}
        <div className="mb-12">
          <ReviewForm onSubmit={handleSubmitReview} />
        </div>

        {/* 후기 목록 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">전체 후기 ({reviews.length})</h2>

          {reviews.map((review) => (
            <div
              key={review.id}
              id={`review-${review.id}`}
              className="glass-small rounded-2xl p-6 hover:shadow-lg transition scroll-mt-24"
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
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{review.date}</span>
                  </div>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-[#FFB800] transition-colors">
                    <ThumbsUp size={14} />
                    <span>도움돼요 {review.likes}</span>
                  </button>
                </div>

                {/* URL 공유 버튼 */}
                <button
                  onClick={() => copyReviewUrl(review.id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#FFB800] transition-colors"
                  title="후기 URL 복사"
                >
                  {copiedId === review.id ? (
                    <>
                      <Check size={16} />
                      <span className="text-[#FFB800]">복사됨!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      <span>공유</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-8 text-center border-2 border-[#FFB800]/30">
          <MessageSquare className="mx-auto text-[#FFB800] mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            지금 바로 거래해보세요
          </h3>
          <p className="text-gray-600 mb-6">
            빠르고 안전한 거래를 경험하고 여러분도 후기를 남겨주세요
          </p>
          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3A1D1D] px-8 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition shadow-xl"
          >
            <MessageSquare size={20} fill="#3A1D1D" />
            카카오톡으로 문의하기
          </a>
        </div>

        <ReviewsSEOContent />
      </div>
    </div>
  );
}
