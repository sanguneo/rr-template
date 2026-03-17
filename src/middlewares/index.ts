import type { LoaderFunctionArgs } from 'react-router';
import { authMiddleware } from './01.auth';
import { logMiddleware } from './02.log';
import { themeMiddleware } from './03.theme';
import type { TMiddleware, IMiddlewareContext } from './types';

const middlewares: TMiddleware[] = [authMiddleware, logMiddleware, themeMiddleware];

/**
 * Composes multiple middleware functions into a single loader-compatible function.
 */
export default function composeMiddleware() {
  return async (
    args: LoaderFunctionArgs,
    finalLoader: (context: IMiddlewareContext) => Promise<Response | unknown>,
  ) => {
    let index = -1;
    const context: IMiddlewareContext = {
      args,
      data: {},
    };

    async function dispatch(i: number): Promise<Response | unknown> {
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
