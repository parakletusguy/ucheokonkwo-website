"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import Link from 'next/link';

type Props = {
  params: { town: string };
};

export default function TownDynamicPage({ params }: Props) {
  // Capitalize town name for display
  const townName = params.town.charAt(0).toUpperCase() + params.town.slice(1);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center">
          <Link href="/towns" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--midnight-green)] transition-colors mb-8">
            <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
            Back to Towns Index
          </Link>
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            Idemili Federal Constituency
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            {townName} Community
          </h1>
          <p className="text-lg text-gray-500 font-light mx-auto">
            Hon. Uchenna Okonkwo&apos;s development footprint, legislative impact, and ongoing public works in the resilient community of {townName}.
          </p>
        </div>

        {/* Placeholder for specific town projects */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-[var(--sunlight-yellow)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-2xl text-[var(--obsidian)]">construction</span>
            </div>
            <h3 className="text-2xl font-bold serif-font text-[var(--obsidian)] mb-4">
              Project Data Loading...
            </h3>
            <p className="text-gray-500 font-light">
              We are currently compiling the comprehensive list of infrastructure developments, micro-credit allocations, and legislative interventions specifically targeting {townName}.
            </p>
          </div>
        </section>

        {/* Local SEO Place Schema for Geo-Targeting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Place',
              name: `${townName}, Anambra State`,
              containedInPlace: {
                '@type': 'AdministrativeArea',
                name: 'Idemili North and South, Anambra State, Nigeria'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: townName,
                addressRegion: 'Anambra State',
                addressCountry: 'NG'
              }
            })
          }}
        />

        {/* Global SEO FAQ block */}
        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
