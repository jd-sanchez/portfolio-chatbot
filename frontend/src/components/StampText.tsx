import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

interface StampTextProps {
  as?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}

/** One-shot "rubber stamp hitting paper" entrance — skewed and off-axis,
 *  then slammed flat. Replaces the old ambient neon glitch loop, which
 *  doesn't belong in a brutalist system (no hue-rotate, no looping). */
export function StampText({ as = "h1", className, children }: StampTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, {
        rotation: -6,
        x: -8,
        y: -6,
        scale: 1.15,
        autoAlpha: 0,
        duration: 0.35,
        ease: "back.out(3)",
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
