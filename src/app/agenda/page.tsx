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

        {/* 3 Years Legislative Record Section */}
        <section className="py-24 px-6 bg-[var(--off-white)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[var(--obsidian)] mb-4">Three Years of Legislative Action</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A detailed record of the Bills Sponsored, Motions moved, and Petitions submitted by Hon. Uchenna Harris Okonkwo in the 10th Assembly.</p>
            </div>

            <div className="space-y-12">
              {/* Bills Sponsored */}
              <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg border-t-4 border-[var(--midnight-green)]">
                <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--sunlight-yellow)]">gavel</span>
                  Bills Sponsored
                </h3>
                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 font-light leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">1.</span> Federal College of Entrepreneurship and Skills acquisition, Ogidi (Establishment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">2.</span> Federal Medical Centre Act, Awka-Etiti (Amendment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">3.</span> Federal Polytechnic Act, Oba (Amendment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">4.</span> Agricultural Research Council of Nigeria Act, Nnobi (Amendment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">5.</span> The Nigerian Police Training College, Umuoji (Amendment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">6.</span> Mining Intelligence & Security Through Public-Private Partnership across Mining Communities (Amendment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">7.</span> Sustainable Mining Infrastructure Development Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">8.</span> The Nigerian Mining Development Bank NMDB (Establishment) Bill, 2023</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">9.</span> Labour Act (Amendment) Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">10.</span> Federal College of Vocational and Skill Acquisition, Ojoto (Establishment) Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">11.</span> Federal Teaching Hospital, Oba (Establishment) Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">12.</span> Federal College of Nursing and midwifery, Ojoto (Establishment) Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">13.</span> Federal Vocational and Entrepreneurship Training Centre, Ojoto (Establishment) Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">14.</span> Women&apos;s Health and Surrogacy Protection, Bill, 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">15.</span> Constitution of the Federation Republic of Nigeria, 1999 (Alteration) Bill, 2025 For the Creation of Obosi Local Government Council</li>
                </ul>
              </div>

              {/* Motions & Petitions Grid */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Motions */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[var(--sunlight-yellow)]">
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--midnight-green)]">campaign</span>
                    Motions
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Need for the construction of a Pedestrian bridge at Enekwasumpu along Onitsha-Expressway</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Need to investigate the funds disbursed to the Licensed electricity distribution companies by CBN as loans under National Mass Metering Program</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Urgent Need to investigate Heritage Bank Crisis and Protect depositors interest</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Urgent Need to reposition Nigeria incentive-Based risk sharing system for agricultural lending & de-risking of agribusiness</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Urgent Need to checkmate attacks by unknown gunmen in Abatete, Idemili North</li>
                  </ul>
                </div>

                {/* Petitions */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-gray-800">
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--sunlight-yellow)]">history_edu</span>
                    Petitions
                  </h3>
                  <ul className="space-y-4 text-sm text-gray-700 font-light leading-relaxed">
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Petition on Abandoned Project at Umuota village, Obosi by NEWMAP (Submitted by Ugwuagu Family)</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Petition on Illegal Sale of Bequeathed Property (Submitted by Mr. Tochukwu Emeka Eweluzo, Idemili South)</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Petition on the high cost of importing consumer goods, events at ports & interventions towards shipping companies (Submitted by Chief Chukwudi David)</li>
                    <li className="flex items-start gap-3"><span className="text-[var(--midnight-green)] font-bold mt-1">•</span> Petition on the mysterious death and burial of Mr. Ibeh Maxwell Onyeka in Dubai without family knowledge (Submitted by Dr. Emenike Onwutalu)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
