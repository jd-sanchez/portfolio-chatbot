import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ResumeSidebar } from "@/components/layout/ResumeSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import InputBar from "@/components/chat/InputBar";
import { useTheme } from "@/hooks/useTheme";
import { useChatStream } from "@/hooks/useChatStream";

export default function App() {
  const { dark, toggleTheme } = useTheme();
  const { messages, input, setInput, streaming, sendMessage, newChat } = useChatStream();
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden">
      <ResumeSidebar open={showResume} onOpenChange={setShowResume} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          dark={dark}
          onToggleTheme={toggleTheme}
          hasMessages={messages.length > 0}
          streaming={streaming}
          onNewChat={newChat}
          onOpenResume={() => setShowResume(true)}
        />

        <ChatWindow messages={messages} onSuggestedQuestion={(q) => sendMessage(q)} />

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
