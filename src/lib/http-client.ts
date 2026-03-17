import { HttpError } from './http-error';

type THttpOptions = Omit<RequestInit, 'headers'> & {
  query?: Record<string, string | number | boolean | null | undefined>;
  headers?: Record<string, string>;
  retry?: boolean;
  responseType?: 'json' | 'blob' | 'text';
};

type THttpAuthHandlers = {
  getAccessToken?: () => string | undefined;
  refreshAccessToken?: () => Promise<void>;
  onAuthFailure?: (error: unknown) => void | Promise<void>;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
let authHandlers: THttpAuthHandlers = {};

export function configureHttpClient(handlers: THttpAuthHandlers) {
  authHandlers = handlers;
}

function buildUrl(path: string, query?: THttpOptions['query']) {
  const url = BASE_URL ? new URL(path, BASE_URL) : new URL(path, window.location.origin);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });
  }

  return url;
}

export async function http<T>(path: string, options: THttpOptions = {}): Promise<T> {
  const { query, headers, retry = true, responseType = 'json', ...init } = options;
  const url = buildUrl(path, query);
  const token = authHandlers.getAccessToken?.();

  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  if (!(init.body instanceof FormData) && !finalHeaders['Content-Type']) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  const res = await fetch(url.toString(), {
    ...init,
    headers: finalHeaders,
  });

  if (res.status === 401 && retry && authHandlers.refreshAccessToken) {
    try {
      await authHandlers.refreshAccessToken();
      return http<T>(path, { ...options, retry: false });
    } catch (error) {
      await authHandlers.onAuthFailure?.(error);
      throw error;
    }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new HttpError(res.status, res.statusText, data);
  }

  if (responseType === 'blob') {
    return (await res.blob()) as unknown as T;
  }

  if (responseType === 'text') {
    return (await res.text()) as unknown as T;
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}
