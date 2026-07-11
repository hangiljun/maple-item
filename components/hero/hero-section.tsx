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
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        <GradientOrb
          className="w-[500px] h-[500px] -top-24 -left-24"
          color="rgba(255, 184, 0, 0.25)"
          delay={0}
        />
        <GradientOrb
          className="w-[400px] h-[400px] top-1/2 -right-12"
          color="rgba(255, 182, 193, 0.25)"
          delay={5}
        />
        <GradientOrb
          className="w-[350px] h-[350px] -bottom-24 left-1/2"
          color="rgba(212, 165, 255, 0.25)"
          delay={10}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Column */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#FFB800]/15 border border-[#FFB800]/30 rounded-full text-sm font-semibold text-[#FFB800] mb-6 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
            안전하고 빠른 거래
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            메이플스토리
            <br />
            <span className="text-gradient">아이템 고가매입</span>
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
