import { useRef, useEffect, KeyboardEvent } from "react";

interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function InputBar({ value, onChange, onSubmit, disabled }: InputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSubmit();
    }
  };

  return (
    <div className="shrink-0 glass border-t border-surface-4/20 hud-shadow px-5 py-4">
      <div className="max-w-none">
        <div className="flex items-end gap-3 glass-card rounded-xl px-4 py-3 border-l-[3px] border-accent/50 focus-within:border-accent focus-within:shadow-lg focus-within:shadow-accent/10 transition-all duration-200">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="ENTER QUERY_"
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-accent/25 font-mono text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] py-0.5 disabled:opacity-40 placeholder:font-arcade placeholder:text-[10px]"
          />
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="shrink-0 h-8 px-3 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center mb-0.5 shadow-lg shadow-accent/25 border border-accent/50"
          >
            {disabled ? (
              <svg className="w-3.5 h-3.5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <span className="font-arcade text-[7px] text-white tracking-wider">SEND</span>
            )}
          </button>
        </div>

        <p className="font-arcade text-[6px] text-muted/40 text-center mt-2.5 tracking-widest">
          ENTER TO SEND &nbsp;·&nbsp; SHIFT+ENTER FOR NEW LINE
        </p>
      </div>
    </div>
  );
}
