import { useRef } from "react";
import type { Message } from "@/types";
import { BlinkCursor } from "@/components/BlinkCursor";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, {
        x: isUser ? 10 : -10,
        autoAlpha: 0,
        duration: 0.18,
        ease: "power4.out",
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      {/* Speaker label */}
      <p
        className={`font-display text-2xs tracking-wide mb-1.5 ${
          isUser ? "text-ink-muted" : "text-red-700 dark:text-accent"
        }`}
      >
        {isUser ? "YOU" : "PROXY"} <span className="opacity-70">▶</span>
      </p>

      <div className={isUser ? "max-w-[70%]" : "max-w-[90%] w-full"}>
        <div
          className={`px-5 py-4 text-sm leading-relaxed border-3 border-ink brutal-shadow-sm ${
            isUser ? "bg-accent text-accent-ink" : "bg-paper text-ink"
          }`}
        >
          <span className="whitespace-pre-wrap break-words">{message.content}</span>
          {message.streaming && (
            <BlinkCursor className="inline-block w-2 h-3.5 bg-ink ml-0.5 align-middle">
              {""}
            </BlinkCursor>
          )}
        </div>
      </div>
    </div>
  );
}
