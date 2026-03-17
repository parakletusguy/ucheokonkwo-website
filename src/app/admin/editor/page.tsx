"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';

/* ── Types ──────────────────────────────────────────────────────────────── */
type Step = 'write' | 'review' | 'done';

interface TranslationPreview {
  lang: string;
  label: string;
  flag: string;
  text: string;
  confirmed: boolean;
}

/* ── Step 1: Editor Form ─────────────────────────────────────────────────── */
function EditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { getArticle, saveDraft, deleteArticle } = useAdminStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [articleId, setArticleId] = useState<string>('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState('');
  const [step, setStep] = useState<Step>('write');
  const [translations, setTranslations] = useState<TranslationPreview[]>([]);

  useEffect(() => {
    if (id) {
      const existing = getArticle(id);
      if (existing) {
        setTitle(existing.title);
        setContent(existing.content);
        setArticleId(existing.id);
        return;
      }
    }
    setArticleId(Math.random().toString(36).substring(2, 9));
  }, [id, getArticle]);

  const handleSaveDraft = () => {
    if (!title && !content) return;
    saveDraft({ id: articleId, title, content, status: 'draft' });
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  /* Fetch translations and move to review step */
  const handleRequestTranslations = async () => {
    if (!title.trim()) { setPublishError('Please enter a title before publishing.'); return; }
    if (!content.trim()) { setPublishError('Please write some content before publishing.'); return; }
    setPublishError('');
    setIsPublishing(true);
    try {
      const res = await fetch('/api/articles/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, review: true }), // review=true → return translations only, don't publish yet
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Translation failed.');

      const langMeta = [
        { lang: 'pcm', label: 'Nigerian Pidgin', flag: '🇳🇬' },
        { lang: 'ig',  label: 'Igbo',            flag: '🟢' },
        { lang: 'ha',  label: 'Hausa',           flag: '🟡' },
        { lang: 'yo',  label: 'Yoruba',          flag: '🔴' },
      ];
      setTranslations(
        langMeta.map((m) => ({
          ...m,
          text: (data.translations || {})[m.lang] || `[Translation for ${m.label} unavailable]`,
          confirmed: false,
        }))
      );
      setStep('review');
    } catch (err: unknown) {
      setPublishError(err instanceof Error ? err.message : 'Translation failed.');
    } finally {
      setIsPublishing(false);
    }
  };

  /* ── Step 1 UI ─────────────────────────────────────────────────────────── */
  if (step === 'write') {
    return (
      <div className="min-h-screen bg-white flex flex-col pb-24">
        {/* Toolbar */}
        <div className="sticky top-14 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center z-30">
          <button onClick={() => router.push('/admin')} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isDraftSaved ? 'text-[var(--constituency-green)] opacity-100' : 'opacity-0'}`}>✓ Saved</span>
            <button onClick={handleSaveDraft} disabled={isPublishing} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--obsidian)] px-3 py-2 disabled:opacity-40">
              Save Draft
            </button>
            <button onClick={handleRequestTranslations} disabled={isPublishing} className="bg-[var(--integrity-navy)] text-[var(--adc-yellow)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
              {isPublishing ? (
                <><span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"/><span>Translating...</span></>
              ) : (
                <><span className="material-symbols-outlined text-sm">translate</span><span>Review Translations</span></>
              )}
            </button>
          </div>
        </div>

        {/* Feedback banners */}
        {publishError && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-base mt-0.5">error</span>
            <p className="text-sm font-medium text-red-600">{publishError}</p>
          </div>
        )}
        {isPublishing && (
          <div className="mx-4 mt-4 bg-[var(--integrity-navy)]/5 border border-[var(--integrity-navy)]/10 rounded-xl px-4 py-3">
            <p className="text-xs text-[var(--integrity-navy)] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[var(--adc-yellow)]">auto_awesome</span>
              Generating Pidgin, Igbo, Hausa & Yoruba translations…
            </p>
          </div>
        )}

        {/* Editor body */}
        <div className="flex-1 flex flex-col p-4 pt-6 gap-4 max-w-md mx-auto w-full">
          <input
            type="text"
            placeholder="Article Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-3xl font-bold font-serif text-[var(--obsidian)] placeholder-gray-200 border-none outline-none focus:ring-0 px-0 bg-transparent"
            lang="en"
          />
          <div className="w-12 h-[1px] bg-[var(--adc-yellow)]"/>
          <textarea
            placeholder="Write in English. We'll auto-translate to Pidgin, Igbo, Hausa & Yoruba…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-[55vh] text-lg text-gray-700 leading-relaxed placeholder-gray-300 border-none outline-none focus:ring-0 px-0 resize-none bg-transparent"
            lang="en"
          />
        </div>
      </div>
    );
  }

  /* ── Step 2: Translation Review ────────────────────────────────────────── */
  if (step === 'review') {
    return <TranslationReview
      title={title}
      content={content}
      translations={translations}
      onUpdate={setTranslations}
      articleId={articleId}
      deleteArticle={deleteArticle}
      onBack={() => setStep('write')}
      onDone={() => setStep('done')}
    />;
  }

  /* ── Step 3: Done ──────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-20 h-20 rounded-full bg-[var(--constituency-green)]/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-[var(--constituency-green)]">check_circle</span>
      </div>
      <h2 className="text-2xl font-bold serif-font text-[var(--obsidian)]">Published!</h2>
      <p className="text-sm text-gray-500 text-center max-w-xs">Your article is now live in all confirmed languages.</p>
      <button onClick={() => router.push('/admin')} className="bg-[var(--integrity-navy)] text-[var(--adc-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm">
        Back to Dashboard
      </button>
    </div>
  );
}

/* ── Translation Review Sub-Component ────────────────────────────────────── */
function TranslationReview({
  title,
  content,
  translations,
  onUpdate,
  articleId,
  deleteArticle,
  onBack,
  onDone,
}: {
  title: string;
  content: string;
  translations: TranslationPreview[];
  onUpdate: (t: TranslationPreview[]) => void;
  articleId: string;
  deleteArticle: (id: string) => void;
  onBack: () => void;
  onDone: () => void;
}) {
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const confirmedCount = translations.filter((t) => t.confirmed).length;

  const toggleConfirm = (i: number) => {
    onUpdate(translations.map((t, idx) => idx === i ? { ...t, confirmed: !t.confirmed } : t));
  };
  const updateText = (i: number, text: string) => {
    onUpdate(translations.map((t, idx) => idx === i ? { ...t, text } : t));
  };

  const handlePublish = async () => {
    if (confirmedCount === 0) { setError('Please confirm at least one translation before publishing.'); return; }
    setPublishing(true);
    setError('');
    try {
      const confirmedTranslations = Object.fromEntries(
        translations.filter((t) => t.confirmed).map((t) => [t.lang, t.text])
      );
      const res = await fetch('/api/articles/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, confirmedTranslations }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Publish failed.');
      deleteArticle(articleId);
      onDone();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Publish failed.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] flex flex-col pb-24">
      {/* Toolbar */}
      <div className="sticky top-14 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center z-30">
        <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-500">
          <span className="material-symbols-outlined text-base">arrow_back</span> Edit
        </button>
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Review Step</p>
          <p className="text-xs font-bold text-[var(--integrity-navy)]">{confirmedCount}/4 confirmed</p>
        </div>
        <button onClick={handlePublish} disabled={publishing || confirmedCount === 0} className="bg-[var(--constituency-green)] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest disabled:opacity-40 flex items-center gap-2">
          {publishing ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <span className="material-symbols-outlined text-sm">publish</span>}
          Publish
        </button>
      </div>

      {error && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="p-4 max-w-lg mx-auto w-full space-y-4 mt-4">
        <div className="bg-[var(--integrity-navy)]/5 border border-[var(--integrity-navy)]/10 rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--integrity-navy)] mb-1">Review Instructions</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Review each translation for political accuracy. Tap <strong>Confirm</strong> to approve for publishing, or <strong>Edit</strong> to correct it. Only confirmed translations will go live.
          </p>
        </div>

        {translations.map((t, i) => (
          <div key={t.lang} className={`bg-white rounded-xl border-2 transition-all ${t.confirmed ? 'border-[var(--constituency-green)]' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.flag}</span>
                <div>
                  <p className="font-bold text-sm text-[var(--obsidian)]">{t.label}</p>
                  <p className="text-[9px] font-mono uppercase text-gray-400">{t.lang}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingIndex(editingIndex === i ? null : i)} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[var(--integrity-navy)] hover:text-[var(--integrity-navy)] transition-all">
                  {editingIndex === i ? 'Done' : 'Edit'}
                </button>
                <button onClick={() => toggleConfirm(i)} className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${t.confirmed ? 'bg-[var(--constituency-green)] text-white' : 'bg-gray-100 text-gray-500 hover:bg-[var(--constituency-green)]/10 hover:text-[var(--constituency-green)]'}`}>
                  {t.confirmed ? '✓ Confirmed' : 'Confirm'}
                </button>
              </div>
            </div>
            <div className="p-4">
              {editingIndex === i ? (
                <textarea
                  className="w-full text-sm text-gray-700 leading-relaxed border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-[var(--integrity-navy)] min-h-[120px]"
                  value={t.text}
                  onChange={(e) => updateText(i, e.target.value)}
                  lang={t.lang}
                />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed" lang={t.lang}>{t.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page Export ─────────────────────────────────────────────────────────── */
export default function MobileEditor() {
  return (
    <Suspense>
      <EditorForm />
    </Suspense>
  );
}
