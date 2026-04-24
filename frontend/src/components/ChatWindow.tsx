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
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-2xl mx-auto lg:max-w-none lg:px-2 flex flex-col gap-3.5">
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
