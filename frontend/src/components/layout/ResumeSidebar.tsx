import * as DialogPrimitive from "@radix-ui/react-dialog";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CloseIcon, MailIcon, DownloadIcon } from "@/components/icons";

interface ResumeSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SKILLS: Record<string, string[]> = {
  LANGUAGES: ["Python", "JavaScript", "TypeScript", "Dart", "SQL", "C", "C++"],
  FRONTEND: ["React.js", "Next.js", "Tailwind", "Flutter", "TypeScript"],
  BACKEND: ["Node.js", "Express.js", "FastAPI"],
  "AI / ML": [
    "LangChain",
    "OpenAI API",
    "Groq API",
    "RAG Pipelines",
    "ChromaDB",
    "FastEmbed",
    "Recommendation Systems",
  ],
  "AI WORKFLOW": ["Claude Code", "n8n", "Label Studio"],
  DATABASES: ["MongoDB", "Supabase", "Firebase", "PostgreSQL", "SQLite", "MySQL"],
  "CLOUD & DEVOPS": ["AWS (S3, Lambda)", "Docker", "Git", "GitHub"],
};

const EXPERIENCE = [
  {
    current: false,
    role: "Full Stack Developer",
    org: "CINTERLabs",
    period: "Sep 2025 – May 2026 · Los Baños, Laguna",
    desc: "Building an offline-first Flutter wellness app for university constituents, with on-device YOLOv11 meal detection across 95+ food classes, a gamification system, and an admin event management system secured via Google OAuth and role-based JWT.",
  },
  {
    current: false,
    role: "Software Engineering Intern",
    org: "Moonchild Productions",
    period: "Jun – Jul 2025 · Motala, Sweden",
    desc: "Extended the Goanna rendering engine's CSS parser to support 5 comparison operators in production and eliminated a legacy vendor-prefixed dead codepath, working across a large C++ browser engine codebase.",
  },
  {
    current: false,
    role: "Full Stack Developer",
    org: "Stable Studio",
    period: "Nov 2024 – Mar 2025 · Hong Kong",
    desc: "Delivered full-stack internal web applications for paid client projects on a 3-person team, owning schema design and Next.js + Tailwind frontend implementation end to end.",
  },
];

const PROJECTS = [
  {
    name: "Rubric",
    tagline: "AI-Powered Essay Feedback Platform",
    period: "May 2026",
    desc: "Full-stack platform (Next.js, FastAPI, Supabase, AWS S3/Lambda, Groq) automating rubric-based essay feedback, with an async PDF pipeline via S3 triggers, Lambda, and Llama 3.3 70B.",
  },
  {
    name: "Sinehan",
    tagline: "AI Movie Recommendation Web App",
    period: "Mar 2026",
    desc: "Grew to 30+ users with weekly personalized email digests via n8n. A 4-step AI pipeline interprets mood, generates title candidates via Groq, and enriches them with TMDb metadata.",
  },
  {
    name: "Proxy",
    tagline: "RAG-Powered Portfolio Chatbot",
    period: "Feb 2026",
    desc: "RAG pipeline using LangChain, ChromaDB, and a fully local FastEmbed model for markdown-aware retrieval, grounding Llama 3.3 70B answers with no embedding API cost.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="font-display text-2xs text-ink tracking-wide">{children}</span>
      <Separator className="flex-1" />
    </div>
  );
}

function ResumeBody() {
  return (
    <div className="space-y-6">
      <section>
        <SectionLabel>FOCUS</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {["Full Stack", "AI / ML", "Automation"].map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>EDUCATION</SectionLabel>
        <div className="surface p-3.5">
          <p className="text-xs font-bold text-ink">B.S. Computer Science</p>
          <p className="text-xs text-ink mt-0.5">University of the Philippines Los Baños</p>
          <p className="text-[11px] text-ink-muted mt-2 leading-relaxed">
            Relevant coursework: Software Engineering, Artificial Intelligence, Database
            Systems, Operating Systems
          </p>
        </div>
      </section>

      <section>
        <SectionLabel>EXPERIENCE</SectionLabel>
        <div className="space-y-3">
          {EXPERIENCE.map((job) => (
            <div key={`${job.org}-${job.role}`} className="surface p-3.5">
              {job.current && (
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="active">Current</Badge>
                </div>
              )}
              <p className="text-xs font-bold text-ink leading-tight">{job.role}</p>
              <p className="text-xs text-ink mt-0.5">{job.org}</p>
              <p className="font-mono text-2xs text-ink-muted mt-1 tracking-wide uppercase">
                {job.period}
              </p>
              <p className="text-[11px] text-ink-muted mt-2 leading-relaxed">{job.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>PROJECTS</SectionLabel>
        <div className="space-y-3">
          {PROJECTS.map((p) => (
            <div key={p.name} className="surface p-3.5">
              <p className="text-xs font-bold text-ink leading-tight">{p.name}</p>
              <p className="text-xs text-ink mt-0.5">{p.tagline}</p>
              <p className="font-mono text-2xs text-ink-muted mt-1 tracking-wide uppercase">
                {p.period}
              </p>
              <p className="text-[11px] text-ink-muted mt-2 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel>SKILLS</SectionLabel>
        <div className="space-y-3.5">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category} className="surface p-3.5">
              <p className="font-display text-2xs text-ink tracking-wide mb-2">{category}</p>
              <div className="flex flex-wrap gap-1">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 font-mono text-[10px] text-ink border-2 border-ink bg-paper-alt hover:bg-accent hover:text-accent-ink transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResumeHeader({ TitleTag }: { TitleTag: "h2" | typeof DialogPrimitive.Title }) {
  return (
    <div className="flex items-center gap-3">
      <div>
        <TitleTag className="text-sm font-bold text-ink leading-tight">
          Jerico Dane Sanchez
        </TitleTag>
        <p className="text-xs font-bold text-ink mt-0.5">Full Stack Developer</p>
        <p className="text-xs text-ink-muted mt-0.5">Pateros, Metro Manila</p>
      </div>
    </div>
  );
}

function ResumeContact() {
  return (
    <div className="mt-4 space-y-1.5">
      <a
        href="mailto:sanchezjericodane@gmail.com"
        className="flex items-center gap-2 text-xs text-ink-muted hover:text-accent transition-colors"
      >
        <MailIcon className="w-3 h-3 shrink-0" />
        sanchezjericodane@gmail.com
      </a>
    </div>
  );
}

function ResumeFooter() {
  return (
    <div className="shrink-0 px-5 py-4 border-t-3 border-ink flex gap-2">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="brutal-press flex-1 flex items-center justify-center gap-2 py-2.5 border-3 border-ink bg-accent text-accent-ink brutal-shadow-sm cursor-pointer"
      >
        <span className="font-mono text-2xs tracking-wide uppercase">View Resume</span>
      </a>
      <a
        href="/resume.pdf"
        download
        aria-label="Download resume"
        className="brutal-press flex items-center justify-center px-3.5 border-3 border-ink bg-paper text-ink brutal-shadow-sm cursor-pointer"
      >
        <DownloadIcon className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function ResumeSidebar({ open, onOpenChange }: ResumeSidebarProps) {
  return (
    <>
      {/* Desktop — permanently docked */}
      <aside className="hidden lg:flex relative w-[320px] xl:w-[340px] flex-col bg-paper border-r-3 border-ink">
        <div className="shrink-0 px-5 pt-5 pb-4 border-b-3 border-ink">
          <span className="font-display text-2xs text-ink tracking-wide block mb-5">
            PROFILE
          </span>
          <ResumeHeader TitleTag="h2" />
          <ResumeContact />
        </div>
        <ScrollArea className="flex-1">
          <div className="px-5 py-5">
            <ResumeBody />
          </div>
        </ScrollArea>
        <ResumeFooter />
      </aside>

      {/* Mobile — slide-in sheet */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="lg:hidden">
          <DialogPrimitive.Description className="sr-only">
            Resume, skills, and work history for Jerico Dane Sanchez.
          </DialogPrimitive.Description>
          <div className="shrink-0 px-5 pt-5 pb-4 border-b-3 border-ink">
            <div className="flex items-center justify-between mb-5">
              <span className="font-display text-2xs text-ink tracking-wide">
                PROFILE
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                aria-label="Close panel"
              >
                <CloseIcon className="w-4 h-4" />
              </Button>
            </div>
            <ResumeHeader TitleTag={DialogPrimitive.Title} />
            <ResumeContact />
          </div>
          <ScrollArea className="flex-1">
            <div className="px-5 py-5">
              <ResumeBody />
            </div>
          </ScrollArea>
          <ResumeFooter />
        </SheetContent>
      </Sheet>
    </>
  );
}
