"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ElectionsPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'The Road Ahead', pcm: 'As E Dey Go', ig: 'Njem Anyị', ha: 'Hanyar Gaba', yo: 'Ona Tuntun' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            2027 General Elections
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-3xl mx-auto">
            Stay informed about key dates, voter registration, and our ongoing campaign to secure qualitative representation for Idemili North & South in the 10th Assembly and beyond.
          </p>
        </div>

        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="bg-[var(--midnight-green)] p-12 text-[var(--off-white)] md:w-1/3 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-5xl text-[var(--sunlight-yellow)] mb-4">how_to_vote</span>
              <h3 className="text-2xl font-bold serif-font mb-2">Get Your PVC</h3>
              <p className="text-sm text-white/80">Make your voice count in 2027.</p>
            </div>
            <div className="p-12 md:w-2/3 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-[var(--obsidian)] mb-4">Voter Registration Status</h4>
              <p className="text-gray-500 font-light mb-6">
                Continuous Voter Registration (CVR) updates will be posted here as announced by INEC. Ensure your Permanent Voter Card is ready for the upcoming polls.
              </p>
              <a 
                href="https://cvs.inecnigeria.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex max-w-max items-center gap-2 bg-[var(--obsidian)] text-[var(--off-white)] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[var(--midnight-green)] transition-all"
              >
                Check INEC Portal <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
