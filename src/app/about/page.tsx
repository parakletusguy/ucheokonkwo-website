"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LegislativeAgenda from '@/components/LegislativeAgenda';
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

        {/* ADC Philosophy Section */}
        <section className="bg-[var(--midnight-green)] text-[var(--off-white)] py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase mb-4 text-[var(--sunlight-yellow)]">
              {t({ en: "The ADC Philosophy", pcm: "Wetin ADC Stand For", ig: "Uche ADC", ha: "Tunanin ADC", yo: "Ilana ADC" })}
            </h2>
            <h3 className="text-4xl lg:text-5xl font-serif mb-10 leading-tight">
              {t({
                en: "A Promise of Trust, Progress, and Inclusivity",
                pcm: "Promise to do better, move forward, and carry everybody along",
                ig: "Nkwa nke Ntụkwasị Obi, Ọganihu, na Nsonye",
                ha: "Alkawarin Gaskiya, Cigaba, da Sakasa kowa Ciki",
                yo: "Ileri Igbẹkẹle, Ilọsiwaju, ati Ifaramọ"
              })}
            </h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              {t({
                en: "The African Democratic Congress (ADC) is built on the foundation of character and integrity. We believe that true political power rests with the people, and qualitative representation is a right, not a privilege.",
                pcm: "ADC stand on top good character. We believe say na people get power, and proper representation na everybody right.",
                ig: "Eguzobere African Democratic Congress (ADC) na ntọala ezigbo agwa. Anyị kwenyere na ike ndọrọ ndọrọ ọchịchị dị n'aka ndị ọchịchị.",
                ha: "An gina jam'iyyar ADC ne kan kyakkyawar dabi'a da mutunci. Mun yi imani cewa ikon siyasa gaskiya yana hannun mutane.",
                yo: "Ẹgbẹ oṣelu African Democratic Congress (ADC) da lori iwa ati otitọ. A gbagbọ pe agbara oṣelu ti tootọ wa lọwọ awọn eeyan."
              })}
            </p>
          </div>
        </section>

        {/* Reusing existing component to flesh out the About page structure per sitemap */}
        <LegislativeAgenda />
      </main>
      <Footer />
    </>
  );
}
