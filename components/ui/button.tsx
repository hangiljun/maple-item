import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "default" | "large";
  as?: "button" | "span";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", as = "button", children, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] focus-visible:ring-offset-2",
      {
        "bg-gradient-to-r from-[#FFB800] to-[#FF9500] text-white shadow-[0_4px_12px_rgba(255,184,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,184,0,0.6)] hover:-translate-y-0.5 active:translate-y-0":
          variant === "primary",
        "bg-white/50 backdrop-blur-[8px] border border-[#FFB800]/40 text-foreground hover:bg-white/80 hover:border-[#FFB800]/70 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,184,0,0.3)]":
          variant === "secondary",
        "px-4 py-2 text-[15px]": size === "default",
        "px-8 py-4 text-base rounded-2xl": size === "large",
      },
      className
    );

    if (as === "span") {
      return (
        <span className={baseClasses}>
          {children}
        </span>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={baseClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
