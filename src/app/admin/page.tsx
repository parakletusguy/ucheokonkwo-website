"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminStore } from '@/store/useAdminStore';

interface Stats {
  volunteers: number;
  inbox: number;
  unreadInbox: number;
}

export default function AdminDashboard() {
  const { articles, deleteArticle } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats>({ volunteers: 0, inbox: 0, unreadInbox: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Fetch live stats from backend
    Promise.all([
      fetch('/api/volunteers').then(r => r.json()).catch(() => ({ volunteers: [] })),
      fetch('/api/messages').then(r => r.json()).catch(() => ({ messages: [] })),
    ]).then(([volData, msgData]) => {
      const vols = volData.volunteers || [];
      const msgs = msgData.messages || [];
      setStats({
        volunteers: vols.length,
        inbox: msgs.length,
        unreadInbox: msgs.filter((m: { read: boolean }) => !m.read).length,
      });
      setLoadingStats(false);
    });
  }, []);

  if (!mounted) return null;

  const drafts = articles.filter(a => a.status === 'draft');
  const published = articles.filter(a => a.status === 'published');

  const statCards = [
    {
      icon: 'group',
      label: 'Volunteers',
      value: loadingStats ? '…' : stats.volunteers,
      href: '/admin/volunteers',
      color: 'text-[var(--midnight-green)]',
      bg: 'bg-[var(--midnight-green)]/8',
    },
    {
      icon: 'inbox',
      label: 'Inbox',
      value: loadingStats ? '…' : stats.inbox,
      badge: stats.unreadInbox > 0 ? stats.unreadInbox : null,
      href: '/admin/inbox',
      color: 'text-[var(--midnight-green)]',
      bg: 'bg-[var(--midnight-green)]/8',
    },
    {
      icon: 'article',
      label: 'Published',
      value: published.length,
      href: null,
      color: 'text-[var(--midnight-green)]',
      bg: 'bg-[var(--midnight-green)]/8',
    },
    {
      icon: 'draft',
      label: 'Drafts',
      value: drafts.length,
      href: null,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="p-4 pt-6 space-y-8 animate-in fade-in duration-300 pb-24">

      {/* Header Row */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[var(--obsidian)]">My Desk</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-widest">
            {articles.length} Total Posts
          </p>
        </div>
        <Link
          href="/admin/editor"
          className="bg-[var(--midnight-green)] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--obsidian)] transition-colors transform hover:scale-105 active:scale-95"
          aria-label="New Post"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((card) => {
          const inner = (
            <div className={`${card.bg} rounded-2xl p-4 flex flex-col gap-2 relative`}>
              <div className="flex items-center justify-between">
                <span className={`material-symbols-outlined text-xl ${card.color}`}>{card.icon}</span>
                {card.badge && (
                  <span className="bg-[var(--sunlight-yellow)] text-[var(--midnight-green)] text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {card.badge} new
                  </span>
                )}
              </div>
              <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{card.label}</p>
            </div>
          );
          return card.href ? (
            <Link key={card.label} href={card.href} className="block hover:scale-[1.02] transition-transform active:scale-95">
              {inner}
            </Link>
          ) : (
            <div key={card.label}>{inner}</div>
          );
        })}
      </div>

      {/* Drafts section */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 pb-2">
          Drafts ({drafts.length})
        </h2>
        {drafts.length === 0 ? (
          <div className="text-center py-8 text-gray-300">
            <span className="material-symbols-outlined text-3xl block mb-2">edit_note</span>
            <p className="text-sm">No drafts yet. Tap + to start writing.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {drafts.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 relative group">
                <Link href={`/admin/editor?id=${article.id}`} className="absolute inset-0 z-10" />
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
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-sm">Draft</span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Published section */}
      <div className="space-y-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 pb-2">
          Published ({published.length})
        </h2>
        {published.length === 0 ? (
          <div className="text-center py-8 text-gray-300">
            <span className="material-symbols-outlined text-3xl block mb-2">public</span>
            <p className="text-sm">No published articles yet.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {published.map(article => (
              <div key={article.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 relative">
                <Link href={`/admin/editor?id=${article.id}`} className="absolute inset-0 z-10" />
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
                    5 Langs
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
