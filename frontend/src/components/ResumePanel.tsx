import PixelSprite from "./PixelSprite";

interface ResumePanelProps {
  open: boolean;
  onClose: () => void;
}

const SKILLS: Record<string, string[]> = {
  LANGUAGES:  ["Python", "JavaScript", "TypeScript", "Dart", "SQL", "C", "C++"],
  FRAMEWORKS: ["React.js", "Next.js", "FastAPI", "Express.js", "Flutter", "Tailwind"],
  DATABASES:  ["MongoDB", "PostgreSQL", "SQLite", "MySQL"],
  TOOLS:      ["Git", "Docker", "n8n", "Label Studio", "VS Code"],
};

const QUESTS = [
  {
    status: "ACTIVE",
    role: "Full Stack Developer",
    org: "University of the Philippines LB",
    period: "Sep 2025 – Present",
    desc: "Building a Flutter wellness app for 11,000+ UPLB constituents with on-device YOLOv11 meal detection, a gamification system, and a role-based admin panel for campus event management.",
  },
  {
    status: "DONE",
    role: "Software Engineering Intern",
    org: "Moonchild Productions",
    period: "Jun – Jul 2025 · Sweden (Remote)",
    desc: "Extended the Goanna rendering engine's CSS parser to support comparison operators in production. Worked across a 100k+ line C++ codebase with an async international engineering team.",
  },
  {
    status: "DONE",
    role: "Full Stack Developer",
    org: "Stable Studio",
    period: "Nov 2024 – Mar 2025 · HK (Remote)",
    desc: "Delivered 2 full-stack internal web apps across a 3-person team, owning schema design, 10+ Express.js API endpoints, and Next.js frontend implementation end to end.",
  },
  {
    status: "DONE",
    role: "Team Lead, Software Engineering",
    org: "CMSC 128 · UPLB",
    period: "Feb – Apr 2025",
    desc: "Led a 4-person team building an alumni tracking system for the UPLB CS department, running 10+ weekly sprints and managing 5 schema iterations in MongoDB Atlas.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-arcade text-[7px] text-accent/60 tracking-widest">{children}</span>
      <div className="flex-1 h-px bg-accent/15" />
    </div>
  );
}

export default function ResumePanel({ open, onClose }: ResumePanelProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-auto
          w-[320px] xl:w-[340px] flex flex-col
          glass border-r border-accent/15
          shadow-[1px_0_0_rgba(99,102,241,0.1),4px_0_30px_rgba(99,102,241,0.05)]
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Panel header */}
        <div className="shrink-0 px-5 pt-5 pb-4 border-b border-accent/10">
          <div className="flex items-center justify-between mb-5">
            <span className="font-arcade text-[7px] text-accent/60 tracking-widest">
              PLAYER PROFILE
            </span>
            <button
              onClick={onClose}
              className="lg:hidden text-muted hover:text-accent transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Identity */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <PixelSprite pixelSize={4} className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-neon-green border-2 border-white dark:border-surface-1" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                Jerico Dane Sanchez
              </h2>
              <p className="text-xs text-accent mt-0.5">Full Stack · AI Engineer</p>
              <p className="text-xs text-muted mt-0.5">Metro Manila, Philippines</p>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-4 space-y-1.5">
            <a
              href="mailto:jtsanchez9@up.edu.ph"
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
            >
              <svg className="w-3 h-3 text-accent/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              jtsanchez9@up.edu.ph
            </a>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-3 h-3 text-accent/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0956 762 2733
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Class */}
          <section>
            <SectionLabel>CLASS</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {["Full Stack", "AI Engineer", "Automation"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md font-arcade text-[7px] tracking-wide bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionLabel>EDUCATION</SectionLabel>
            <div className="glass-card rounded-xl p-3.5 border-l-[3px] border-accent/50">
              <p className="text-xs font-semibold text-gray-900 dark:text-white">B.S. Computer Science</p>
              <p className="text-xs text-accent mt-0.5">University of the Philippines Los Baños</p>
              <p className="font-arcade text-[7px] text-muted mt-1.5 tracking-wider">EXPECTED JULY 2026</p>
            </div>
          </section>

          {/* Skills / Stats */}
          <section>
            <SectionLabel>STATS — LOADOUT</SectionLabel>
            <div className="space-y-3.5">
              {Object.entries(SKILLS).map(([category, items]) => (
                <div key={category} className="glass-card rounded-xl p-3.5 border-l-[3px] border-surface-3/60">
                  <p className="font-arcade text-[7px] text-accent/60 tracking-widest mb-2">{category}</p>
                  <div className="flex flex-wrap gap-1">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded font-mono text-[10px] text-gray-600 dark:text-gray-300 bg-surface-1/60 dark:bg-surface-2/60 border border-surface-3/40 hover:border-accent/40 hover:text-accent transition-colors cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quest Log */}
          <section>
            <SectionLabel>QUEST LOG</SectionLabel>
            <div className="space-y-3">
              {QUESTS.map((q) => (
                <div key={q.role} className="glass-card rounded-xl p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-arcade text-[6px] px-2 py-0.5 rounded tracking-widest ${
                      q.status === "ACTIVE" ? "badge-active" : "badge-done"
                    }`}>
                      {q.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{q.role}</p>
                  <p className="text-xs text-accent mt-0.5">{q.org}</p>
                  <p className="font-arcade text-[6px] text-muted mt-1 tracking-wider">{q.period}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{q.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Download */}
        <div className="shrink-0 px-5 py-4 border-t border-accent/10">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-accent/30 hover:border-accent/60 bg-accent/8 hover:bg-accent/15 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-arcade text-[7px] text-accent tracking-wider">DOWNLOAD RESUME</span>
          </a>
        </div>
      </aside>
    </>
  );
}
