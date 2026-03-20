"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import type { Volunteer } from '@/lib/types';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [deleting, setDeleting]     = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<Volunteer[]>('/volunteers')
      .then(({ data }) => setVolunteers(data))
      .catch(() => setVolunteers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this volunteer?')) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/volunteers/${id}`);
      setVolunteers((prev) => prev.filter((v) => v.id !== id));
    } catch {
      alert('Failed to remove volunteer.');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = volunteers.filter(
    (v) =>
      v.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (v.lga ?? '').toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2]" style={{ top: 0, bottom: 0, left: 256, right: 0 }}>
      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm text-[var(--obsidian)]">Volunteer Database</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            {loading ? "…" : volunteers.length}
          </span>
        </div>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 text-[16px]">search</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-48 bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-5 max-w-3xl mx-auto">

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <span className="material-symbols-outlined text-4xl block mb-3">group</span>
            <p className="text-sm">No volunteers yet. Share the signup link!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((v) => (
              <div key={v.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--midnight-green)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--midnight-green)] font-bold text-sm">{v.fullName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[var(--obsidian)] truncate">{v.fullName}</p>
                  <p className="text-xs text-gray-400 truncate">{v.email}</p>
                  {v.lga && <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] mt-0.5">{v.lga}</p>}
                  {v.interests && v.interests.length > 0 && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{v.interests.join(', ')}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-[9px] text-gray-300">{new Date(v.createdAt).toLocaleDateString()}</p>
                    {v.phone && <p className="text-xs text-gray-400">{v.phone}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(v.id)}
                    disabled={deleting === v.id}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
