"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin',            icon: 'dashboard',    label: 'Dashboard' },
  { href: '/admin/editor',     icon: 'edit_square',  label: 'New Post'  },
  { href: '/admin/inbox',      icon: 'inbox',        label: 'Inbox'     },
  { href: '/admin/volunteers', icon: 'group',        label: 'Volunteers' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[var(--integrity-navy)] border-t border-white/10 safe-area-pb z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-[var(--adc-yellow)]' : 'text-blue-200 hover:text-white'}`}
            >
              <span className={`material-symbols-outlined text-2xl mb-1 ${isActive ? 'text-[var(--adc-yellow)]' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
