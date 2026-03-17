import type { LoaderFunctionArgs } from 'react-router';

export type TMiddlewareNext = () => Promise<Response | unknown>;

export interface IMiddlewareContext {
  args: LoaderFunctionArgs;
  data: Record<string, unknown>;
}

export type TMiddleware = (context: IMiddlewareContext, next: TMiddlewareNext) => Promise<Response | unknown>;
