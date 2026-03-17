"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function TerritoryTracker() {
  const { t } = useLanguageStore();

  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative bg-[var(--off-white)] rounded-sm p-12 border border-[var(--midnight-green)]/5 aspect-square flex items-center justify-center group soft-shadow">
            <svg className="w-full h-full text-[var(--midnight-green)]/20 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 400 400">
              <path className="map-ward fill-gray-100 transition-all duration-300" d="M140,40 L160,30 L260,70 L280,90 L310,170 L290,190 L210,230 L180,210 L110,160 L90,140 Z"></path>
              <path className="map-ward fill-gray-100 transition-all duration-300" d="M310,170 L340,220 L360,280 L320,320 L260,360 L220,340 L190,290 L210,230 L290,190 Z"></path>
              <path className="map-ward fill-gray-100 transition-all duration-300" d="M110,160 L180,210 L210,230 L190,290 L160,310 L90,320 L50,260 L40,210 Z"></path>
              
              <g className="hotspot" style={{ transform: 'translate(210px, 140px)' }}>
                <circle className="fill-[var(--sunlight-yellow)]" cx="0" cy="0" r="4"></circle>
                <circle className="stroke-[var(--sunlight-yellow)] fill-none" cx="0" cy="0" opacity="0.5" r="10" strokeWidth="1"></circle>
              </g>
              <g className="hotspot" style={{ transform: 'translate(280px, 260px)', animationDelay: '0.5s' }}>
                <circle className="fill-[var(--sunlight-yellow)]" cx="0" cy="0" r="4"></circle>
                <circle className="stroke-[var(--sunlight-yellow)] fill-none" cx="0" cy="0" opacity="0.5" r="10" strokeWidth="1"></circle>
              </g>
              <g className="hotspot" style={{ transform: 'translate(120px, 250px)', animationDelay: '1s' }}>
                <circle className="fill-[var(--sunlight-yellow)]" cx="0" cy="0" r="4"></circle>
                <circle className="stroke-[var(--sunlight-yellow)] fill-none" cx="0" cy="0" opacity="0.5" r="10" strokeWidth="1"></circle>
              </g>
            </svg>

            {/* Tooltip Card */}
            <div className="absolute top-1/4 left-1/2 bg-white/95 backdrop-blur-md p-5 rounded-sm shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-[var(--midnight-green)]/10 w-72 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 translate-y-4 group-hover:translate-y-[-50%]">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW8Ne1N5fTgZrjj_oohTSfM6xL899KZov3Ol4TfZyUaHfUpDQApkOKEnG25_PU5kLgjPqP8a48UcSQLA8XVWWC9hUm2lpbfvLRr6fI3EVAN77aaXQDfs7_sWOFuOgOQIeIkfu1zRbVJA3uKu3gJcDBhiDDwFk0ygiODx3aKds3-3IpGwy53czHt_UI6aXQO9Uny42KJ72mRrpABkj52xz8TCZLUJM7CXC9K3rblshBqDpTCLAtC2ONdL9hbfgeIL9kNgPLRQcZte4" alt="Site" className="w-full h-32 object-cover rounded-sm mb-4 grayscale-[0.5] contrast-125" loading="lazy" />
              <h4 className="font-bold text-base mb-1 serif-font text-[var(--obsidian)]">Nkpor Secondary School</h4>
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-4">
                {t({ en: 'Education Infrastructure', pcm: 'School Building', ig: 'Ihe nrụbawanye Agụmakwụkwọ' })}
              </p>
              <div className="w-full bg-gray-100 h-1 mb-2">
                <div className="bg-[var(--midnight-green)] h-1" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[var(--obsidian)] uppercase tracking-wider">
                <span>{t({ en: 'IN PROGRESS', pcm: 'WE DEY DO AM', ig: 'Ọ NAA EME' })}</span>
                <span className="text-[var(--midnight-green)]">65%</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
              {t({ en: 'Interactive Map', pcm: 'Look Di Map', ig: 'Maapụ Na-arụ Ọrụ', ha: 'Taswira', yo: 'Maapu' })}
            </p>
            <h2 className="text-5xl lg:text-[5.5rem] font-bold leading-[0.9] tracking-tighter serif-font text-[var(--obsidian)]">
              {t({ en: 'TERRITORY', pcm: 'OUR AREA', ig: 'Mpaghara', ha: 'YANKI', yo: 'AGBEGBE' })}<br/>
              <span className="italic font-light text-gray-400">{t({ en: 'Tracker', pcm: 'Tracker', ig: 'Ebe Nlele', ha: 'Mai Bincike', yo: 'Oluṣawari' })}</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed max-w-md font-light">
              {t({
                en: 'Explore our interactive ward map to monitor ongoing developments, budget allocations, and project milestones in real-time. Radical transparency for Idemili.',
                pcm: 'Use di map check all di work, how dem dey spend money, and how far di projects don reach. Openness for our Idemili people.',
                ig: 'Nyochaa maapụ ward anyị iji jiri anya gị hụ mmepe na-aga n\'ihu, ịkwụ ụgwọ mmepụta, na ihe ịga nke ọma n\'ezigbo oge. Izizi anya maka Idemili.',
                ha: 'Bincika taswirar ward dinmu don saka idanu kan ci gaban da ake ciki, yadda ake raba kasafin kudi, da kuma ayyukan lokaci na ainihi.',
                yo: 'Ṣawari maapu ward wa lati ṣe atẹle awọn idagbasoke to n tẹsiwaju, ati awọn iṣẹ agbegbe ni akoko gidi.'
              })}
            </p>

            <div className="space-y-2 pt-8">
              <div className="group cursor-pointer">
                <div className="flex items-center justify-between py-6 border-b border-gray-100 transition-colors">
                  <div>
                    <h4 className="font-bold text-xl serif-font text-[var(--obsidian)] group-hover:text-[var(--midnight-green)] transition-colors">Idemili North Projects</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">12 {t({ en: 'Active Sites', pcm: 'Places Wey Work Dey', ig: 'Ebe Ọrụ Na-aga N\'ihu' })}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[var(--midnight-green)] group-hover:border-[var(--midnight-green)] group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex items-center justify-between py-6 border-b border-gray-100 transition-colors">
                  <div>
                    <h4 className="font-bold text-xl serif-font text-[var(--obsidian)] group-hover:text-[var(--midnight-green)] transition-colors">Idemili South Projects</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">8 {t({ en: 'Active Sites', pcm: 'Places Wey Work Dey', ig: 'Ebe Ọrụ Na-aga N\'ihu' })}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[var(--midnight-green)] group-hover:border-[var(--midnight-green)] group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
