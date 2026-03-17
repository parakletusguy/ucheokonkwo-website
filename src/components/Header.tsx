"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import LanguageSwitcher from '@/components/LanguageSwitcher';

/* ── ADC Handshake Emblem (SVG inline) ─────────────────────────────────── */
const HandshakeEmblem = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ADC Handshake Emblem">
    <circle cx="16" cy="16" r="15" fill="#002D62" stroke="#FFD700" strokeWidth="1.5"/>
    <path d="M5 18 C7 14, 11 13, 13 15 L16 17" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M27 18 C25 14, 21 13, 19 15 L16 17" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="16" cy="17" r="2" fill="#FFD700"/>
    <rect x="10" y="24" width="4" height="3" rx="1" fill="#008751"/>
    <rect x="14" y="24" width="4" height="3" rx="1" fill="#FFD700"/>
    <rect x="18" y="24" width="4" height="3" rx="1" fill="#D20D13"/>
  </svg>
);

const NAV_LINKS = [
  { en: 'Vision',    pcm: 'Wetin We Want', ig: 'Ọzụzụ Anyị',  ha: 'Hangenta',          yo: 'Iran'         },
  { en: 'Map',       pcm: 'Locate Project', ig: 'Maapụ',        ha: 'Taswira',            yo: 'Maapu'        },
  { en: 'Agenda',    pcm: 'Our Plan',       ig: 'Atụmatụ',      ha: 'Ajanda',             yo: 'Eto'          },
  { en: 'Town Hall', pcm: 'Meeting Point',  ig: 'Ụlọ Nzukọ',   ha: 'Dakin Taron Gari',  yo: 'Gbọngàn Ilu'  },
];

export default function Header() {
  const { t } = useLanguageStore();

  return (
    <header className="fixed w-full top-0 bg-white/90 backdrop-blur-2xl z-50 border-b border-[var(--integrity-navy)]/10 shadow-sm">
      {/* ADC tricolor accent stripe */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[var(--constituency-green)]"/>
        <div className="flex-1 bg-[var(--adc-yellow)]"/>
        <div className="flex-1 bg-[var(--vanguard-red)]"/>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">

          {/* Wordmark + Emblem */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <HandshakeEmblem />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-[0.12em] uppercase text-[var(--integrity-navy)]">
                Uche Okonkwo
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[var(--constituency-green)]">
                {t({ en: 'Idemili North & South', pcm: 'Idemili North & South', ig: 'Idemili Ọ̀gbà & Ọ̀gbà South', ha: 'Idemili Arewa & Kudu', yo: 'Idemili Àríwá & Gúúsù' })}
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex space-x-12">
            {NAV_LINKS.map((link, i) => (
              <a key={i} href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-[var(--integrity-navy)] transition-colors">
                {t(link)}
              </a>
            ))}
          </nav>

          {/* Right side: language switcher + CTA */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="bar" />
            <button className="hidden md:flex items-center gap-2 bg-[var(--integrity-navy)] text-[var(--adc-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--obsidian)] transition-all group">
              {t({ en: 'Get Involved', pcm: 'Join Us', ig: 'Soro Anyị', ha: 'Shiga Ciki', yo: 'Dara Pọ Mọ Wa' })}
              <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
