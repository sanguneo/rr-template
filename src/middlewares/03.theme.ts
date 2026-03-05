import type { Middleware } from '.';

export const middleware: Middleware = async (context, next) => {
  const result = await next();

  if (result instanceof Response) return result;

  console.log('[Theme Middleware] Injecting settings');
  return {
    ...result,
    settings: { theme: 'dark', fontSize: 'medium' },
  };
};
