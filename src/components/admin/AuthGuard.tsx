'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { tokenStore } from '@/lib/tokenStore';
import { apiClient } from '@/lib/apiClient';
import { useAuthStore } from '@/store/useAuthStore';
import type { AuthUser, TokenPair } from '@/lib/types';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useAuthStore();
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Login page renders immediately without auth check
    if (isLoginPage) {
      setReady(true);
      return;
    }

    async function bootstrap() {
      const rt = tokenStore.getRefresh();
      if (!rt) {
        router.replace('/admin/login');
        return;
      }

      // Access token lives in memory — re-hydrate after page refresh via refresh endpoint
      if (!tokenStore.getAccess()) {
        try {
          const { data } = await apiClient.post<TokenPair>('/auth/refresh', {
            refreshToken: rt,
          });
          tokenStore.set(data.accessToken, data.refreshToken);
        } catch {
          tokenStore.clear();
          router.replace('/admin/login');
          return;
        }
      }

      // Confirm session + load user
      try {
        const { data } = await apiClient.get<AuthUser>('/auth/me');
        setUser(data);
        setReady(true);
      } catch {
        tokenStore.clear();
        router.replace('/admin/login');
      }
    }

    bootstrap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
