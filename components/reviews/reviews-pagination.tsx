'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  currentPage: number;
  totalPages: number;
};

export function ReviewsPagination({ currentPage, totalPages }: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Link
        href={currentPage > 1 ? `/reviews?page=${currentPage - 1}` : '#'}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition ${
          currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
        이전
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/reviews?page=${page}`}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === page
              ? 'bg-[#FFB800] text-white font-bold'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={currentPage < totalPages ? `/reviews?page=${currentPage + 1}` : '#'}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition ${
          currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-disabled={currentPage === totalPages}
      >
        다음
        <ChevronRight size={20} />
      </Link>
    </div>
  );
}
