import { useEffect, useRef } from "react";
import type { Message } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import SuggestedQuestions from "./SuggestedQuestions";

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
    <ScrollArea className="flex-1 bg-paper" viewportClassName="px-5 py-6">
      <div className="max-w-none flex flex-col gap-5 h-full">
        {messages.length === 0 && (
          <SuggestedQuestions onSelect={onSuggestedQuestion} />
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
