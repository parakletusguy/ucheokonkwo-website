"use client";

import React from 'react';
import { useLanguageStore, LanguageCode } from '@/store/useLanguageStore';

export default function Header() {
  const { currentLanguage, setLanguage, t } = useLanguageStore();

  const handleLanguageSwitch = (lang: LanguageCode) => {
    setLanguage(lang);
  };

  return (
    <header className="fixed w-full top-0 bg-[var(--off-white)]/70 backdrop-blur-2xl z-50 border-b border-[var(--midnight-green)]/5">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-[var(--midnight-green)] flex items-center justify-center text-[var(--off-white)] font-serif text-2xl tracking-tighter transition-transform group-hover:scale-105">
              ADC
            </div>
            <span className="font-semibold text-lg tracking-[0.2em] uppercase text-[var(--midnight-green)]">
              {t({ en: 'Hon. Harris', pcm: 'Oga Harris', ig: 'Mazi Harris', ha: 'Hon. Harris', yo: 'Ogbeni Harris' })}
            </span>
          </div>

          <nav className="hidden lg:flex space-x-14">
            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-[var(--midnight-green)] transition-colors">
              {t({ en: 'Vision', pcm: 'Wetin We Want', ig: 'Ọzụzụ Anyị', ha: 'Hangenta', yo: 'Iran' })}
            </a>
            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-[var(--midnight-green)] transition-colors">
              {t({ en: 'Map', pcm: 'Locate Project', ig: 'Maapụ', ha: 'Taswira', yo: 'Maapu' })}
            </a>
            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-[var(--midnight-green)] transition-colors">
              {t({ en: 'Agenda', pcm: 'Our Plan', ig: 'Atụmatụ', ha: 'Ajanda', yo: 'Eto' })}
            </a>
            <a href="#" className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 hover:text-[var(--midnight-green)] transition-colors">
              {t({ en: 'Town Hall', pcm: 'Meeting Point', ig: 'Ụlọ Nzukọ', ha: 'Dakin Taron Gari', yo: 'Gbọngàn Ilu' })}
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-full p-1 shadow-sm">
              {(['en', 'pcm', 'ig', 'ha', 'yo'] as LanguageCode[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSwitch(lang)}
                  className={`flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    currentLanguage === lang 
                      ? 'bg-[var(--midnight-green)] text-[var(--off-white)]' 
                      : 'text-gray-400 hover:text-[var(--midnight-green)]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="hidden md:flex items-center gap-2 bg-[var(--obsidian)] text-[var(--off-white)] px-8 py-3 rounded-none text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--midnight-green)] transition-all group">
              {t({ en: 'Get Involved', pcm: 'Join Us', ig: 'Soro Anyị', ha: 'Shiga Ciki', yo: 'Dara Pọ Mọ Wa' })}
              <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
