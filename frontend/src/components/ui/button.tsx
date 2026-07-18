import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "brutal-press-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-mono font-medium uppercase cursor-pointer disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-ink border-3 border-ink brutal-shadow-sm",
        outline: "bg-paper text-ink border-3 border-ink brutal-shadow-sm hover:bg-paper-alt",
        ghost: "text-ink border-3 border-transparent hover:border-ink",
      },
      size: {
        default: "h-10 px-4 text-xs",
        sm: "h-9 px-3 text-2xs",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
