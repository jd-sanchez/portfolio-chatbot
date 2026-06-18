"""Knowledge-base ingestion for the portfolio RAG pipeline.

This module turns markdown files in backend/knowledge into searchable ChromaDB
records. The stored vectors are reused across app restarts so the backend does
not need to rebuild embeddings unless the local Chroma database is removed.
"""

from pathlib import Path

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"
CHROMA_DIR = Path(__file__).parent / "chroma_db"
COLLECTION_NAME = "portfolio"


def load_and_split_documents():
    """Load markdown knowledge files and split them into retrieval-sized chunks."""
    loader = DirectoryLoader(
        str(KNOWLEDGE_DIR),
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    docs = loader.load()

    # Prefer markdown section and paragraph boundaries before falling back to
    # line and word boundaries. The overlap helps preserve context that lands
    # near the edge of a chunk.
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )
    return splitter.split_documents(docs)


def build_vector_store() -> Chroma:
    """Create a fresh Chroma collection from the current knowledge base."""
    embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    chunks = load_and_split_documents()

    print(f"[ingest] Ingesting {len(chunks)} chunks into ChromaDB...")

    # Chroma stores the chunk text, source metadata, and embedding vectors on
    # disk so later startups can load the collection directly.
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=str(CHROMA_DIR),
    )

    print(f"[ingest] Done. Vector store saved to {CHROMA_DIR}")
    return vector_store


def get_or_create_vector_store() -> Chroma:
    """Load the persisted vector store, or build it if this is the first run."""
    embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")

    chroma_db_file = CHROMA_DIR / "chroma.sqlite3"
    if chroma_db_file.exists():
        print("[ingest] Existing vector store found. Loading...")
        return Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory=str(CHROMA_DIR),
        )

    return build_vector_store()
