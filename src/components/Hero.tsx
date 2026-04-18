"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguageStore } from "@/store/useLanguageStore";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

const STATIC_TICKER = [
  "Nnobi-Alor Road Rehab Commences Phase 2",
  "Obosi General Hospital Equipment Delivery Complete",
  "Next Town Hall: Ideani Civic Center, Oct 15",
  "Youth Tech Empowerment Drive Registration Opens",
];

import QRCodeComponent from "@/components/QRCodeComponent";

export default function Hero() {
  const { t } = useLanguageStore();
  const [tickerItems, setTickerItems] = useState<string[]>(STATIC_TICKER);

  useEffect(() => {
    fetch(`${API_BASE}/posts`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: unknown) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const published = (data as { status: string; title: string }[])
          .filter((p) => p.status === "PUBLISHED")
          .slice(0, 6)
          .map((p) => p.title);
        if (published.length > 0) setTickerItems(published);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative pt-32 min-h-screen flex items-center bg-[var(--off-white)] overflow-hidden">
      <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-bl from-[var(--midnight-green)]/10 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-20 w-[50vw] h-[50vw] bg-[var(--midnight-green)] rounded-full blur-[160px] opacity-15 -z-10"></div>

      <div className="max-w-[90rem] mx-auto w-full px-6 lg:px-12 pb-24 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 lg:pr-10 relative z-20">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] mb-8 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
            {t({
              en: "Idemili North & South",
              ig: "Idemili Ugwu na Ndịda",
              ha: "Idemili Arewa da Kudu",
              yo: "Idemili Ariwa ati Guusu",
            })}
          </p>

          {/* DO NOT ALTER THIS HERO TEXT PER THE PRD */}
          <h1 className="text-7xl lg:text-[10rem] font-bold leading-[0.8] tracking-[-0.04em] text-[var(--obsidian)] mb-8 mix-blend-multiply serif-font">
            {t({
              en: "OUR",
              ig: "NKE ANYỊ",
              ha: "NAMU",
              yo: "TIWA",
            })}
            <br />
            <span className="italic font-light text-[var(--midnight-green)] pr-4">
              {t({
                en: "Shared",
                ig: "Kekọrịta",
                ha: "Raba",
                yo: "Pín",
              })}
            </span>
            <br />
            {t({
              en: "VISION",
              ig: "ỌHỤỤ",
              ha: "HANGEN NESA",
              yo: "IRAN",
            })}
          </h1>

          <p className="text-xl lg:text-2xl text-gray-500 max-w-xl font-light leading-relaxed mb-12 pl-6 border-l border-[var(--midnight-green)]/20">
            {t({
              en: "Progress You Can See. Leadership You Can Trust. Hon. Uchenna Harris Okonkwo is redefining representation through transparency and inclusive development.",
              ig: "Nke a bụ ọganihu anyị nwere ike ịhụ. Ọchịchị ị pụrụ ịtụkwasị obi.",
            })}
          </p>

          <div className="flex flex-wrap items-center gap-8">
            <a
              href="/resources"
              className="bg-[var(--midnight-green)] text-[var(--off-white)] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--obsidian)] transition-all flex items-center gap-3 group soft-shadow"
            >
              {t({
                en: "Explore Agenda",
                ig: "Lelee Atụmatụ",
                ha: "Bincika Ajanda",
                yo: "Ṣawari Eto",
              })}
              <span className="w-8 h-px bg-white/30 group-hover:w-12 transition-all"></span>
            </a>
            <a
              href="https://youtube.com/@hon.uchennaharrisokonkwotv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-medium text-[var(--obsidian)] uppercase tracking-widest text-xs hover:text-[var(--midnight-green)] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--obsidian)]/20 flex items-center justify-center group-hover:border-[var(--midnight-green)] transition-colors">
                <span className="material-symbols-outlined text-sm">
                  play_arrow
                </span>
              </div>
              {t({
                en: "Watch Video",
                ig: "Lekwaa Vidiyo",
                ha: "Kalli Bidiyo",
                yo: "Wo Fidio",
              })}
            </a>

            <div className="ml-auto hidden xl:block">
              <QRCodeComponent
                value="https://www.uchennaokonkwo.com"
                size={80}
                label="Scan to Visit"
              />
            </div>
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
              src="https://res.cloudinary.com/djh9qeaf6/image/upload/v1773947223/posts/mhme6bvplaki2tocgi0p.jpg "
              alt="Hon. Uchenna Portrait"
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
            ig: "IHE NA EME UGBUA",
            ha: "SABBIN LABARAI",
            yo: "AWON IROYIN TUNTUN",
          })}
        </div>
        <div className="ticker-wrap ml-32 py-1">
          <div className="ticker font-medium text-xs tracking-widest uppercase text-white/80">
            {tickerItems.map((item, i) => (
              <React.Fragment key={i}>
                <span className="mx-8 text-[var(--sunlight-yellow)] opacity-50">
                  •
                </span>{" "}
                {item}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
