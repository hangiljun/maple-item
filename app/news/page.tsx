"use client";

import { useState, useEffect } from "react";
import { Newspaper, TrendingUp, AlertCircle, Sparkles, Calendar, Clock, Pin } from "lucide-react";
import { NewsSEOContent } from "@/components/sections/news-seo-content";
import type { NewsPost } from "@/lib/types";

const defaultNews: NewsPost[] = [
  {
    id: 1,
    category: "이벤트",
    icon: "Sparkles",
    title: "7월 거래 이벤트 - 추가 5% 보너스 지급!",
    date: "2026-07-01",
    time: "09:00",
    featured: true,
    pinned: false,
    content: "7월 한 달간 모든 거래 건에 대해 거래 금액의 5%를 추가로 보너스 지급해드립니다! 이 기회를 놓치지 마세요.",
    details: [
      "기간: 2026년 7월 1일 ~ 7월 31일",
      "대상: 전 서버 모든 아이템 거래",
      "보너스: 거래 금액의 5% 추가 지급",
      "조건: 거래 완료 시 자동 적용"
    ],
    tag: "진행중"
  },
  {
    id: 2,
    category: "시세정보",
    icon: "TrendingUp",
    title: "6월 4주차 주요 아이템 시세 동향",
    date: "2026-06-30",
    time: "14:30",
    featured: true,
    pinned: false,
    content: "6월 마지막 주 주요 아이템의 시세 변동 현황을 안내드립니다.",
    details: [
      "에테르넬 플레임 무기: 평균 15% 상승",
      "22성 장비: 수요 증가로 10% 상승",
      "제네시스 무기: 안정적 유지"
    ],
    tag: "최신"
  },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 관리자가 작성한 게시글 불러오기
    const adminPosts = localStorage.getItem("posts");
    if (adminPosts) {
      const posts = JSON.parse(adminPosts);
      // 관리자 게시글과 기본 게시글 합치기
      setNews([...posts, ...defaultNews]);
    } else {
      setNews(defaultNews);
    }
  }, []);

  if (!mounted) return null;

  // 고정된 게시글 먼저, 그 다음 날짜순
  const sortedNews = [...news].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime();
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles": return Sparkles;
      case "TrendingUp": return TrendingUp;
      case "AlertCircle": return AlertCircle;
      default: return Newspaper;
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Newspaper className="text-[#FFB800]" size={36} />
            소식 정보
          </h1>
          <p className="text-gray-600 text-lg">최신 이벤트 및 공지사항</p>
        </div>

        {/* 추천 게시글 */}
        {sortedNews.filter(n => n.featured).length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-[#FFB800]" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">추천 게시글</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedNews.filter(n => n.featured).slice(0, 2).map((item) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <div key={item.id} className="glass rounded-2xl p-6 border-2 border-[#FFB800]/30 hover:shadow-xl transition-shadow relative">
                    {item.pinned && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold">
                          <Pin size={12} />
                          고정
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-[#FFB800] to-[#FF9500] p-3 rounded-lg">
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-600 rounded-lg text-xs font-semibold">
                            {item.category}
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            item.tag === "진행중" ? "bg-green-500/20 text-green-600" :
                            item.tag === "최신" ? "bg-blue-500/20 text-blue-600" :
                            item.tag === "중요" ? "bg-red-500/20 text-red-600" :
                            "bg-gray-500/20 text-gray-600"
                          }`}>
                            {item.tag}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{
                            color: item.titleColor || "#111827",
                            fontSize: item.titleSize === "2xl" ? "24px" : item.titleSize === "xl" ? "20px" : "18px"
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm mb-3 whitespace-pre-wrap"
                          style={{
                            color: item.contentColor || "#4B5563",
                            fontSize: item.contentSize === "sm" ? "14px" :
                                     item.contentSize === "lg" ? "18px" :
                                     item.contentSize === "xl" ? "20px" :
                                     item.contentSize === "2xl" ? "24px" : "14px"
                          }}
                        >
                          {item.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.details && item.details.length > 0 && (
                      <div className="bg-white/50 rounded-lg p-4 mt-4">
                        <ul className="space-y-2">
                          {item.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-[#FFB800]">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 전체 게시글 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="text-[#FFB800]" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">전체 공지사항</h2>
          </div>

          <div className="space-y-4">
            {sortedNews.map((item) => {
              const IconComponent = getIcon(item.icon);
              return (
                <div
                  key={item.id}
                  className={`glass-small rounded-xl p-6 hover:shadow-lg transition ${
                    item.pinned ? "border-2 border-red-500/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      item.category === "이벤트" ? "bg-purple-500/20" :
                      item.category === "시세정보" ? "bg-blue-500/20" :
                      "bg-orange-500/20"
                    }`}>
                      <IconComponent className={
                        item.category === "이벤트" ? "text-purple-600" :
                        item.category === "시세정보" ? "text-blue-600" :
                        "text-orange-600"
                      } size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {item.pinned && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-500 rounded text-xs font-bold">
                            <Pin size={10} />
                            고정
                          </div>
                        )}
                        <span className="text-xs text-gray-500">{item.category}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <h3
                        className="font-bold mb-1"
                        style={{
                          color: item.titleColor || "#111827",
                          fontSize: item.titleSize === "xl" ? "20px" : item.titleSize === "lg" ? "18px" : "16px"
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm whitespace-pre-wrap"
                        style={{
                          color: item.contentColor || "#6B7280",
                          fontSize: item.contentSize === "sm" ? "14px" :
                                   item.contentSize === "lg" ? "18px" :
                                   item.contentSize === "xl" ? "20px" :
                                   item.contentSize === "2xl" ? "24px" : "14px"
                        }}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <NewsSEOContent />
      </div>
    </div>
  );
}
