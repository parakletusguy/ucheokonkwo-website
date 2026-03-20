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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[var(--midnight-green)] flex flex-col z-50 shadow-xl">

      {/* Brand */}
      <Link
        href="/admin"
        className="flex items-center gap-3 px-5 h-16 border-b border-white/10 flex-shrink-0 hover:bg-white/5 transition-colors"
      >
        <AdcLogo size={32} />
        <div>
          <p className="font-bold text-xs tracking-widest uppercase text-white">Campaign</p>
          <p className="text-[10px] text-white/50 font-mono">Admin Portal</p>
        </div>
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
