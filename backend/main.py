"""FastAPI entry point for the portfolio chatbot backend.

The API owns application startup, CORS, health checks, and the streaming chat
endpoint. RAG-specific behavior stays in ingest.py and rag.py.
"""

import asyncio
import json
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

load_dotenv()

from ingest import get_or_create_vector_store
from rag import stream_rag_response

vector_store = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize the vector store once before serving requests."""
    global vector_store
    print("[startup] Initializing vector store...")
    # Loading or building Chroma can touch disk and run embedding work, so keep
    # it out of FastAPI's event loop.
    loop = asyncio.get_event_loop()
    vector_store = await loop.run_in_executor(None, get_or_create_vector_store)
    print("[startup] Ready.")
    yield


app = FastAPI(title="Ask Jerico API", lifespan=lifespan)

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://frontend:3000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    """Request body for a chat turn.

    history is sent back from the frontend so the model can keep conversational
    context while the latest message is still grounded by retrieved documents.
    """

    message: str
    history: list[dict] = []


@app.get("/health")
async def health():
    """Report whether startup finished and the vector store is available."""
    return {"status": "ok", "vector_store_ready": vector_store is not None}


@app.post("/chat")
async def chat(request: ChatRequest):
    """Stream a grounded assistant response as server-sent events."""
    async def event_generator():
        try:
            async for token in stream_rag_response(
                query=request.message,
                history=request.history,
                vector_store=vector_store,
            ):
                # SSE frames must be separated by a blank line.
                payload = json.dumps({"token": token})
                yield f"data: {payload}\n\n"
        except Exception as e:
            error_payload = json.dumps({"error": str(e)})
            yield f"data: {error_payload}\n\n"
        finally:
            yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
