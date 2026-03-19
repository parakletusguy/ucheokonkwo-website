"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import Link from 'next/link';
import { useLanguageStore } from '@/store/useLanguageStore';

const TOWNS_NORTH = ['Ogidi', 'Nkpor', 'Obosi', 'Ideani', 'Uke', 'Umuoji', 'Ojoto'];
const TOWNS_SOUTH = ['Alor', 'Nnobi', 'Awka-Etiti', 'Oraukwu', 'Oba', 'Akwa'];

export default function TownsIndexPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Local Communities', pcm: 'Our Communities', ig: 'Obodo Anyị', ha: 'Al\'ummomin Mu', yo: 'Awon Agbegbe Wa' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Towns in Idemili
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Explore dedicated updates, project tracking, and news for every community across the Idemili North and South Federal Constituency.
          </p>
        </div>

        <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-24">
          {/* Idemili North */}
          <div>
            <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-8 pb-4 border-b border-gray-200">
              Idemili North
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {TOWNS_NORTH.map(town => (
                <Link 
                  href={`/towns/${town.toLowerCase()}`} 
                  key={town}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--sunlight-yellow)] transition-all group flex items-center justify-between"
                >
                  <span className="font-semibold text-[var(--obsidian)] group-hover:text-[var(--midnight-green)]">{town}</span>
                  <span className="material-symbols-outlined text-sm text-gray-400 group-hover:text-[var(--sunlight-yellow)] transition-colors">arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Idemili South */}
          <div>
            <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-8 pb-4 border-b border-gray-200">
              Idemili South
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {TOWNS_SOUTH.map(town => (
                <Link 
                  href={`/towns/${town.toLowerCase()}`} 
                  key={town}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[var(--sunlight-yellow)] transition-all group flex items-center justify-between"
                >
                  <span className="font-semibold text-[var(--obsidian)] group-hover:text-[var(--midnight-green)]">{town}</span>
                  <span className="material-symbols-outlined text-sm text-gray-400 group-hover:text-[var(--sunlight-yellow)] transition-colors">arrow_forward</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
