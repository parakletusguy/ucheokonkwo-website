/** In-memory access token — never persisted to localStorage. */
let _accessToken: string | null = null;

const RT_KEY = '_rt';

export const tokenStore = {
  getAccess(): string | null {
    return _accessToken;
  },

  getRefresh(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(RT_KEY);
  },

  set(access: string, refresh: string): void {
    _accessToken = access;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(RT_KEY, refresh);
    }
  },

  clear(): void {
    _accessToken = null;
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(RT_KEY);
    }
  },
};
