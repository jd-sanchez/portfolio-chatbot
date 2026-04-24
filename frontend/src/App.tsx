import { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import ResumePanel from "./components/ResumePanel";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showResume, setShowResume] = useState(false);

  // Theme — default dark, persisted to localStorage
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage || streaming) return;

    const history = messages.map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setStreaming(true);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", streaming: true },
    ]);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;

          let parsed: Record<string, unknown>;
          try {
            parsed = JSON.parse(data);
          } catch {
            continue;
          }

          if (parsed.error) throw new Error(String(parsed.error));
          if (parsed.token) {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.role === "assistant") {
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + String(parsed.token),
                };
              }
              return updated;
            });
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Proxy] stream error:", msg);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && last.streaming) {
          updated[updated.length - 1] = {
            role: "assistant",
            content: `Sorry, I ran into an error. ${msg}`,
          };
        }
        return updated;
      });
    } finally {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.role === "assistant") {
          updated[updated.length - 1] = { ...last, streaming: false };
        }
        return updated;
      });
      setStreaming(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Resume sidebar */}
      <ResumePanel open={showResume} onClose={() => setShowResume(false)} />

      {/* Main chat column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="shrink-0 glass border-b border-accent/15 hud-shadow px-5 py-3.5">
          <div className="flex items-center gap-3 max-w-2xl mx-auto lg:max-w-none">
            {/* Mobile resume toggle */}
            <button
              onClick={() => setShowResume(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/25 text-accent text-xs font-medium hover:bg-accent/20 transition-all"
              aria-label="View resume"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </button>

            {/* Avatar + name */}
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center select-none glow-accent">
                  <span className="font-arcade text-white text-xs">J</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border-2 border-white dark:border-surface-1 animate-pulse" />
              </div>
              <div>
                <h1 className="font-arcade text-[11px] text-accent text-neon leading-tight tracking-widest animate-glitch">
                  PROXY
                </h1>
                <p className="font-mono text-[10px] text-muted leading-tight mt-0.5">
                  jerico.portfolio<span className="animate-blink">_</span>
                </p>
              </div>
            </div>

            {/* Right side controls */}
            <div className="ml-auto flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setDark((d) => !d)}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-muted hover:text-accent transition-colors"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Online status */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-card border border-neon-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                <span className="font-arcade text-[7px] text-neon-green tracking-wider">ONLINE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Chat */}
        <ChatWindow
          messages={messages}
          onSuggestedQuestion={(q) => sendMessage(q)}
        />

        {/* Input */}
        <InputBar
          value={input}
          onChange={setInput}
          onSubmit={() => sendMessage(input)}
          disabled={streaming}
        />
      </div>
    </div>
  );
}
