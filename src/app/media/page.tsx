"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/useLanguageStore';

// We reuse the basic structure of the old Blog page but make it the central /media hub
interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export default function MediaPage() {
  const { currentLanguage: lang, t } = useLanguageStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for the UI scaffolding. Real data would come from the /api/articles GET route
  useEffect(() => {
    // In a full implementation, we'd fetch `/api/articles?lang=${lang}` here
    // For now, representing the UI state.
    setTimeout(() => {
      setArticles([
        {
          id: '1',
          title: t({
            en: '100 Youth Empowered in Idemili Tech Initiative',
            pcm: '100 Youth Don Get Tech Power for Idemili',
            ig: 'Akwadebere Ndị Ntorobịa 100 na Ịmụ Ọrụ Nkà na Ụzụ',
            ha: 'An Bawa Matasa 100 Ikon Fasaha a Idemili',
            yo: 'Awọn Ọdọ 100 Gba Agbara Imọ-ẹrọ ni Idemili'
          }),
          excerpt: t({
            en: 'The first cohort of the Hon. Harris Uchenna Okonkwo Digital Skills program has graduated...',
            pcm: 'Di first set of people wey do Hon. Harris Uchenna Okonkwo tech program don finish...',
            ig: 'Ndị mbụ gụchara mmemme nka nke Hon. Harris Uchenna Okonkwo a gụchala...',
            ha: 'Rukuni na farko na shirin fasaha na Hon. Harris Uchenna Okonkwo sun yaye...',
            yo: 'Ẹgbẹ akọkọ ti eto imọ-ẹrọ Hon. Harris Uchenna Okonkwo ti pari...'
          }),
          date: 'Oct 12, 2024',
          readTime: '4 min read',
          category: 'Youth Empowerment'
        },
        {
          id: '2',
          title: t({
            en: 'Phase 2: Rural Road Intervention Commences',
            pcm: 'Phase 2: Work on Top Village Roads Don Start',
            ig: 'Nke Abụọ: Ọrụ Ụzọ Ime Obodo Ebidola',
            ha: 'Sashe na 2: An Fara Aikin Hanyoyin Karkara',
            yo: 'Ipele Keji: Iṣẹ Awọn Ọna Igberiko Ti Bẹrẹ'
          }),
          excerpt: t({
            en: 'Heavy duty equipment arrived today to commence the grading of internal roads in Obosi...',
            pcm: 'Big big machine don reach today to start to dey arrange roads for Obosi...',
            ig: 'Ngwongwo dị arọ abịala taa iji mebie ụzọ ime obodo na Obosi...',
            ha: 'Manyan injina sun iso a yau domin fara aikin titunan cikin gida a Obosi...',
            yo: 'Awọn ẹrọ nla ti de loni lati bẹrẹ atunṣe awọn ọna inu ni Obosi...'
          }),
          date: 'Oct 05, 2024',
          readTime: '3 min read',
          category: 'Infrastructure'
        }
      ]);
      setLoading(false);
    }, 500);
  }, [lang, t]);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'News & Updates', pcm: 'As E Dey Hot', ig: 'Akụkọ na Nkwupụta', ha: 'Labarai da Sabuntawa', yo: 'Iroyin & Awọn Imudojuiwọn' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font">
            {t({ en: 'Media Hub', pcm: 'Media Block', ig: 'Ogige Mgbasa Ozi', ha: 'Cibiyar Yada Labarai', yo: 'Agbegbe Iroyin' })}
          </h1>
          <p className="mt-6 text-xl text-gray-500 font-light max-w-2xl">
            {t({
              en: 'Stay informed with the latest press releases, legislative updates, and grassroots interventions.',
              pcm: 'Hear di latest tori, wetin dey happen for house of assembly, and community work.',
              ig: 'Nọrọ na njikere na akụkọ kachasị ọhụrụ banyereiwu, na nkwado ndị nọ na ime obodo.',
              ha: 'Kasance da sanin sabbin sanarwar manema labarai, sabunta tsarin majalisa, da ayyukan karkara.',
              yo: 'Duro ni iwifun pẹlu awọn atẹjade iroyin tuntun, awọn imudojuiwọn isofin, ati awọn iṣẹ agbegbe.'
            })}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent flex items-center justify-center rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <a key={article.id} href={`/media/${article.id}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Image Placeholder */}
                  <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--midnight-green)]/20 to-[var(--sunlight-yellow)]/20"></div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      <span className="text-[var(--sunlight-yellow)] bg-[var(--midnight-green)] px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-[var(--obsidian)] mb-4 group-hover:text-[var(--midnight-green)] transition-colors serif-font">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-500 font-light leading-relaxed mb-8 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto pt-6 border-t border-gray-100">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
