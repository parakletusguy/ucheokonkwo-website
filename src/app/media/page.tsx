"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/useLanguageStore';
import type { Post } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

/* ── Unified card shape ──────────────────────────────────────────────────── */
interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  thumbnail: string | null;  // null = show gradient placeholder
  imageCount: number;
  isBackend: boolean;        // backend posts link differently
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-NG', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch { return iso; }
}

function postToArticle(p: Post): Article {
  const eng = p.multilingualContent?.find((m) => m.language === 'ENGLISH');
  const excerpt =
    p.subcontent ??
    (eng?.content ?? p.content).replace(/\s+/g, ' ').slice(0, 160) + '…';
  return {
    id:         p.id,
    title:      eng?.title ?? p.title,
    excerpt,
    date:       formatDate(p.createdAt),
    readTime:   `${Math.max(1, Math.ceil(p.content.split(' ').length / 200))} min read`,
    category:   p.multilingualContent?.length ? `${p.multilingualContent.length} lang${p.multilingualContent.length > 1 ? 's' : ''}` : 'Article',
    thumbnail:  p.Media?.[0]?.url ?? null,
    imageCount: p.Media?.length ?? 0,
    isBackend:  true,
  };
}

/* ── Media page ──────────────────────────────────────────────────────────── */
export default function MediaPage() {
  const { currentLanguage: lang, t } = useLanguageStore();
  const [articles, setArticles]     = useState<Article[]>([]);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState('');
  const cacheRef                    = useRef<Article[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    const staticArticles: Article[] = [
      {
        id: '1',
        title: t({
          en: '100 Youth Empowered in Idemili Tech Initiative',
          pcm: '100 Youth Don Get Tech Power for Idemili',
          ig: 'Akwadebere Ndị Ntorobịa 100 na Ịmụ Ọrụ Nkà na Ụzụ',
          ha: 'An Bawa Matasa 100 Ikon Fasaha a Idemili',
          yo: 'Awọn Ọdọ 100 Gba Agbara Imọ-ẹrọ ni Idemili',
        }),
        excerpt: t({
          en: 'The first cohort of the Hon. Harris Uchenna Okonkwo Digital Skills program has graduated...',
          pcm: 'Di first set of people wey do Hon. Harris Uchenna Okonkwo tech program don finish...',
          ig: 'Ndị mbụ gụchara mmemme nka nke Hon. Harris Uchenna Okonkwo a gụchala...',
          ha: 'Rukuni na farko na shirin fasaha na Hon. Harris Uchenna Okonkwo sun yaye...',
          yo: 'Ẹgbẹ akọkọ ti eto imọ-ẹrọ Hon. Harris Uchenna Okonkwo ti pari...',
        }),
        date: 'Oct 12, 2024',
        readTime: '4 min read',
        category: 'Youth Empowerment',
        thumbnail: null,
        imageCount: 0,
        isBackend: false,
      },
      {
        id: '2',
        title: t({
          en: 'Phase 2: Rural Road Intervention Commences',
          pcm: 'Phase 2: Work on Top Village Roads Don Start',
          ig: 'Nke Abụọ: Ọrụ Ụzọ Ime Obodo Ebidola',
          ha: 'Sashe na 2: An Fara Aikin Hanyoyin Karkara',
          yo: 'Ipele Keji: Iṣẹ Awọn Ọna Igberiko Ti Bẹrẹ',
        }),
        excerpt: t({
          en: 'Heavy duty equipment arrived today to commence the grading of internal roads in Obosi...',
          pcm: 'Big big machine don reach today to start to dey arrange roads for Obosi...',
          ig: 'Ngwongwo dị arọ abịala taa iji mebie ụzọ ime obodo na Obosi...',
          ha: 'Manyan injina sun iso a yau domin fara aikin titunan cikin gida a Obosi...',
          yo: 'Awọn ẹrọ nla ti de loni lati bẹrẹ atunṣe awọn ọna inu ni Obosi...',
        }),
        date: 'Oct 05, 2024',
        readTime: '3 min read',
        category: 'Infrastructure',
        thumbnail: null,
        imageCount: 0,
        isBackend: false,
      },
    ];

    async function load() {
      // Serve from memory cache immediately if available
      if (cacheRef.current) {
        setArticles(cacheRef.current);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/posts`, {
          // Browser-level cache: reuse for up to 60 s without a network round-trip
          next: { revalidate: 60 } as RequestInit & { next?: { revalidate?: number } },
          cache: 'default',
        } as RequestInit);

        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        const data: unknown = await res.json();
        const backendPosts: Post[] = (Array.isArray(data) ? data : [])
          .filter((p: Post) => p.status === 'PUBLISHED');

        const backendArticles = backendPosts.map(postToArticle);
        // Backend posts first (newest), then static articles at the end
        const merged = [...backendArticles, ...staticArticles];
        if (!cancelled) {
          cacheRef.current = merged;
          setArticles(merged);
          setFetchError('');
        }
      } catch (err: unknown) {
        // Backend unreachable — fall back to static articles only
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setFetchError(msg);
          setArticles(staticArticles);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    setLoading(true);
    load();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0" />
      <Header />
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6">

        {/* Header */}
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
              yo: 'Duro ni iwifun pẹlu awọn atẹjade iroyin tuntun, awọn imudojuiwọn isofin, ati awọn iṣẹ agbegbe.',
            })}
          </p>
          {fetchError && (
            <p className="mt-3 text-xs text-amber-600 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">wifi_off</span>
              Backend offline — showing cached articles only.
            </p>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={article.isBackend ? `/media/${article.id}` : `/media/${article.id}`}
                className="group block h-full"
              >
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">

                  {/* Thumbnail */}
                  <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                    {article.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--midnight-green)]/20 to-[var(--sunlight-yellow)]/20" />
                    )}

                    {/* "N photos" badge when post has more than 1 image */}
                    {article.imageCount > 1 && (
                      <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">photo_library</span>
                        {article.imageCount} photos
                      </span>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <span className="text-[var(--sunlight-yellow)] bg-[var(--midnight-green)] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {article.category}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-[var(--obsidian)] mb-3 group-hover:text-[var(--midnight-green)] transition-colors serif-font leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-gray-500 font-light leading-relaxed text-sm mb-6 flex-grow line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-100">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
