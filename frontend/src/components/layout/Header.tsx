import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StampText } from "@/components/StampText";
import { BlinkCursor } from "@/components/BlinkCursor";
import { DocumentIcon, PlusIcon, SunIcon, MoonIcon } from "@/components/icons";

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
  hasMessages: boolean;
  streaming: boolean;
  onNewChat: () => void;
  onOpenResume: () => void;
}

export function Header({
  dark,
  onToggleTheme,
  hasMessages,
  streaming,
  onNewChat,
  onOpenResume,
}: HeaderProps) {
  return (
    <header className="shrink-0 bg-paper border-b-3 border-ink px-5 py-3.5">
      <div className="flex items-center gap-3 max-w-2xl mx-auto lg:max-w-none">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenResume}
          className="lg:hidden"
          aria-label="View resume"
        >
          <DocumentIcon className="w-3.5 h-3.5" />
          Resume
        </Button>

        <div className="min-w-0">
          <StampText className="font-display text-ink text-lg leading-tight tracking-tight uppercase">
            PROXY
          </StampText>
          <p className="hidden sm:block font-mono text-[10px] text-ink-muted leading-tight mt-0.5">
            jerico.portfolio
            <BlinkCursor />
          </p>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 shrink-0">
          {hasMessages && (
            <Button
              variant="outline"
              size="sm"
              onClick={onNewChat}
              disabled={streaming}
              aria-label="New chat"
            >
              <PlusIcon className="w-3 h-3" />
              <span className="hidden sm:inline">NEW CHAT</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={onToggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </Button>

          <Badge variant="online" className="gap-1.5 px-2.5 py-1.5 sm:px-3">
            <span className="w-2 h-2 bg-signal-green animate-pulse motion-reduce:animate-none" />
            <span className="hidden sm:inline">ONLINE</span>
          </Badge>
        </div>
      </div>
    </header>
  );
}
