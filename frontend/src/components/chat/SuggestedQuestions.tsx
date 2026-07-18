import { useRef } from "react";
import { StampText } from "@/components/StampText";
import { BlinkCursor } from "@/components/BlinkCursor";
import {
  CapIcon,
  GlobeIcon,
  ReelIcon,
  BuildingIcon,
  WrenchIcon,
  BriefcaseIcon,
} from "@/components/icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

const SUGGESTED_QUESTIONS = [
  { num: "01", Icon: CapIcon, label: "THESIS", text: "Tell me about his undergraduate thesis" },
  { num: "02", Icon: GlobeIcon, label: "INTERNSHIP", text: "What did he work on at Moonchild Productions?" },
  { num: "03", Icon: ReelIcon, label: "SINEHAN", text: "What is Sinehan and how does it work?" },
  { num: "04", Icon: BuildingIcon, label: "CURRENT ROLE", text: "What is he building right now at CINTERLabs?" },
  { num: "05", Icon: WrenchIcon, label: "TECH STACK", text: "What is his full tech stack?" },
  { num: "06", Icon: BriefcaseIcon, label: "EXPERIENCE", text: "Walk me through his work experience" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".sq-hero", { y: 10, autoAlpha: 0, duration: 0.25 }).from(
        ".sq-card",
        { y: 10, autoAlpha: 0, duration: 0.2, stagger: 0.05 },
        "-=0.1"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-10 py-10 px-4">
      {/* Hero */}
      <div className="sq-hero text-center space-y-4">
        <div className="space-y-2">
          <StampText className="font-display text-ink text-2xl sm:text-3xl tracking-tight uppercase">
            PROXY
          </StampText>
          <p className="font-display text-2xs text-ink tracking-wide">
            JERICO'S PORTFOLIO ASSISTANT
          </p>
          <p className="text-sm text-ink-muted mt-3 max-w-xs mx-auto leading-relaxed">
            Ask me anything about his skills, experience, or projects.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center pt-1">
          <span className="w-2 h-2 bg-signal-green animate-pulse motion-reduce:animate-none" />
          <span className="font-mono text-2xs text-ink tracking-wide uppercase">Online</span>
          <span className="w-2 h-2 bg-signal-green animate-pulse motion-reduce:animate-none" />
        </div>
      </div>

      {/* Select prompt */}
      <div className="w-full max-w-lg">
        <BlinkCursor className="sq-hero font-mono text-2xs text-ink-muted text-center mb-5 block uppercase tracking-wide">
          ▼ &nbsp; Select your query &nbsp; ▼
        </BlinkCursor>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTED_QUESTIONS.map(({ num, Icon, label, text }) => (
            <button
              key={text}
              onClick={() => onSelect(text)}
              className="brutal-press sq-card group text-left px-4 py-4 border-3 border-ink bg-paper brutal-shadow-sm hover:bg-paper-alt cursor-pointer relative"
            >
              <span className="font-mono text-3xs text-ink-muted absolute top-2.5 right-3">
                {num}
              </span>

              <span className="w-9 h-9 border-3 border-ink flex items-center justify-center shrink-0 mb-3 text-ink group-hover:bg-accent group-hover:text-accent-ink transition-colors">
                <Icon className="w-5 h-5" />
              </span>
              <p className="font-display text-2xs text-ink mb-2 tracking-wide">{label}</p>
              <p className="text-sm text-ink-muted group-hover:text-ink leading-snug transition-colors">
                {text}
              </p>

              <span className="absolute bottom-3 right-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                ▶
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
