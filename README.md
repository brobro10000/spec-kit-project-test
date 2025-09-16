# spec-kit-project-test

This project is a modern React application built with Vite and TypeScript, featuring a Node.js Express server backend. It's designed to be AI-tool friendly and leverage the use of spec-kit with agentic AI tools.

![Application Screenshot](https://github.com/user-attachments/assets/764f7ac2-6f78-4253-9a19-aa92acf84300)

## 🚀 Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Development Tools**: ESLint, TypeScript, Concurrently
- **Package Manager**: npm

## 📁 Project Structure

```
├── src/                    # React frontend source code
│   ├── components/        # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── assets/           # Static assets
├── server/               # Node.js backend
│   ├── server.ts         # Main server file
│   └── tsconfig.json     # Server TypeScript config
├── public/               # Static public assets
├── .eslintrc.json        # ESLint configuration
├── .nvmrc               # Node.js version specification
├── guidelines.md        # Development guidelines for AI tools
├── .aiignore           # AI tools ignore file
└── dist/               # Build output (auto-generated)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js v20.19.5 (specified in `.nvmrc`)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   This starts both the React dev server (http://localhost:5173) and the Node.js API server (http://localhost:3001).

## 📝 Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run dev:client` - Start only the Vite dev server
- `npm run dev:server` - Start only the Node.js server
- `npm run build` - Build both client and server for production
- `npm run build:server` - Build only the server
- `npm run start` - Build and start production server
- `npm run lint` - Run ESLint on all files
- `npm run lint:fix` - Run ESLint and auto-fix issues
- `npm run type-check` - Type check without emitting files

## 🔌 API Endpoints

The backend server provides the following API endpoints:

- `GET /api/health` - Health check endpoint
- `GET /api/info` - Application information

## 🤖 AI Tool Integration

This project is specifically designed to work well with AI tools:

### Configuration Files
- **`.eslintrc.json`** - ESLint configuration for code quality
- **`.nvmrc`** - Node.js version specification
- **`tsconfig.json`** - TypeScript configuration
- **`guidelines.md`** - Comprehensive development guidelines
- **`.aiignore`** - Specifies files for AI tools to ignore

### Features for AI Tools
- Clear project structure with logical separation
- Comprehensive TypeScript typing
- Well-documented code with meaningful names
- Standard React patterns and best practices
- Express.js server following REST conventions

## 🏗️ Development Guidelines

See [`guidelines.md`](./guidelines.md) for comprehensive development guidelines including:
- Code style and standards
- File naming conventions
- API development patterns
- AI tool integration best practices

## 🧪 Features Demonstrated

- ✅ React 19 with TypeScript
- ✅ Vite for fast development and building
- ✅ Express.js backend with TypeScript
- ✅ API integration between frontend and backend
- ✅ Modern ES modules setup
- ✅ Hot module replacement (HMR)
- ✅ ESLint configuration
- ✅ Concurrent development servers
- ✅ Production build setup

## 🚀 Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

The server will serve the React application and API endpoints on the configured port.

## 🤝 Contributing

This project follows standard React and Node.js development practices. Please refer to the guidelines in [`guidelines.md`](./guidelines.md) for detailed contribution guidelines.

## 📄 License

This project is for testing and demonstration purposes.