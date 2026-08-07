import Link from "next/link";
import { Metadata } from "next";
import { KAKAO_LINK, KAKAO_ID } from "@/lib/constants";
import { getAllReviews } from "@/lib/posts";
import { ReviewsPagination } from "@/components/reviews/reviews-pagination";
import { ReviewsList } from "@/components/reviews/reviews-list";
import { ReviewSort } from "@/components/reviews/review-sort";
import { ReviewsSEOContent } from "@/components/sections/reviews-seo-content";

const REVIEWS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "메이플아이템 거래 후기 - 실제 이용자 후기게시판",
  description: "메이플아이템을 이용한 실제 거래 후기를 확인하세요. 급처템을 안전하고 빠르게 정산한 이용자들의 생생한 거래 경험과 사례를 모았습니다.",
  alternates: { canonical: "https://mapleitem.co.kr/reviews" },
  openGraph: {
    title: "메이플아이템 거래 후기 - 실제 이용자 후기",
    description: "급처템을 안전하게 정산한 이용자들의 실제 거래 후기 모음.",
    url: "https://mapleitem.co.kr/reviews",
    images: ["/og-image.png"],
  },
  twitter: {
    title: "메이플아이템 거래 후기 - 실제 이용자 후기",
    description: "급처템을 안전하게 정산한 이용자들의 실제 거래 후기 모음.",
  },
};

type Props = { searchParams: Promise<{ page?: string; q?: string; sort?: string }> };

export default async function ReviewsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const q = (params.q || "").trim();
  const sort = params.sort || "latest";

  let reviews = await getAllReviews();
  if (q) reviews = reviews.filter((r) => r.content?.includes(q) || r.author?.includes(q) || r.server?.includes(q));
  if (sort === "likes") reviews = [...reviews].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  else if (sort === "views") reviews = [...reviews].sort((a, b) => (b.views || 0) - (a.views || 0));

  const total = reviews.length;
  const totalPages = Math.max(1, Math.ceil(total / REVIEWS_PER_PAGE));
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  const startNumber = total - startIndex;

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="rvw max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rvw-head">
          <h1>거래후기</h1>
          <p>실제 이용자분들이 남긴 거래 후기입니다.</p>
        </div>

        <div className="rvw-bar">
          <div className="cnt">전체 <b>{total}</b>건</div>
          <ReviewSort />
        </div>

        <ReviewsList reviews={currentReviews} startNumber={startNumber} />

        {totalPages > 1 && <ReviewsPagination currentPage={currentPage} totalPages={totalPages} />}

        <div className="rvw-tools">
          <form className="rvw-search" method="get" action="/reviews">
            {sort !== "latest" && <input type="hidden" name="sort" value={sort} />}
            <input name="q" defaultValue={q} placeholder="검색어를 입력하세요" />
            <button type="submit">검색</button>
          </form>
          <Link href="/reviews/write" className="rvw-write">글쓰기</Link>
        </div>

        <section className="rvw-kko">
          <h2>지금 바로 거래해보세요</h2>
          <p>빠르고 안전한 거래를 경험하고, 여러분도 후기를 남겨주세요.</p>
          <a href={KAKAO_LINK} target="_blank" rel="noreferrer">💬 카카오톡으로 문의하기</a>
          <div className="id">카카오톡 ID · <b>{KAKAO_ID}</b></div>
        </section>

        <ReviewsSEOContent />
      </div>
    </div>
  );
}
