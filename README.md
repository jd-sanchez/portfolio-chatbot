# Ask Jerico — Portfolio Chatbot

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

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
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
├── .gitignore
├── README.md
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       └── components/
│           ├── ChatWindow.tsx
│           ├── MessageBubble.tsx
│           ├── InputBar.tsx
│           └── SuggestedQuestions.tsx
└── backend/
    ├── Dockerfile
    ├── requirements.txt
    ├── main.py        ← FastAPI app + /chat + /health
    ├── rag.py         ← LangChain RAG chain
    ├── ingest.py      ← Knowledge base ingestion
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
