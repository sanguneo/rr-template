# RR-Template (React Router v7)

[한국어](./README.ko.md)

React Router v7 template with production-grade quality gates, explicit middleware composition, and reusable client infrastructure.

## Tech Stack

- React 19, React Router 7 (SPA mode)
- TypeScript (`strict: true`)
- Vite 7
- TanStack Query
- Zustand
- React Hook Form + Yup
- Tailwind CSS + SCSS
- ESLint + Prettier + Husky + lint-staged
- Vitest, Playwright

## Getting Started

### Requirements

- Node.js 20+
- pnpm

### Install

```bash
pnpm install
```

### Environment

Use `.env` as needed. `VITE_API_BASE_URL` is used by `src/lib/http-client.ts`.

```env
VITE_API_BASE_URL=https://api.example.com
```

### Run Dev Server

```bash
pnpm dev
```

- Default port: `4000` (see `vite.config.ts`)

## Scripts

- `pnpm dev`: start development server
- `pnpm build`: build for production
- `pnpm start`: preview build output
- `pnpm lint`: run ESLint
- `pnpm lint:fix`: run ESLint with auto-fix
- `pnpm typecheck`: React Router typegen + TypeScript check
- `pnpm test`: run Vitest (`--passWithNoTests`)
- `pnpm check`: run `lint + typecheck + test`
- `pnpm check:fast`: run `lint + typecheck`
- `pnpm analyze:graph`: analyze dependency graph/cycles

## Project Structure

```text
src/
├─ api/           # API functions
├─ app/           # Router root/routes
├─ components/    # Shared UI components
├─ constants/     # App constants
├─ hooks/         # Custom hooks
├─ lib/           # Shared infra (http client, errors, query keys)
├─ middlewares/   # Loader middleware chain
├─ public/        # Static assets (vite publicDir)
├─ stores/        # Zustand stores
├─ styles/        # SCSS resources
├─ types/         # Shared type definitions
└─ utils/         # Utilities
```

## Middleware

Middleware is explicitly composed in `src/middlewares/index.ts`.

- `01.auth.ts`
- `02.log.ts`
- `03.theme.ts`
- shared types: `src/middlewares/types.ts`

## Quality Gates and Hooks

- `pre-commit`: `lint-staged`
- `commit-msg`: `commitlint`
- `pre-push`: `pnpm check`

You can skip hooks locally with `.env`:

```env
SKIP_HUSKY=true
SKIP_COMMITLINT=true
SKIP_PRE_PUSH_CHECK=true
```

## Lint / Prettier / Typecheck Rules

- ESLint config: `eslint.config.mjs` (React Router export rules + strict code style)
- Prettier config: `.prettierrc` (print width 120, single quote, trailing comma)
- Type checking: `tsconfig.json` with `strict: true` + `react-router typegen`

## Added Shared Infra

- `src/lib/http-client.ts`: typed fetch wrapper with query/header handling and optional auth refresh hooks
- `src/lib/http-error.ts`: normalized HTTP error model
- `src/lib/query-keys.ts`: centralized React Query keys
