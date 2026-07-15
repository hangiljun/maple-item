"use client";

import { SITE_NAME, KAKAO_LINK, KAKAO_ID } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Admin 페이지에서는 Footer 숨기기
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* 브랜드 */}
          <div>
            <div className="mb-4">
              <span className="font-heading text-xl font-semibold text-[#FFB800]">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              메이플아이템은 메이플스토리 유저들이 급처템을 안전하고 빠르게 처분할 수 있는 사이트 입니다.
              <br />
              안전한 시스템으로 사기 걱정 없이 안심하고 아이템을 구매할 수 있습니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide" className="text-slate-400 hover:text-[#FFB800] transition">
                  이용가이드
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-slate-400 hover:text-[#FFB800] transition">
                  후기게시판
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-400 hover:text-[#FFB800] transition">
                  소식정보
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-[#FFB800] transition">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">고객지원</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <div className="text-slate-300">카카오톡</div>
                <a
                  href={KAKAO_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#FFB800] transition"
                >
                  {KAKAO_ID}
                </a>
              </li>
              <li>
                <div className="text-slate-300">이메일</div>
                <a
                  href="mailto:support@mapleitem.co.kr"
                  className="text-slate-400 hover:text-[#FFB800] transition"
                >
                  support@mapleitem.co.kr
                </a>
              </li>
            </ul>
          </div>

          {/* 운영시간 */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">운영시간</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="text-[#FFB800] font-bold text-lg">365일 24시간</li>
              <li className="mt-3">연중무휴</li>
              <li>언제든지 문의 가능</li>
              <li className="text-[#FFB800] font-semibold mt-3">빠른 응답 보장</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-[#FFB800] transition text-sm"
              >
                카카오톡
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
