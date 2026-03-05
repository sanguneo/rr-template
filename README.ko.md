# RR-Template (React Router v7)

[English](./README.md)

React Router v7을 사용한 고품질 풀스택 React 애플리케이션 구축을 위한 현대적인 보일러플레이트입니다. 이 템플릿은 동적 미들웨어 시스템, 강력한 스타일링 패턴, 자동화된 DX 도구를 특징으로 하며 확장성을 고려하여 설계되었습니다.

## ✨ 주요 기능

- 🚀 **React Router v7**: SSR 및 파일 시스템 라우팅을 포함한 최신 기능 제공.
- 🔗 **동적 미들웨어 시스템**: 자동 파일 검색을 통한 플러그 앤 플레이 미들웨어.
- 📋 **폼 및 유효성 검사**: [React Hook Form](https://react-hook-form.com/) 및 스키마 검증을 위한 [Yup](https://github.com/jquense/yup)을 사용한 확장 가능한 폼 관리.
- 📡 **데이터 페칭**: [TanStack Query (React Query)](https://tanstack.com/query/latest)를 통한 효율적인 서버 상태 관리.
- 🎨 **프리미엄 스타일링**: 설정된 패턴(믹스인, 변수, 리셋)을 포함한 SCSS 적용.
- 🧠 **상태 관리**: [Zustand](https://zustand-demo.pmnd.rs/)를 사용한 가볍고 빠른 상태 관리.
- 🧪 **테스트 스위트**: **Vitest**를 사용한 단위 테스트 및 **Playwright**를 사용한 E2E 테스트.
- 🛠️ **개발자 경험 (DX)**: 
  - **Husky & Lint-staged**: 커밋 시 자동 린팅 및 포맷팅.
  - **Commitlint**: 커스텀 커밋 메시지 규칙 강제.
  - **.env 제어 훅**: 필요에 따라 로컬에서 훅을 쉽게 건너뛸 수 있음.
- 🐳 **Docker 지원**: 최적화된 프로덕션용 Dockerfile 포함.

## 🏗️ 프로젝트 구조

```text
src/
├── apis/             # API 정의 및 페칭 로직
├── app/              # 라우트 및 루트 설정
├── components/       # 재사용 가능한 UI 컴포넌트
├── constants/        # 상수 및 설정 파일
├── hooks/            # 커스텀 React 훅
├── middlewares/       # 동적 미들웨어 파일
├── stores/            # Zustand 상태 관리
├── styles/           # 전역 SCSS (변수, 믹스인, 리셋)
├── types/            # TypeScript 정의
├── utils/            # 공통 유틸리티 함수
```

## 🔗 미들웨어 시스템

이 템플릿은 로더를 위한 강력하고 동적인 미들웨어 시스템을 제공합니다.

### 작동 방식
`src/middlewares/`에 추가된 모든 `.ts` 파일은 자동으로 감지되어 실행됩니다. 숫자 접두사를 사용하여 실행 순서를 제어할 수 있습니다:
- `01.auth.ts`
- `02.log.ts`
- `03.theme.ts`

### 버블링 업 패턴 (Bubbling Up Pattern)
미들웨어는 `await next()`를 호출한 다음 자신의 데이터를 결과에 병합하는 "버블링" 패턴을 사용합니다. 이를 통해 로더를 깔끔하게 유지할 수 있습니다.

```typescript
export const middleware: Middleware = async (context, next) => {
  const result = await next(); // 다음 미들웨어/로더로부터 결과를 가져옴
  if (result instanceof Response) return result;

  return { 
    ...result, 
    user: { name: 'Demo User' } // 데이터 주입
  };
};
```

## 🛠️ Git 훅 (.env 제어)

코드 품질 유지를 위해 Husky와 Commitlint가 기본으로 활성화되어 있습니다. `.env` 파일을 통해 제어할 수 있습니다:

```env
# .env
SKIP_HUSKY=false        # 모든 git 훅을 건너뛰려면 true로 설정
SKIP_COMMITLINT=false   # commitlint만 건너뛰려면 true로 설정
```

## 🚀 시작하기

### 설치
```bash
pnpm install
```

### 개발 모드
```bash
pnpm run dev
```

### 타입 체크
```bash
pnpm run typecheck
```

### 테스트
```bash
# 단위 테스트
pnpm run test

# E2E 테스트
pnpm exec playwright test
```

## 📦 배포 및 프로덕션

```bash
pnpm run build
pnpm run start
```

---
Sangkwon이 ❤️으로 만들었습니다.
