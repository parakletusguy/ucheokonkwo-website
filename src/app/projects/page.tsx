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

        {/* 3 Years of Impact Section */}
        <section className="py-24 px-6 bg-[var(--off-white)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[var(--obsidian)] mb-4">Three Years of Tangible Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A comprehensive breakdown of Hon. Uchenna Harris Okonkwo&apos;s infrastructure, education, and empowerment initiatives across Idemili North and South.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Infrastructure */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">foundation</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Infrastructure</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction/Rehabilitation of community road at Abatete (ongoing project)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of a six-classroom block at UPS Amafor Nkpor</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Renovation of Block C building at Notre Dame High School, Abatete</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Scheduled maintenance of the Administrative Block at Community Primary School, Obosi</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of a recreation arena for Community Primary School, Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of Cassava Processing Plant at Ojoto</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of Ojoto Road linking Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of solar-powered borehole at Nnobi</li>
                </ul>
              </div>

              {/* Education */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">school</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Education</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Payment of fees for 250 JAMB candidates</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Scholarships for 500 Anambra students</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of a modern ICT centre at Boys Secondary School, Ojoto</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of student grants for university students</li>
                </ul>
              </div>

              {/* Social Amenities */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">water_drop</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Social Amenities</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Installation of solar-powered street lights across various communities (Ogidi, Nkpor, Obosi, Ojoto, Ideani, Nnobi, Awka-Etiti, Oba, UmuOji, Nnokwa, Eziowelle, Abacha, Abatete)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Supply of food items to 5,000 households, including the elderly, widows, and people living with disabilities</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Reticulation of a solar-powered borehole in three villages at Nnobi and donation of Shuttle bus to Idemili South LGA workers</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Support for rebuilding the community hall at Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Repair/Maintenance of transformers at Ogidi</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Reticulation of borehole water at the Health Centre, Amafor Nkpor</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of relief materials for people affected by floods and gully erosion</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Support for repair of damaged Obosi Town hall</li>
                </ul>
              </div>

              {/* Empowerment */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">handshake</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Empowerment</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Training of women and youths on renewable energy (solar, biomass, hydropower, and wind energy)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of women and youths with strategic renewable energy skills in Nnokwa</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Bio-gas production training for Eziowelle youths and women</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of artisans with sewing & grinding machines, POS, clippers, and cash grants</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of farmers with 50kg bags of urea fertilisers</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Business grants to 100 SME owners</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Training of Youths on digital skills acquisition</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of climate adaptation, resilience, peace-building awareness, and sensitization for stakeholders</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Facilitation of federal government employment for professionals in Idemili North and South</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Facilitation of Trade and tech training for Idemili youths in China</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of five Awka-Etiti youths with five Million Naira</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Youth Empowerment through Sponsorship of UAO Football League 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Donation of one million to Nnokwa women</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Donation of Sewing Machines and 500k to Eziowelle Skill acquisition Centre</li>
                </ul>
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
