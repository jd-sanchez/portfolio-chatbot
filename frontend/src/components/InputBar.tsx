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
    <div className="shrink-0 glass border-t border-surface-4/30 px-4 py-3">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        <div className="flex items-end gap-2 glass-card rounded-2xl px-4 py-2.5 focus-within:border-accent/50 focus-within:shadow-lg focus-within:shadow-accent/10 transition-all duration-200">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask me about Jerico..."
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 placeholder-muted text-sm resize-none outline-none leading-relaxed min-h-[24px] max-h-[160px] py-0.5 disabled:opacity-50"
          />
          <button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="shrink-0 w-8 h-8 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center mb-0.5 shadow-lg shadow-accent/25"
          >
            {disabled ? (
              <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-center text-[11px] text-muted mt-2">
          <kbd className="px-1.5 py-0.5 rounded-md glass-card text-gray-500 dark:text-gray-400 font-mono text-[10px]">Enter</kbd>
          {" "}to send ·{" "}
          <kbd className="px-1.5 py-0.5 rounded-md glass-card text-gray-500 dark:text-gray-400 font-mono text-[10px]">Shift+Enter</kbd>
          {" "}for new line
        </p>
      </div>
    </div>
  );
}
