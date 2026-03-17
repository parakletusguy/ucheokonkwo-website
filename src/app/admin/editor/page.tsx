"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminStore } from '@/store/useAdminStore';

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
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState('');

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

  const handlePublish = async () => {
    if (!title.trim()) {
      setPublishError('Please enter a title before publishing.');
      return;
    }
    if (!content.trim()) {
      setPublishError('Please write some content before publishing.');
      return;
    }

    setPublishError('');
    setIsPublishing(true);

    try {
      const response = await fetch('/api/articles/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Publish failed.');
      }

      // Remove from local drafts on successful publish
      deleteArticle(articleId);
      setPublishSuccess(true);
      
      // Redirect to dashboard after brief success message
      setTimeout(() => router.push('/admin'), 1800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Publish failed.';
      setPublishError(message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      {/* Editor Toolbar */}
      <div className="sticky top-14 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center z-30">
        <button
          onClick={() => router.push('/admin')}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isDraftSaved ? 'text-[var(--midnight-green)] opacity-100' : 'opacity-0'}`}>
            ✓ Saved
          </span>
          <button
            onClick={handleSaveDraft}
            disabled={isPublishing}
            className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[var(--obsidian)] px-3 py-2 disabled:opacity-40"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-[var(--sunlight-yellow)] text-[var(--obsidian)] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isPublishing ? (
              <>
                <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                Translating...
              </>
            ) : 'Publish'}
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {publishSuccess && (
        <div className="mx-4 mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="material-symbols-outlined text-green-600 text-base">check_circle</span>
          <p className="text-sm font-medium text-green-700">Published in 5 languages! Redirecting...</p>
        </div>
      )}

      {/* Error Notification */}
      {publishError && (
        <div className="mx-4 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <span className="material-symbols-outlined text-red-500 text-base mt-0.5">error</span>
          <p className="text-sm font-medium text-red-600">{publishError}</p>
        </div>
      )}

      {/* Translation hint */}
      {isPublishing && (
        <div className="mx-4 mt-4 bg-[var(--midnight-green)]/5 border border-[var(--midnight-green)]/10 rounded-xl px-4 py-3">
          <p className="text-xs text-[var(--midnight-green)] font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-[var(--sunlight-yellow)]">auto_awesome</span>
            Translating into Pidgin, Igbo, Hausa & Yoruba...
          </p>
        </div>
      )}

      {/* Editor Body */}
      <div className="flex-1 flex flex-col p-4 pt-6 gap-4 max-w-md mx-auto w-full">
        <input
          type="text"
          placeholder="Article Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold font-serif text-[var(--obsidian)] placeholder-gray-200 border-none outline-none focus:ring-0 px-0 bg-transparent"
          lang="en"
        />

        <div className="w-12 h-[1px] bg-[var(--sunlight-yellow)]"></div>

        <textarea
          placeholder="Write in English. We'll auto-translate to Pidgin, Igbo, Hausa & Yoruba when you publish..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full flex-1 min-h-[55vh] text-lg text-gray-700 leading-relaxed placeholder-gray-300 border-none outline-none focus:ring-0 px-0 resize-none bg-transparent"
          lang="en"
        />
      </div>
    </div>
  );
}

export default function MobileEditor() {
  return (
    <Suspense>
      <EditorForm />
    </Suspense>
  );
}
