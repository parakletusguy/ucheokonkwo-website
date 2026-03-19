"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerritoryTracker from '@/components/TerritoryTracker';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ProjectsPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Development Tracker', pcm: 'Project Tracker', ig: 'Ndekọ Ọrụ', ha: 'Bibiyar Ayyuka', yo: 'Itopase Ise' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Constituency Projects
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Radical transparency in action. Monitor the status, funding, and completion percentage of all our ongoing grassroots developments.
          </p>
        </div>

        <TerritoryTracker />

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
