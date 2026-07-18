import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-2xs uppercase tracking-wide px-2 py-0.5 border-2 border-ink",
  {
    variants: {
      variant: {
        active: "bg-signal-green text-black",
        online: "bg-paper text-ink",
        tag: "bg-paper-alt text-ink",
      },
    },
    defaultVariants: {
      variant: "tag",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
