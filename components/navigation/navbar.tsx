"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { KAKAO_LINK } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin 페이지에서는 Navbar 숨기기
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${
        scrolled ? "shadow-[0_4px_20px_rgba(255,184,0,0.15)]" : ""
      } bg-white/30 backdrop-blur-[20px] border-b border-[#FFB800]/20`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label="메이플아이템 홈으로 이동">
          <Image
            src="/logo.png"
            alt="메이플아이템 로고"
            width={180}
            height={45}
            className="h-10 w-auto"
            priority
            quality={90}
          />
        </Link>

        <ul className="hidden md:flex list-none gap-8 flex-1 justify-center">
          <li>
            <Link
              href="/guide"
              className="font-medium text-foreground hover:text-[#FFB800] transition-colors"
            >
              이용가이드
            </Link>
          </li>
          <li>
            <Link
              href="/reviews"
              className="font-medium text-foreground hover:text-[#FFB800] transition-colors"
            >
              후기게시판
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              className="font-medium text-foreground hover:text-[#FFB800] transition-colors"
            >
              소식정보
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="font-medium text-foreground hover:text-[#FFB800] transition-colors"
            >
              문의하기
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <a
            href={KAKAO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button
              variant="primary"
              as="span"
            >
              판매하기
            </Button>
          </a>

          <button
            className="md:hidden text-foreground text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-[20px] border-t border-[#FFB800]/20">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link
                href="/guide"
                className="block py-2 font-medium text-foreground hover:text-[#FFB800] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                이용가이드
              </Link>
            </li>
            <li>
              <Link
                href="/reviews"
                className="block py-2 font-medium text-foreground hover:text-[#FFB800] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                후기게시판
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="block py-2 font-medium text-foreground hover:text-[#FFB800] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                소식정보
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block py-2 font-medium text-foreground hover:text-[#FFB800] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                문의하기
              </Link>
            </li>
            <li className="pt-2">
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="primary"
                  as="span"
                  className="w-full"
                >
                  판매하기
                </Button>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
