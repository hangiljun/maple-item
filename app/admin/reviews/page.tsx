"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { ArrowLeft, Trash2, AlertTriangle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Review } from "@/lib/types";

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const loadReviews = () => {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      router.push("/admin");
    } else {
      // 로컬 스토리지에서 후기 불러오기
      loadReviews();
    }
  }, [router]);

  const handleDelete = (id: number) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 헤더 */}
      <div className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
          >
            <ArrowLeft size={20} />
            <span>대시보드로</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">후기 관리</h1>
          <p className="text-gray-400 text-sm">총 {reviews.length}개의 후기</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* 후기 목록 */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="glass rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                    {review.author[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-white">{review.author}</span>
                      <span className="text-gray-400 text-sm">{review.server}</span>
                      <span className="text-gray-500 text-sm">#{review.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 내용 */}
              <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                <p className="text-gray-300">{review.content}</p>
              </div>

              {/* 사진 */}
              {review.image && (
                <div className="mb-4">
                  <img
                    src={review.image}
                    alt="거래 인증"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* 하단 정보 및 삭제 */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {review.date} · 도움돼요 {review.likes}
                </div>

                {deleteConfirm === review.id ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertTriangle size={16} />
                      <span>정말 삭제하시겠습니까?</span>
                    </div>
                    <Button
                      onClick={() => handleDelete(review.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                      size="default"
                    >
                      삭제 확인
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      variant="secondary"
                      size="default"
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setDeleteConfirm(review.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30"
                    size="default"
                  >
                    <Trash2 size={16} />
                    삭제
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">등록된 후기가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
