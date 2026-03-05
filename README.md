# RR-Template (React Router v7)

[한국어](./README.ko.md)

A modern, high-premium boilerplate for building full-stack React applications using React Router v7. This template is designed for scalability, featuring a dynamic middleware system, robust styling patterns, and automated DX tools.

## ✨ Core Features

- 🚀 **React Router v7**: Latest features including SSR and file-system routing.
- 🔗 **Dynamic Middleware System**: Plug-and-play middleware with automatic file discovery.
- 📋 **Forms & Validation**: Scalable forms using [React Hook Form](https://react-hook-form.com/) and [Yup](https://github.com/jquense/yup) for schema validation.
- 📡 **Data Fetching**: Efficient server state management with [TanStack Query (React Query)](https://tanstack.com/query/latest).
- 🎨 **Premium Styling**: SCSS with established patterns (mixins, variables, reset).
- 🧠 **State Management**: Lightweight and fast state management with [Zustand](https://zustand-demo.pmnd.rs/).
- 🧪 **Testing Suite**: Unit testing with **Vitest** and E2E testing with **Playwright**.
- 🛠️ **Developer Experience**: 
  - **Husky & Lint-staged**: Automated linting and formatting on commit.
  - **Commitlint**: Conventional commit message enforcement.
  - **.env Controlled Hooks**: Easily skip hooks locally when needed.
- 🐳 **Docker Ready**: Production-optimized Dockerfile included.

## 🏗️ Project Structure

```text
src/
├── apis/             # API definition and fetching logic
├── app/              # Routes and root configurations
├── components/       # Reusable UI components
├── constants/        # Constants and configuration
├── hooks/            # Custom React hooks
├── middlewares/      # Dynamic middleware files
├── stores/           # Zustand state management
├── styles/           # Global SCSS (variables, mixins, reset)
├── types/            # TypeScript definitions
├── utils/            # Shared utility functions
```

## 🔗 Middleware System

This template features a powerful, dynamic middleware system for loaders.

### How it works
Any `.ts` file added to `src/middleware/` is automatically discovered and executed. Use numeric prefixes to control the order:
- `01.auth.ts`
- `02.log.ts`
- `03.theme.ts`

### Bubbling Up Pattern
Middlewares use a "bubbling" pattern where they call `await next()` and then merge their own data into the result. This keeps your loaders clean.

```typescript
export const middleware: Middleware = async (context, next) => {
  const result = await next(); // Get result from next middleware/loader
  if (result instanceof Response) return result;

  return { 
    ...result, 
    user: { name: 'Demo User' } // Inject data
  };
};
```

## 🛠️ Git Hooks (.env control)

Husky and Commitlint are enabled by default to ensure code quality. You can control them via `.env`:

```env
# .env
SKIP_HUSKY=false        # Set to true to skip all git hooks
SKIP_COMMITLINT=false   # Set to true to skip only commitlint
```

## 🚀 Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm run dev
```

### Type Check
```bash
pnpm run typecheck
```

### Testing
```bash
# Unit Tests
pnpm run test

# E2E Tests
pnpm exec playwright test
```

## 📦 Production

```bash
pnpm run build
pnpm run start
```

---
Built with ❤️ by Sangkwon.
