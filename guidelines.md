# Development Guidelines

## Project Overview
This is a React application built with Vite and TypeScript, featuring a Node.js Express server backend. The project is designed to be AI-tool friendly, follows modern development practices, and is guided by **Spec-Kit specifications** to ensure clarity and traceability.

## Project Structure
```
├── src/ # React frontend source code
│ ├── components/ # Reusable React components
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Utility functions
│ ├── types/ # TypeScript type definitions
│ └── assets/ # Static assets
├── server/ # Node.js backend
│ ├── server.ts # Main server file
│ ├── routes/ # API route definitions
│ ├── middleware/ # Express middleware
│ ├── utils/ # Server utilities
│ └── types/ # Server-side type definitions
├── .spec/ # Spec-Kit specifications
│ ├── spec.md # What & why (user stories, acceptance criteria)
│ ├── plan.md # How (tech stack, architecture, done definition)
│ ├── api.yaml # OpenAPI 3.1 contract for backend endpoints
│ ├── tasks.json # Work breakdown into atomic tasks
│ └── diagrams/ # PlantUML diagrams (architecture, workflows, sequences)
├── public/ # Static public assets
└── dist/ # Build output (auto-generated)
```


## Technology Stack
- **Frontend**: React 19, TypeScript, Vite, TanStack Query, React Hook Form, Zod
- **Backend**: Node.js, Express, TypeScript, SQLite (better-sqlite3)
- **Development Tools**: ESLint, TypeScript compiler, Vitest, Jest
- **Spec Tools**: [Spec-Kit](https://github.com/github/spec-kit), PlantUML
- **Package Manager**: npm

## Development Workflow

### Getting Started
1. Ensure Node.js version matches `.nvmrc` (20.19.5)
2. Install dependencies: `npm install`
3. Start development: `npm run dev` (starts both client and server)

### Spec-Kit Workflow
1. Read `.spec/spec.md` (goals, stories, acceptance criteria).
2. Read `.spec/plan.md` (tech plan, stack, API outline).
3. Reference `.spec/api.yaml` (OpenAPI 3.1 contracts).
4. Pick one task from `.spec/tasks.json`.
5. Follow diagrams in `.spec/diagrams/`:
    - `project-layout.puml` → module & file structure
    - `dev-playbook.puml` → task/PR lifecycle & CI guardrails
    - `crud-sequence.puml` → request → validation → persistence → UI update flow
6. Implement only that task. Open PRs with the Task ID (`Txx`) in the branch and title.
7. CI checks will ensure task traceability and spec drift prevention.

### Available Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run dev:client` - Start only the Vite dev server
- `npm run dev:server` - Start only the Node.js server
- `npm run build` - Build both client and server for production
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run type-check` - Type check without emitting files
- `npm start` - Build and start production server
- `npm run spec:gen` - Regenerate tasks from spec-kit
- `npm run spec:diff` - Compare current tasks to committed version
- `npm run spec:pack` - Bundle spec + diagrams into a single context file for AI

### Code Style and Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Prefer named exports over default exports
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused
- Maintain sync between code and `.spec/` documents

### API Development
- All API routes should be prefixed with `/api/`
- Contracts must match `.spec/api.yaml`
- Use proper HTTP status codes
- Include error handling for all endpoints
- Document deviations in `plan.md` if needed

### Current API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/info` - Application information
- See `.spec/api.yaml` for business endpoints

## AI Tool Integration

### For AI Assistants
- Always read `.spec/spec.md`, `plan.md`, `api.yaml`, `tasks.json`, and diagrams before coding.
- Use `.spec/context.manifest.json` (if present) to know which files to load.
- Implement tasks in isolation; don’t exceed the scope of one task at a time.
- Include Task IDs (e.g., `T05`) in branch names and PRs.
- Prefer `.puml` text files for architectural understanding.

### File Naming Conventions
- React components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase starting with "use" (e.g., `useApiData.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `UserTypes.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- Spec diagrams: kebab-case (e.g., `crud-sequence.puml`)

### Best Practices for AI Tools
1. Always check `.spec/` before generating code.
2. Follow the diagrams for structure and flow.
3. Keep tasks scoped; don’t merge multiple task IDs into one PR.
4. Run local lint, type-check, and tests before pushing code.
5. Update `guidelines.md` if new patterns emerge.

## Design System (Mantine)
- Prefer Mantine components for UI (@mantine/core, @mantine/hooks).
- Use @mantine/form for simple forms; combine with existing validators if needed.
- Use @mantine/notifications for toasts and @mantine/modals for confirmations.
- Keep tokens in `src/theme/mantine.ts`; avoid ad-hoc CSS.
- App root must wrap with MantineProvider, ModalsProvider, and Notifications; import `@mantine/*/styles.css` in `src/main.tsx`.
- Persist color scheme per session via `createSessionStorageColorSchemeManager` using `THEME_STORAGE_KEY`.
- Provide a visible color scheme toggle in the header for pages using AppShell.

## Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for API endpoints
- E2E tests for critical user workflows
- Component testing for UI components
- Backend tests aligned with `.spec/tasks.json` deliverables

## Deployment
- Build artifacts are generated in `dist/` directory
- Server builds to `server/dist/`
- Static assets are served by the Express server in production
- Environment variables should be documented in `.env.example`
- Spec files (`.spec/`) are committed and reviewed but not deployed

## Common Tasks
- Adding a new React component: Create in `src/components/`
- Adding a new API route: Add to `server/routes/` or extend `server.ts` **and update `api.yaml`**
- Adding a new utility: Create in appropriate `utils/` directory
- Adding dependencies: Use `npm install` and update this guide if needed
- Adding a new feature: Write/update `.spec/spec.md`, add tasks, and reference diagrams

## Troubleshooting
- Check Node.js version matches `.nvmrc`
- Ensure all dependencies are installed with `npm install`
- Check TypeScript compilation with `npm run type-check`
- Verify linting with `npm run lint`
- Check server logs when API calls fail
- If AI output seems “off”: ensure it included `.spec/` and diagrams in its context
