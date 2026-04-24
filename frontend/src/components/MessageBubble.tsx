interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-end gap-2.5 animate-fade-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mb-0.5 select-none">
          J
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-white rounded-br-sm shadow-lg shadow-accent/20"
            : "glass-card text-gray-800 dark:text-gray-200 rounded-bl-sm"
        }`}
      >
        <span className="whitespace-pre-wrap break-words">{message.content}</span>
        {message.streaming && (
          <span className="inline-block w-0.5 h-3.5 bg-accent/70 ml-0.5 animate-blink align-middle rounded-full" />
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-xl glass-card flex items-center justify-center text-gray-600 dark:text-gray-400 text-[10px] font-semibold shrink-0 mb-0.5 select-none">
          You
        </div>
      )}
    </div>
  );
}
