# MovieWatchlist – Spec

## Goal
A tiny full-stack app to add/search movies, mark watched, and rate 1–5.

## Users & Stories
- As a user, I can:
    1) Create a movie with title (required) and year (optional).
    2) Search movies by a free-text query.
    3) Mark a movie watched/unwatched.
    4) Rate a watched movie 1–5 (optional).
    5) Delete a movie.

## System Overview
![Project Layout](./diagrams/project-layout.png)

**Source:** `.spec/diagrams/project-layout.puml`

## Reading Order (for agents & contributors)
1. Read this `spec.md` (goals, stories, acceptance).
2. Read `plan.md` (stack, API, validation, done-definition).
3. Read `api.yaml` (contracts).
4. Read diagrams in `.spec/diagrams/`:
    - `project-layout.puml` / .png — module boundaries & data flow
    - `dev-playbook.puml` — task workflow & CI guardrails
    - `crud-sequence.puml` — endpoint interaction template


## Non-Goals
- Auth, multi-user, pagination, external movie APIs.

## Acceptance Criteria
- Creating with empty/whitespace title is rejected with 400 and JSON error.
- `GET /api/movies?search=foo` returns case-insensitive partial matches on title.
- `PATCH /api/movies/:id` validates:
    - `rating` ∈ {1..5} or null; if `watched=false`, `rating` becomes null.
- All endpoints return JSON and proper status codes: 200/201/204/400/404.
- Frontend form uses Zod; invalid inputs show inline errors.
- Basic e2e: add → list → mark watched → rate → delete passes.

## Data Model
movies(
id INTEGER PK AUTOINCREMENT,
title TEXT NOT NULL,
year INTEGER NULL CHECK (year BETWEEN 1888 AND 2100),
watched INTEGER NOT NULL DEFAULT 0,
rating INTEGER NULL CHECK (rating BETWEEN 1 AND 5),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
