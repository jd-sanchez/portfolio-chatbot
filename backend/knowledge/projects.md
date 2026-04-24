# Jerico Dane Sanchez — Projects

## HealPH (Undergraduate Thesis)
**Type:** Solo Undergraduate Thesis Project
**Timeline:** 2024 – 2025
**Status:** Completed

### Overview
HealPH is an offline-first mobile health tracking app built for UP Los Baños students and staff. Jerico built this entirely solo as his undergraduate thesis project.

### Tech Stack
- Flutter, Dart (mobile frontend)
- SQLite with DAO pattern (local offline storage)
- MongoDB (cloud database)
- REST API (30+ endpoints)
- JWT authentication (dual-key system)
- YOLOv8 INT8 (on-device meal detection AI model)

### Key Features & Achievements
- Integrated a pre-trained YOLOv8 INT8 model for on-device meal detection with zero network dependency — fully offline AI inference.
- Built 30+ REST API endpoints with dual-key JWT authentication for secure data sync.
- Multi-stage MongoDB aggregation pipelines for daily, weekly, and monthly health leaderboards ranked by HALE (Health-Adjusted Life Expectancy).
- SQLite DAO pattern with 5-version schema migration for seamless upgrades.
- Fully offline-capable architecture — works without internet connection.

---

## Smart Cinematic Universe Explorer
**Timeline:** December 2024
**Type:** Data Visualization / Graph Application

### Overview
An interactive 3D graph visualization of movie character connections across 20+ films and 200+ nodes, exploring relationships in a cinematic universe.

### Tech Stack
- Python, NetworkX, Plotly (graph and visualization)
- FastAPI (backend)
- TMDb API (movie data source)

### Key Features
- Integrated TMDb API to dynamically fetch and classify cast data.
- 3D interactive graph with 200+ nodes representing characters across 20+ films.
- Network analysis using NetworkX to compute connections and clusters.

---

## Food Inventory & Transaction System
**Timeline:** June 2024
**Type:** Full-Stack Web Application

### Overview
A full-stack web application for managing food inventory and financial transactions with complete CRUD functionality.

### Tech Stack
- React.js (frontend)
- MongoDB (database)
- Python, FastAPI (backend)

### Key Features
- Full end-to-end CRUD operations for inventory management.
- Transaction tracking and reporting.
- MongoDB schema design with FastAPI integration.

---

## Portfolio Chatbot — Ask Jerico
**Timeline:** 2025
**Type:** AI / RAG Application

### Overview
A RAG-based (Retrieval-Augmented Generation) conversational portfolio assistant that allows recruiters and visitors to query Jerico's resume, projects, and experience through natural language conversation.

### Tech Stack
- LangChain (RAG orchestration)
- ChromaDB (local vector store)
- FastAPI (backend)
- React.js + TypeScript (frontend)
- OpenAI API (embeddings + chat completions)
- Docker + Docker Compose (containerization)

### Key Features
- Grounded answers from actual resume data — no hallucinations.
- Streaming responses via Server-Sent Events (SSE).
- Suggested starter questions for recruiters.
- Mobile-responsive professional UI.
