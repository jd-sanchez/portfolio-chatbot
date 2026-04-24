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
    global vector_store
    print("[startup] Initializing vector store...")
    # Run blocking IO in thread pool to avoid blocking the event loop
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
    message: str
    history: list[dict] = []


@app.get("/health")
async def health():
    return {"status": "ok", "vector_store_ready": vector_store is not None}


@app.post("/chat")
async def chat(request: ChatRequest):
    async def event_generator():
        try:
            async for token in stream_rag_response(
                query=request.message,
                history=request.history,
                vector_store=vector_store,
            ):
                # SSE format: data: <payload>\n\n
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
