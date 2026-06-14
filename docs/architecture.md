# Beatsify Architecture

## Realtime Model

The first collaboration layer uses project-scoped WebSocket rooms:

- Clients connect to `/ws` and publish project edits to `/app/projects/{projectId}/events`.
- The server broadcasts normalized events to `/topic/projects/{projectId}`.
- Project state is periodically saved as a snapshot in Postgres.

This gives us a practical Google Docs-like foundation while leaving room to add CRDT-backed conflict resolution once the editor model hardens.

## Core Domain

- Project: title, owner, BPM, musical key, current arrangement snapshot
- Track: instrument/audio lane metadata
- Clip: timeline region containing notes, sample references, or automation
- Collaboration event: realtime operation sent by a participant

## Near-Term Build Order

1. Editor transport and step sequencer
2. Project persistence API
3. WebSocket room presence and broadcast edits
4. Snapshot save/load
5. Conflict-free collaborative editing model

