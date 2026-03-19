"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import AdcLogo from '@/components/AdcLogo';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="bg-[var(--midnight-green)] text-white pt-32 pb-12 relative overflow-hidden">
      {/* ADC Tricolor top accent */}
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="flex-1 bg-[var(--midnight-green)]"/>
        <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
        <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
      </div>

      {/* Subtle texture */}
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none"/>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        {/* Big CTA */}
        <a href="/get-involved" className="text-center mb-32 group cursor-pointer inline-block w-full">
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-8">
            {t({ en: 'Take Action', pcm: 'Do Something', ig: 'Mee Ihe Obu', ha: 'Yi Aiki', yo: 'Ṣe Nkan' })}
          </p>
          <h2 className="text-7xl lg:text-[10rem] font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,215,0,0.3)] group-hover:text-[var(--sunlight-yellow)] group-hover:[-webkit-text-stroke:0px] transition-all duration-700 mb-2 uppercase flex justify-center items-center gap-8 serif-font leading-none">
            {t({ en: 'Join The', pcm: 'Join', ig: 'Soro', ha: 'Shiga', yo: 'Dara' })}
            <span className="material-symbols-outlined text-[6rem] lg:text-[9rem] text-[var(--sunlight-yellow)] transform group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 font-light">arrow_outward</span>
          </h2>
          <h2 className="text-7xl lg:text-[10rem] font-bold tracking-tighter text-white group-hover:text-[var(--sunlight-yellow)] transition-all duration-700 uppercase serif-font leading-none">
            {t({ en: 'Movement', pcm: 'Di Movement', ig: 'Nnọkọ', ha: 'Cunkoso', yo: 'Egbe' })}
          </h2>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-white/10 pt-16">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <AdcLogo size={52} />
              <div>
                <span className="font-bold text-xl tracking-[0.15em] uppercase text-white block">Uche Okonkwo</span>
                <span className="text-[10px] text-[var(--sunlight-yellow)] tracking-[0.2em] uppercase">African Democratic Congress</span>
              </div>
            </div>
            <p className="text-blue-200 text-sm max-w-sm leading-relaxed mb-8 font-light">
              {t({
                en: 'Elevating Idemili North & South through accountable governance, inclusive policies, and a commitment to next-generation leadership.',
                pcm: 'We dey carry Idemili up with open governance, correct policies and better leadership.',
                ig: 'Na ebuli Idemili elu site na isochi anya nke oma, na idu ndu nke oma.',
                ha: 'Ɗaukaka Idemili ta hanyar mulki mai lissafi da jagoranci na ƙarni mai zuwa.',
                yo: 'Gbígbéga Idemili Àríwá àti Gúúsù nípasẹ ìjọba tí ó ṣe àkọọlẹ.',
              })}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-mono tracking-widest uppercase text-[10px] text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-blue-300"/>Navigation
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
              {[
                { label: { en: 'About', pcm: 'Who Be Our Guy', ig: 'Nkọwa Ndụ', ha: 'Tarihin Rayuwa', yo: 'Igbesi Aye' }, href: '/about' },
                { label: { en: 'The Constituency', pcm: 'Our Area', ig: 'Mpaghara Anyị', ha: 'Mazabar Mu', yo: 'Agbegbe Wa' }, href: '/constituency' },
                { label: { en: 'Media & Blog', pcm: 'Tori & News', ig: 'Mgbasa Ozi na Akụkọ', ha: 'Labarai da Shafin yanar gizo', yo: 'Iroyin & Buloogi' }, href: '/media' },
                { label: { en: 'Get Involved', pcm: 'Join Us', ig: 'Soro Anyị', ha: 'Shiga Mu', yo: 'Dara Wa' }, href: '/get-involved' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-blue-200 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"/>
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="font-mono tracking-widest uppercase text-[10px] text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-blue-300"/>Connect
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.1em]">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/kingucheokonkwo?igsh=MTcwbWZscWRqcWZuaQ==' },
                { name: 'Facebook Account', url: 'https://www.facebook.com/ucheokonkwomedia?mibextid=wwXIfr' },
                { name: 'Facebook Page', url: 'https://www.facebook.com/share/1D9bQsQj1x/?mibextid=wwXIfr' },
                { name: 'Twitter / X', url: 'https://x.com/hon_okonkwo?s=21' },
                { name: 'YouTube', url: 'https://youtube.com/@hon.uchennaharrisokonkwotv?si=VcnxfkJL1jr6N5kd' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hon-uchenna-harris-okonkwo-7b845a3b6?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@hon..uchenna.harr?_r=1&_d=f0hef90k192km4&sec_uid=MS4wLjABAAAAZR30OIbDbCuLAN2G1HWKIp5yIqIn8dtokS3c2blmD3YFCAlXVN5X-TpJArDJBJvR&share_author_id=7577352421359633429&sharer_language=en&source=h5_m&u_code=f0heg5d6j15ec6&item_author_type=1&utm_source=copy&tt_from=copy&enable_checksum=1&utm_medium=ios&share_link_id=4F2FC88A-7CBE-4F8F-9209-756ACD464D27&user_id=7577352421359633429&sec_user_id=MS4wLjABAAAAZR30OIbDbCuLAN2G1HWKIp5yIqIn8dtokS3c2blmD3YFCAlXVN5X-TpJArDJBJvR&social_share_type=4&ug_btm=b8727,b0&utm_campaign=client_share&share_app_id=1233' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-[var(--sunlight-yellow)] transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[var(--sunlight-yellow)] group-hover:w-4 transition-all duration-300"/>{item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-24 pt-8 border-t border-white/10 text-[10px] font-bold text-blue-300 tracking-[0.2em] uppercase">
          <p>© {new Date().getFullYear()} HON. HARRIS OKONKWO. {t({ en: 'ALL RIGHTS RESERVED.', pcm: 'NA WE GET AM.', ig: 'IHE NILE BU NKE ANYỊ.', ha: 'HAƘƘIN KOWA NAMU NE.', yo: 'GBOGBO ENI NI AWA.' })}</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-[var(--sunlight-yellow)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--sunlight-yellow)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
