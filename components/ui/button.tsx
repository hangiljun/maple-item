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
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB800] focus-visible:ring-offset-2",
      {
        "bg-[#FFB800] text-white shadow-sm hover:bg-[#FF9500] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0":
          variant === "primary",
        "bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-sm":
          variant === "secondary",
        "px-4 py-2 text-[15px]": size === "default",
        "px-8 py-4 text-base rounded-lg": size === "large",
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
