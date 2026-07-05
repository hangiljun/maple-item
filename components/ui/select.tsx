import { cn } from "@/lib/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base transition-colors",
          "focus:border-[#FFB800] focus:outline-none focus:ring-2 focus:ring-[#FFB800]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
