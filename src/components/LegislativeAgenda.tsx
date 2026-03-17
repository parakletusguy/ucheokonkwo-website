"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function LegislativeAgenda() {
  const { t } = useLanguageStore();

  return (
    <section className="py-32 bg-[var(--midnight-green)] text-[var(--off-white)] overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 z-0 pointer-events-none"></div>
      
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-20 flex justify-between items-end relative z-10">
        <div>
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
            {t({ en: 'The Pillars', pcm: 'Di Main Things', ig: 'Ogidi Nke', ha: 'Ginshikan', yo: 'Awon Ọwọn' })}
          </p>
          <h2 className="text-5xl lg:text-[6rem] font-bold leading-[0.9] tracking-tighter text-white serif-font">
            {t({ en: 'LEGISLATIVE', pcm: 'LAWMAKER', ig: 'IHE OMUME', ha: 'DOKA', yo: 'ASE' })}<br/>
            <span className="italic font-light text-white/50">{t({ en: 'Agenda', pcm: 'Plan', ig: 'Atụmatụ', ha: 'Ajanda', yo: 'Eto' })}</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--midnight-green)] transition-all">
            <span className="material-symbols-outlined text-lg">west</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[var(--midnight-green)] transition-all">
            <span className="material-symbols-outlined text-lg">east</span>
          </button>
        </div>
      </div>

      <div className="marquee-container pl-6 lg:pl-12 pb-16 gap-8 relative z-10">
        {/* Card 1 */}
        <div className="marquee-card min-w-[320px] md:min-w-[420px] text-white p-10 rounded-sm flex-shrink-0 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
            <div className="flex justify-between items-start mb-12">
              <span className="text-7xl font-serif text-white/20 font-light italic">01</span>
              <button className="audio-btn text-white w-14 h-14 rounded-full flex items-center justify-center transition-all group/btn">
                <span className="material-symbols-outlined text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 bg-white/10 text-[10px] font-bold uppercase tracking-widest rounded-sm text-gray-300">Ibo Audio</span>
              </div>
              <h3 className="text-4xl font-bold mb-4 serif-font leading-tight">Healthcare<br/>Access</h3>
              <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">Equipping general hospitals and establishing primary care centers in every ward.</p>
              <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] group-hover:gap-3 transition-all">
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="marquee-card min-w-[320px] md:min-w-[420px] text-white p-10 rounded-sm flex-shrink-0 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
             <div className="flex justify-between items-start mb-12">
               <span className="text-7xl font-serif text-white/20 font-light italic">02</span>
               <button className="audio-btn text-white w-14 h-14 rounded-full flex items-center justify-center transition-all group/btn">
                 <span className="material-symbols-outlined text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
               </button>
             </div>
             <div>
               <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-1 bg-white/10 text-[10px] font-bold uppercase tracking-widest rounded-sm text-gray-300">Pidgin Audio</span>
               </div>
               <h3 className="text-4xl font-bold mb-4 serif-font leading-tight">Tech &amp;<br/>Youth</h3>
               <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">Digital skills training hubs to position Idemili youth for the global economy.</p>
               <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] group-hover:gap-3 transition-all">
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
               </a>
             </div>
          </div>
        </div>
        
        {/* Card 3 (Active) */}
        <div className="marquee-card min-w-[320px] md:min-w-[420px] bg-[var(--sunlight-yellow)] text-[var(--obsidian)] border-none p-10 rounded-sm flex-shrink-0 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
             <div className="flex justify-between items-start mb-12">
               <span className="text-7xl font-serif text-[var(--midnight-green)]/20 font-light italic">03</span>
               <button className="bg-[var(--midnight-green)] text-white w-14 h-14 rounded-full flex items-center justify-center transition-all group/btn shadow-xl hover:bg-[var(--obsidian)]">
                 <span className="material-symbols-outlined text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
               </button>
             </div>
             <div>
               <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-1 bg-[var(--midnight-green)]/10 text-[10px] font-bold uppercase tracking-widest rounded-sm text-[var(--midnight-green)]">Eng Audio</span>
               </div>
               <h3 className="text-4xl font-bold mb-4 serif-font leading-tight">Trade &amp;<br/>Commerce</h3>
               <p className="text-sm text-[var(--midnight-green)]/80 mb-8 font-light leading-relaxed">Revitalizing local markets and securing micro-credit facilities for traders.</p>
               <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--midnight-green)] group-hover:gap-3 transition-all">
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
               </a>
             </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="marquee-card min-w-[320px] md:min-w-[420px] text-white p-10 rounded-sm flex-shrink-0 relative overflow-hidden group pr-16">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"></div>
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
             <div className="flex justify-between items-start mb-12">
               <span className="text-7xl font-serif text-white/20 font-light italic">04</span>
             </div>
             <div>
               <h3 className="text-4xl font-bold mb-4 serif-font leading-tight">Core<br/>Infrastructure</h3>
               <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">Strategic road networks and sustainable energy solutions for rural areas.</p>
               <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] group-hover:gap-3 transition-all">
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
               </a>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
