"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient, buildPostFormData } from '@/lib/apiClient';
import type { Post, MultilingualContentItem, MediaItem } from '@/lib/types';

type Step = 'write' | 'review' | 'done';

interface TranslationPreview {
  lang: string;
  label: string;
  flag: string;
  title: string;
  text: string;
  confirmed: boolean;
}

const LANG_TABS = [
  { key: 'en',  label: 'English' },
  { key: 'pcm', label: 'Pidgin'  },
  { key: 'ig',  label: 'Igbo'    },
  { key: 'ha',  label: 'Hausa'   },
  { key: 'yo',  label: 'Yoruba'  },
];

const LANG_META = [
  { lang: 'pcm', label: 'Pidgin', flag: '🇳🇬', backendLang: 'PIDGIN' },
  { lang: 'ig',  label: 'Igbo',   flag: '🟢',  backendLang: 'IGBO'   },
  { lang: 'ha',  label: 'Hausa',  flag: '🟡',  backendLang: 'HAUSA'  },
  { lang: 'yo',  label: 'Yoruba', flag: '🔴',  backendLang: 'YORUBA' },
];

const ACCEPTED  = 'image/jpeg,image/png,image/gif,image/webp';
const MAX_SIZE  = 5 * 1024 * 1024;
const MAX_FILES = 10;

function apiErrMsg(err: unknown, fallback: string): string {
  const e = err as { response?: { data?: { message?: string | string[] } } };
  if (!e.response) return 'Cannot reach server. Is the backend running?';
  const msg = e.response.data?.message;
  return Array.isArray(msg) ? msg[0] : (msg ?? fallback);
}

const TOOLBAR_GROUPS = [
  [
    { icon: 'format_bold',         label: 'Bold'          },
    { icon: 'format_italic',       label: 'Italic'        },
    { icon: 'format_underlined',   label: 'Underline'     },
  ],
  [
    { icon: 'format_list_bulleted', label: 'Bullets'      },
    { icon: 'format_list_numbered', label: 'Numbered'     },
    { icon: 'format_quote',         label: 'Quote'        },
  ],
  [
    { icon: 'link',  label: 'Link'  },
    { icon: 'code',  label: 'Code'  },
  ],
];

/* ── Stat pill ───────────────────────────────────────────────────────────── */
function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center px-3 py-1 rounded-lg bg-gray-100/80">
      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-xs font-bold text-[var(--obsidian)]">{value}</span>
    </div>
  );
}

/* ── Editor Form ─────────────────────────────────────────────────────────── */
function EditorForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const id           = searchParams.get('id');

  const [title, setTitle]               = useState('');
  const [content, setContent]           = useState('');
  const [activeLang, setActiveLang]     = useState('en');
  const [postId, setPostId]             = useState<string | null>(id);
  const [status, setStatus]             = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [savedAt, setSavedAt]           = useState<Date | null>(null);
  const [isSaving, setIsSaving]         = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError]               = useState('');
  const [toast, setToast]               = useState('');
  const [step, setStep]                 = useState<Step>('write');
  const [translations, setTranslations] = useState<TranslationPreview[]>([]);
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [newImages, setNewImages]         = useState<File[]>([]);
  const [deletingId, setDeletingId]       = useState<string | null>(null);
  const fileInputRef                      = useRef<HTMLInputElement>(null);

  const wordCount  = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount  = content.length;
  const totalImages = existingMedia.length + newImages.length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    if (id) {
      apiClient.get<Post>(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
          setPostId(data.id);
          setStatus(data.status === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT');
          setExistingMedia(data.Media ?? []);
        })
        .catch(() => setError('Could not load post.'));
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const valid  = picked.filter((f) => {
      if (f.size > MAX_SIZE) { setError(`"${f.name}" exceeds 5 MB.`); return false; }
      return true;
    });
    const combined = [...newImages, ...valid];
    setNewImages(combined.slice(0, MAX_FILES - existingMedia.length));
    if (e.target) e.target.value = '';
  };

  const removeNewImage = (i: number) => setNewImages(p => p.filter((_, idx) => idx !== i));

  const handleDeleteMedia = async (mediaId: string) => {
    if (!postId) return;
    setDeletingId(mediaId);
    try {
      await apiClient.delete(`/posts/${postId}/media/${mediaId}`);
      setExistingMedia(p => p.filter(m => m.id !== mediaId));
    } catch (err) {
      setError(apiErrMsg(err, 'Failed to delete image.'));
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveDraft = async () => {
    if (!title && !content) return;
    if (content && content.trim().length < 10) { setError('Content must be at least 10 characters.'); return; }
    setIsSaving(true);
    setError('');
    try {
      const form = buildPostFormData({ title, content, status: 'DRAFT', images: newImages });
      if (postId) {
        const { data } = await apiClient.patch<Post>(`/posts/${postId}`, form);
        setExistingMedia(data.Media ?? []); setNewImages([]); setPostId(data.id);
      } else {
        const { data } = await apiClient.post<Post>('/posts', form);
        setExistingMedia(data.Media ?? []); setNewImages([]); setPostId(data.id);
        window.history.replaceState(null, '', `/admin/editor?id=${data.id}`);
      }
      setSavedAt(new Date());
      showToast('Draft saved');
    } catch (err) {
      setError(apiErrMsg(err, 'Failed to save draft.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRequestTranslations = async () => {
    if (!title.trim()) { setError('Enter a title first.'); return; }
    if (!content.trim()) { setError('Write some content first.'); return; }
    setError('');
    setIsTranslating(true);
    try {
      const res  = await fetch('/api/articles/publish', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, review: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Translation failed.');
      setTranslations(
        LANG_META.map(m => ({
          ...m,
          title: (data.translations?.titles || {})[m.lang] || title,
          text:  (data.translations || {})[m.lang] || `[Translation for ${m.label} unavailable]`,
          confirmed: false,
        }))
      );
      setStep('review');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  /* ── Review / Done steps ─────────────────────────────────────────────── */
  if (step === 'review') {
    return (
      <TranslationReview
        title={title} content={content} postId={postId} newImages={newImages}
        translations={translations} onUpdate={setTranslations}
        onBack={() => setStep('write')}
        onDone={savedMedia => { setExistingMedia(savedMedia); setNewImages([]); setStep('done'); }}
      />
    );
  }

  if (step === 'done') {
    return (
      <div className="fixed z-[35] flex flex-col items-center justify-center gap-6 p-8 bg-white inset-x-0 bottom-0 top-14 lg:top-0 lg:left-64">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--midnight-green)]/20 to-[var(--midnight-green)]/5 flex items-center justify-center ring-4 ring-[var(--midnight-green)]/10">
          <span className="material-symbols-outlined text-5xl text-[var(--midnight-green)]">check_circle</span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Published!</h2>
          <p className="text-sm text-gray-400 mt-2">Your article is live in all confirmed languages.</p>
        </div>
        <button
          onClick={() => router.push('/admin')}
          className="bg-[var(--midnight-green)] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[var(--obsidian)] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  /* ── Write step UI ───────────────────────────────────────────────────── */
  return (
    <>
      <div className="fixed z-[35] flex flex-col bg-[#f4f4f2] inset-x-0 bottom-0 top-14 lg:top-0 lg:left-64">

        {/* ── Action bar ──────────────────────────────────────────────── */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 lg:px-8 h-14 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push('/admin')}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-sm min-w-0">
              <span className="text-gray-400 font-medium truncate">Campaign Management</span>
              <span className="text-gray-300">/</span>
              <span className="font-bold text-[var(--midnight-green)] truncate">{id ? 'Edit Post' : 'New Post'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {savedAt && (
              <span className="hidden md:flex items-center gap-1 text-[10px] text-gray-400 font-medium mr-1">
                <span className="material-symbols-outlined text-[14px] text-green-500">cloud_done</span>
                Saved {savedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={handleSaveDraft}
              disabled={isSaving || isTranslating}
              className="h-9 px-4 flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[var(--obsidian)] font-bold text-xs rounded-lg transition-colors disabled:opacity-40"
            >
              {isSaving
                ? <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                : <span className="material-symbols-outlined text-[16px]">save</span>
              }
              <span className="hidden sm:inline">Save Draft</span>
            </button>
            <button
              onClick={handleRequestTranslations}
              disabled={isTranslating || isSaving}
              className="h-9 px-4 flex items-center gap-1.5 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {isTranslating
                ? <><span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Translating…</span></>
                : <><span className="material-symbols-outlined text-[16px]">translate</span><span className="hidden sm:inline">Review & Publish</span><span className="sm:hidden">Publish</span></>
              }
            </button>
          </div>
        </div>

        {/* ── Scroll area ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {/* Error banner */}
          {error && (
            <div className="mx-4 lg:mx-8 mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-red-400 text-[18px]">error</span>
              <p className="text-sm text-red-600 flex-1">{error}</p>
              <button onClick={() => setError('')} className="text-red-300 hover:text-red-500">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}
          {isTranslating && (
            <div className="mx-4 lg:mx-8 mt-4 bg-gradient-to-r from-[var(--midnight-green)]/8 to-transparent border border-[var(--midnight-green)]/15 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="w-4 h-4 border-2 border-[var(--midnight-green)]/30 border-t-[var(--midnight-green)] rounded-full animate-spin flex-shrink-0" />
              <p className="text-xs text-[var(--midnight-green)] font-semibold">Generating Pidgin, Igbo, Hausa & Yoruba translations…</p>
            </div>
          )}

          {/* ── Two-column grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-8 py-5 max-w-7xl mx-auto">

            {/* ── Left: Editor ─────────────────────────────────────── */}
            <div className="lg:col-span-8 space-y-4">

              {/* Headline */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[var(--midnight-green)] via-[var(--sunlight-yellow)] to-[var(--midnight-green)]" />
                <div className="p-6 lg:p-8">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Post Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Enter post title…"
                    className="w-full text-[1.6rem] leading-tight font-bold bg-transparent border-none outline-none focus:ring-0 p-0 text-[var(--obsidian)] placeholder-gray-200 font-serif"
                  />
                </div>
              </div>

              {/* Language tabs + toolbar + editor */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Tabs */}
                <div className="flex items-center border-b border-gray-100 overflow-x-auto no-scrollbar px-2">
                  {LANG_TABS.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setActiveLang(t.key)}
                      className={`flex-shrink-0 px-4 py-3.5 text-xs font-bold tracking-wide border-b-[2.5px] transition-all whitespace-nowrap ${
                        activeLang === t.key
                          ? 'border-[var(--midnight-green)] text-[var(--midnight-green)]'
                          : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Formatting toolbar */}
                <div className="px-4 lg:px-6 py-2.5 border-b border-gray-100 bg-[#fafaf9] flex items-center gap-0.5 flex-wrap">
                  {TOOLBAR_GROUPS.map((group, gi) => (
                    <React.Fragment key={gi}>
                      {gi > 0 && <div className="w-px h-4 bg-gray-200 mx-2" />}
                      {group.map(btn => (
                        <button
                          key={btn.icon}
                          title={btn.label}
                          type="button"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[var(--obsidian)] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
                        </button>
                      ))}
                    </React.Fragment>
                  ))}
                  <div className="ml-auto flex items-center gap-3">
                    <StatPill label="Words" value={wordCount} />
                    <StatPill label="Chars" value={charCount} />
                  </div>
                </div>

                {/* Editor body */}
                <div className="p-6 lg:p-8 min-h-[22rem]">
                  {activeLang === 'en' ? (
                    <textarea
                      value={content}
                      onChange={e => setContent(e.target.value)}
                      placeholder="Write your article in English. Other languages will be auto-translated when you click Review & Publish…"
                      className="w-full min-h-[22rem] text-[15px] text-[var(--obsidian)] leading-[1.85] resize-none border-none outline-none focus:ring-0 p-0 bg-transparent placeholder-gray-200"
                    />
                  ) : (
                    <div className="min-h-[22rem] flex flex-col items-center justify-center gap-3 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--midnight-green)]/6 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-[var(--midnight-green)]/50">translate</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-400">
                        {LANG_TABS.find(t => t.key === activeLang)?.label} will be auto-translated
                      </p>
                      <p className="text-xs text-gray-300 max-w-xs leading-relaxed">
                        Write in English, then click <span className="font-bold text-gray-400">Review & Publish</span> to generate and confirm all translations.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Sidebar ──────────────────────────────────── */}
            <aside className="lg:col-span-4 space-y-4">

              {/* Status card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">settings</span>
                  Post Settings
                </h3>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Status</label>
                  <div className="relative">
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${status === 'PUBLISHED' ? 'bg-green-500' : 'bg-amber-400'}`} />
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold py-2.5 pl-8 pr-8 focus:ring-2 focus:ring-[var(--midnight-green)]/30 focus:border-[var(--midnight-green)] appearance-none cursor-pointer outline-none transition-all"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[18px]">expand_more</span>
                  </div>
                </div>

                {postId && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Post ID</label>
                    <div
                      className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 cursor-pointer group hover:border-gray-300 transition-colors"
                      onClick={() => navigator.clipboard.writeText(postId).then(() => showToast('ID copied!'))}
                      title="Click to copy"
                    >
                      <span className="text-[10px] font-mono text-gray-400 truncate flex-1">{postId}</span>
                      <span className="material-symbols-outlined text-[13px] text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors">content_copy</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Media gallery */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">perm_media</span>
                    Media Gallery
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${totalImages > 0 ? 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]' : 'bg-gray-100 text-gray-400'}`}>
                    {totalImages} / {MAX_FILES}
                  </span>
                </div>

                <input ref={fileInputRef} type="file" accept={ACCEPTED} multiple className="hidden" onChange={handleFileChange} />

                {totalImages === 0 ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-8 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center gap-2 hover:border-[var(--midnight-green)]/40 hover:bg-[var(--midnight-green)]/3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-[var(--midnight-green)]/10 flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-[var(--midnight-green)]/60 transition-colors">add_photo_alternate</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-400">Add images</p>
                    <p className="text-[10px] text-gray-300">Up to {MAX_FILES} · max 5 MB each</p>
                  </button>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {existingMedia.map(media => (
                      <div key={media.id} className="relative aspect-square group rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={media.url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                        <button
                          onClick={() => handleDeleteMedia(media.id)}
                          disabled={deletingId === media.id}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 shadow opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                        >
                          {deletingId === media.id
                            ? <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            : <span className="material-symbols-outlined text-[12px]">delete</span>
                          }
                        </button>
                        <span className="absolute bottom-1 left-1 bg-[var(--midnight-green)] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">SAVED</span>
                      </div>
                    ))}
                    {newImages.map((file, i) => (
                      <div key={`new-${i}`} className="relative aspect-square group rounded-xl overflow-hidden bg-amber-50 border border-amber-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                        <button
                          onClick={() => removeNewImage(i)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                        <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">PENDING</span>
                      </div>
                    ))}
                    {totalImages < MAX_FILES && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-[var(--midnight-green)]/40 hover:bg-[var(--midnight-green)]/3 transition-all group"
                      >
                        <span className="material-symbols-outlined text-[20px] text-gray-300 group-hover:text-[var(--midnight-green)]/50 transition-colors">add_photo_alternate</span>
                        <span className="text-[9px] font-bold text-gray-300 group-hover:text-[var(--midnight-green)]/50 uppercase tracking-wide transition-colors">Add</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Publish actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-2.5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-3">
                  <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                  Actions
                </h3>
                <button
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                  className="w-full h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-[var(--obsidian)] font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {isSaving
                    ? <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">save</span>
                  }
                  Save Draft
                </button>
                <button
                  onClick={handleRequestTranslations}
                  disabled={isTranslating || isSaving}
                  className="w-full h-10 rounded-xl bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-xs shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isTranslating
                    ? <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">translate</span>
                  }
                  Review & Publish
                </button>
              </div>

            </aside>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed z-[60] bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-[var(--obsidian)] text-white py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[220px]">
            <div className="w-6 h-6 rounded-full bg-[var(--midnight-green)] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-[14px]">check</span>
            </div>
            <span className="text-sm font-semibold">{toast}</span>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Translation Review ───────────────────────────────────────────────────── */
function TranslationReview({
  title, content, postId, newImages, translations, onUpdate, onBack, onDone,
}: {
  title: string; content: string; postId: string | null; newImages: File[];
  translations: TranslationPreview[]; onUpdate: (t: TranslationPreview[]) => void;
  onBack: () => void; onDone: (savedMedia: MediaItem[]) => void;
}) {
  const [publishing, setPublishing]     = useState(false);
  const [error, setError]               = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const confirmedCount = translations.filter(t => t.confirmed).length;

  const toggleConfirm = (i: number) =>
    onUpdate(translations.map((t, idx) => idx === i ? { ...t, confirmed: !t.confirmed } : t));
  const updateText = (i: number, text: string) =>
    onUpdate(translations.map((t, idx) => idx === i ? { ...t, text } : t));

  const handlePublish = async () => {
    if (confirmedCount === 0) { setError('Confirm at least one translation before publishing.'); return; }
    setPublishing(true); setError('');
    try {
      const multilingualContent: MultilingualContentItem[] = [
        { language: 'ENGLISH', title, content },
        ...translations.filter(t => t.confirmed).map(t => {
          const meta = LANG_META.find(m => m.lang === t.lang)!;
          return { language: meta.backendLang, title: t.title || title, content: t.text };
        }),
      ];
      const form = buildPostFormData({ title, content, status: 'PUBLISHED', multilingualContent, images: newImages });
      let savedPost: Post;
      if (postId) {
        const { data } = await apiClient.patch<Post>(`/posts/${postId}`, form);
        savedPost = data;
      } else {
        const { data } = await apiClient.post<Post>('/posts', form);
        savedPost = data;
      }
      onDone(savedPost.Media ?? []);
    } catch (err: unknown) {
      setError(apiErrMsg(err, 'Publish failed.'));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2]" style={{ top: 0, bottom: 0, left: 256, right: 0 }}>
      {/* Bar */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 lg:px-8 h-14 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[var(--obsidian)] transition-colors">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline">Back to Editor</span>
        </button>
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Translation Review</p>
          <p className="text-xs font-bold text-[var(--midnight-green)]">{confirmedCount} / 4 confirmed</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={publishing || confirmedCount === 0}
          className="h-9 px-5 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white rounded-lg text-xs font-bold disabled:opacity-40 flex items-center gap-1.5 shadow-md"
        >
          {publishing
            ? <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            : <span className="material-symbols-outlined text-[16px]">publish</span>
          }
          Publish
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-5 max-w-3xl mx-auto space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>{error}
            </div>
          )}
          {newImages.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-500">photo_library</span>
              <div>
                <p className="text-xs font-bold text-amber-700">{newImages.length} image{newImages.length > 1 ? 's' : ''} queued for upload</p>
                <div className="flex gap-1.5 mt-2">
                  {newImages.map((f, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={URL.createObjectURL(f)} alt="" className="w-10 h-10 rounded-lg object-cover border border-amber-200" />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="bg-gradient-to-r from-[var(--midnight-green)]/8 to-transparent border border-[var(--midnight-green)]/15 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-[var(--midnight-green)]/60 flex-shrink-0">info</span>
            <p className="text-xs text-gray-600 leading-relaxed">Review each translation for accuracy. Tap <strong>Confirm</strong> to approve for publishing, or <strong>Edit</strong> to correct it.</p>
          </div>

          {translations.map((t, i) => (
            <div key={t.lang} className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${t.confirmed ? 'border-[var(--midnight-green)] shadow-md shadow-[var(--midnight-green)]/10' : 'border-gray-100 shadow-sm'}`}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{t.flag}</span>
                  <div>
                    <p className="font-bold text-sm text-[var(--obsidian)]">{t.label}</p>
                    <p className="text-[9px] font-mono text-gray-400 uppercase">{t.lang}</p>
                  </div>
                  {t.confirmed && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold text-[var(--midnight-green)] bg-[var(--midnight-green)]/10 px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[10px]">check</span> APPROVED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingIndex(editingIndex === i ? null : i)}
                    className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-400 hover:text-gray-600 transition-all"
                  >
                    {editingIndex === i ? 'Done' : 'Edit'}
                  </button>
                  <button
                    onClick={() => toggleConfirm(i)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${t.confirmed ? 'bg-[var(--midnight-green)] text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-[var(--midnight-green)]/10 hover:text-[var(--midnight-green)]'}`}
                  >
                    {t.confirmed ? '✓ Confirmed' : 'Confirm'}
                  </button>
                </div>
              </div>
              <div className="p-5">
                {editingIndex === i ? (
                  <textarea
                    className="w-full text-sm text-gray-700 leading-relaxed border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:border-[var(--midnight-green)] min-h-[120px] bg-gray-50"
                    value={t.text}
                    onChange={e => updateText(i, e.target.value)}
                    lang={t.lang}
                  />
                ) : (
                  <p className="text-sm text-gray-700 leading-[1.85]" lang={t.lang}>{t.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileEditor() {
  return <Suspense><EditorForm /></Suspense>;
}
