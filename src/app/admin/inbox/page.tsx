"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import type { Petition } from '@/lib/types';

export default function InboxPage() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<Petition | null>(null);
  const [deleting, setDeleting]   = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<Petition[]>('/petitions')
      .then(({ data }) => setPetitions(data))
      .catch(() => setPetitions([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this petition?')) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/petitions/${id}`);
      setPetitions((prev) => prev.filter((p) => p.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert('Failed to delete petition.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2]" style={{ top: 0, bottom: 0, left: 256, right: 0 }}>
      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm text-[var(--obsidian)]">Constituent Inbox</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            {loading ? "…" : petitions.length}
          </span>
        </div>
      </div>

      {/* Petition detail overlay */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-lg serif-font text-[var(--obsidian)]">{selected.constituentName}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)]">{selected.topic}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selected.id)}
                  disabled={deleting === selected.id}
                  className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            <p className="text-[9px] text-gray-300 mt-4">{new Date(selected.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-5 max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin"/>
            </div>
          ) : petitions.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-gray-300 text-2xl">inbox</span>
              </div>
              <p className="text-sm font-semibold">No constituency petitions yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {petitions.map((p) => (
                <div
                  key={p.id}
                  className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 transition-all hover:shadow-sm"
                >
                  <button
                    onClick={() => setSelected(p)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-sm text-[var(--obsidian)] truncate">{p.constituentName}</p>
                      <p className="text-[9px] text-gray-300 flex-shrink-0">{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] mb-1">{p.topic}</p>
                    <p className="text-xs text-gray-400 truncate">{p.message}</p>
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deleting === p.id}
                    className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
