"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerritoryTracker from '@/components/TerritoryTracker';
import TownHall from '@/components/TownHall';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ConstituencyPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Idemili North & South', pcm: 'Idemili North & South Na Here', ig: 'Idemili Ugwu na Ndịda', ha: 'Idemili Arewa da Kudu', yo: 'Idemili Ariwa ati Guusu' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font">
            {t({
              en: "The Constituency",
              pcm: "Our Area",
              ig: "Mpaghara Anyị",
              ha: "Mazabar Mu",
              yo: "Agbegbe Wa"
            })}
          </h1>
          <p className="mt-6 text-xl text-gray-500 font-light max-w-2xl mx-auto">
            {t({
              en: "Track our ongoing grassroots development projects and join the conversation at our next digital town hall.",
              pcm: "Follow our development work for ground and join the talk for our next town hall meeting.",
              ig: "Soro anyị hụ ọrụ mmepe anyị na abụghị n'isi ụlọ ọrụ gọọmentị, biko sonye na nzukọ town hall anyị.",
              ha: "Bibiya ayyukanmu na cigaba kuma shiga tattaunawar mu a taron garin na gaba.",
              yo: "Tẹle awọn iṣẹ idagbasoke wa ki o darapọ mọ ibaraẹnisọrọ ni ipade gbogbo ilu wa ti nbọ."
            })}
          </p>
        </div>

        {/* Bring in the interactive Territory Tracker component */}
        <TerritoryTracker />

        {/* Constituency Map Embed for Local SEO */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-8 text-center">Interactive Constituency Map</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-96 grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126839.29742691866!2d6.86558531776953!3d6.1558223611116245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043936c53fa1109%3A0xe5a3ebce58428ea8!2sIdemili%20North%2C%20Anambra!5e0!3m2!1sen!2sng!4v1715093510000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Constituency Boundaries Map"
            ></iframe>
          </div>
        </div>

        {/* Bring in the Town Hall schedule component */}
        <div className="mt-24">
          <TownHall />
        </div>

        {/* SEO FAQ schema block */}
        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
