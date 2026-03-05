import type { Middleware } from '.';

export const middleware: Middleware = async (context, next) => {
  const { request } = context.args;
  const start = Date.now();
  console.log(`[Log Middleware] Request start: ${request.url}`);

  const response = await next();

  const duration = Date.now() - start;
  console.log(`[Log Middleware] Request end: ${request.url} (${duration}ms)`);

  return response;
};
