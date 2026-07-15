"use client";

import { KAKAO_LINK } from "@/lib/constants";

export function FloatingKakaoButton() {
  return (
    <a
      href={KAKAO_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="카카오톡으로 문의하기"
    >
      <div className="relative">
        {/* Main Button */}
        <div className="w-16 h-16 bg-[#FFB800] rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-[#FF9500] animate-bounce-slow">
          {/* Kakao Talk Icon */}
          <svg
            className="w-9 h-9 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.681l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.293.801a.472.472 0 1 0 .886-.325l-.341-.932zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.211.472-.472z"/>
          </svg>
        </div>

        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-[#FFB800] animate-ping opacity-20"></div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          카카오톡 문의
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>
    </a>
  );
}
