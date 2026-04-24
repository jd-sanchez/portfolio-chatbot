interface ResumePanelProps {
  open: boolean;
  onClose: () => void;
}

const SKILLS = {
  Languages: "Python · JavaScript · TypeScript · Dart · C++ · SQL",
  Frontend: "React.js · Flutter · HTML · CSS",
  Backend: "FastAPI · REST API · JWT · bcrypt",
  Databases: "MongoDB · MySQL · PostgreSQL · SQLite",
  "AI & ML": "YOLOv8 · LangChain · ChromaDB · OpenAI API",
  Tools: "Git · Docker · n8n · Pandas · NumPy",
};

export default function ResumePanel({ open, onClose }: ResumePanelProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-[300px] xl:w-[320px] flex flex-col
          glass border-r border-surface-4/30
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Panel header */}
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-surface-4/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent/80">
              Resume
            </span>
            <button
              onClick={onClose}
              className="lg:hidden text-muted hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close resume panel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-violet-500 flex items-center justify-center text-white font-bold text-lg select-none glow-accent">
                J
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-surface-1" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                Jerico Dane Sanchez
              </h2>
              <p className="text-xs text-accent leading-tight mt-0.5">Full Stack · AI Engineer</p>
              <p className="text-xs text-muted leading-tight">📍 Metro Manila, PH</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          {/* Contact */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Contact</h3>
            <div className="space-y-1.5">
              <a
                href="mailto:jtsanchez9@up.edu.ph"
                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 hover:text-accent transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-accent/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                jtsanchez9@up.edu.ph
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <svg className="w-3.5 h-3.5 text-accent/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                09567622733
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Education</h3>
            <div className="glass-card rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-900 dark:text-white">B.S. Computer Science</p>
              <p className="text-xs text-accent mt-0.5">UP Los Baños</p>
              <p className="text-xs text-muted mt-0.5">Expected June 2026</p>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Experience</h3>
            <div className="space-y-2.5">
              <div className="glass-card rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                  Software Engineering Intern
                </p>
                <p className="text-xs text-accent mt-0.5">Moonchild Productions</p>
                <p className="text-[10px] text-muted mt-0.5">Jun – Jul 2025 · Sweden (Remote)</p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  C++ browser engine — CSS parsing, serialization, and overflow handling.
                </p>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                  Junior Developer
                </p>
                <p className="text-xs text-accent mt-0.5">Stable Studio</p>
                <p className="text-[10px] text-muted mt-0.5">Nov 2024 – Present · HK (Remote)</p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  React.js frontend for a freelancer marketplace platform.
                </p>
              </div>

              <div className="glass-card rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                  Database Team Leader
                </p>
                <p className="text-xs text-accent mt-0.5">CMSC 128 — UPLB</p>
                <p className="text-[10px] text-muted mt-0.5">Feb 2025 – Present</p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                  Led MongoDB Atlas cluster design with FastAPI backend.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Skills</h3>
            <div className="space-y-2">
              {Object.entries(SKILLS).map(([category, items]) => (
                <div key={category}>
                  <p className="text-[10px] font-medium text-accent/80 mb-1">{category}</p>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{items}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Target role */}
          <section>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">Target Role</h3>
            <div className="flex flex-wrap gap-1.5">
              {["Full Stack Engineer", "AI Integration", "Workflow Automation"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-accent/10 text-accent border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* PDF download */}
        <div className="shrink-0 px-5 py-4 border-t border-surface-4/30">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-accent/10 hover:bg-accent/20 border border-accent/25 hover:border-accent/50 text-accent text-xs font-semibold transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Resume
          </a>
        </div>
      </aside>
    </>
  );
}
