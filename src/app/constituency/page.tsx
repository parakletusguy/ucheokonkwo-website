"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerritoryTracker from '@/components/TerritoryTracker';
import TownHall from '@/components/TownHall';
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

        {/* Bring in the Town Hall schedule component */}
        <div className="mt-24">
          <TownHall />
        </div>

      </main>
      <Footer />
    </>
  );
}
