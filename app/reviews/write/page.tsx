import { ReviewForm } from "@/components/reviews/review-form";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WriteReviewPage() {
  return (
    <main className="reviews-page reviews-subpage">
      <div className="rvw rvw-write-page">
        <Link href="/reviews" className="rvw-d-back"><ArrowLeft size={16} aria-hidden="true" /> 이용후기 목록</Link>
        <div data-maple-hero="compact" className="rvw-write-head"><span>이용 경험 공유</span><h1>후기 작성</h1><p>거래 과정에서 느낀 점을 솔직하게 남겨주세요.</p></div>
        <ReviewForm />
      </div>
    </main>
  );
}
