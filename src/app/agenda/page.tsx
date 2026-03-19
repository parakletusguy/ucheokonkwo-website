"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegislativeAgenda from '@/components/LegislativeAgenda';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function AgendaPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: '10th National Assembly', pcm: '10th Assembly', ig: 'Nzukọ Omebe Iwu Nke 10', ha: 'Cikakken Majalisar Dokoki Ta 10', yo: 'Ile Igbimọ Aṣofin 10th' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Legislative Agenda
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Review the bills, motions, and committee activities championed by Hon. Uchenna Okonkwo to deliver qualitative representation for Idemili.
          </p>
        </div>

        <LegislativeAgenda />

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
