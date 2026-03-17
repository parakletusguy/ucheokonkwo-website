"use client";

import React from 'react';
import { useLanguageStore, LanguageCode } from '@/store/useLanguageStore';

const LANGUAGES: { code: LanguageCode; label: string; native: string; flag: string }[] = [
  { code: 'en',  label: 'English',        native: 'English',  flag: '🇬🇧' },
  { code: 'pcm', label: 'Pidgin',         native: 'Naija',    flag: '🇳🇬' },
  { code: 'ig',  label: 'Igbo',           native: 'Ịgbo',     flag: '🟢' },
  { code: 'ha',  label: 'Hausa',          native: 'Hausa',    flag: '🟡' },
  { code: 'yo',  label: 'Yoruba',         native: 'Yorùbá',   flag: '🔴' },
];

interface Props {
  /** 'bar' = horizontal pill group (for Header), 'dropdown' = mobile-friendly list */
  variant?: 'bar' | 'dropdown';
}

export default function LanguageSwitcher({ variant = 'bar' }: Props) {
  const { currentLanguage, setLanguage } = useLanguageStore();

  const handleSwitch = (lang: LanguageCode) => {
    setLanguage(lang);
    // Update the html lang attribute for screen readers & SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pcm' ? 'pcm' : lang;
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="flex flex-col gap-1 w-full">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
          Language / Asụsụ / Harshe
        </p>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSwitch(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold transition-all ${
              currentLanguage === lang.code
                ? 'bg-[var(--midnight-green)] text-[var(--sunlight-yellow)]'
                : 'bg-gray-100 text-gray-600 hover:bg-[var(--midnight-green)]/10 hover:text-[var(--midnight-green)]'
            }`}
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <span>{lang.native}</span>
            <span className="ml-auto text-[10px] font-mono tracking-widest opacity-50 uppercase">{lang.code}</span>
          </button>
        ))}
      </div>
    );
  }

  // Default: horizontal pill bar for desktop header
  return (
    <div
      className="flex items-center bg-[var(--off-white)] border border-gray-200 rounded-full p-0.5 shadow-inner gap-0.5"
      role="group"
      aria-label="Select language"
    >
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleSwitch(lang.code)}
          title={lang.label}
          aria-pressed={currentLanguage === lang.code}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
            currentLanguage === lang.code
              ? 'bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] shadow-sm'
              : 'text-gray-400 hover:text-[var(--midnight-green)]'
          }`}
        >
          <span className="text-sm leading-none">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
