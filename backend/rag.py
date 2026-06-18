"""Retrieval-augmented generation for portfolio chat responses.

The function in this module retrieves relevant knowledge-base chunks, injects
them into the final user message, and streams tokens from Groq's chat model.
"""

import os
from typing import AsyncIterator

from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, AIMessage, SystemMessage
from langchain_chroma import Chroma

# The assistant is intentionally constrained to retrieved portfolio context so
# it does not invent credentials, projects, or contact details.
SYSTEM_PROMPT = """You are Proxy, a portfolio assistant for Jerico Dane Sanchez, \
a Full Stack Engineer and aspiring AI Engineer based in the Philippines. \
Your job is to help recruiters and visitors learn about Jerico's skills, \
experience, projects, and background.

Answer questions using ONLY the context provided to you from his knowledge base. \
Be conversational, confident, and concise. If asked something not covered in \
the context, say: 'That detail isn't in my knowledge base — you can reach \
Jerico directly at jtsanchez9@up.edu.ph.'

Never fabricate experience, skills, or projects. Always refer to Jerico in \
third person."""


async def stream_rag_response(
    query: str,
    history: list[dict],
    vector_store: Chroma,
) -> AsyncIterator[str]:
    """Yield a streamed answer grounded in the most relevant Chroma chunks."""
    # Retrieve the five closest chunks for the current question. Chroma embeds
    # the query with the same model used during ingestion.
    docs = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 5},
    ).invoke(query)
    context = "\n\n---\n\n".join(doc.page_content for doc in docs)

    # Replay prior turns before the augmented latest question so the model has
    # conversational context without replacing document grounding.
    messages = [SystemMessage(content=SYSTEM_PROMPT)]
    for turn in history:
        role = turn.get("role", "")
        content = turn.get("content", "")
        if role == "user":
            messages.append(HumanMessage(content=content))
        elif role == "assistant":
            messages.append(AIMessage(content=content))

    augmented_query = (
        f"Context from Jerico's knowledge base:\n\n{context}\n\n"
        f"Question: {query}"
    )
    messages.append(HumanMessage(content=augmented_query))

    # The model streams partial tokens, which the API forwards directly to the
    # frontend through server-sent events.
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.4,
        api_key=os.environ["GROQ_API_KEY"],
    )

    async for chunk in llm.astream(messages):
        if chunk.content:
            yield chunk.content
