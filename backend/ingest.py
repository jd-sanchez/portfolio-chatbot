from pathlib import Path

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.embeddings import FastEmbedEmbeddings

KNOWLEDGE_DIR = Path(__file__).parent / "knowledge"
CHROMA_DIR = Path(__file__).parent / "chroma_db"
COLLECTION_NAME = "portfolio"


def load_and_split_documents():
    loader = DirectoryLoader(
        str(KNOWLEDGE_DIR),
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )
    return splitter.split_documents(docs)


def build_vector_store() -> Chroma:
    embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")
    chunks = load_and_split_documents()

    print(f"[ingest] Ingesting {len(chunks)} chunks into ChromaDB...")

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=str(CHROMA_DIR),
    )

    print(f"[ingest] Done. Vector store saved to {CHROMA_DIR}")
    return vector_store


def get_or_create_vector_store() -> Chroma:
    embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")

    # Check if chroma_db already has data
    chroma_parquet = CHROMA_DIR / "chroma.sqlite3"
    if chroma_parquet.exists():
        print("[ingest] Existing vector store found. Loading...")
        return Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=embeddings,
            persist_directory=str(CHROMA_DIR),
        )

    return build_vector_store()
