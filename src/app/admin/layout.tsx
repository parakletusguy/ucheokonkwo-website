import BottomNav from "@/components/admin/BottomNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 text-[var(--obsidian)] selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)]">
      {/* Mobile-first top header for admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex justify-between items-center h-14 px-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--midnight-green)] flex items-center justify-center text-[var(--off-white)] font-serif text-sm tracking-tighter rounded-sm">
              ADC
            </div>
            <span className="font-bold text-xs tracking-widest uppercase text-[var(--obsidian)]">Portal</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <span className="material-symbols-outlined text-sm text-gray-600">person</span>
          </div>
        </div>
      </header>

      {/* Main Admin Content Area Constrained for Mobile/Tablet Readability */}
      <main className="max-w-md mx-auto w-full">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
