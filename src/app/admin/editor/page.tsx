"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient, buildPostFormData } from '@/lib/apiClient';
import type { Post, MultilingualContentItem, MediaItem } from '@/lib/types';

/* ── Types ──────────────────────────────────────────────────────────────── */
type Step = 'write' | 'review' | 'done';

interface TranslationPreview {
  lang: string;
  label: string;
  flag: string;
  title: string;
  text: string;
  confirmed: boolean;
}

const LANG_META = [
  { lang: 'pcm', label: 'Nigerian Pidgin', flag: '🇳🇬', backendLang: 'PIDGIN' },
  { lang: 'ig',  label: 'Igbo',            flag: '🟢',  backendLang: 'IGBO'   },
  { lang: 'ha',  label: 'Hausa',           flag: '🟡',  backendLang: 'HAUSA'  },
  { lang: 'yo',  label: 'Yoruba',          flag: '🔴',  backendLang: 'YORUBA' },
];

const ACCEPTED = 'image/jpeg,image/png,image/gif,image/webp';
const MAX_SIZE  = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 10;

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function apiErrMsg(err: unknown, fallback: string): string {
  const e = err as { response?: { status?: number; data?: { message?: string | string[] } } };
  if (!e.response) return 'Cannot reach server. Is the backend running?';
  const msg = e.response.data?.message;
  return Array.isArray(msg) ? msg[0] : (msg ?? fallback);
}

/* ── Step 1: Editor Form ─────────────────────────────────────────────────── */
function EditorForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const id           = searchParams.get('id');

  const [title, setTitle]             = useState('');
  const [content, setContent]         = useState('');
  const [postId, setPostId]           = useState<string | null>(id);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSaving, setIsSaving]       = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError]             = useState('');
  const [step, setStep]               = useState<Step>('write');
  const [translations, setTranslations] = useState<TranslationPreview[]>([]);

  // ── Image state ──
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([]);
  const [newImages, setNewImages]         = useState<File[]>([]);
  const [deletingId, setDeletingId]       = useState<string | null>(null);
  const fileInputRef                      = useRef<HTMLInputElement>(null);

  // Load existing post for editing
  useEffect(() => {
    if (id) {
      apiClient.get<Post>(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
          setPostId(data.id);
          setExistingMedia(data.Media ?? []);
        })
        .catch(() => setError('Could not load post.'));
    }
  }, [id]);

  /* ── Image picker ─────────────────────────────────────────────────────── */
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

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Delete existing media ────────────────────────────────────────────── */
  const handleDeleteMedia = async (mediaId: string) => {
    if (!postId) return;
    setDeletingId(mediaId);
    try {
      await apiClient.delete(`/posts/${postId}/media/${mediaId}`);
      setExistingMedia((prev) => prev.filter((m) => m.id !== mediaId));
    } catch (err) {
      setError(apiErrMsg(err, 'Failed to delete image.'));
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Save Draft ───────────────────────────────────────────────────────── */
  const handleSaveDraft = async () => {
    if (!title && !content) return;
    if (content && content.trim().length < 10) {
      setError('Content must be at least 10 characters to save.');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      const form = buildPostFormData({ title, content, status: 'DRAFT', images: newImages });
      if (postId) {
        const { data } = await apiClient.patch<Post>(`/posts/${postId}`, form);
        setExistingMedia(data.Media ?? []);
        setNewImages([]);
        setPostId(data.id);
      } else {
        const { data } = await apiClient.post<Post>('/posts', form);
        setExistingMedia(data.Media ?? []);
        setNewImages([]);
        setPostId(data.id);
        window.history.replaceState(null, '', `/admin/editor?id=${data.id}`);
      }
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 2000);
    } catch (err) {
      setError(apiErrMsg(err, 'Failed to save draft.'));
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Request translations ─────────────────────────────────────────────── */
  const handleRequestTranslations = async () => {
    if (!title.trim()) { setError('Please enter a title before publishing.'); return; }
    if (!content.trim()) { setError('Please write some content before publishing.'); return; }
    setError('');
    setIsTranslating(true);
    try {
      const res  = await fetch('/api/articles/publish', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title, content, review: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Translation failed.');

      setTranslations(
        LANG_META.map((m) => ({
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

  const totalImages = existingMedia.length + newImages.length;

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
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isDraftSaved ? 'text-[var(--midnight-green)] opacity-100' : 'opacity-0'}`}>✓ Saved</span>
            <button
              onClick={handleSaveDraft}
              disabled={isSaving || isTranslating}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--obsidian)] px-3 py-2 disabled:opacity-40 flex items-center gap-1"
            >
              {isSaving ? <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"/> : null}
              Save Draft
            </button>
            <button
              onClick={handleRequestTranslations}
              disabled={isTranslating || isSaving}
              className="bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isTranslating
                ? <><span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"/><span>Translating...</span></>
                : <><span className="material-symbols-outlined text-sm">translate</span><span>Review Translations</span></>}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
            <span className="material-symbols-outlined text-red-500 text-base mt-0.5">error</span>
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        )}
        {isTranslating && (
          <div className="mx-4 mt-4 bg-[var(--midnight-green)]/5 border border-[var(--midnight-green)]/10 rounded-xl px-4 py-3">
            <p className="text-xs text-[var(--midnight-green)] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[var(--sunlight-yellow)]">auto_awesome</span>
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
          />
          <div className="w-12 h-[1px] bg-[var(--sunlight-yellow)]"/>
          <textarea
            placeholder="Write in English. We'll auto-translate to Pidgin, Igbo, Hausa & Yoruba…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-[40vh] text-lg text-gray-700 leading-relaxed placeholder-gray-300 border-none outline-none focus:ring-0 px-0 resize-none bg-transparent"
          />

          {/* ── Image section ─────────────────────────────────────────── */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Images {totalImages > 0 && <span className="text-[var(--midnight-green)]">({totalImages}/{MAX_FILES})</span>}
              </p>
              {totalImages < MAX_FILES && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">add_photo_alternate</span>
                  Add Images
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED}
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Image grid */}
            {totalImages > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {/* Existing uploaded images */}
                {existingMedia.map((media) => (
                  <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={media.url} alt="" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteMedia(media.id)}
                        disabled={deletingId === media.id}
                        className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center transition-opacity"
                      >
                        {deletingId === media.id
                          ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                          : <span className="material-symbols-outlined text-white text-sm">delete</span>
                        }
                      </button>
                    </div>
                    {/* Uploaded badge */}
                    <span className="absolute bottom-1 left-1 bg-[var(--midnight-green)] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                      SAVED
                    </span>
                  </div>
                ))}

                {/* Newly selected images (not yet uploaded) */}
                {newImages.map((file, i) => (
                  <div key={`new-${i}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center transition-opacity"
                      >
                        <span className="material-symbols-outlined text-white text-sm">close</span>
                      </button>
                    </div>
                    {/* Pending badge */}
                    <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                      PENDING
                    </span>
                  </div>
                ))}

                {/* Add more slot */}
                {totalImages < MAX_FILES && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-[var(--midnight-green)] hover:bg-[var(--midnight-green)]/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-gray-300 text-2xl">add_photo_alternate</span>
                    <span className="text-[9px] text-gray-300 font-bold uppercase">Add</span>
                  </button>
                )}
              </div>
            )}

            {/* Empty state */}
            {totalImages === 0 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center gap-2 hover:border-[var(--midnight-green)]/30 hover:bg-[var(--midnight-green)]/5 transition-all"
              >
                <span className="material-symbols-outlined text-gray-300 text-3xl">add_photo_alternate</span>
                <p className="text-xs text-gray-400 font-medium">Add up to {MAX_FILES} images</p>
                <p className="text-[10px] text-gray-300">JPG, PNG, GIF, WebP · max 5 MB each</p>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Step 2: Translation Review ─────────────────────────────────────────── */
  if (step === 'review') {
    return (
      <TranslationReview
        title={title}
        content={content}
        postId={postId}
        newImages={newImages}
        translations={translations}
        onUpdate={setTranslations}
        onBack={() => setStep('write')}
        onDone={(savedMedia) => {
          setExistingMedia(savedMedia);
          setNewImages([]);
          setStep('done');
        }}
      />
    );
  }

  /* ── Step 3: Done ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 p-8">
      <div className="w-20 h-20 rounded-full bg-[var(--midnight-green)]/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">check_circle</span>
      </div>
      <h2 className="text-2xl font-bold serif-font text-[var(--obsidian)]">Published!</h2>
      <p className="text-sm text-gray-500 text-center max-w-xs">Your article is now live in all confirmed languages.</p>
      <button onClick={() => router.push('/admin')} className="bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-sm">
        Back to Dashboard
      </button>
    </div>
  );
}

/* ── Translation Review Sub-Component ────────────────────────────────────── */
function TranslationReview({
  title,
  content,
  postId,
  newImages,
  translations,
  onUpdate,
  onBack,
  onDone,
}: {
  title: string;
  content: string;
  postId: string | null;
  newImages: File[];
  translations: TranslationPreview[];
  onUpdate: (t: TranslationPreview[]) => void;
  onBack: () => void;
  onDone: (savedMedia: MediaItem[]) => void;
}) {
  const [publishing, setPublishing]     = useState(false);
  const [error, setError]               = useState('');
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
      const multilingualContent: MultilingualContentItem[] = [
        { language: 'ENGLISH', title, content },
        ...translations
          .filter((t) => t.confirmed)
          .map((t) => {
            const meta = LANG_META.find((m) => m.lang === t.lang)!;
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
    <div className="min-h-screen bg-[var(--off-white)] flex flex-col pb-24">
      {/* Toolbar */}
      <div className="sticky top-14 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center z-30">
        <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-500">
          <span className="material-symbols-outlined text-base">arrow_back</span> Edit
        </button>
        <div className="text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Review Step</p>
          <p className="text-xs font-bold text-[var(--midnight-green)]">{confirmedCount}/4 confirmed</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={publishing || confirmedCount === 0}
          className="bg-[var(--midnight-green)] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest disabled:opacity-40 flex items-center gap-2"
        >
          {publishing
            ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            : <span className="material-symbols-outlined text-sm">publish</span>
          }
          Publish
        </button>
      </div>

      {error && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="p-4 max-w-lg mx-auto w-full space-y-4 mt-4">
        {/* Images summary */}
        {newImages.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-2">
              {newImages.length} image{newImages.length > 1 ? 's' : ''} will be uploaded
            </p>
            <div className="flex gap-2 flex-wrap">
              {newImages.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={URL.createObjectURL(f)} alt="" className="w-12 h-12 rounded-lg object-cover"/>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[var(--midnight-green)]/5 border border-[var(--midnight-green)]/10 rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] mb-1">Review Instructions</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Review each translation for political accuracy. Tap <strong>Confirm</strong> to approve for publishing, or <strong>Edit</strong> to correct it.
          </p>
        </div>

        {translations.map((t, i) => (
          <div key={t.lang} className={`bg-white rounded-xl border-2 transition-all ${t.confirmed ? 'border-[var(--midnight-green)]' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{t.flag}</span>
                <div>
                  <p className="font-bold text-sm text-[var(--obsidian)]">{t.label}</p>
                  <p className="text-[9px] font-mono uppercase text-gray-400">{t.lang}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingIndex(editingIndex === i ? null : i)}
                  className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1.5 rounded-full border border-gray-200 hover:border-[var(--midnight-green)] hover:text-[var(--midnight-green)] transition-all"
                >
                  {editingIndex === i ? 'Done' : 'Edit'}
                </button>
                <button
                  onClick={() => toggleConfirm(i)}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${t.confirmed ? 'bg-[var(--midnight-green)] text-white' : 'bg-gray-100 text-gray-500 hover:bg-[var(--midnight-green)]/10 hover:text-[var(--midnight-green)]'}`}
                >
                  {t.confirmed ? '✓ Confirmed' : 'Confirm'}
                </button>
              </div>
            </div>
            <div className="p-4">
              {editingIndex === i ? (
                <textarea
                  className="w-full text-sm text-gray-700 leading-relaxed border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-[var(--midnight-green)] min-h-[120px]"
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
