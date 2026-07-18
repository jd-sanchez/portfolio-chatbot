import { useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SpinnerIcon } from "@/components/icons";

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
    <div className="shrink-0 bg-paper border-t-3 border-ink px-5 py-4">
      <div className="max-w-none">
        <div className="flex items-end gap-3 bg-paper px-4 py-3 border-3 border-ink brutal-shadow-sm focus-within:bg-paper-alt transition-colors duration-100">
          <Textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="ENTER QUERY_"
          />
          <Button
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            size="icon"
            className="w-auto px-3 mb-0.5"
          >
            {disabled ? (
              <SpinnerIcon className="w-3.5 h-3.5 animate-spin motion-reduce:animate-none" />
            ) : (
              <span>SEND</span>
            )}
          </Button>
        </div>

        <p className="font-mono text-3xs text-ink-muted text-center mt-2.5 tracking-wide uppercase">
          Enter to send &nbsp;·&nbsp; Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
