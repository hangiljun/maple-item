"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDER_IMAGES = [
  // 거래 사진을 여기에 추가하세요
];

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // 이미지가 없을 때 플레이스홀더 표시
  if (SLIDER_IMAGES.length === 0) {
    return (
      <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#FFB800]/20 to-[#FF9500]/20 flex items-center justify-center">
        <p className="text-gray-400 text-center px-8">거래 사진 준비 중</p>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#FFB800]/20 to-[#FF9500]/20"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        {SLIDER_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain p-8"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 glass-small rounded-full p-2 hover:bg-white/20 transition-colors"
        aria-label="이전 이미지"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 glass-small rounded-full p-2 hover:bg-white/20 transition-colors"
        aria-label="다음 이미지"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#FFB800] w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`${index + 1}번째 이미지로 이동`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 glass-small rounded-full px-3 py-1 text-sm font-medium text-foreground">
        {currentIndex + 1} / {SLIDER_IMAGES.length}
      </div>
    </div>
  );
}
