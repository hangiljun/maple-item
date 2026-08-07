import { ReviewForm } from "@/components/reviews/review-form";

export default function WriteReviewPage() {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="rvw max-w-2xl mx-auto px-4 sm:px-6">
        <a href="/reviews" className="rvw-d-back">← 목록으로</a>
        <h1 style={{ fontSize: "24px", fontWeight: 600, letterSpacing: "-0.02em", margin: "8px 0 24px" }}>후기 작성</h1>
        <ReviewForm />
      </div>
    </div>
  );
}
