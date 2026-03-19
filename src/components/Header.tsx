"use client";

import React, { useState, useEffect } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_ITEMS = [
  { en: "Home", href: "/", icon: "home" },
  { en: "About Hon. Harris", href: "/about", icon: "person" },
  { en: "The Constituency", href: "/constituency", icon: "location_on" },
  { en: "Media & Blog", href: "/media", icon: "newspaper" },
  { en: "Admin Portal", href: "/admin", icon: "lock" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ─── Top bar ─────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* Tricolor stripe */}
        <div style={{ display: "flex", height: 6 }}>
          <div style={{ flex: 1, background: "var(--midnight-green)" }} />
          <div style={{ flex: 1, background: "var(--sunlight-yellow)" }} />
          <div style={{ flex: 1, background: "var(--sunlight-yellow)" }} />
        </div>

        <div
          style={{
            maxWidth: "90rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862953/WhatsApp_Image_2026-03-17_at_12.52.14_PM_ahquhm.jpg"
              alt="Logo"
              width={46}
              height={46}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.2,
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--midnight-green)",
                }}
              >
                Uche Okonkwo
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--midnight-green)",
                  opacity: 0.7,
                }}
              >
                Idemili North &amp; South
              </span>
            </div>
          </a>

          {/* MENU button */}
          <button
            onClick={() => setOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              border: "2px solid var(--midnight-green)",
              background: "transparent",
              color: "var(--midnight-green)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 4,
            }}
          >
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "currentColor",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 20,
                  height: 2,
                  background: "currentColor",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 13,
                  height: 2,
                  background: "currentColor",
                }}
              />
            </span>
            Menu
          </button>
        </div>
      </header>

      {/* ─── Overlay + Sidebar (only mounted when open) ──── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 9998,
            }}
          />

          {/* Sidebar */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "min(340px, 90vw)",
              height: "100%",
              background: "#fff",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.25)",
              overflowY: "auto",
            }}
          >
            {/* Stripe */}
            <div style={{ display: "flex", height: 6, flexShrink: 0 }}>
              <div style={{ flex: 1, background: "var(--midnight-green)" }} />
              <div style={{ flex: 1, background: "var(--sunlight-yellow)" }} />
              <div style={{ flex: 1, background: "var(--sunlight-yellow)" }} />
            </div>

            {/* Sidebar header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#aaa",
                }}
              >
                Navigation
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--midnight-green)",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 20 }}
                >
                  close
                </span>
                Close
              </button>
            </div>

            {/* Nav links */}
            <nav
              style={{
                flex: 1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px",
                    borderRadius: 8,
                    textDecoration: "none",
                    color: "#444",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--midnight-green)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#444";
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 22, color: "inherit", flexShrink: 0 }}
                  >
                    {item.icon}
                  </span>
                  {item.en}
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 18, marginLeft: "auto", opacity: 0.3 }}
                  >
                    chevron_right
                  </span>
                </a>
              ))}
            </nav>

            {/* Language switcher + CTA */}
            <div
              style={{
                padding: "24px",
                borderTop: "1px solid #f0f0f0",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {mounted && <LanguageSwitcher variant="dropdown" />}
              <a
                href="/get-involved"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "var(--midnight-green)",
                  color: "var(--sunlight-yellow)",
                  padding: "16px 24px",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderRadius: 4,
                }}
              >
                Get Involved
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18 }}
                >
                  arrow_right_alt
                </span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
