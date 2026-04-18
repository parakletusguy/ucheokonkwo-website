"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguageStore } from '@/store/useLanguageStore';
import { agendaItems } from '@/data/achievements';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

const STATIC_NORTH = agendaItems.filter(i => i.lga === 'north').length;
const STATIC_SOUTH = agendaItems.filter(i => i.lga === 'south').length;

export default function TerritoryTracker() {
  const { t } = useLanguageStore();
  const [extra, setExtra] = useState({ north: 0, south: 0 });

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(r => r.ok ? r.json() : null)
      .then((data: unknown) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const projects = data as { consituentName?: string }[];
        const north = projects.filter(p => /north/i.test(p.consituentName ?? '')).length;
        const south = projects.filter(p => /south/i.test(p.consituentName ?? '')).length;
        setExtra({ north, south });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Text Content */}
          <div className="space-y-8 mb-16">
            <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--midnight-green)]"/>
              <span className="w-8 h-[1px] bg-[var(--midnight-green)]"/>
            </p>
            <h2 className="text-5xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-tighter serif-font text-[var(--obsidian)]">
              <span className="italic font-light text-gray-400">
              </span>
            </h2>
            <p className="text-base lg:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto font-light">
              {t({
                en: 'Monitor ongoing developments, budget allocations, and project milestones in real-time. Radical transparency for Idemili.',
                ig: 'Jiri anya gị hụ mmepe na-aga n\'ihu, ịkwụ ụgwọ mmepụta, na ihe ịga nke ọma n\'ezigbo oge. Izizi anya maka Idemili.',
                ha: 'Saka idanu kan ci gaban da ake ciki da gaskiya don al\'ummar mu.',
                yo: 'Ṣe atẹle awọn idagbasoke to n tẹsiwaju ati awọn iṣẹ agbegbe ni akoko gidi fun ilọsiwaju.',
              })}
            </p>
          </div>

          {/* Project List / Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full text-left">
            {[
              { title: 'Idemili North Projects', count: STATIC_NORTH + extra.north, href: '/projects/idemili-north' },
              { title: 'Idemili South Projects', count: STATIC_SOUTH + extra.south, href: '/projects/idemili-south' },
            ].map((project, i) => (
              <Link key={i} href={project.href} className="group block cursor-pointer bg-[var(--off-white)] p-10 rounded-3xl border border-gray-100 hover:border-[var(--midnight-green)]/20 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--sunlight-yellow)]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:bg-[var(--midnight-green)] group-hover:border-[var(--midnight-green)] group-hover:text-[var(--sunlight-yellow)] transition-all duration-300">
                    <span className="material-symbols-outlined transform group-hover:-translate-y-1 transition-transform duration-300">account_balance</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[var(--sunlight-yellow)] group-hover:border-[var(--sunlight-yellow)] group-hover:text-[var(--obsidian)] transition-all duration-300">
                    <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-3xl serif-font text-[var(--obsidian)] group-hover:text-[var(--midnight-green)] transition-colors mb-3">
                    {project.title}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
