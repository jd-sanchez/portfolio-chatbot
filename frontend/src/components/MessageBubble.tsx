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
    <div className={`flex flex-col animate-fade-up ${isUser ? "items-end" : "items-start"}`}>
      {/* Speaker label */}
      <p className={`font-arcade text-[7px] tracking-widest mb-1.5 ${
        isUser ? "text-accent/40" : "text-accent/70"
      }`}>
        {isUser ? "YOU" : "PROXY"}{" "}
        <span className="opacity-60">▶</span>
      </p>

      <div className={isUser ? "max-w-[70%]" : "max-w-[90%] w-full"}>
        <div className={`px-5 py-4 text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-white rounded-xl rounded-br-sm shadow-lg shadow-accent/25"
            : "glass-card text-gray-800 dark:text-gray-200 rounded-xl rounded-tl-sm border-l-[3px] border-accent/60"
        }`}>
          <span className="whitespace-pre-wrap break-words">{message.content}</span>
          {message.streaming && (
            <span className="inline-block w-0.5 h-3.5 bg-accent ml-0.5 animate-blink align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}
