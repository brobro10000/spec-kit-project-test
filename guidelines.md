# Development Guidelines

## Project Overview
This is a React application built with Vite and TypeScript, featuring a Node.js Express server backend. The project is designed to be AI-tool friendly and follows modern development practices.

## Project Structure
```
├── src/                    # React frontend source code
│   ├── components/        # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── assets/           # Static assets
├── server/               # Node.js backend
│   ├── server.ts         # Main server file
│   ├── routes/           # API route definitions
│   ├── middleware/       # Express middleware
│   ├── utils/            # Server utilities
│   └── types/            # Server-side type definitions
├── public/               # Static public assets
└── dist/                 # Build output (auto-generated)
```

## Technology Stack
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Development Tools**: ESLint, TypeScript compiler
- **Package Manager**: npm

## Development Workflow

### Getting Started
1. Ensure Node.js version matches `.nvmrc` (20.19.5)
2. Install dependencies: `npm install`
3. Start development: `npm run dev` (starts both client and server)

### Available Scripts
- `npm run dev` - Start both client and server in development mode
- `npm run dev:client` - Start only the Vite dev server
- `npm run dev:server` - Start only the Node.js server
- `npm run build` - Build both client and server for production
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run type-check` - Type check without emitting files
- `npm start` - Build and start production server

### Code Style and Standards
- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Prefer named exports over default exports
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep components small and focused

### API Development
- All API routes should be prefixed with `/api/`
- Use proper HTTP status codes
- Include error handling for all endpoints
- Document API endpoints in this file

### Current API Endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/info` - Application information

## AI Tool Integration

### For AI Assistants
- This project follows standard React + Node.js patterns
- All configuration files are in the root directory
- Server code is in the `server/` directory
- Frontend code is in the `src/` directory
- Check `.aiignore` for files to skip during analysis

### File Naming Conventions
- React components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase starting with "use" (e.g., `useApiData.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types: PascalCase (e.g., `UserTypes.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Best Practices for AI Tools
1. Always check existing patterns before creating new ones
2. Use the established folder structure
3. Follow TypeScript best practices
4. Update this guidelines file when adding new patterns
5. Consider backwards compatibility when making changes

## Testing Strategy
- Unit tests for utilities and hooks
- Integration tests for API endpoints
- E2E tests for critical user workflows
- Component testing for UI components

## Deployment
- Build artifacts are generated in `dist/` directory
- Server builds to `server/dist/`
- Static assets are served by the Express server in production
- Environment variables should be documented in `.env.example`

## Common Tasks
- Adding a new React component: Create in `src/components/`
- Adding a new API route: Add to `server/routes/` or extend `server.ts`
- Adding a new utility: Create in appropriate `utils/` directory
- Adding dependencies: Use `npm install` and update this guide if needed

## Troubleshooting
- Check Node.js version matches `.nvmrc`
- Ensure all dependencies are installed with `npm install`
- Check TypeScript compilation with `npm run type-check`
- Verify linting with `npm run lint`
- Check server logs when API calls fail