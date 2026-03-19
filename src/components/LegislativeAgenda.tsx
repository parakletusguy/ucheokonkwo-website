"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

const agendaItems = [
  {
    num: '01',
    tag: 'Legislative Success',
    tagColor: 'bg-[var(--sunlight-yellow)]/20 text-[var(--sunlight-yellow)]',
    title: 'Nnobi Ag. Research\nCouncil Bill',
    desc: 'Amendment Bill to establish a Federal Agricultural Research Council in Nnobi, Anambra State.',
    urgent: true,
  },
  {
    num: '02',
    tag: 'Town hall Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Obosi Town Hall\nRestoration',
    desc: 'Successful intervention and support for the repair of the damaged Obosi Town Hall.',
    urgent: false,
  },
  {
    num: '03',
    tag: 'New Bill (2025)',
    tagColor: 'bg-[var(--midnight-green)]/20 text-[var(--midnight-green)]',
    title: 'Obosi LGA\nCreation',
    desc: 'Constitutional alteration bill for the creation of Obosi Local Government Council.',
    urgent: false,
    highlighted: true,
  },
  {
    num: '04',
    tag: 'Infrastructure',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Ogidi Skills\nAcquisition',
    desc: 'Establishment Bill for the Federal College of Entrepreneurship and Skills Acquisition, Ogidi.',
    urgent: false,
  },
];

export default function LegislativeAgenda() {
  const { t } = useLanguageStore();

  return (
    <section className="py-32 bg-[var(--midnight-green)] text-[var(--off-white)] overflow-hidden relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none z-0"/>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-20 flex justify-between items-end relative z-10">
        <div>
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"/>
            {t({ en: 'The Pillars', pcm: 'Di Main Things', ig: 'Ogidi Nke', ha: 'Ginshikan', yo: 'Awọn Ọwọn' })}
          </p>
          <h2 className="text-5xl lg:text-[6rem] font-bold leading-[0.9] tracking-tighter text-white serif-font">
            {t({ en: 'LEGISLATIVE', pcm: 'LAWMAKER', ig: 'IHE OMUME', ha: 'DOKA', yo: 'ASE' })}<br/>
            <span className="italic font-light text-white/50">
              {t({ en: 'Agenda', pcm: 'Plan', ig: 'Atụmatụ', ha: 'Ajanda', yo: 'Eto' })}
            </span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all">
            <span className="material-symbols-outlined text-lg">west</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all">
            <span className="material-symbols-outlined text-lg">east</span>
          </button>
        </div>
      </div>

      <div className="marquee-container pl-6 lg:pl-12 pb-16 gap-8 relative z-10">
        {agendaItems.map((item) => (
          <div
            key={item.num}
            className={`marquee-card min-w-[320px] md:min-w-[420px] p-10 rounded-sm flex-shrink-0 relative overflow-hidden group ${
              item.highlighted
                ? 'bg-[var(--sunlight-yellow)] text-[var(--obsidian)] border-none'
                : 'text-white'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"/>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
              <div className="flex justify-between items-start mb-12">
                <span className={`text-7xl font-serif font-light italic ${item.highlighted ? 'text-[var(--midnight-green)]/20' : 'text-white/20'}`}>
                  {item.num}
                </span>
                <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all group/btn ${
                  item.highlighted
                    ? 'bg-[var(--midnight-green)] shadow-xl hover:bg-[var(--obsidian)]'
                    : 'audio-btn'
                }`}>
                  <span className="material-symbols-outlined text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
                </button>
              </div>
              <div>
                {/* Tags — Vanguard Red for "urgent/healthcare", etc. */}
                <div className="flex items-center gap-3 mb-4">
                  {item.urgent && <span className="badge-urgent">Urgent</span>}
                  {item.tag && (
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className={`text-4xl font-bold mb-4 serif-font leading-tight whitespace-pre-line`}>
                  {item.title}
                </h3>
                <p className={`text-sm mb-8 font-light leading-relaxed ${item.highlighted ? 'text-[var(--midnight-green)]/80' : 'text-gray-400'}`}>
                  {item.desc}
                </p>
                <a href="#" className={`inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all ${
                  item.highlighted ? 'text-[var(--midnight-green)]' : 'text-[var(--sunlight-yellow)]'
                }`}>
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
