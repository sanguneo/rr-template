# RR-Template (React Router v7)

[English](./README.md)

React Router v7 기반 템플릿으로, 실무형 품질 게이트, 명시적 미들웨어 체인, 재사용 가능한 클라이언트 인프라를 포함합니다.

## 기술 스택

- React 19, React Router 7 (SPA 모드)
- TypeScript (`strict: true`)
- Vite 7
- TanStack Query
- Zustand
- React Hook Form + Yup
- Tailwind CSS + SCSS
- ESLint + Prettier + Husky + lint-staged
- Vitest, Playwright

## 시작하기

### 요구 사항

- Node.js 20+
- pnpm

### 설치

```bash
pnpm install
```

### 환경 변수

필요 시 `.env`를 사용합니다. `VITE_API_BASE_URL`은 `src/lib/http-client.ts`에서 사용됩니다.

```env
VITE_API_BASE_URL=https://api.example.com
```

### 개발 서버 실행

```bash
pnpm dev
```

- 기본 포트: `4000` (`vite.config.ts` 참고)

## 주요 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 빌드 결과 preview
- `pnpm lint`: ESLint 검사
- `pnpm lint:fix`: ESLint 자동 수정
- `pnpm typecheck`: React Router typegen + TypeScript 검사
- `pnpm test`: Vitest 실행 (`--passWithNoTests`)
- `pnpm check`: `lint + typecheck + test`
- `pnpm check:fast`: `lint + typecheck`
- `pnpm analyze:graph`: 의존성 그래프/순환 참조 분석

## 디렉토리 구조

```text
src/
├─ api/           # API 함수
├─ app/           # 라우터 루트/라우트
├─ components/    # 공통 UI 컴포넌트
├─ constants/     # 상수
├─ hooks/         # 커스텀 훅
├─ lib/           # 공통 인프라 (http client, errors, query keys)
├─ middlewares/   # 로더 미들웨어 체인
├─ public/        # 정적 자산 (vite publicDir)
├─ stores/        # Zustand 스토어
├─ styles/        # SCSS 리소스
├─ types/         # 공통 타입 정의
└─ utils/         # 유틸 함수
```

## 미들웨어

미들웨어 체인은 `src/middlewares/index.ts`에서 명시적으로 구성합니다.

- `01.auth.ts`
- `02.log.ts`
- `03.theme.ts`
- 공통 타입: `src/middlewares/types.ts`

## 품질 게이트와 Git 훅

- `pre-commit`: `lint-staged`
- `commit-msg`: `commitlint`
- `pre-push`: `pnpm check`

로컬에서 훅을 건너뛰려면 `.env`에 아래 값을 설정할 수 있습니다.

```env
SKIP_HUSKY=true
SKIP_COMMITLINT=true
SKIP_PRE_PUSH_CHECK=true
```

## Lint / Prettier / Typecheck 규칙

- ESLint 설정: `eslint.config.mjs` (React Router export 규칙 + 엄격한 코드 스타일)
- Prettier 설정: `.prettierrc` (`printWidth 120`, single quote, trailing comma)
- 타입 검사: `tsconfig.json` `strict: true` + `react-router typegen`

## 추가된 공통 인프라

- `src/lib/http-client.ts`: query/header 처리 + 선택적 토큰 갱신 훅을 지원하는 typed fetch 래퍼
- `src/lib/http-error.ts`: 표준화된 HTTP 에러 모델
- `src/lib/query-keys.ts`: React Query key 중앙 관리
