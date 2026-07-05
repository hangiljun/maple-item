import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base transition-colors",
          "placeholder:text-gray-400",
          "focus:border-[#FFB800] focus:outline-none focus:ring-2 focus:ring-[#FFB800]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
