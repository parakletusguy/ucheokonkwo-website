"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-[var(--obsidian)] text-white pt-32 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--midnight-green)] to-transparent opacity-50"></div>
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-32 group cursor-pointer inline-block w-full">
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-8">{t({ en: 'Take Action', pcm: 'Do Something', ig: 'Mee Ihe Obu' })}</p>
          <h2 className="text-7xl lg:text-[11rem] font-bold tracking-tighter text-transparent -webkit-text-stroke-1 -webkit-text-stroke-white/30 group-hover:text-[var(--midnight-green)] group-hover:-webkit-text-stroke-transparent transition-all duration-700 mb-2 uppercase flex justify-center items-center gap-8 serif-font leading-none">
            {t({ en: 'Join The', pcm: 'Join', ig: 'Soro', ha: 'Shiga', yo: 'Dara' })}
            <span className="material-symbols-outlined text-[6rem] lg:text-[10rem] text-[var(--sunlight-yellow)] transform group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 font-light">arrow_outward</span>
          </h2>
          <h2 className="text-7xl lg:text-[11rem] font-bold tracking-tighter text-white group-hover:text-[var(--midnight-green)] transition-all duration-700 uppercase serif-font leading-none">
            {t({ en: 'Movement', pcm: 'Di Movement', ig: 'Nnọkọ', ha: 'Cunkoso', yo: 'Egbe' })}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/5 pt-16">
          <div className="md:col-span-5">
             <div className="flex items-center gap-6 mb-8">
               <div className="w-12 h-12 bg-[var(--midnight-green)] flex items-center justify-center text-[var(--off-white)] font-serif text-2xl tracking-tighter">
                   ADC
               </div>
               <span className="font-bold text-xl tracking-[0.2em] uppercase text-white">Hon. Harris</span>
             </div>
             <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8 font-light">
                 {t({ en: 'Elevating Idemili through sophisticated governance, actionable policies, and a commitment to next-generation leadership.', pcm: 'We dey carry Idemili up with soft governance, correct policies and better leadership.', ig: 'Na ebuli Idemili elu site na isochi anya nke oma, na idu ndu nke oma.' })}
             </p>
          </div>
          
          <div className="md:col-span-3">
             <h4 className="font-mono tracking-widest uppercase text-[10px] text-gray-500 mb-8 flex items-center gap-3">
               <span className="w-4 h-[1px] bg-gray-700"></span> Navigation
             </h4>
             <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> {t({ en: 'The Vision', pcm: 'Our Mind' })}</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> {t({ en: 'Territory Tracker', pcm: 'Check Projects' })}</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> {t({ en: 'Legislative Agenda', pcm: 'Our Plan' })}</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> {t({ en: 'Town Hall', pcm: 'Meeting' })}</a></li>
             </ul>
          </div>
          
          <div className="md:col-span-4">
             <h4 className="font-mono tracking-widest uppercase text-[10px] text-gray-500 mb-8 flex items-center gap-3">
               <span className="w-4 h-[1px] bg-gray-700"></span> Connect
             </h4>
             <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> Twitter / X</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> Instagram</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> Facebook</a></li>
               <li><a href="#" className="text-gray-300 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group"><span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"></span> Office Locator</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-white/5 text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase">
          <p>© 2024 HON. HARRIS OKONKWO. {t({ en: 'ALL RIGHTS RESERVED.', pcm: 'NA WE GET AM.', ig: 'IHE NILE BU NKE ANYỊ.' })}</p>
          <div className="flex gap-8 mt-6 md:mt-0">
             <a href="#" className="hover:text-[var(--sunlight-yellow)] transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-[var(--sunlight-yellow)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
