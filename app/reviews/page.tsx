import { MessageSquare, ThumbsUp, Calendar, TrendingUp, Star } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { KAKAO_LINK } from "@/lib/constants";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewsSEOContent } from "@/components/sections/reviews-seo-content";
import { getAllReviews } from "@/lib/posts";
import { ReviewsPagination } from "@/components/reviews/reviews-pagination";
import { ReviewsList } from "@/components/reviews/reviews-list";

const REVIEWS_PER_PAGE = 5;

export const metadata: Metadata = {
  title: "거래 후기 | 메이플아이템 - 실제 고객 후기",
  description: "메이플스토리 아이템 거래 실제 고객 후기. 빠르고 안전한 거래 경험을 확인하세요. 스카니아, 루나, 엘리시움 등 전서버 지원.",
  keywords: ["메이플 후기", "메이플아이템 후기", "거래 후기", "메이플스토리 후기", "아이템 매입 후기"],
  openGraph: {
    title: "메이플아이템 거래 후기",
    description: "실제 고객들의 생생한 거래 후기",
    type: "website",
  },
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function ReviewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const reviews = await getAllReviews();

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const endIndex = startIndex + REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, endIndex);

  const stats = [
    { label: "총 후기", value: `${reviews.length}`, icon: MessageSquare },
    { label: "총 거래", value: "1,800+", icon: TrendingUp },
    { label: "사기", value: "0건", icon: Star },
  ];

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
          <ReviewForm />
        </div>

        {/* 후기 목록 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">전체 후기 ({reviews.length})</h2>

          <ReviewsList reviews={currentReviews} />

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <ReviewsPagination currentPage={currentPage} totalPages={totalPages} />
          )}
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
