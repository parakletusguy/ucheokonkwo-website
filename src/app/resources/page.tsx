"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeComponent from '@/components/QRCodeComponent';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ResourcesPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Knowledge & Assets', pcm: 'Information & Tools', ig: 'Mmụta na Ngwa Ọrụ', ha: 'Ilimi da Kayan Aiki', yo: 'Imọ & Awọn Ohun-ini' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Resources
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Access official documents, campaign materials, and educational resources championed by Hon. Uchenna Okonkwo.
          </p>
        </div>

        <section className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-[var(--midnight-green)]/5 to-transparent">
              <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-6">Official E-Brochure</h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                Download the comprehensive guide to Hon. Uchenna Okonkwo&apos;s legislative agenda, constituency achievements, and vision for Idemili.
              </p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="/e-brochure.pdf" 
                  download 
                  className="bg-[var(--midnight-green)] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all flex items-center gap-3 shadow-lg"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download PDF
                </a>
                
                <a 
                  href="/e-brochure.pdf" 
                  target="_blank"
                  className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 text-[var(--obsidian)] hover:bg-gray-50 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Read Online
                </a>
              </div>
            </div>
            
            <div className="p-12 bg-[var(--midnight-green)] flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <QRCodeComponent 
                  value="https://www.uchennaokonkwo.com/resources" 
                  size={180}
                  label="Scan to Share"
                />
              </div>
              <p className="text-[var(--sunlight-yellow)] font-bold text-xs uppercase tracking-[0.2em] opacity-80">
                Easy Reference QR Code
              </p>
              <p className="text-white/60 text-[10px] mt-2 max-w-[200px]">
                Share this QR code on publicity materials to give people instant access to the e-brochure and resources.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
