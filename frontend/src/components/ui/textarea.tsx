import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex-1 bg-transparent text-ink placeholder-ink-muted font-mono text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] py-0.5 disabled:opacity-40 placeholder:uppercase placeholder:text-2xs",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
