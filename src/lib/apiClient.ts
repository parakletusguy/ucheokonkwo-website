import { tokenStore } from './tokenStore';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';

// ── Internal refresh state ────────────────────────────────────────────────────
let isRefreshing = false;
let waitQueue: Array<(token: string | null) => void> = [];

async function doRefresh(): Promise<string | null> {
  const rt = tokenStore.getRefresh();
  if (!rt) return null;
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: rt }),
    });
    if (!res.ok) { tokenStore.clear(); return null; }
    const json = await res.json();
    tokenStore.set(json.accessToken, json.refreshToken);
    return json.accessToken;
  } catch {
    tokenStore.clear();
    return null;
  }
}

// ── Core request function ─────────────────────────────────────────────────────
async function request<T>(
  path: string,
  init: RequestInit = {},
  _retry = false,
): Promise<{ data: T }> {
  const url = `${BASE_URL}${path}`;

  // Build headers — don't set Content-Type for FormData (browser adds boundary)
  const extra: Record<string, string> = {};
  const token = tokenStore.getAccess();
  if (token) extra['Authorization'] = `Bearer ${token}`;
  if (!(init.body instanceof FormData)) extra['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    ...init,
    headers: { ...extra, ...(init.headers as Record<string, string> ?? {}) },
  });

  // ── 401: attempt token refresh, then retry once ───────────────────────────
  if (res.status === 401 && !_retry) {
    let newToken: string | null;

    if (isRefreshing) {
      newToken = await new Promise<string | null>((resolve) => {
        waitQueue.push(resolve);
      });
    } else {
      isRefreshing = true;
      newToken = await doRefresh();
      waitQueue.forEach((cb) => cb(newToken));
      waitQueue = [];
      isRefreshing = false;
    }

    if (!newToken) {
      if (typeof window !== 'undefined') window.location.href = '/admin/login';
      throw { response: { status: 401, data: { message: 'Session expired' } } };
    }

    return request<T>(path, init, true);
  }

  // ── Error responses ───────────────────────────────────────────────────────
  if (!res.ok) {
    const errData = await res.json().catch(() => ({ message: res.statusText }));
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw { response: { status: res.status, data: errData } };
  }

  // ── 204 No Content ────────────────────────────────────────────────────────
  if (res.status === 204) return { data: undefined as T };

  const data: T = await res.json();
  return { data };
}

// ── Public API (axios-compatible shape: returns { data }) ─────────────────────
export const apiClient = {
  get<T>(path: string) {
    return request<T>(path, { method: 'GET' });
  },
  post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },
  patch<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'PATCH',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
  },
  delete<T = void>(path: string) {
    return request<T>(path, { method: 'DELETE' });
  },
};

// ── FormData builder for posts ────────────────────────────────────────────────
export function buildPostFormData(payload: {
  title?: string;
  content?: string;
  subcontent?: string;
  status?: string;
  multilingualContent?: object[];
  images?: File[];
}): FormData {
  const form = new FormData();
  if (payload.title !== undefined) form.append('title', payload.title);
  if (payload.content !== undefined) form.append('content', payload.content);
  if (payload.subcontent !== undefined) form.append('subcontent', payload.subcontent);
  if (payload.status !== undefined) form.append('status', payload.status);
  if (payload.multilingualContent !== undefined) {
    form.append('multilingualContent', JSON.stringify(payload.multilingualContent));
  }
  payload.images?.forEach((file) => form.append('images', file));
  return form;
}
