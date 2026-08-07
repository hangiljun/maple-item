"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { StatCard } from "../stats/stat-card";
import { KAKAO_LINK } from "@/lib/constants";
import Link from "next/link";

const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), {
  ssr: false,
});

const GradientOrb = dynamic(() => import("./gradient-orb").then(mod => ({ default: mod.GradientOrb })), {
  ssr: false,
});

const ImageSlider = dynamic(() => import("./image-slider").then(mod => ({ default: mod.ImageSlider })), {
  ssr: false,
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 bg-white">
      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Column */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12"
        >
          {/* Trust Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
              게임 내 직거래로 안전
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 text-foreground leading-tight">
            {/* 모바일: 짧은 버전 */}
            <span className="block sm:hidden">
              <span className="text-gradient">급처템,</span>
              <br />
              <span className="text-gradient">지금 바로 구매합니다</span>
            </span>
            {/* 데스크톱: 긴 버전 */}
            <span className="hidden sm:block">
              <span className="text-gradient">급하게 팔아야 하는 아이템,</span>
              <br />
              <span className="text-gradient">지금 바로 구매합니다</span>
            </span>
          </h1>

          <p className="text-xl leading-relaxed text-foreground/80 mb-8">
            <span className="font-semibold">실시간 시세 확인</span>으로 정확한 가격 제시
            <br />
            <span className="font-semibold">전서버 지원</span>, 빠른 거래 진행
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href={KAKAO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="카카오톡으로 급처템 거래 문의하기"
            >
              <Button
                variant="primary"
                size="large"
                as="span"
              >
                거래 문의하기
              </Button>
            </a>
            <Link href="/guide">
              <Button variant="secondary" size="large" as="span">
                구매 가이드
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard number="15" label="전서버 지원" />
            <StatCard number="1,800+" label="누적 거래" />
            <StatCard number="0건" label="사기 피해" />
          </div>
        </MotionDiv>

        {/* Right Column - Image Slider */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-3xl p-6">
            <ImageSlider />
          </div>

          {/* Floating Badge */}
          <MotionDiv
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 glass-small rounded-2xl px-6 py-4 text-sm font-medium text-foreground"
          >
            투명한 시세 · 안전한 거래
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
