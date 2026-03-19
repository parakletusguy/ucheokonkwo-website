"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import Link from 'next/link';

type Props = {
  params: { town: string };
};

const townImpactData: Record<string, string[]> = {
  abatete: [
    "Construction/Rehabilitation of community road at Abatete (ongoing project)",
    "Renovation of Block C building at Notre Dame High School, Abatete",
    "Installation of solar-powered street lights across community wards",
    "Motion: Urgent Need to checkmate attacks by unknown gunmen in Abatete and Idemili North"
  ],
  nkpor: [
    "Construction of a six-classroom block at UPS Amafor Nkpor",
    "Reticulation of borehole water at the Health Centre, Amafor Nkpor (awarded)",
    "Installation of solar-powered street lights across various community wards"
  ],
  obosi: [
    "Scheduled maintenance of the Administrative Block at Community Primary School, Obosi",
    "Support for repair of damaged Obosi Town hall",
    "Petition on Abandoned Project at Umuota village, Obosi by NEWMAP",
    "Bill: Constitution Amendment for the Creation of Obosi Local Government Council (2025)",
    "Installation of solar-powered street lights"
  ],
  oba: [
    "Construction of a recreation arena for Community Primary School, Oba",
    "Construction of Ojoto Road linking Oba",
    "Support for rebuilding the community hall at Oba (awarded)",
    "Bill: Federal Polytechnic Act, Oba (Amendment) Bill, 2023",
    "Bill: Federal Teaching Hospital, Oba (Establishment) Bill, 2025",
    "Installation of solar-powered street lights"
  ],
  ojoto: [
    "Construction of Cassava Processing Plant at Ojoto",
    "Construction of Ojoto Road linking Oba",
    "Attraction of a modern ICT centre at Boys Secondary School, Ojoto",
    "Bill: Federal College of Vocational and Skill Acquisition, Ojoto (Establishment) Bill, 2025",
    "Bill: Federal College of Nursing and midwifery, Ojoto (Establishment) Bill, 2025",
    "Bill: Federal Vocational and Entrepreneurship Training Centre, Ojoto (Establishment) Bill, 2025",
    "Installation of solar-powered street lights"
  ],
  nnobi: [
    "Construction of solar-powered borehole at Nnobi",
    "Reticulation of a solar-powered borehole in three villages at Nnobi (awarded)",
    "Bill: Agricultural Research Council of Nigeria Act, Nnobi (Amendment) Bill, 2023",
    "Installation of solar-powered street lights"
  ],
  ogidi: [
    "Repair/Maintenance of transformers at Ogidi",
    "Bill: Federal College of Entrepreneurship and Skills acquisition, Ogidi (Establishment) Bill, 2023",
    "Motion: Need for construction of a Pedestrian bridge at Enekwasumpu along Onitsha-Expressway (Ogidi axis)",
    "Installation of solar-powered street lights"
  ],
  "awka-etiti": [
    "Empowerment of five Awka-Etiti youths with five Million Naira",
    "Bill: Federal Medical Centre Act, Awka-Etiti (Amendment) Bill, 2023",
    "Installation of solar-powered street lights"
  ],
  umuoji: [
    "Bill: The Nigerian Police Training College, Umuoji (Amendment) Bill, 2023",
    "Installation of solar-powered street lights"
  ],
  nnokwa: [
    "Empowerment of women and youths with strategic renewable energy skills in Nnokwa",
    "Donation of one million Naira to Nnokwa women",
    "Installation of solar-powered street lights"
  ],
  eziowelle: [
    "Bio-gas production training for Eziowelle youths and women",
    "Donation of Sewing Machines and 500k to Eziowelle Skill acquisition Centre",
    "Installation of solar-powered street lights"
  ],
  ideani: ["Installation of solar-powered street lights"],
  abacha: ["Installation of solar-powered street lights"]
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

        {/* Real Town-Specific Impact Section */}
        <section className="max-w-4xl mx-auto px-6 mb-24">
          <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sunlight-yellow)]/5 rounded-bl-full pointer-events-none"></div>
            
            <h3 className="text-3xl font-bold serif-font text-[var(--obsidian)] mb-10 flex items-center gap-4">
              <span className="material-symbols-outlined text-[var(--midnight-green)]">verified</span>
              Local Impact: {townName}
            </h3>

            {townImpactData[params.town.toLowerCase()] ? (
              <ul className="space-y-6 text-left">
                {townImpactData[params.town.toLowerCase()].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border-l-4 border-[var(--sunlight-yellow)]">
                    <span className="text-[10px] font-mono text-gray-400 mt-1">0{idx + 1}</span>
                    <p className="text-gray-700 font-light leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-gray-300">work_history</span>
                </div>
                <p className="text-gray-500 font-light max-w-sm mx-auto">
                  Comprehensive development data for {townName} is still being indexed. Visit the main <Link href="/projects" className="text-[var(--midnight-green)] font-bold underline">Projects Tracker</Link> for constituency-wide updates.
                </p>
              </div>
            )}
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
