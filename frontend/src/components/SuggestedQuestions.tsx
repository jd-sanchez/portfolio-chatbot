const SUGGESTED_QUESTIONS = [
  { num: "01", icon: "🎓", label: "THESIS", text: "Tell me about his undergraduate thesis" },
  { num: "02", icon: "🌍", label: "INTERNSHIP", text: "What did he work on at Moonchild Productions?" },
  { num: "03", icon: "🎬", label: "SINEHAN", text: "What is Sinehan and how does it work?" },
  { num: "04", icon: "🏛️", label: "CURRENT ROLE", text: "What is he building right now at UPLB?" },
  { num: "05", icon: "🛠️", label: "TECH STACK", text: "What is his full tech stack?" },
  { num: "06", icon: "💼", label: "EXPERIENCE", text: "Walk me through his work experience" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center gap-10 py-10 px-4 animate-fade-up">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="relative inline-block mb-2">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center select-none glow-neon animate-float animate-pulse-neon">
            <span className="font-arcade text-white text-xl">J</span>
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-neon-green border-2 border-white dark:border-surface-1 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="font-arcade text-accent text-neon text-lg sm:text-xl tracking-widest animate-glitch">
            PROXY
          </h2>
          <p className="font-arcade text-[8px] text-muted tracking-widest">
            JERICO'S PORTFOLIO ASSISTANT
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 max-w-xs mx-auto leading-relaxed">
            Ask me anything about his skills, experience, or projects.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center pt-1">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-arcade text-[7px] text-neon-green tracking-widest">ONLINE</span>
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        </div>
      </div>

      {/* Select prompt */}
      <div className="w-full max-w-lg">
        <p className="font-arcade text-[7px] text-accent/50 tracking-widest text-center mb-5 animate-blink">
          ▼ &nbsp; SELECT YOUR QUERY &nbsp; ▼
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUGGESTED_QUESTIONS.map(({ num, icon, label, text }) => (
            <button
              key={text}
              onClick={() => onSelect(text)}
              className="group text-left px-4 py-4 rounded-xl glass-card hover:border-neon hover:bg-accent/5 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 cursor-pointer relative overflow-hidden"
            >
              <span className="font-arcade text-[7px] text-accent/30 group-hover:text-accent/60 transition-colors absolute top-2.5 right-3">
                {num}
              </span>

              <span className="text-2xl block mb-3">{icon}</span>
              <p className="font-arcade text-[7px] text-accent/60 group-hover:text-accent mb-2 tracking-widest transition-colors">
                {label}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white leading-snug transition-colors">
                {text}
              </p>

              <span className="absolute bottom-3 right-3 font-arcade text-[8px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                ▶
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
