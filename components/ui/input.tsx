import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base transition-colors",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-gray-400",
          "focus:border-[#FFB800] focus:outline-none focus:ring-2 focus:ring-[#FFB800]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
