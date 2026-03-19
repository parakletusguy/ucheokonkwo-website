"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegislativeAgenda from '@/components/LegislativeAgenda';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';
import Image from 'next/image';

export default function AboutPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32">
        {/* Biography Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDICh4AMUcG5JNh1nS9xYdeTEtJNRAEyeK7-KDAZnjhJFZ5gr8UDQUCjbJt3oTKfeSik1c-BS-ub93q_nbDKqrrVfhYZQO2McT6qXJDJlrY7hh9y4slJ9fDCO1ca3VppeQBeNCl5IishegNXZGvjohSVdpw5VpT1pppn-TKRaIZVYiTW0lOQjpKN0MYW8bdWuSZIikg1MPmQu_iQIsMi1Vg6N4AaBG8MhVxWdFWSFkSfBl0TytqxucLlf2wo3EZkVb1R8EOvLYj8ls"
              alt="Hon. Harris Okonkwo Portrait"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] mb-8 serif-font">
              {t({
                en: "Biography & Track Record",
                pcm: "Who Be Hon. Harris?",
                ig: "Nkọwa Ndụ na Ihe NDị Ọ Rụgoro",
                ha: "Tarihin Rayuwa da Ayyukan Daya Gabata",
                yo: "Igbesi Aye & Awọn Aṣeyọri Rẹ"
              })}
            </h1>
            <div className="text-lg text-gray-600 space-y-6 font-light leading-relaxed">
              <p>
                {t({
                  en: "Hon. Harris Uchenna Okonkwo is a progressive statesman, entrepreneur, and dedicated public servant representing the resilient people of Idemili North and South.",
                  pcm: "Hon. Harris Uchenna Okonkwo na correct leader and businessman wey dey represent the strong people of Idemili North and South.",
                  ig: "Hon. Harris Uchenna Okonkwo bụ onye ndọrọ ndọrọ ọchịchị na onye achụmnta ego na anọchite anya ndị Idemili Ugwu na Ndịda.",
                  ha: "Hon. Harris Uchenna Okonkwo babban dan siyasa ne, kuma dan kasuwa wanda ke wakiltar al'ummar Idemili Arewa da Kudu.",
                  yo: "Hon. Harris Uchenna Okonkwo jẹ adari onitẹsiwaju, onisowo, ati aṣoju awon eeyan Idemili Ariwa ati Guusu."
                })}
              </p>
              <p>
                {t({
                  en: "Through radical transparency, community-driven development, and inclusive dialogue, he has championed policies that directly impact grassroots growth, youth empowerment, and infrastructure development.",
                  pcm: "E don use open hands and community support push policies wey dey help local people grow, empower youth, and build better infrastructure.",
                  ig: "Site n'izizi anya na mmepe nke obodo, ọ kwadoro atụmatụ ndị na-ebuli uto na nchekwa ala, inye ndị ntorobịa ume, na mmepe akụrụngwa.",
                  ha: "Ta hanyar gaskiya a bayyane, ya kawo tsare-tsare da zasu taimaka wa cigaban al'umma da kuma gina ingantattun hanyoyi.",
                  yo: "Nipasẹ iṣẹ rẹ ti o tọ ati idagbasoke agbegbe, o ṣe atilẹyin awọn ilana ti o ṣe iranlọwọ fun idagbasoke igberiko, iwuri fun awọn ọdọ ati kikọ idasile to dara."
                })}
              </p>
            </div>
          </div>
        </section>



        {/* Reusing existing component to flesh out the About page structure per sitemap */}
        <LegislativeAgenda />

        {/* Global SEO FAQ block */}
        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
