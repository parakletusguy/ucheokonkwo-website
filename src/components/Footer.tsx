"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-[var(--integrity-navy)] text-white pt-32 pb-12 relative overflow-hidden">
      {/* ADC Tricolor top accent */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="flex-1 bg-[var(--constituency-green)]"/>
        <div className="flex-1 bg-[var(--adc-yellow)]"/>
        <div className="flex-1 bg-[var(--vanguard-red)]"/>
      </div>

      {/* Subtle texture */}
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none"/>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        {/* Big CTA */}
        <div className="text-center mb-32 group cursor-pointer inline-block w-full">
          <p className="text-[var(--adc-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-8">
            {t({ en: 'Take Action', pcm: 'Do Something', ig: 'Mee Ihe Obu', ha: 'Yi Aiki', yo: 'Ṣe Nkan' })}
          </p>
          <h2 className="text-7xl lg:text-[10rem] font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,215,0,0.3)] group-hover:text-[var(--adc-yellow)] group-hover:[-webkit-text-stroke:0px] transition-all duration-700 mb-2 uppercase flex justify-center items-center gap-8 serif-font leading-none">
            {t({ en: 'Join The', pcm: 'Join', ig: 'Soro', ha: 'Shiga', yo: 'Dara' })}
            <span className="material-symbols-outlined text-[6rem] lg:text-[9rem] text-[var(--adc-yellow)] transform group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 font-light">arrow_outward</span>
          </h2>
          <h2 className="text-7xl lg:text-[10rem] font-bold tracking-tighter text-white group-hover:text-[var(--adc-yellow)] transition-all duration-700 uppercase serif-font leading-none">
            {t({ en: 'Movement', pcm: 'Di Movement', ig: 'Nnọkọ', ha: 'Cunkoso', yo: 'Egbe' })}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/10 pt-16">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[var(--adc-yellow)] flex items-center justify-center rounded-sm">
                <span className="text-[var(--integrity-navy)] font-bold text-lg tracking-tight">ADC</span>
              </div>
              <div>
                <span className="font-bold text-xl tracking-[0.15em] uppercase text-white block">Uche Okonkwo</span>
                <span className="text-[10px] text-[var(--adc-yellow)] tracking-[0.2em] uppercase">African Democratic Congress</span>
              </div>
            </div>
            <p className="text-blue-200 text-sm max-w-sm leading-relaxed mb-8 font-light">
              {t({
                en: 'Elevating Idemili North & South through accountable governance, inclusive policies, and a commitment to next-generation leadership.',
                pcm: 'We dey carry Idemili up with open governance, correct policies and better leadership.',
                ig: 'Na ebuli Idemili elu site na isochi anya nke oma, na idu ndu nke oma.',
                ha: 'Ɗaukaka Idemili ta hanyar mulki mai lissafi da jagoranci na ƙarni mai zuwa.',
                yo: 'Gbígbéga Idemili Àríwá àti Gúúsù nípasẹ ìjọba tí ó ṣe àkọọlẹ.',
              })}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono tracking-widest uppercase text-[10px] text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-blue-300"/>Navigation
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
              {[
                { en: 'The Vision', pcm: 'Our Mind', ig: 'Echiche Anyị', ha: 'Mafarkin Mu', yo: 'Iran Wa' },
                { en: 'Territory Tracker', pcm: 'Check Projects', ig: 'Nlele Mpaghara', ha: 'Binciken Yanki', yo: 'Oluṣawari Agbegbe' },
                { en: 'Legislative Agenda', pcm: 'Our Plan', ig: 'Atụmatụ Iwu', ha: 'Ajanda ta Doka', yo: 'Eto Ìfòfindè' },
                { en: 'Town Hall', pcm: 'Meeting', ig: 'Ụlọ Nzukọ', ha: 'Zauren Gari', yo: 'Gbọngàn Ilu' },
              ].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-blue-200 hover:text-[var(--adc-yellow)] transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[var(--adc-yellow)] group-hover:w-4 transition-all duration-300"/>
                    {t(link)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="font-mono tracking-widest uppercase text-[10px] text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-blue-300"/>Connect
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
              {['Twitter / X', 'Instagram', 'Facebook', 'Office Locator'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-blue-200 hover:text-[var(--adc-yellow)] transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[var(--adc-yellow)] group-hover:w-4 transition-all duration-300"/>{item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-24 pt-8 border-t border-white/10 text-[10px] font-bold text-blue-300 tracking-[0.2em] uppercase">
          <p>© 2025 HON. HARRIS OKONKWO. {t({ en: 'ALL RIGHTS RESERVED.', pcm: 'NA WE GET AM.', ig: 'IHE NILE BU NKE ANYỊ.', ha: 'HAƘƘIN KOWA NAMU NE.', yo: 'GBOGBO ENI NI AWA.' })}</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-[var(--adc-yellow)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--adc-yellow)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
