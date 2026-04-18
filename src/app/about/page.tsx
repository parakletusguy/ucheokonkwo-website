"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegislativeAgenda from "@/components/LegislativeAgenda";
import FAQSchema, { DEFAULT_FAQS } from "@/components/FAQSchema";
import { useLanguageStore } from "@/store/useLanguageStore";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 bg-[var(--off-white)]">
        
        {/* Editorial Hero */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-12 text-center mb-16">
              <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-6">
                The Biography
              </p>
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-bold text-[var(--obsidian)] serif-font leading-[0.85] tracking-tighter">
                Hon. Uchenna <br/>
                <span className="italic font-light text-[var(--midnight-green)]">Harris Okonkwo</span>
              </h1>
              <p className="mt-12 text-2xl font-serif italic text-gray-500 max-w-3xl mx-auto">
                &ldquo;Progress You Can See. Leadership You Can Trust.&rdquo;
              </p>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl z-10">
                <Image
                  src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1774072616/IMG_3168_jn1qhe.jpg"
                  alt="Hon. Harris Okonkwo Portrait"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--sunlight-yellow)]/10 rounded-full blur-3xl -z-0"></div>
            </div>

            <div className="lg:col-span-7">
               <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed space-y-8">
                  <p className="text-2xl text-[var(--obsidian)] font-normal leading-snug">
                    Hon. Uchenna Harris Okonkwo is a progressive statesman, entrepreneur, and dedicated public servant representing the people of Idemili North and South Federal Constituency in the Nigerian House of Representatives.
                  </p>
                  <p>
                    His journey is one of bridging worlds—from the high-level boardrooms of international business to the grassroots communities of Anambra State. His legislative vision is anchored in radical transparency, community-driven development, and the belief that leadership is a sacred trust.
                  </p>
                  <div className="flex items-center gap-6 pt-6">
                    <div className="h-16 w-px bg-gray-200"></div>
                    <p className="italic text-gray-400 max-w-xs text-sm">
                      &ldquo;I come with no airs, nor entitlement. I belong to you and to this Constituency.&rdquo;
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Section: Roots & Heritage */}
        <section className="py-32 bg-white relative z-10 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[var(--obsidian)] serif-font mb-8">
                    Roots, Heritage & Early Life
                  </h2>
                  <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <p>
                      Born on April 18, 1986, in Aba, Abia State, Uche traces deep roots to <strong>Ojoto Town</strong>, the ancestral home of his paternal family, and to <strong>Oba</strong> on his mother’s side. As both maternal grandparents hail from Oba, he is a thoroughbred <em>Nwadiala</em> of that soil.
                    </p>
                    <p>
                      The eldest of six children, Uche was raised in a household that emphasized public service and responsibility. His parents, <strong>Senator Annie Okonkwo</strong> and <strong>Lady Chinyere Okonkwo</strong>, instilled in him an early understanding of the weight of leadership and the commitment required to serve the people.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-3xl p-12 aspect-square flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 opacity-10 bg-[url('https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862128/IMG_3165_gwdzkj.jpg')] bg-cover bg-center grayscale"></div>
                   <div className="relative text-center max-w-xs">
                     <span className="material-symbols-outlined text-6xl text-[var(--midnight-green)]/30 mb-6">heritage</span>
                     <p className="text-xs font-bold uppercase tracking-widest text-gray-400">The Story Begins in Idemili</p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Section: Making of a Scholar */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl lg:text-6xl font-bold text-[var(--obsidian)] serif-font mb-6">The Making of a Scholar</h2>
             <p className="text-gray-500 max-w-2xl mx-auto font-light">Formative years across three continents—shaping a global perspective for local leadership.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 title: "Foundations",
                 desc: "Chrisland Primary (Lagos) and King's College. Exceptional intellect leading him to skip Primary Six entirely.",
                 icon: "school"
               },
               {
                 title: "Global Exposure",
                 desc: "Windlesham Prep (West Sussex), Charterhouse (Surrey), and British International School (Lagos).",
                 icon: "public"
               },
               {
                 title: "Academic Depth",
                 desc: "University of Toronto: B.Sc. in Political Science & Philosophy and B.A. in Professional Writing & Communications.",
                 icon: "history_edu"
               }
             ].map((edu, idx) => (
                <div key={idx} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-8px] transition-all">
                   <span className="material-symbols-outlined text-[var(--sunlight-yellow)] text-4xl mb-6">{edu.icon}</span>
                   <h4 className="text-xl font-bold text-[var(--obsidian)] mb-4 serif-font">{edu.title}</h4>
                   <p className="text-sm text-gray-500 leading-relaxed font-light">{edu.desc}</p>
                </div>
             ))}
          </div>
          <div className="mt-16 text-center">
             <div className="inline-block p-1 bg-gradient-to-r from-[var(--midnight-green)] to-[var(--sunlight-yellow)] rounded-full">
                <div className="bg-white px-8 py-3 rounded-full text-sm font-medium italic text-gray-500 uppercase tracking-widest">
                  &ldquo;I made a promise to my father. And I kept it. That is who I am.&rdquo;
                </div>
             </div>
          </div>
        </section>

        {/* Section: The Builder */}
        <section className="py-32 bg-[var(--obsidian)] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--midnight-green)]/10 skew-x-12 -z-0"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862953/WhatsApp_Image_2026-03-17_at_12.52.14_PM_ahquhm.jpg"
                      alt="Business Builder"
                      fill
                      className="object-cover grayscale opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-4xl font-serif italic text-[var(--sunlight-yellow)]">Enterprise & Industry</p>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-6">The Builder</p>
                  <h2 className="text-4xl lg:text-5xl font-bold serif-font mb-8">Executive Leadership & Enterprise</h2>
                  <div className="space-y-6 text-gray-300 font-light leading-relaxed">
                    <p>
                      Before politics, Uche built a distinguished career as <strong>Group Executive Director</strong> of the Topwide Ventures Group—a conglomerate with interests in real estate, manufacturing, mining, and pharmaceuticals.
                    </p>
                    <p>
                      His professional philosophy is rooted in ethics: <em>&ldquo;Honesty is the norm where result is routine.&rdquo;</em> He brings the discipline of complex portfolio management and risk audits into the legislative chambers.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Visual Timeline Section */}
        <section className="py-32 bg-white px-6">
           <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                <h2 className="text-4xl lg:text-5xl font-bold serif-font mb-6">The Journey So Far</h2>
                <div className="w-24 h-1 bg-[var(--sunlight-yellow)] mx-auto"></div>
             </div>
             
             <div className="relative">
                {/* Horizontal Line (hidden on mobile) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2"></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                   {[
                     { year: "1986", event: "Born in Aba", detail: "April 18th birth to Senator Annie & Lady Chinyere Okonkwo." },
                     { year: "2010", event: "Academic Distinction", detail: "Graduated from the University of Toronto with a double degree." },
                     { year: "2015", event: "Enterprise Growth", detail: "Scaled Topwide Ventures through West African & North American markets." },
                     { year: "2023", event: "Federal Mandate", detail: "Elected to the House of Representatives for Idemili North & South." }
                   ].map((milestone, idx) => (
                      <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                         <div className="w-12 h-12 rounded-full bg-white border-2 border-[var(--midnight-green)] flex items-center justify-center mb-6 text-[var(--midnight-green)] font-bold text-sm shadow-xl group-hover:bg-[var(--midnight-green)] group-hover:text-white transition-all">
                           {milestone.year}
                         </div>
                         <h4 className="text-xl font-bold serif-font mb-3">{milestone.event}</h4>
                         <p className="text-sm text-gray-500 font-light line-clamp-2">{milestone.detail}</p>
                      </div>
                   ))}
                </div>
             </div>
           </div>
        </section>

        {/* Section: Personal Life */}
        <section className="py-32 bg-[var(--off-white)]">
           <div className="max-w-7xl mx-auto px-6">
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[var(--obsidian)] serif-font mb-8">
                    The Man Behind the Mandate
                  </h2>
                  <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                    Away from the chambers, Uche Okonkwo is a husband and father settled in Nigeria. A homecoming he describes with evident warmth.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: "menu_book", label: "Voracious Reader" },
                      { icon: "skillet", label: "Self-taught Cook" },
                      { icon: "sports_basketball", label: "Basketball Athlete" },
                      { icon: "volunteer_activism", label: "GEF Founder" }
                    ].map((hobby) => (
                      <div key={hobby.label} className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-[var(--midnight-green)]">{hobby.icon}</span>
                        <span className="text-sm font-semibold uppercase tracking-widest text-gray-400">{hobby.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative group">
                  <div className="relative aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1774072616/IMG_3168_jn1qhe.jpg"
                      alt="Uche Personal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-8 right-8 bg-[var(--sunlight-yellow)] text-[var(--obsidian)] p-6 rounded-sm shadow-2xl rotate-3">
                     <p className="font-serif italic font-bold">Nigeria is home—here all through, and happy.</p>
                  </div>
                </div>
             </div>
           </div>
        </section>

        {/* Reuse Awards & Legislative Agenda */}
        <LegislativeAgenda />

        <section className="py-24 px-6 max-w-5xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[var(--obsidian)] mb-12 text-center">
              Awards & Recognition
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Best Performing First-Time Lawmaker (2023)", provider: "UBWAN" },
                { title: "LEE Leadership Excellence Award", provider: "House Rep of the Year" },
                { title: "ICON of Youth Empowerment", provider: "Youth Assembly of Nigeria" },
                { title: "Integrity Icon of Nigeria (IION) Award", provider: "Centre for Ethics" }
              ].map((award, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-[var(--sunlight-yellow)]">
                    workspace_premium
                  </span>
                  <div>
                    <strong className="font-bold text-[var(--midnight-green)] block mb-1">{award.title}</strong>
                    <p className="text-gray-400 text-xs uppercase tracking-widest">{award.provider}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
