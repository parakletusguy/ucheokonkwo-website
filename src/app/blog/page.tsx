// Server Component — no "use client" needed.
// Data fetches happen on the server at request time.
// The full HTML arrives pre-rendered to the browser,
// eliminating the client-side useEffect waterfall that
// would add 1-2s on 3G before showing any content.

import React from 'react';
import Link from 'next/link';
import { listPublishedArticles } from '@/lib/db';

// Revalidate this page every 60 seconds using ISR (Incremental Static Regeneration)
// so the server caches the result and doesn't hit the DB on every request.
export const revalidate = 60;

export default function BlogPage() {
  // Direct DB call — runs on the server, returns fully rendered HTML
  const articles = listPublishedArticles();

  return (
    <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-40">
      <div className="mb-16">
        <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"></span>
          Published Stories
        </p>
        <h1 className="text-6xl lg:text-8xl font-bold leading-[0.85] tracking-tighter serif-font text-[var(--obsidian)]">
          The Blog
        </h1>
        <p className="text-sm text-gray-400 mt-4 font-light">
          Available in English, Pidgin, Igbo, Hausa & Yoruba. Switch language from the homepage header.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="py-32 text-center text-gray-400">
          <span className="material-symbols-outlined text-5xl mb-4 block">article</span>
          <p className="text-xl font-light">No articles published yet.</p>
          <Link href="/admin" className="mt-8 inline-flex items-center gap-2 text-[var(--midnight-green)] font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-opacity">
            <span className="material-symbols-outlined text-sm">edit_square</span>
            Go to Admin Portal
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => {
            const enTitle = (article.translations as { title: string; content: string }[])?.[0]?.title || 'Untitled';
            const enContent = (article.translations as { title: string; content: string }[])?.[0]?.content || '';
            return (
              <Link key={article.id} href={`/blog/${article.id}`} className="group block">
                <article className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 group-hover:border-[var(--midnight-green)]/20 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[var(--midnight-green)]/5 flex items-center justify-center mb-6 group-hover:bg-[var(--midnight-green)]/10 transition-colors">
                      <span className="font-bold text-[var(--midnight-green)] text-xs font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-bold text-xl serif-font text-[var(--obsidian)] line-clamp-3 leading-tight mb-4 group-hover:text-[var(--midnight-green)] transition-colors">
                      {enTitle}
                    </h2>
                    <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                      {enContent.substring(0, 140)}{enContent.length > 140 ? '...' : ''}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <time className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </time>
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)]">
                      <span className="material-symbols-outlined text-[12px]">translate</span>
                      5 Languages
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
