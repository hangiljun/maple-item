'use client';

import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
};

export function ReviewsPagination({ currentPage, totalPages }: Props) {
  return (
    <nav className="rvw-pagination" aria-label="후기 페이지">
      <Link
        href={currentPage > 1 ? `/reviews?page=${currentPage - 1}` : '#'}
        className={currentPage === 1 ? 'disabled' : ''}
        aria-disabled={currentPage === 1}
      >
        ← 이전
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/reviews?page=${page}`}
          className={currentPage === page ? 'active' : ''}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      <Link
        href={currentPage < totalPages ? `/reviews?page=${currentPage + 1}` : '#'}
        className={currentPage === totalPages ? 'disabled' : ''}
        aria-disabled={currentPage === totalPages}
      >
        다음 →
      </Link>
    </nav>
  );
}
