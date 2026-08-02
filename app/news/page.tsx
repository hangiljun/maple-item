"use client";

import { useState, useEffect } from "react";
import { Newspaper, TrendingUp, AlertCircle, Sparkles, Calendar, Clock, Pin } from "lucide-react";
import { NewsSEOContent } from "@/components/sections/news-seo-content";
import { parseStyledText } from "@/lib/text-parser";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { NewsPost } from "@/lib/types";

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getAllPosts();
        setNews(posts);
      } catch (error) {
        console.error('게시글 로드 실패:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) return null;

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

  const latestPost = sortedNews[0];
  const restPosts = sortedNews.slice(1);
  const LatestIcon = latestPost ? getIcon(latestPost.icon) : Newspaper;

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
            <Newspaper className="text-[#FFB800]" size={36} />
            소식 정보
          </h1>
          <p className="text-gray-600 text-lg">최신 이벤트 및 공지사항</p>
        </div>

        {/* 최신 게시글 - 크게 표시 */}
        {latestPost && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-[#FFB800]" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">최신 소식</h2>
            </div>
            <Link href={`/news/${latestPost.id}`} className="block">
              <div className="glass rounded-3xl p-8 border-2 border-[#FFB800]/40 shadow-lg hover:border-[#FFB800] transition cursor-pointer">
              {latestPost.pinned && (
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                    <Pin size={16} />
                    공지
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-[#FFB800] p-4 rounded-2xl shadow-lg">
                    <LatestIcon className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold border border-gray-300">
                        {latestPost.category}
                      </span>
                      <span className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${
                        latestPost.tag === "진행중" ? "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]" :
                        latestPost.tag === "최신" ? "bg-gray-100 text-gray-700 border-gray-300" :
                        latestPost.tag === "중요" ? "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]" :
                        "bg-gray-100 text-gray-700 border-gray-300"
                      }`}>
                        {latestPost.tag}
                      </span>
                    </div>
                    <h3
                      className="text-3xl font-black mb-4"
                      style={{
                        color: latestPost.titleColor || "#111827",
                        fontSize: latestPost.titleSize === "2xl" ? "32px" : latestPost.titleSize === "xl" ? "28px" : "24px"
                      }}
                    >
                      {latestPost.title}
                    </h3>
                    <div className="text-base mb-4 leading-relaxed whitespace-pre-wrap text-gray-700 max-h-96 overflow-y-auto">
                      {parseStyledText(latestPost.content)}
                    </div>
                    {latestPost.image && (
                      <div className="mb-4">
                        <img
                          src={latestPost.image}
                          alt={latestPost.title}
                          className="w-full max-h-96 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span className="font-medium">{latestPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span className="font-medium">{latestPost.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </Link>
          </div>
        )}

        {/* 전체 게시글 - 리스트 형식 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="text-[#FFB800]" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">전체 게시글</h2>
            <span className="text-sm text-gray-500">({restPosts.length}개)</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            {/* 테이블 헤더 */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-2">분류</div>
              <div className="col-span-5">제목</div>
              <div className="col-span-2">작성일</div>
              <div className="col-span-2 text-center">상태</div>
            </div>

            {/* 게시글 리스트 */}
            <div className="divide-y divide-gray-100">
              {restPosts.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition cursor-pointer ${
                      item.pinned ? "bg-yellow-50/50" : ""
                    }`}
                  >
                    {/* 번호 */}
                    <div className="hidden md:flex md:col-span-1 items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                    </div>

                    {/* 분류 */}
                    <div className="md:col-span-2 flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <IconComponent className="text-gray-700" size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    </div>

                    {/* 제목 */}
                    <div className="md:col-span-5 flex items-center gap-2">
                      {item.pinned && (
                        <Pin size={14} className="text-red-500 flex-shrink-0" />
                      )}
                      <h3
                        className="font-semibold text-gray-900 line-clamp-1"
                        style={{
                          color: item.titleColor || "#111827",
                          fontSize: item.titleSize === "xl" ? "18px" : item.titleSize === "lg" ? "16px" : "14px"
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* 작성일 */}
                    <div className="md:col-span-2 flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{item.date}</span>
                    </div>

                    {/* 상태 */}
                    <div className="md:col-span-2 flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.tag === "진행중" ? "bg-[#FFB800]/10 text-[#FFB800]" :
                        item.tag === "최신" ? "bg-gray-100 text-gray-700" :
                        item.tag === "중요" ? "bg-[#FFB800]/10 text-[#FFB800]" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {restPosts.length === 0 && (
              <div className="py-16 text-center text-gray-500">
                <Newspaper className="mx-auto mb-4 text-gray-400" size={48} />
                <p>등록된 게시글이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        <NewsSEOContent />
      </div>
    </div>
  );
}
