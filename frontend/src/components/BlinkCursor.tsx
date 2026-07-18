import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

interface BlinkCursorProps {
  className?: string;
  children?: ReactNode;
}

/** Terminal-style blinking cursor — a hard on/off cut, not a fade. Brutalism
 *  favors instant state changes over smoothed transitions. */
export function BlinkCursor({ className, children = "_" }: BlinkCursorProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.to(ref.current, {
        autoAlpha: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
