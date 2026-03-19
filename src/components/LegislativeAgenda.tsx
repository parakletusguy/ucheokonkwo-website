"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import Link from 'next/link';
import { agendaItems } from '@/data/achievements';

const AUTO_INTERVAL = 2000;

export default function LegislativeAgenda() {
  const { t } = useLanguageStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const touchStart = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = agendaItems.length;

  // Scroll to a card by reading its actual DOM position
  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const card = container.children[clamped] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: 'smooth' });
    }
    setCurrent(clamped);
  }, [total]);

  const next = useCallback(() => scrollTo((current + 1) % total), [current, scrollTo, total]);
  const prev = useCallback(() => scrollTo((current - 1 + total) % total), [current, scrollTo, total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) next(); else prev();
      resetTimer();
    }
    touchStart.current = null;
  };

  const handleArrow = (dir: 'left' | 'right') => {
    if (dir === 'left') prev(); else next();
    resetTimer();
  };

  return (
    <section className="py-16 md:py-32 bg-[var(--midnight-green)] text-[var(--off-white)] overflow-hidden relative">
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none z-0" />

      {/* Header */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-10 md:mb-20 flex justify-between items-end relative z-10">
        <div>
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 md:mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]" />
            {t({ en: 'The Pillars', pcm: 'Di Main Things', ig: 'Ogidi Nke', ha: 'Ginshikan', yo: 'Awọn Ọwọn' })}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[6rem] font-bold leading-[0.9] tracking-tighter text-white serif-font">
            {t({ en: 'LEGISLATIVE', pcm: 'LAWMAKER', ig: 'IHE OMUME', ha: 'DOKA', yo: 'ASE' })}<br />
            <span className="italic font-light text-white/50">
              {t({ en: 'Agenda', pcm: 'Plan', ig: 'Atụmatụ', ha: 'Ajanda', yo: 'Eto' })}
            </span>
          </h2>
        </div>

        <div className="flex gap-3 md:gap-4">
          <button
            onClick={() => handleArrow('left')}
            aria-label="Previous"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all"
          >
            <span className="material-symbols-outlined text-base md:text-lg">west</span>
          </button>
          <button
            onClick={() => handleArrow('right')}
            aria-label="Next"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all"
          >
            <span className="material-symbols-outlined text-base md:text-lg">east</span>
          </button>
        </div>
      </div>

      {/* Track — cards are full-width on mobile, fixed on desktop */}
      <div
        ref={scrollRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="px-6 lg:pl-12 lg:pr-0 pb-4 flex gap-4 md:gap-8 overflow-x-auto no-scrollbar relative z-10"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {agendaItems.map((item) => (
          <div
            key={item.num}
            className={`p-8 md:p-10 rounded-sm flex-shrink-0 relative overflow-hidden group
              w-[calc(100vw-3rem)] md:min-w-[420px] md:w-[420px]
              ${item.highlighted
                ? 'bg-[var(--sunlight-yellow)] text-[var(--obsidian)]'
                : 'text-white'
              }`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px] md:min-h-[350px]">
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <span className={`text-6xl md:text-7xl font-serif font-light italic ${item.highlighted ? 'text-[var(--midnight-green)]/20' : 'text-white/20'}`}>
                  {item.num}
                </span>
                <button className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all group/btn ${
                  item.highlighted
                    ? 'bg-[var(--midnight-green)] shadow-xl hover:bg-[var(--obsidian)]'
                    : 'audio-btn'
                }`}>
                  <span className="material-symbols-outlined text-lg md:text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
                </button>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  {item.urgent && <span className="badge-urgent">Urgent</span>}
                  {item.tag && (
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 serif-font leading-tight whitespace-pre-line">
                  {item.title}
                </h3>
                <p className={`text-sm mb-6 md:mb-8 font-light leading-relaxed ${item.highlighted ? 'text-[var(--midnight-green)]/80' : 'text-gray-400'}`}>
                  {item.desc}
                </p>
                <Link
                  href={`/policy/${item.num}`}
                  className={`inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all ${
                    item.highlighted ? 'text-[var(--midnight-green)]' : 'text-[var(--sunlight-yellow)]'
                  }`}
                >
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
