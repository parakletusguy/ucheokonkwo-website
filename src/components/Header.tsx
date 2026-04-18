"use client";

import React, { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_ITEMS = [
  { en: "Home",                href: "/",              icon: "home"               },
  { en: "About Hon. Uchenna",  href: "/about",         icon: "person"             },
  { en: "The Constituency",    href: "/constituency",  icon: "location_on"        },
  { en: "Media & Blog",        href: "/media",         icon: "newspaper"          },
  { en: "Resources",           href: "/resources",     icon: "folder_open"        },
  { en: "Donate",              href: "/donate",        icon: "volunteer_activism" },
  { en: "Feedback",            href: "/feedback",      icon: "feedback"           },
  { en: "Admin Portal",        href: "/admin",         icon: "lock"               },
];

export default function Header() {
  const [open,    setOpen]    = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ─── Top bar ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
        {/* Tricolor stripe */}
        <div className="flex h-1.5">
          <div className="flex-1 bg-[var(--midnight-green)]" />
          <div className="flex-1 bg-[var(--sunlight-yellow)]" />
          <div className="flex-1 bg-[var(--sunlight-yellow)]" />
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">

          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 no-underline min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862953/WhatsApp_Image_2026-03-17_at_12.52.14_PM_ahquhm.jpg"
              alt="ADC Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded flex-shrink-0 object-cover"
            />
            <div className="flex flex-col leading-tight min-w-0">
              {/* Name — truncated on tiny screens */}
              <span className="font-extrabold uppercase tracking-wide text-[var(--midnight-green)] text-[13px] sm:text-[16px] lg:text-[18px] leading-tight truncate">
                Hon. Uchenna Okonkwo
              </span>
              {/* Constituency — hidden on xs, shown from sm up */}
              <span className="hidden sm:block text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--midnight-green)] opacity-60 truncate">
                Idemili North &amp; South Federal Constituency
              </span>
              {/* Short tag shown only on xs */}
              <span className="block sm:hidden text-[8px] font-semibold uppercase tracking-[0.15em] text-[var(--midnight-green)] opacity-55">
                Idemili North &amp; South
              </span>
            </div>
          </a>

          {/* ── Menu button ── */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-[var(--midnight-green)] text-[var(--midnight-green)] font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.18em] rounded hover:bg-[var(--midnight-green)] hover:text-white transition-all"
          >
            {/* Hamburger lines */}
            <span className="flex flex-col gap-[4px] flex-shrink-0">
              <span className="block w-4 sm:w-5 h-[2px] bg-current" />
              <span className="block w-4 sm:w-5 h-[2px] bg-current" />
              <span className="block w-3 sm:w-3.5 h-[2px] bg-current" />
            </span>
            <span className="hidden xs:inline sm:inline">Menu</span>
          </button>
        </div>
      </header>

      {/* ─── Sidebar + Backdrop ─────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-[min(340px,90vw)] h-full bg-white z-[9999] flex flex-col shadow-2xl overflow-y-auto">
            {/* Stripe */}
            <div className="flex h-1.5 flex-shrink-0">
              <div className="flex-1 bg-[var(--midnight-green)]" />
              <div className="flex-1 bg-[var(--sunlight-yellow)]" />
              <div className="flex-1 bg-[var(--sunlight-yellow)]" />
            </div>

            {/* Sidebar header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">Navigation</p>
                <p className="text-xs font-semibold text-[var(--midnight-green)] mt-0.5">Hon. Uchenna Okonkwo</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
                Close
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-4 flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-lg text-[#444] font-bold text-xs uppercase tracking-[0.1em] no-underline hover:bg-[var(--midnight-green)] hover:text-white transition-all group"
                >
                  <span className="material-symbols-outlined text-[20px] flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.en}</span>
                  <span className="material-symbols-outlined text-[16px] opacity-30 group-hover:opacity-60 transition-opacity">
                    chevron_right
                  </span>
                </a>
              ))}
            </nav>

            {/* Footer: language + CTA */}
            <div className="p-6 border-t border-gray-100 flex flex-col gap-4">
              {mounted && <LanguageSwitcher variant="dropdown" />}
              <a
                href="/get-involved"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] px-6 py-4 rounded font-bold text-[11px] uppercase tracking-[0.2em] no-underline hover:bg-[var(--obsidian)] transition-all"
              >
                Get Involved
                <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
