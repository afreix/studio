# **App Name**: PersonalOps DataFlow

## Core Features:

- Event Ingestion: Ingest events from multiple services (GitHub, Runbot, Amazon) into Firestore.
- Dashboard: Display a unified dashboard with key metrics (open PR count, failed builds, task statuses).
- Task Management: Kanban board for task management (CRUD operations via GraphQL).
- Semantic Search Chat: AI-powered chat interface using agentExec for semantic search over ingested events. The agent uses a tool that determines when to perform a semantic search based on user query.
- GraphQL API: Unified access through a GraphQL API

## Style Guidelines:

- Primary color: A deep, muted blue (#3B7EA5) evoking trust and competence, for a professional feel.
- Background color: A very dark gray (#222222) to give the interface a modern, serious, and sophisticated backdrop that enables strong contrast.
- Accent color: An analogous color from the cool spectrum like purple (#7048E8), brighter than the primary to provide good contrast.
- Clean, modern font for titles and headings
- Readable sans-serif font for body text and labels.
- Use clear visual hierarchy for the dashboard, Kanban board, and tables.
- Employ consistent spacing and alignment for a polished look.