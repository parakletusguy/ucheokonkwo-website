"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Post, MediaItem } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-NG', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch { return iso; }
}

/* ── Image Gallery ────────────────────────────────────────────────────────── */
function ImageGallery({ images }: { images: MediaItem[] }) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setSelected((s) => (s - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setSelected((s) => (s + 1) % images.length), [images.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  if (images.length === 0) return null;

  return (
    <div className="mb-10">
      {/* Main image */}
      <div
        className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 cursor-zoom-in mb-3"
        onClick={() => setLightbox(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[selected].url}
          alt={`Image ${selected + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
              {selected + 1} / {images.length}
            </span>
          </>
        )}
        <span className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1">
          <span className="material-symbols-outlined text-sm">open_in_full</span>
        </span>
      </div>

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === selected ? 'border-[var(--midnight-green)] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[selected].url}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-4 text-white/50 text-sm">
            {selected + 1} / {images.length} — press ← → to navigate, Esc to close
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Language Tab ─────────────────────────────────────────────────────────── */
const LANG_LABELS: Record<string, string> = {
  ENGLISH: 'English', PIDGIN: 'Pidgin', IGBO: 'Igbo', HAUSA: 'Hausa', YORUBA: 'Yoruba',
};

/* ── Detail Page ──────────────────────────────────────────────────────────── */
export default function MediaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost]         = useState<Post | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [activeLang, setActiveLang] = useState('ENGLISH');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/posts/${id}`, { cache: 'default' });
        if (res.status === 404) { if (!cancelled) setError('not_found'); return; }
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data: Post = await res.json();
        if (!cancelled) {
          setPost(data);
          // Default to ENGLISH if available, else first language
          const langs = data.multilingualContent?.map((m) => m.language) ?? [];
          setActiveLang(langs.includes('ENGLISH') ? 'ENGLISH' : (langs[0] ?? 'ENGLISH'));
        }
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load article.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  /* Loading */
  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex justify-center items-center min-h-[60vh]">
          <span className="w-10 h-10 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  /* 404 */
  if (error === 'not_found' || !post) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-gray-400">
          <span className="material-symbols-outlined text-6xl">article</span>
          <h1 className="text-2xl font-bold text-[var(--obsidian)] serif-font">Article not found</h1>
          <p className="text-sm">This article may have been removed or the link is incorrect.</p>
          <Link href="/media" className="mt-4 bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm">
            Back to Media Hub
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  /* Error */
  if (error) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex flex-col items-center justify-center min-h-[60vh] gap-4 text-gray-400">
          <span className="material-symbols-outlined text-6xl">wifi_off</span>
          <h1 className="text-2xl font-bold text-[var(--obsidian)] serif-font">Could not load article</h1>
          <p className="text-sm text-red-500">{error}</p>
          <Link href="/media" className="mt-4 bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm">
            Back to Media Hub
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  /* Active language content */
  const mc = post.multilingualContent ?? [];
  const activeContent = mc.find((m) => m.language === activeLang);
  const displayTitle   = activeContent?.title   ?? post.title;
  const displayContent = activeContent?.content ?? post.content;

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0" />
      <Header />
      <main className="pt-28 pb-24 max-w-3xl mx-auto px-6">

        {/* Back link */}
        <Link href="/media" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[var(--midnight-green)] transition-colors mb-8">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Media Hub
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--obsidian)] serif-font leading-tight mb-4">
          {displayTitle}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-medium mb-8 pb-6 border-b border-gray-100">
          <span>{formatDate(post.createdAt)}</span>
          <span>{Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read</span>
          <span>
            By {post.author.firstName} {post.author.lastName}
          </span>
        </div>

        {/* Images (first shown in main, all accessible via gallery) */}
        {post.Media?.length > 0 && <ImageGallery images={post.Media} />}

        {/* Language tabs */}
        {mc.length > 1 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {mc.map((m) => (
              <button
                key={m.language}
                onClick={() => setActiveLang(m.language)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeLang === m.language
                    ? 'bg-[var(--midnight-green)] text-[var(--sunlight-yellow)]'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {LANG_LABELS[m.language] ?? m.language}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/media" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--midnight-green)] hover:gap-3 transition-all">
            <span className="material-symbols-outlined text-sm">arrow_back</span> All Articles
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
