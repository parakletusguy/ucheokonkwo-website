"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdcLogo from "@/components/AdcLogo";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLogin) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f4f4f2] text-[var(--obsidian)] selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)]">

        {/* Mobile top bar — hidden on desktop */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[var(--midnight-green)] z-40 flex items-center gap-3 px-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-white text-[22px]">menu</span>
          </button>
          <Link href="/admin" className="flex items-center gap-2.5">
            <AdcLogo size={26} />
            <div>
              <p className="font-bold text-[10px] tracking-widest uppercase text-white leading-none">Campaign</p>
              <p className="text-[9px] text-white/50 font-mono leading-none mt-0.5">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Sidebar */}
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[45] backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content area */}
        <main className="lg:ml-64 min-h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
