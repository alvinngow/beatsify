# Beatsify

Beatsify is a collaborative beat production workspace: a React/Vite frontend, a Java Spring Boot backend, and Postgres for persistent projects, tracks, clips, and collaboration state.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Java, Spring Boot, Spring WebSocket, Spring Data JPA
- Database: Postgres
- Local orchestration: Docker Compose

## Project Layout

```text
.
├── backend/          Spring Boot API and realtime collaboration server
├── frontend/         React/Vite beat editor client
├── docker-compose.yml
└── docs/
```

## Getting Started

Start Postgres:

```bash
docker compose up -d postgres
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Run the backend:

```bash
cd backend
mvn spring-boot:run
```

The backend targets Java 17+. If your local `java -version` reports Java 8, install a Java 17 or 21 JDK before running Spring Boot.

## Product Direction

The initial scaffold is organized around:

- Realtime project rooms with WebSocket messaging
- Sequencer state stored as versioned JSON snapshots
- Durable project metadata in Postgres
- React editor shell with transport, timeline, mixer, browser, and collaboration panels

