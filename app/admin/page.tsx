"use client";

import { useEffect, useState } from "react";
import { isAdmin, login, logout } from "@/lib/auth";
import { MessageSquare, FileText, TrendingUp, LogOut, Edit, Trash2, Pin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setIsAuthenticated(isAdmin());

    // 실제 데이터 개수 가져오기
    const reviews = localStorage.getItem("reviews");
    const posts = localStorage.getItem("posts");

    setReviewCount(reviews ? JSON.parse(reviews).length : 0);
    setPostCount(posts ? JSON.parse(posts).length : 0);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setPassword("");
  };

  // 로그인 페이지
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFB800] to-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">메이플아이템 관리 시스템</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="관리자 비밀번호 입력"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 outline-none transition"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="large"
            >
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition">
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 대시보드
  const stats = [
    { label: "총 후기", value: reviewCount.toString(), icon: MessageSquare, color: "from-blue-500 to-blue-600" },
    { label: "총 게시글", value: postCount.toString(), icon: FileText, color: "from-purple-500 to-purple-600" },
    { label: "누적 구매", value: reviewCount > 0 ? `${reviewCount * 10}+` : "0", icon: TrendingUp, color: "from-green-500 to-green-600" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
            <p className="text-gray-600 text-sm">메이플 경매장 관리 시스템</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          >
            <LogOut size={18} />
            로그아웃
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 주요 기능 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 후기 관리 */}
          <Link href="/admin/reviews" className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <MessageSquare className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">후기 관리</h3>
                <p className="text-gray-600 text-sm">후기 삭제 및 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Trash2 size={16} />
              <span>후기 삭제</span>
            </div>
          </Link>

          {/* 게시글 관리 */}
          <Link href="/admin/posts" className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <FileText className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">게시글 관리</h3>
                <p className="text-gray-600 text-sm">작성, 수정, 삭제, 고정</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Edit size={16} />
                <span>작성/수정</span>
              </div>
              <div className="flex items-center gap-2">
                <Pin size={16} />
                <span>고정</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
