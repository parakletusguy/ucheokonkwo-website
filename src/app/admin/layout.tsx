"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f4f4f2] text-[var(--obsidian)] selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)]">
        <AdminSidebar />
        <main className="ml-64 min-h-screen">{children}</main>
      </div>
    </AuthGuard>
  );
}
