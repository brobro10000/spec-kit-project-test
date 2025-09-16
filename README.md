# spec-kit-project-test

This project is a modern React application built with Vite and TypeScript, featuring a Node.js Express server backend. It is **AI-tool friendly** and wired for an **agentic, spec-driven** workflow using a small `.spec/` “contract layer”, diagrams, and a repeatable **single-task PR loop**.

![Application Screenshot](https://github.com/user-attachments/assets/764f7ac2-6f78-4253-9a19-aa92acf84300)

---

## 🧠 How the AI-driven workflow works (high level)

1. **Specs first**  
   The repo contains a `.spec/` folder (spec, plan, OpenAPI, tasks, diagrams). This is the **source of truth** for what to build and how.
2. **One task at a time**  
   Work proceeds in **small, independent tasks** from `.spec/tasks.json` (IDs like `T01`, `T02`…), each delivered as **one PR**.
3. **Agent with curated context**  
   You give the agent only the curated context (guidelines, spec, plan, API, diagrams, task) and it **generates minimal commits** and opens a PR.
4. **CI gates**  
   GitHub Actions run **spec discipline checks** (task ID in PRs, `.spec/tasks.json` schema validation, OpenAPI lint if present, diagrams sanity).
5. **Merge → next task**  
   After merge, the agent automatically selects the **next sequential task** and repeats.

This keeps generation **deterministic, scoped, and traceable**.

---

## 🚀 Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Development Tools**: ESLint, TypeScript, Concurrently
- **Package Manager**: npm

> Optional (commonly paired with this workflow): TanStack Query, React Hook Form, Zod, Vitest/Jest.

---

## 📁 Project Structure

```
├── src/                      # React frontend source code
│   ├── components/          # Reusable React components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── assets/              # Static assets
├── server/                   # Node.js backend
│   ├── server.ts            # Main server file
│   └── tsconfig.json        # Server TypeScript config
├── .spec/                    # ⚙️ Spec "contract layer"
│   ├── spec.md              # What & why (stories, acceptance)
│   ├── plan.md              # How (stack, architecture, done definition)
│   ├── api.yaml             # OpenAPI 3.1 contract (optional)
│   ├── tasks.json           # Ordered, atomic tasks (T01, T02, …)
│   └── diagrams/
│       ├── architecture.puml
│       └── dev-playbook.puml
├── .ai/                      # 🤖 Agent prompt + context bundling
│   ├── prompts/
│   │   └── junie-sequential.md
│   ├── context.manifest.json
│   ├── bin/
│   │   └── pack-context.js
│   └── out/                 # GENERATED bundle for agent context
├── .github/
│   └── workflows/
│       └── spec-discipline.yml  # CI gates for PRs
├── public/                   # Static public assets
├── .eslintrc.json            # ESLint configuration
├── .nvmrc                    # Node.js version specification
├── guidelines.md             # Development guidelines for AI & humans
├── .aiignore                 # AI tools ignore file (like .gitignore)
└── dist/                     # Build output (auto-generated)
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v20.19.5 (see `.nvmrc`)
- npm

### Install & run
```bash
npm install
npm run dev
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

---

## 🤖 Using the Agentic Workflow

### 0) Prepare the context bundle
Bundle the key files for the agent (so it doesn’t ingest the entire repo):

```bash
npm run ai:pack
# Produces: .ai/out/context.bundle.txt
```

> The files included are defined in `.ai/context.manifest.json`. Keep this list focused (specs, guidelines, API, diagrams, .aiignore).

### 1) Use the sequential prompt
Open **Junie** (or your agent of choice) and use the prompt at:
```
.ai/prompts/junie-sequential.md
```
This prompt:
- Detects the **default branch** (e.g., `main`)
- Scans merge history for the **highest completed Task ID** (`Txx` in commit titles)
- Picks the **next task** from `.spec/tasks.json` (strictly greater than last done)
- Proceeds in a strict **single-task PR loop**

Attach **`.ai/out/context.bundle.txt`** as the context for the run.

### 2) What the agent will do
- Create a branch `feat/Txx-<kebab-title>`
- Make **small commits** only in allowed areas (`src/**`, `server/**`, tests)
- Add/update tests for changed behavior
- Keep backend behavior aligned with `.spec/api.yaml`
- Open a PR titled `Txx: <task title>` with a templated PR body:
    - Paste of the task JSON
    - What changed (1–3 bullets)
    - Acceptance criteria satisfied (cite `.spec/spec.md`)
    - API compliance note (vs `.spec/api.yaml`)
    - Tests added/updated

### 3) Merge gate (CI)
The workflow **`.github/workflows/spec-discipline.yml`** runs on PRs:
- **PR lint**: Requires a `Txx` Task ID in the PR title/body
- **Tasks validation**: Validates `.spec/tasks.json` structure (IDs like `T01`, no dupes, required fields)
- **OpenAPI lint** *(optional)*: If `.spec/api.yaml` exists, lints with Redocly
- **Diagrams sanity** *(optional)*: Ensures core PUML files exist and nudges you to embed an image in `spec.md`

> Make these checks **required** in GitHub: Settings → Branch protection rules → Required status checks.

### 4) Rinse & repeat
After the PR merges, run the prompt again. The agent will detect the new highest Task ID and select the **next** one. No manual bookkeeping needed.

---

## 📄 Commands

**Dev & build**
- `npm run dev` — start frontend & backend in dev
- `npm run dev:client` — start Vite dev server
- `npm run dev:server` — start Node API server
- `npm run build` — build client & server
- `npm start` — start production server
- `npm run lint` — run ESLint
- `npm run lint:fix` — ESLint with fixes
- `npm run type-check` — TypeScript type check

**AI context**
- `npm run ai:pack` — bundle context for the agent → `.ai/out/context.bundle.txt`

> There is **no** CLI to regenerate tasks from spec at the moment; `.spec/tasks.json` is **authored by you** (or produced by an agent during planning) and committed. CI validates its structure; it does **not** overwrite it.

---

## 🧭 Working Agreements (AI & humans)

- **One task per PR** (IDs like `T07`). Keep PRs small.
- **Follow the spec**: `.spec/spec.md`, `.spec/plan.md`, `.spec/api.yaml`.
- **Do not edit** `.spec/*` unless a task explicitly requires it.
- **Backend** must match `.spec/api.yaml` (status codes & error shape).
- **Tests** are required for changed behavior.
- Respect **`.aiignore`**—don’t slurp `node_modules/`, build output, caches, etc.
- Use the **PR template** (if present) so reviewers can verify acceptance criteria quickly.

---

## 🔌 API Endpoints (example baseline)

- `GET /api/health` — Health check
- `GET /api/info` — Application information
- (Business endpoints should be defined in `.spec/api.yaml`.)

---

## 🧪 What this demo shows

- ✅ React 19 + Vite + TypeScript
- ✅ Express.js backend with TypeScript
- ✅ Spec-driven contracts & tasks
- ✅ PUML diagrams to steer structure and flow
- ✅ Agentic PR loop with sequential task selection
- ✅ CI gates for discipline (tasks, OpenAPI, diagrams)
- ✅ HMR, ESLint, and type safety

---

## 🐛 Troubleshooting

- **Agent doesn’t see the right files** → Re-run `npm run ai:pack` and attach the newest `.ai/out/context.bundle.txt`.
- **CI says no Task ID** → Ensure PR title or body contains something like `T07`.
- **OpenAPI lint fails** → Fix `.spec/api.yaml` or remove the job if you’re not using it yet.
- **Diagrams warning** → Ensure `.spec/diagrams/architecture.puml` exists and embed `architecture.png` in `spec.md` if you export images.
- **Missing `.spec/tasks.json`** → Create an array of task objects with IDs (`T01`, `T02`…), titles, and (optionally) descriptions.

---

## 🤝 Contributing

Please follow `guidelines.md` and the single-task PR flow. Keep PRs scoped, tested, and traceable to a Task ID.

## 📄 License

This project is for testing and demonstration purposes.
