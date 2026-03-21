"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import AdcLogo from "@/components/AdcLogo";

const AdminUserBadge = dynamic(() => import("@/components/admin/AdminUserBadge"), { ssr: false });

const NAV_ITEMS = [
  { href: "/admin",            icon: "dashboard",    label: "Dashboard"   },
  { href: "/admin/posts",      icon: "article",      label: "Posts"       },
  { href: "/admin/editor",     icon: "edit_square",  label: "New Post"    },
  { href: "/admin/projects",   icon: "construction", label: "Projects"    },
  { href: "/admin/inbox",      icon: "inbox",        label: "Inbox"       },
  { href: "/admin/volunteers", icon: "group",        label: "Volunteers"  },
  { href: "/admin/settings",   icon: "tune",         label: "Settings"    },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0 w-64
        bg-[var(--midnight-green)] flex flex-col z-50 shadow-xl
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      {/* Brand */}
      <Link
        href="/admin"
        onClick={onClose}
        className="flex items-center gap-3 px-5 h-16 border-b border-white/10 flex-shrink-0 hover:bg-white/5 transition-colors"
      >
        <AdcLogo size={32} />
        <div>
          <p className="font-bold text-xs tracking-widest uppercase text-white">Campaign</p>
          <p className="text-[10px] text-white/50 font-mono">Admin Portal</p>
        </div>

        {/* Mobile close button */}
        <button
          className="lg:hidden ml-auto w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          onClick={(e) => { e.preventDefault(); onClose(); }}
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-white/70 text-[18px]">close</span>
        </button>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const isActive =
            item.href === "/admin" || item.href === "/admin/posts"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-[var(--sunlight-yellow)]" : ""}`}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--sunlight-yellow)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <AdminUserBadge />
    </aside>
  );
}
