const SUGGESTED_QUESTIONS = [
  { icon: "🎓", text: "What is Jerico's thesis project?" },
  { icon: "💼", text: "Tell me about his internship at MCP" },
  { icon: "🛠️", text: "What is his full tech stack?" },
  { icon: "🤖", text: "What AI projects has he built?" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-10 px-4 animate-fade-up">
      {/* Hero */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white font-bold text-2xl select-none glow-accent mb-4">
          J
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Hi, I'm Ask Jerico</h2>
        <p className="text-sm text-muted max-w-xs">
          I can answer questions about Jerico's skills, projects, and experience.
          <br />
          Try one of these to get started:
        </p>
      </div>

      {/* Question cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
        {SUGGESTED_QUESTIONS.map(({ icon, text }) => (
          <button
            key={text}
            onClick={() => onSelect(text)}
            className="text-left px-4 py-3.5 rounded-2xl glass-card hover:border-accent/40 hover:bg-accent/5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm transition-all duration-200 cursor-pointer"
          >
            <span className="mr-2">{icon}</span>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
