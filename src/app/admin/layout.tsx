import Link from "next/link";
import BottomNav from "@/components/admin/BottomNav";
import AdcLogo from "@/components/AdcLogo";
import AuthGuard from "@/components/admin/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="bg-gray-50 min-h-screen pb-20 text-[var(--obsidian)] selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)]">
        {/* Mobile-first top header for admin */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex justify-between items-center h-14 px-4 max-w-md mx-auto">
            <Link href="/admin" className="flex items-center gap-2">
              <AdcLogo size={32} />
              <span className="font-bold text-xs tracking-widest uppercase text-[var(--obsidian)]">Portal</span>
            </Link>
            <Link
              href="/admin/settings"
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 hover:bg-[var(--midnight-green)] hover:border-[var(--midnight-green)] hover:text-white transition-all group"
              aria-label="Account & Settings"
            >
              <span className="material-symbols-outlined text-sm text-gray-600 group-hover:text-white">person</span>
            </Link>
          </div>
        </header>

        {/* Main Admin Content Area Constrained for Mobile/Tablet Readability */}
        <main className="max-w-md mx-auto w-full">
          {children}
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
