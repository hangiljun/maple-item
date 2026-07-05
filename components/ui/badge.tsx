import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "error";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
          {
            "bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30": variant === "default",
            "bg-gray-500/20 text-gray-600 border border-gray-500/30": variant === "secondary",
            "bg-green-500/20 text-green-600 border border-green-500/30": variant === "success",
            "bg-yellow-500/20 text-yellow-600 border border-yellow-500/30": variant === "warning",
            "bg-red-500/20 text-red-600 border border-red-500/30": variant === "error",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
