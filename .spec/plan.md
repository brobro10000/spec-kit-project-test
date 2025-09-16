# Implementation Plan

## Stack
- Frontend: React 18 + Vite + TS, TanStack Query, React Hook Form, Zod.
- Backend: Node 20 + Express + TS.
- DB: SQLite via better-sqlite3 (synchronous, simple).
- Testing: Vitest (FE), Jest (BE).
- Tooling: ESLint + Prettier.

## Architecture
- Follow the PUML layout (frontend/backend split).
- Shared types (DTOs) in `backend/src/types.ts`; FE re-declares with Zod.

## Working Agreement
- Follow `.spec/diagrams/project-layout.puml` for file and module placement.
- Follow `.spec/diagrams/dev-playbook.puml` for Task lifecycle (branching, tests, PR).
- For CRUD endpoints, follow `.spec/diagrams/crud-sequence.puml` for request→validate→persist→cache update.

## API (v1)
- GET    /api/movies?search=
- POST   /api/movies
- PATCH  /api/movies/:id
- DELETE /api/movies/:id

## Validation
- DTOs:
    - Create: `{ title: string >= 1 trimmed, year?: int? }`
    - Update: `{ watched?: boolean, rating?: int(1..5)? }`
- Error shape: `{ error: string, details?: any }`

## Dev Commands
- BE: `npm run dev` (ts-node + nodemon)
- FE: `npm run dev` (Vite) on :5173, proxy to BE :3000

## Done Definition
- All acceptance criteria met.
- Tests: BE unit (repo/service/controller) and FE component happy paths.
- `README.md` includes run and test instructions.
