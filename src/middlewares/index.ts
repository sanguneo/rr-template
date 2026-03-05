import type { LoaderFunctionArgs } from 'react-router';

export type MiddlewareNext = () => Promise<Response | any>;

export interface MiddlewareContext {
  args: LoaderFunctionArgs;
  data: Record<string, any>;
}

export type Middleware = (context: MiddlewareContext, next: MiddlewareNext) => Promise<Response | any>;

const middlewareModules = import.meta.glob('./*.ts', { eager: true });

const middlewares: Middleware[] = Object.keys(middlewareModules)
  .filter((path) => !path.endsWith('index.ts'))
  .sort() // Sorts by filename (e.g., 01.auth.ts, 02.log.ts)
  .map((path) => {
    const mod = middlewareModules[path] as any;
    // Support both named export and default export
    return mod.middleware || mod.authMiddleware || mod.default;
  })
  .filter((m): m is Middleware => typeof m === 'function');

/**
 * Composes multiple middleware functions into a single loader-compatible function.
 */
export default function composeMiddleware() {
  return async (args: LoaderFunctionArgs, finalLoader: (context: MiddlewareContext) => Promise<Response | any>) => {
    let index = -1;
    const context: MiddlewareContext = {
      args,
      data: {}, // Initialize shared data
    };

    async function dispatch(i: number): Promise<Response | any> {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;
      const fn = middlewares[i];

      if (!fn) {
        return finalLoader(context);
      }

      return fn(context, () => dispatch(i + 1));
    }

    return dispatch(0);
  };
}
