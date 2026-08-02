"use client";

import { useState, useEffect } from "react";
import { NewsSEOContent } from "@/components/sections/news-seo-content";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { NewsPost } from "@/lib/types";

const CATEGORIES = ["전체", "공지", "이벤트", "시세정보"] as const;

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

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

  // 정렬: pinned 우선, 날짜 내림차순
  const sortedNews = [...news].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime();
  });

  // 필터링
  const filteredNews = selectedCategory === "전체"
    ? sortedNews
    : sortedNews.filter(post => post.category === selectedCategory);

  // 대표 글: pinned 우선, 없으면 최신 1개
  const featuredPost = filteredNews.find(post => post.pinned) || filteredNews[0];
  const gridPosts = featuredPost ? filteredNews.filter(post => post.id !== featuredPost.id) : filteredNews;

  // 분류 배지 스타일
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "이벤트":
        return "bg-[#FAEEDA] text-[#854F0B] border-[#FAEEDA]";
      case "시세정보":
        return "bg-[#E6F1FB] text-[#0C447C] border-[#E6F1FB]";
      case "공지":
      default:
        return "bg-white text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            소식 정보
          </h1>
          <p className="text-gray-600">최신 이벤트 및 공지사항</p>
        </div>

        {/* 분류 필터 칩 */}
        <div className="flex justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-[#FFB800] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredNews.length === 0 ? (
          /* 빈 상태 */
          <div className="py-16 text-center text-gray-500">
            <p className="text-lg">등록된 게시글이 없습니다.</p>
          </div>
        ) : (
          <>
            {/* 대표 글 */}
            {featuredPost && (
              <div className="mb-12">
                <Link href={`/news/${featuredPost.id}`} className="block">
                  <article className="bg-white rounded-xl p-8 border border-gray-200 hover:border-[#FFB800] transition">
                    {/* 이미지 */}
                    {featuredPost.image && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt=""
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    )}

                    {/* 메타 */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryBadgeClass(featuredPost.category)}`}>
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-gray-500">{featuredPost.date}</span>
                    </div>

                    {/* 제목 */}
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h2>

                    {/* 요약 */}
                    <p className="text-gray-600 text-lg line-clamp-3">
                      {featuredPost.excerpt || featuredPost.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
                    </p>
                  </article>
                </Link>
              </div>
            )}

            {/* 카드 그리드 */}
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridPosts.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`} className="block">
                    <article className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FFB800] transition h-full">
                      {/* 메타 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryBadgeClass(post.category)}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>

                      {/* 제목 */}
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* 요약 */}
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        <NewsSEOContent />
      </div>
    </div>
  );
}
