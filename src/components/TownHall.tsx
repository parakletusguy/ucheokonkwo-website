"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function TownHall() {
  const { t } = useLanguageStore();

  return (
    <section className="py-32 bg-[var(--off-white)] relative z-20">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="gradient-border-card p-1 lg:p-1.5 shadow-2xl relative">
          <div className="bg-[var(--obsidian)] rounded-[1.2rem] p-10 lg:p-20 text-white grid lg:grid-cols-2 gap-20 items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] z-0 pointer-events-none"></div>
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[var(--midnight-green)] rounded-full blur-[100px] opacity-40 z-0"></div>
            
            <div className="relative z-10">
              <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
                {t({ en: 'Direct Access', pcm: 'Direct Line', ig: 'Ohere Nkwurịta', ha: 'Hanya Kai Tsaye', yo: 'Ayewo Taarata' })}
              </p>
              <h2 className="text-5xl lg:text-[5rem] font-bold mb-8 serif-font leading-[0.9] tracking-tighter">
                {t({ en: 'The Town Hall', pcm: 'Di Town Hall', ig: 'Ụlọ Nzukọ Ahụ', ha: 'Dakin Taron', yo: 'Gbọngàn Ilu' })}<br/>
                <span className="italic font-light text-[var(--sunlight-yellow)]">{t({ en: 'Is Open.', pcm: 'Don Open.', ig: 'Emegheela.', ha: 'A Bude Yake.', yo: 'Ti Ṣii.' })}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed font-light max-w-md">
                {t({ 
                  en: 'Skip the bureaucracy. Send a direct message to the constituency office. We review and tag every submission for action.',
                  pcm: 'Write us directly, no protocol. We dey check everything wey concern you.',
                  ig: 'Ziga ozi n\'ọfịs obodo ozugbo. Anyị na-elegide anya n\'arịrịọ niile.'
                })}
              </p>
              
              <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
                <div className="flex -space-x-4">
                   <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[var(--obsidian)] flex items-center justify-center shadow-lg">
                     <span className="material-symbols-outlined text-sm text-gray-400">support_agent</span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-[var(--midnight-green)] border-2 border-[var(--obsidian)] flex items-center justify-center shadow-lg">
                     <span className="material-symbols-outlined text-sm text-[var(--sunlight-yellow)]">done_all</span>
                   </div>
                 </div>
                 <div>
                   <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Avg. Response Time</p>
                   <p className="font-bold text-white tracking-wider">48 HOURS</p>
                 </div>
              </div>
            </div>

            <div className="glass-panel rounded-sm p-8 lg:p-10 relative z-10">
               <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                 <div className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sunlight-yellow)] opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--sunlight-yellow)]"></span>
                 </div>
                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">Direct Line Active</span>
               </div>

               <form className="space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                   <div className="relative group">
                     <label className="block text-[9px] text-gray-500 mb-1 font-mono uppercase tracking-widest group-focus-within:text-[var(--sunlight-yellow)] transition-colors">{t({ en: 'Your Location', pcm: 'Your Area', ig: 'Ebe Ị Nọ' })}</label>
                     <select className="form-input w-full bg-transparent text-sm appearance-none cursor-pointer">
                        <option className="bg-[var(--obsidian)] text-white" value="">Select Ward...</option>
                        
                        <optgroup label="Idemili North" className="bg-[var(--obsidian)] text-[var(--sunlight-yellow)] font-bold italic">
                          <option className="bg-[var(--obsidian)] text-white">Abatete</option>
                          <option className="bg-[var(--obsidian)] text-white">Abacha</option>
                          <option className="bg-[var(--obsidian)] text-white">Eziowelle</option>
                          <option className="bg-[var(--obsidian)] text-white">Ideani</option>
                          <option className="bg-[var(--obsidian)] text-white">Nkpor I</option>
                          <option className="bg-[var(--obsidian)] text-white">Nkpor II</option>
                          <option className="bg-[var(--obsidian)] text-white">Obosi</option>
                          <option className="bg-[var(--obsidian)] text-white">Ogidi I</option>
                          <option className="bg-[var(--obsidian)] text-white">Ogidi II</option>
                          <option className="bg-[var(--obsidian)] text-white">Oraukwu</option>
                          <option className="bg-[var(--obsidian)] text-white">Uke</option>
                          <option className="bg-[var(--obsidian)] text-white">Umuoji</option>
                        </optgroup>

                        <optgroup label="Idemili South" className="bg-[var(--obsidian)] text-[var(--sunlight-yellow)] font-bold italic">
                          <option className="bg-[var(--obsidian)] text-white">Akwu-Ukwu</option>
                          <option className="bg-[var(--obsidian)] text-white">Alor I</option>
                          <option className="bg-[var(--obsidian)] text-white">Alor II</option>
                          <option className="bg-[var(--obsidian)] text-white">Awka-Etiti I</option>
                          <option className="bg-[var(--obsidian)] text-white">Awka-Etiti II</option>
                          <option className="bg-[var(--obsidian)] text-white">Nnobi I</option>
                          <option className="bg-[var(--obsidian)] text-white">Nnobi II</option>
                          <option className="bg-[var(--obsidian)] text-white">Nnobi III</option>
                          <option className="bg-[var(--obsidian)] text-white">Nnokwa</option>
                          <option className="bg-[var(--obsidian)] text-white">Oba I</option>
                          <option className="bg-[var(--obsidian)] text-white">Oba II</option>
                          <option className="bg-[var(--obsidian)] text-white">Ojoto</option>
                        </optgroup>
                      </select>
                     <span className="material-symbols-outlined absolute right-0 bottom-3 text-gray-500 text-sm pointer-events-none group-focus-within:text-[var(--sunlight-yellow)] transition-colors">expand_more</span>
                   </div>
                   <div className="relative group">
                     <label className="block text-[9px] text-gray-500 mb-1 font-mono uppercase tracking-widest group-focus-within:text-[var(--sunlight-yellow)] transition-colors">{t({ en: 'Topic', pcm: 'Wetin Concern You', ig: 'Ihe Obu' })}</label>
                     <select className="form-input w-full bg-transparent text-sm appearance-none cursor-pointer">
                       <option className="bg-[var(--obsidian)] text-white">Select Topic...</option>
                       <option className="bg-[var(--obsidian)] text-white">Project Suggestion</option>
                       <option className="bg-[var(--obsidian)] text-white">Urgent Infrastructure</option>
                       <option className="bg-[var(--obsidian)] text-white">General Inquiry</option>
                     </select>
                     <span className="material-symbols-outlined absolute right-0 bottom-3 text-gray-500 text-sm pointer-events-none group-focus-within:text-[var(--sunlight-yellow)] transition-colors">expand_more</span>
                   </div>
                 </div>

                 <div className="relative group mt-8">
                   <label className="block text-[9px] text-gray-500 mb-1 font-mono uppercase tracking-widest group-focus-within:text-[var(--sunlight-yellow)] transition-colors">{t({ en: 'Message', pcm: 'Message', ig: 'Ozi' })}</label>
                   <textarea className="form-input w-full resize-none text-sm placeholder-gray-600" placeholder="Type your message here..." rows={3}></textarea>
                 </div>

                 <div className="flex justify-end pt-6">
                   <button className="bg-gradient-to-r from-[var(--sunlight-yellow)] to-[#e5bc5c] text-[var(--obsidian)] px-10 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(255,209,102,0.4)] transition-all flex items-center gap-3 transform hover:-translate-y-1" type="button">
                     {t({ en: 'Send Message', pcm: 'Send Am', ig: 'Zipụ Ozi' })} <span className="material-symbols-outlined text-sm">send</span>
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
