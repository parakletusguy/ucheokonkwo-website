"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import type { Feedback, FeedbackType } from '@/lib/types';

const TYPE_META: Record<FeedbackType, { label: string; icon: string; color: string; bg: string; border: string }> = {
  SUGGESTION: { label: 'Suggestion', icon: 'lightbulb',  color: 'text-amber-600',               bg: 'bg-amber-50',                          border: 'border-amber-100' },
  COMPLIMENT: { label: 'Compliment', icon: 'thumb_up',   color: 'text-[var(--midnight-green)]',  bg: 'bg-[var(--midnight-green)]/10',        border: 'border-[var(--midnight-green)]/20' },
  CRITICISM:  { label: 'Criticism',  icon: 'flag',        color: 'text-red-500',                  bg: 'bg-red-50',                            border: 'border-red-100'   },
};

const FILTERS: Array<'ALL' | FeedbackType> = ['ALL', 'SUGGESTION', 'COMPLIMENT', 'CRITICISM'];

export default function AdminFeedbackPage() {
  const [items,    setItems]    = useState<Feedback[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [filter,   setFilter]   = useState<'ALL' | FeedbackType>('ALL');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<Feedback[]>('/feedback')
      .then(({ data }) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this feedback?')) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/feedback/${id}`);
      setItems(prev => prev.filter(f => f.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert('Failed to delete.');
    } finally {
      setDeleting(null);
    }
  };

  const visible = filter === 'ALL' ? items : items.filter(f => f.type === filter);

  const counts = {
    ALL:        items.length,
    SUGGESTION: items.filter(f => f.type === 'SUGGESTION').length,
    COMPLIMENT: items.filter(f => f.type === 'COMPLIMENT').length,
    CRITICISM:  items.filter(f => f.type === 'CRITICISM').length,
  };

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2] inset-x-0 bottom-0 top-14 lg:top-0 lg:left-64">

      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm text-[var(--obsidian)]">Feedback</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            {loading ? '…' : items.length}
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1">
          {FILTERS.map(f => {
            const meta = f !== 'ALL' ? TYPE_META[f] : null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  filter === f
                    ? 'bg-[var(--midnight-green)] text-white'
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                {meta?.label ?? 'All'} ({counts[f]})
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel — bottom sheet */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center lg:justify-center p-0 lg:p-6">
          <div className="bg-white w-full lg:max-w-lg rounded-t-2xl lg:rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
            {/* Detail header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                {(() => {
                  const meta = TYPE_META[selected.type];
                  return (
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${meta.bg} ${meta.color} border ${meta.border}`}>
                      <span className="material-symbols-outlined text-[14px]">{meta.icon}</span>
                      {meta.label}
                    </span>
                  );
                })()}
                <span className="text-[10px] text-gray-300">
                  {new Date(selected.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selected.id)}
                  disabled={deleting === selected.id}
                  className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 disabled:opacity-50 transition-colors"
                >
                  {deleting === selected.id
                    ? <span className="w-3 h-3 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">delete</span>
                  }
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Detail body */}
            <div className="overflow-y-auto flex-1 px-6 py-5">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="px-4 lg:px-8 py-5 max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-gray-300 text-2xl">chat_bubble_outline</span>
              </div>
              <p className="text-sm font-semibold">No {filter === 'ALL' ? '' : filter.toLowerCase() + ' '}feedback yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {visible.map((fb) => {
                const meta = TYPE_META[fb.type];
                return (
                  <div
                    key={fb.id}
                    className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 hover:shadow-sm transition-all"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center border ${meta.border}`}>
                      <span className={`material-symbols-outlined text-[16px] ${meta.color}`}>{meta.icon}</span>
                    </div>

                    <button
                      onClick={() => setSelected(fb)}
                      className="flex-1 min-w-0 text-left"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${meta.color}`}>{meta.label}</span>
                        <span className="text-[9px] text-gray-300 flex-shrink-0">{new Date(fb.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{fb.message}</p>
                    </button>

                    <button
                      onClick={() => handleDelete(fb.id)}
                      disabled={deleting === fb.id}
                      className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
