"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  number: string;
  label: string;
}

export function StatCard({ number, label }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // "7-10" 같은 범위는 애니메이션 스킵
    if (number.includes("-")) {
      return;
    }

    const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
    if (isNaN(numericValue)) return;

    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, number]);

  // 범위 표시는 그대로, 숫자만 애니메이션
  const displayNumber = number.includes("-")
    ? number // "7-10" 그대로 표시
    : number.includes("+")
    ? count.toLocaleString() + "+"
    : number.includes("%")
    ? count + "%"
    : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className="glass-small rounded-2xl p-6 text-center transition-transform"
    >
      <div className="font-heading text-3xl font-bold text-[#FFB800] mb-1">
        {displayNumber}
      </div>
      <div className="text-sm text-foreground/70">{label}</div>
    </motion.div>
  );
}
