"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Star, Shield } from "lucide-react";
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
            <Star className="w-4 h-4 fill-current" />
            💰 다른곳보다 더 비싸게 쳐드림
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            급처템 팔면
            <br />
            <span className="text-gradient">저희가 제일 많이 쳐드림</span>
          </h1>

          <p className="text-xl leading-relaxed text-foreground/80 mb-8 font-bold">
            💸 다른 업체보다 더 높게 구매
            <br />
            ⚡ 카톡으로 5분 안에 현금화
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
                <Star className="w-5 h-5 fill-current" />
                급처템 판매하기
              </Button>
            </a>
            <Link href="/guide">
              <Button variant="secondary" size="large" as="span">
                <Shield className="w-5 h-5" />
                구매 가이드
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard number="7-10" label="오늘 구매" />
            <StatCard number="1,800+" label="총 구매" />
            <StatCard number="100%" label="안전 구매" />
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
            className="absolute bottom-8 right-8 glass-small rounded-2xl px-6 py-4 flex items-center gap-3 text-sm font-medium text-foreground"
          >
            <Shield className="w-6 h-6 text-[#FFD700]" />
            <span>100% 안전 구매 보장</span>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
