# Proxy — Portfolio Chatbot

A RAG-based conversational portfolio assistant for Jerico Dane Sanchez. Recruiters and visitors can ask natural language questions about his experience, projects, and skills — and get grounded, accurate answers.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS |
| Backend | FastAPI + Python 3.11 |
| AI / RAG | LangChain + ChromaDB + Groq (llama-3.3-70b) |
| Containers | Docker + Docker Compose |

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd portfolio-chatbot
```

### 2. Add your Groq API key

Copy `.env.example` to `.env` and set your Groq API key:

```bash
cp .env.example .env
```

```
GROQ_API_KEY=your-key-here
```

### 3. Start the app

```bash
docker compose up --build
```

The first run will:
1. Build both containers
2. Ingest the knowledge base into ChromaDB (one-time, takes ~10 seconds)
3. Start serving the app

### 4. Open the app

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio-chatbot/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── frontend/
│   ├── Dockerfile         ← multi-stage: vite build → nginx
│   ├── nginx.conf         ← serves the SPA, proxies /chat + /health to backend
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── types.ts
│       ├── hooks/         ← useTheme, useChatStream
│       ├── lib/           ← cn() util, GSAP setup
│       └── components/
│           ├── ui/        ← Button, Textarea, ScrollArea, Sheet, Badge, Separator
│           ├── layout/    ← Header, ResumeSidebar
│           ├── chat/      ← ChatWindow, MessageBubble, InputBar, SuggestedQuestions
│           ├── icons.tsx
│           ├── StampText.tsx
│           └── BlinkCursor.tsx
└── backend/
    ├── Dockerfile
    ├── requirements.txt
    ├── main.py        ← FastAPI app + /chat + /health
    ├── rag.py         ← LangChain RAG chain
    ├── ingest.py      ← Knowledge base ingestion (cosine-similarity Chroma index)
    └── knowledge/
        ├── resume.md
        ├── projects.md
        └── about.md
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check — confirms vector store is ready |
| `POST` | `/chat` | Stream a chat response via SSE |

### POST /chat

**Request body:**
```json
{
  "message": "What databases does Jerico know?",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

**Response:** `text/event-stream` (SSE)
```
data: {"token": "Jerico"}
data: {"token": " knows"}
...
data: [DONE]
```

## Development Notes

- The ChromaDB vector store is persisted to `backend/chroma_db/` and gitignored.
- On backend startup, if `chroma_db/chroma.sqlite3` exists, it loads the existing store — no re-ingestion needed.
- Delete `backend/chroma_db/` to force a full re-ingestion.
- The Vite dev server proxies `/chat` and `/health` to `http://backend:8000`.

## Knowledge Base

Edit files in `backend/knowledge/` to update what the chatbot knows. After editing, delete `backend/chroma_db/` and restart the backend to re-ingest.

## Production Deployment (Railway + Vercel)

Backend and frontend are deployed separately, on different domains, so `docker-compose.yml`'s same-origin assumption doesn't apply — two settings must be set explicitly:

- **Railway (backend):** set the `ALLOWED_ORIGINS` env var to your Vercel domain(s), e.g. `https://your-app.vercel.app`. Without this, the browser will block every request with a CORS error. `GROQ_API_KEY` is required as usual. Railway injects its own `PORT`; the Dockerfile already binds to it.
- **Vercel (frontend):** set the `VITE_API_URL` env var (Project Settings → Environment Variables) to the Railway backend's public URL, e.g. `https://your-backend.up.railway.app`. This is read at *build* time, so redeploy after changing it. Also set the project's **Root Directory** to `frontend/` since this is a monorepo.
- The vector store rebuilds automatically on the backend's first boot if `chroma_db/` isn't present (Railway's filesystem is ephemeral by default, so this happens on every deploy) — first request after a deploy will be slower while it re-embeds the knowledge base.
