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
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      {/* Header */}
      <div className="bg-[var(--midnight-green)] text-white px-4 pt-8 pb-6">
        <div className="h-1 w-full flex mb-6 rounded-full overflow-hidden">
          <div className="flex-1 bg-[var(--midnight-green)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
          <div className="flex-1 bg-[var(--sunlight-yellow)]"/>
        </div>
        <h1 className="text-2xl font-bold serif-font">Constituent Inbox</h1>
        <p className="text-blue-200 text-sm mt-1">{petitions.length} petition{petitions.length !== 1 ? 's' : ''} received</p>
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

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : petitions.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-4xl block mb-3">inbox</span>
            <p className="text-sm">No constituency petitions yet.</p>
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
  );
}
