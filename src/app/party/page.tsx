"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';

export default function PartyPage() {
  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <div className="w-24 h-24 bg-[var(--midnight-green)] flex items-center justify-center text-[var(--off-white)] font-serif text-4xl tracking-tighter mx-auto mb-8 shadow-xl">
            ADC
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Action Democratic Congress
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-3xl mx-auto">
            A promise of trust, progress, and inclusivity. We believe true political power rests with the people of Idemili.
          </p>
        </div>

        <section className="bg-[var(--midnight-green)] text-[var(--off-white)] py-24 px-6 mb-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl lg:text-5xl font-serif mb-8 leading-tight">
              Our Party&apos;s Philosophy in Anambra State
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Built on the foundation of character and integrity, the ADC is committed to qualitative representation. Hon. Uchenna Okonkwo represents the very best of ADC&apos;s vision—putting people first, developing grassroots infrastructure, and driving policies that actually matter.
            </p>
            <a 
              href="https://adcnigeria.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--sunlight-yellow)] text-[var(--obsidian)] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-all transform hover:-translate-y-1"
            >
              Visit ADC National <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
