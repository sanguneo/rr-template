import { redirect } from 'react-router';
import type { TMiddleware } from './types';

export const authMiddleware: TMiddleware = async (context, next) => {
  const { request } = context.args;
  console.log('Auth middleware executing for:', request.url);

  // Example redirect: "Bounce" if a specific condition is met
  if (request.url.includes('?bounce=true')) {
    console.log('Bouncing user via redirect');
    return redirect('/');
  }

  // Get the result from the next middleware or final loader
  const result = await next();

  // If it's a redirect or other Response, just pass it along
  if (result instanceof Response) {
    return result;
  }

  if (!result || typeof result !== 'object') {
    return result;
  }

  // Otherwise, merge our data into the result!
  return {
    ...result,
    user: { id: 1, name: 'Demo User (Injected by Middleware)', role: 'admin' },
  };
};
