"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguageStore, LanguageCode } from '@/store/useLanguageStore';
import Link from 'next/link';

interface ArticleTranslation {
  title: string;
  content: string;
  lang: string;
}

interface ArticleDetail {
  id: string;
  status: string;
  createdAt: string;
  translation: ArticleTranslation | undefined;
}

const LANG_LABELS: Record<LanguageCode, string> = {
  en: 'English',
  pcm: 'Pidgin',
  ig: 'Igbo',
  ha: 'Hausa',
  yo: 'Yoruba',
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const articleId = params?.id as string;

  useEffect(() => {
    if (!articleId) return;
    setLoading(true);
    fetch(`/api/articles/${articleId}?lang=${currentLanguage}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setArticle(data?.article ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [articleId, currentLanguage]);

  return (
    <div>
      {/* Article Header - Brand header from pages */}
      <header className="fixed w-full top-0 bg-[var(--off-white)]/70 backdrop-blur-2xl z-50 border-b border-[var(--midnight-green)]/5">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex justify-between items-center h-24">
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center gap-2 text-gray-500 hover:text-[var(--midnight-green)] transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span className="text-xs font-bold uppercase tracking-widest">Blog</span>
          </button>
          {/* Language selector inline */}
          <div className="flex items-center bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-full p-1 shadow-sm">
            {(Object.keys(LANG_LABELS) as LanguageCode[]).map((lang) => {
              const { setLanguage } = useLanguageStore.getState();
              const isActive = currentLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isActive ? 'bg-[var(--midnight-green)] text-[var(--off-white)]' : 'text-gray-400 hover:text-[var(--midnight-green)]'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="pt-40 pb-32 max-w-3xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-6 h-6 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : !article ? (
          <div className="text-center py-32">
            <p className="text-gray-500">Article not found or could not be loaded.</p>
            <Link href="/blog" className="text-[var(--midnight-green)] underline text-sm mt-4 block">← Back to Blog</Link>
          </div>
        ) : (
          <article>
            {/* Language badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-[var(--midnight-green)]/5 text-[var(--midnight-green)] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[var(--midnight-green)]/10">
                {LANG_LABELS[currentLanguage]} Edition
              </span>
              <time className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                {new Date(article.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>

            {/* Title — uses the culturally-correct translated font */}
            <h1 
              className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter serif-font text-[var(--obsidian)] mb-12"
              lang={currentLanguage}
            >
              {article.translation?.title || 'Untitled'}
            </h1>

            <div className="w-20 h-[2px] bg-[var(--sunlight-yellow)] mb-12"></div>

            {/* Article Content — rendered with proper language tag for browser typography */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 font-light leading-relaxed"
              lang={currentLanguage}
            >
              {article.translation?.content?.split('\n').map((para, i) => (
                para.trim() ? <p key={i} className="mb-6 text-lg">{para}</p> : null
              ))}
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
