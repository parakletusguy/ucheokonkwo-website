"use client";

import React from "react";
import Image from "next/image";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Hero() {
  const { t } = useLanguageStore();

  return (
    <section className="relative pt-32 lg:pt-0 min-h-screen flex items-center bg-[var(--off-white)] overflow-hidden">
      <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-bl from-[var(--midnight-green)]/10 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-20 w-[50vw] h-[50vw] bg-[var(--midnight-green)] rounded-full blur-[160px] opacity-15 -z-10"></div>

      <div className="max-w-[90rem] mx-auto w-full px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 lg:pr-10 relative z-20">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
            {t({
              en: "Idemili North & South",
              pcm: "Idemili North & South Na Here",
              ig: "Idemili Ugwu na Ndịda",
              ha: "Idemili Arewa da Kudu",
              yo: "Idemili Ariwa ati Guusu",
            })}
          </p>

          {/* DO NOT ALTER THIS HERO TEXT PER THE PRD */}
          <h1 className="text-7xl lg:text-[10rem] font-bold leading-[0.8] tracking-[-0.04em] text-[var(--obsidian)] mb-8 mix-blend-multiply serif-font">
            {t({
              en: "OUR",
              pcm: "OUR",
              ig: "NKE ANYỊ",
              ha: "NAMU",
              yo: "TIWA",
            })}
            <br />
            <span className="italic font-light text-[var(--midnight-green)] pr-4">
              {t({
                en: "Shared",
                pcm: "Together",
                ig: "Kekọrịta",
                ha: "Raba",
                yo: "Pín",
              })}
            </span>
            <br />
            {t({
              en: "VISION",
              pcm: "VISION",
              ig: "ỌHỤỤ",
              ha: "HANGEN NESA",
              yo: "IRAN",
            })}
          </h1>

          <p className="text-xl lg:text-2xl text-gray-500 max-w-xl font-light leading-relaxed mb-12 pl-6 border-l border-[var(--midnight-green)]/20">
            {t({
              en: "Redefining representation through radical transparency, community-driven development, and inclusive dialogue.",
              pcm: "We dey change the way dem dey represent us. Everything open, we build our community together.",
              ig: "Ịkọwapụta nnọchite anya site n'izizi anya, mmepe nke obodo, na mkparịta ụka gụnyere mmadụ niile.",
              ha: "Sake fasalin wakilci ta hanyar bayyana gaskiya, cigaban al'umma, da tattaunawa.",
              yo: "Atunse asoju nipasẹ ifarahan kikan, idagbasoke agbegbe, ati ijiroro to kun fun gbogbo eniyan.",
            })}
          </p>

          <div className="flex items-center gap-8">
            <button className="bg-[var(--midnight-green)] text-[var(--off-white)] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--obsidian)] transition-all flex items-center gap-3 group soft-shadow">
              {t({
                en: "Explore Agenda",
                pcm: "See Wetin We Get",
                ig: "Lelee Atụmatụ",
                ha: "Bincika Ajanda",
                yo: "Ṣawari Eto",
              })}
              <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 transition-all"></span>
            </button>
            <a
              href="#"
              className="flex items-center gap-3 font-medium text-[var(--obsidian)] uppercase tracking-widest text-xs hover:text-[var(--midnight-green)] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--obsidian)]/20 flex items-center justify-center group-hover:border-[var(--midnight-green)] transition-colors">
                <span className="material-symbols-outlined text-sm">
                  play_arrow
                </span>
              </div>
              {t({
                en: "Watch Video",
                pcm: "Watch Di Video",
                ig: "Lekwaa Vidiyo",
                ha: "Kalli Bidiyo",
                yo: "Wo Fidio",
              })}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative mt-16 lg:mt-0">
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
            {/*
              next/image: Automatic WebP/AVIF conversion (~60% smaller than JPG),
              lazy loading, size hints prevent layout shift (CLS=0).
              priority=true on hero image to avoid LCP penalty.
            */}
            <Image
              src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1773862128/IMG_3165_gwdzkj.jpg"
              alt="Hon. Harris Portrait"
              fill
              priority
              className="object-cover contrast-125 [object-position:30%_top]"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 border-l border-[var(--midnight-green)]/30 z-20 pointer-events-none"></div>
            <div className="absolute top-1/4 -right-12 w-32 h-32 bg-[var(--sunlight-yellow)]/10 rounded-full blur-2xl z-0 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-[var(--midnight-green)] py-3 z-30 flex items-center border-t border-white/10">
        <div className="bg-[var(--sunlight-yellow)] text-[var(--obsidian)] font-bold uppercase tracking-[0.2em] text-[10px] px-6 py-3 absolute left-0 z-40 whitespace-nowrap h-full flex items-center border-r border-black/10">
          {t({
            en: "LIVE UPDATES",
            pcm: "AS E DEY HOT",
            ig: "IHE NA EME UGBUA",
            ha: "SABBIN LABARAI",
            yo: "AWON IROYIN TUNTUN",
          })}
        </div>
        <div className="ticker-wrap ml-32 py-1">
          <div className="ticker font-medium text-xs tracking-widest uppercase text-white/80">
            <span className="mx-8 text-[var(--sunlight-yellow)] opacity-50">
              •
            </span>{" "}
            {t({
              en: "Nnobi-Alor Road Rehab Commences Phase 2",
              pcm: "Nnobi-Alor Road Work Don Start Phase 2",
              ig: "Arụmọrụ Ụzọ Nnobi-Alor Ebidiwo Nke Abụọ",
            })}
            <span className="mx-8 text-[var(--sunlight-yellow)] opacity-50">
              •
            </span>{" "}
            {t({
              en: "Obosi General Hospital Equipment Delivery Complete",
              pcm: "Obosi Hospital Equipments Don Arrive Complete",
              ig: "Ngwongwo Ụlọ Ọgwụ Obosi Eruola N'uju",
            })}
            <span className="mx-8 text-[var(--sunlight-yellow)] opacity-50">
              •
            </span>{" "}
            {t({
              en: "Next Town Hall: Ideani Civic Center, Oct 15",
              pcm: "Next Meeting: Ideani Civic Center, Oct 15",
              ig: "Nzukọ Ọzọ: Ideani Civic Center, Ọktọba 15",
            })}
            <span className="mx-8 text-[var(--sunlight-yellow)] opacity-50">
              •
            </span>{" "}
            {t({
              en: "Youth Tech Empowerment Drive Registration Opens",
              pcm: "Youth Tech Registration Don Open",
              ig: "Ndebanye Aha Nkwado Ndị Ntorobịa Ebidola",
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
