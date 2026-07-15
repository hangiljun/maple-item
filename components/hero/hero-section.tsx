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
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#FFB800]/15 border border-[#FFB800]/30 rounded-full text-sm font-semibold text-[#FFB800] mb-4 shadow-[0_0_15px_rgba(255,184,0,0.2)]">
            안전하고 빠른 거래
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-xs font-medium text-green-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              정식 사업자 인증
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium text-blue-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              보안 거래 보장
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-700">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              평균 평점 4.9/5.0
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            <span className="text-gradient">급하게 팔아야 하는 아이템,</span>
            <br />
            <span className="text-gradient">지금 바로 구매합니다</span>
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
