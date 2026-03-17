"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';

export default function AdminDashboard() {
  const { articles, deleteArticle } = useAdminStore();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch with Zustand persist
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const drafts = articles.filter(a => a.status === 'draft');
  const published = articles.filter(a => a.status === 'published');

  return (
    <div className="p-4 pt-6 space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[var(--obsidian)]">My Desk</h1>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-widest">{articles.length} Total Posts</p>
        </div>
        <Link 
          href="/admin/editor" 
          className="bg-[var(--midnight-green)] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--obsidian)] transition-colors transform hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 pb-2">
          Drafts ({drafts.length})
        </h2>
        {drafts.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No drafts yet. Tap + to start writing.</p>
        ) : (
          <div className="grid gap-3">
            {drafts.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 relative group">
                <Link href={`/admin/editor?id=${article.id}`} className="absolute inset-0 z-10"></Link>
                <div className="flex justify-between items-start z-0">
                  <h3 className="font-bold text-sm text-[var(--obsidian)] line-clamp-2 leading-tight pr-8">
                    {article.title || 'Untitled Post'}
                  </h3>
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteArticle(article.id); }}
                    className="z-20 text-gray-300 hover:text-red-500 transition-colors p-1 -m-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 z-0">
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded-sm">Draft</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 pb-2">
          Published ({published.length})
        </h2>
        {published.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No published articles yet.</p>
        ) : (
          <div className="grid gap-3">
            {published.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 relative">
                <Link href={`/admin/editor?id=${article.id}`} className="absolute inset-0 z-10"></Link>
                <div className="flex justify-between items-start z-0">
                  <h3 className="font-bold text-sm text-[var(--obsidian)] line-clamp-2 leading-tight pr-8">
                    {article.title}
                  </h3>
                   <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteArticle(article.id); }}
                    className="z-20 text-gray-300 hover:text-red-500 transition-colors p-1 -m-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2 z-0">
                  <span className="px-2 py-1 bg-green-50 text-[var(--midnight-green)] rounded-sm">Published</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  <span className="ml-auto flex items-center gap-1 text-[var(--midnight-green)]">
                    <span className="material-symbols-outlined text-[12px]">translate</span>
                    4 Langs
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
