"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { apiClient } from "@/lib/apiClient";
import { tokenStore } from "@/lib/tokenStore";

export default function AdminUserBadge() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const [loggingOut, setLoggingOut] = useState(false);

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "AD";
  const displayName = user ? `${user.firstName} ${user.lastName}` : "Admin";

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await apiClient.post("/auth/logout"); } finally {
      tokenStore.clear();
      clearAuth();
      router.replace("/admin/login");
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-white/10 p-4 space-y-3">
      <div className="flex items-center gap-3 px-1">
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{displayName}</p>
          <p className="text-[10px] text-white/40 truncate">{user?.email ?? "—"}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
      >
        {loggingOut
          ? <span className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
          : <span className="material-symbols-outlined text-[18px]">logout</span>
        }
        {loggingOut ? "Logging out…" : "Log Out"}
      </button>
    </div>
  );
}
