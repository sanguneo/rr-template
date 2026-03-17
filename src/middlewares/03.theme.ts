import type { TMiddleware } from './types';

export const themeMiddleware: TMiddleware = async (context, next) => {
  const result = await next();

  if (result instanceof Response) return result;
  if (!result || typeof result !== 'object') return result;

  console.log('[Theme Middleware] Injecting settings');
  return {
    ...result,
    settings: { theme: 'dark', fontSize: 'medium' },
  };
};
