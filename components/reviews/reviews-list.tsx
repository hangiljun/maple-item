import Link from "next/link";
import { Review } from "@/lib/types";

function toTitle(content: string) {
  const first = (content || "").split("\n")[0].trim();
  return first.length > 45 ? first.slice(0, 45) + "…" : first || "거래 후기";
}

export function ReviewsList({ reviews, startNumber }: { reviews: Review[]; startNumber: number }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-400 py-16 text-center">아직 등록된 후기가 없습니다. 첫 후기를 남겨주세요.</p>;
  }
  return (
    <table className="rvw-board">
      <thead>
        <tr>
          <th className="rvw-no">번호</th>
          <th>제목</th>
          <th className="rvw-writer">작성자</th>
          <th className="rvw-date">작성일</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((r, i) => (
          <tr key={r.id}>
            <td className="rvw-no">{startNumber - i}</td>
            <td className="rvw-title">
              <Link href={`/reviews/${r.id}`}>
                {r.server && <span className="rvw-srv">{r.server}</span>}
                {toTitle(r.content)}
              </Link>
              <div className="rvw-meta-m">
                <span>{r.author}</span><span>{r.date}</span>
              </div>
            </td>
            <td className="rvw-writer">{r.author}</td>
            <td className="rvw-date">{r.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
