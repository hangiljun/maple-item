"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";
import type { Review } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  const [review, setReview] = useState<Review | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("reviews");
    if (saved) {
      const reviews: Review[] = JSON.parse(saved);
      const found = reviews.find((r) => r.id === parseInt(params.id));
      if (found) {
        setReview(found);
      }
    }
  }, [params.id]);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#FFB800] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* 뒤로가기 */}
        <Link
          href="/reviews"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FFB800] transition mb-8"
        >
          <ArrowLeft size={20} />
          <span>후기 목록으로</span>
        </Link>

        {/* 후기 상세 */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {review.author[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{review.author}</h1>
                <div className="text-gray-600">{review.server}</div>
              </div>
            </div>
          </div>

          {/* 후기 내용 */}
          <div className="bg-white/50 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {review.content}
            </p>
          </div>

          {/* 사진 */}
          {review.image && (
            <div className="mb-6">
              <img
                src={review.image}
                alt="거래 인증"
                className="w-full max-h-96 object-cover rounded-xl"
              />
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{review.date}</span>
            </div>
            <div>도움돼요 {review.likes}명</div>
          </div>
        </div>

        {/* 공유하기 */}
        <div className="glass-small rounded-xl p-6 text-center">
          <Share2 className="mx-auto text-[#FFB800] mb-3" size={32} />
          <h3 className="font-bold text-gray-900 mb-2">이 후기가 도움이 되셨나요?</h3>
          <p className="text-sm text-gray-600 mb-4">친구에게 공유해보세요</p>
          <Button
            onClick={copyUrl}
            variant="primary"
            className="mx-auto"
          >
            {copied ? (
              <>
                <Check size={18} />
                복사됨!
              </>
            ) : (
              <>
                <Copy size={18} />
                URL 복사
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
