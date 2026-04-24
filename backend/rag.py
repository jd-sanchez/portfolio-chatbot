import os
from typing import AsyncIterator

from langchain_groq import ChatGroq
from langchain.schema import HumanMessage, AIMessage, SystemMessage
from langchain_chroma import Chroma

SYSTEM_PROMPT = """You are Ask Jerico, a professional portfolio assistant for Jerico Dane Sanchez, \
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
    # Retrieve relevant context
    docs = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 5},
    ).invoke(query)
    context = "\n\n---\n\n".join(doc.page_content for doc in docs)

    # Build messages
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

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.4,
        api_key=os.environ["GROQ_API_KEY"],
    )

    async for chunk in llm.astream(messages):
        if chunk.content:
            yield chunk.content
