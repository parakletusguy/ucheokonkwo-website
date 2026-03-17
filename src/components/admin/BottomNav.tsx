"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/editor', icon: 'edit_square', label: 'New Post' },
    { href: '/admin/settings', icon: 'settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 safe-area-pb z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-[var(--midnight-green)]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className={`material-symbols-outlined text-2xl mb-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
