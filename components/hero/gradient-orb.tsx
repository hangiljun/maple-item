"use client";

import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  color: string;
  delay: number;
}

export function GradientOrb({ className, color, delay }: GradientOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-[80px] opacity-60 animate-float",
        className
      )}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}
