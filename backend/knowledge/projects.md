# Jerico Dane Sanchez — Projects

## Sinehan — AI Movie Recommendation Web App
**Timeline:** March 2026
**Type:** Full-Stack AI Application

### Overview
A full-stack AI movie recommender that generates mood-based picks with Filipino-voiced pitches. Deployed across Vercel (frontend), Render (backend), and MongoDB Atlas.

### Tech Stack
- Groq API + TMDb API (4-step recommendation pipeline)
- n8n (automated weekly email digest)
- MongoDB Atlas (user watchlists and data)
- Google OAuth + JWT authentication

### Key Features
- 4-step Groq + TMDb pipeline generating mood-based movie picks with Filipino-voiced pitches.
- Grew to 30+ users with a weekly automated email digest via n8n, delivering personalized recommendations from user watchlists.
- Secured via Google OAuth and JWT authentication.

---

## Folio — RAG-Powered Portfolio Chatbot
**Timeline:** February 2026
**Type:** AI / RAG Application

### Overview
A RAG-based conversational portfolio assistant that lets recruiters and visitors query Jerico's resume, projects, and experience through natural language conversation.

### Tech Stack
- LangChain (RAG orchestration)
- ChromaDB (local vector store)
- FastEmbed — BAAI/bge-small-en-v1.5 (local embeddings, no API dependency)
- Groq API — Llama 3.3 70B (LLM)
- FastAPI (backend with SSE streaming)
- React 18 + TypeScript + Tailwind CSS (frontend)
- Docker + Docker Compose

### Key Features
- Markdown-aware chunking with section-boundary splitting and top-5 cosine similarity retrieval.
- Fully local FastEmbed embedding model — no embedding API costs.
- SSE streaming for real-time token delivery to the frontend.
- Grounded answers from actual resume data — no hallucinations.

---

## OH WaW Wellness App — UPLB
**Timeline:** September 2025 – Present
**Type:** Full-Stack Mobile Application (Work)

### Overview
A Flutter wellness tracking app for the University of the Philippines Los Baños OH WaW Program, targeting 11,000+ UPLB constituents.

### Tech Stack
- Flutter + Dart (mobile frontend)
- Express.js / Node.js (24 API endpoints)
- MongoDB (database)
- YOLOv11 INT8 (on-device meal detection — 95+ Filipino food classes)
- Google OAuth + JWT authentication (role-based: constituent and admin flows)

### Key Features
- Offline-capable meal tracking with on-device YOLOv11 AI detection across 95+ Filipino food classes.
- Gamification system to drive sustained healthy behavior without internet dependency.
- Admin event management system with full CRUD and attendance tracking.

---

## HealPH — Undergraduate Thesis
**Timeline:** 2024 – 2025
**Type:** Solo Undergraduate Thesis Project
**Status:** Completed

### Overview
An offline-first mobile health tracking app built for UP Los Baños students and staff. Built entirely solo as Jerico's undergraduate thesis.

### Tech Stack
- Flutter, Dart (mobile frontend)
- SQLite with DAO pattern (local offline storage)
- MongoDB (cloud database)
- REST API (30+ endpoints)
- JWT authentication (dual-key system)
- YOLOv8 INT8 (on-device meal detection)

### Key Features
- On-device YOLOv8 INT8 meal detection with zero network dependency.
- 30+ REST API endpoints with dual-key JWT authentication.
- Multi-stage MongoDB aggregation pipelines for health leaderboards ranked by HALE (Health-Adjusted Life Expectancy).
- SQLite DAO pattern with 5-version schema migration.
- Fully offline-capable architecture.

---

## Smart Cinematic Universe Explorer
**Timeline:** December 2024
**Type:** Data Visualization / Graph Application

### Overview
An interactive 3D graph visualization of movie character connections across 20+ films and 200+ nodes.

### Tech Stack
- Python, NetworkX, Plotly
- FastAPI (backend)
- TMDb API (movie data)

### Key Features
- 3D interactive graph with 200+ nodes representing characters across 20+ films.
- Network analysis using NetworkX to compute connections and clusters.
- TMDb API integration for dynamic cast data.

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
