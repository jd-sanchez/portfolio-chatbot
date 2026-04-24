import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import SuggestedQuestions from "./SuggestedQuestions";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  onSuggestedQuestion: (q: string) => void;
}

export default function ChatWindow({ messages, onSuggestedQuestion }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 dark:game-grid">
      <div className="max-w-none flex flex-col gap-5 h-full">
        {messages.length === 0 && (
          <SuggestedQuestions onSelect={onSuggestedQuestion} />
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
