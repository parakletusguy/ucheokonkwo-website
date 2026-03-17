"use client";

import React, { useState, useEffect } from 'react';

interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  ward: string;
  createdAt: string;
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/volunteers')
      .then((r) => r.json())
      .then((data) => { setVolunteers(data.volunteers || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = volunteers.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.ward.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--off-white)] pb-24">
      {/* Header */}
      <div className="bg-[var(--integrity-navy)] text-white px-4 pt-8 pb-6">
        <div className="h-1 w-full flex mb-6 rounded-full overflow-hidden">
          <div className="flex-1 bg-[var(--constituency-green)]"/>
          <div className="flex-1 bg-[var(--adc-yellow)]"/>
          <div className="flex-1 bg-[var(--vanguard-red)]"/>
        </div>
        <h1 className="text-2xl font-bold serif-font">Volunteer Database</h1>
        <p className="text-blue-200 text-sm mt-1">{volunteers.length} registered supporter{volunteers.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="px-4 pt-5 max-w-2xl mx-auto">
        {/* Search */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or ward..."
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] placeholder-gray-400 focus:outline-none focus:border-[var(--integrity-navy)] mb-4"
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-[var(--integrity-navy)] border-t-transparent rounded-full animate-spin"/>
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
                <div className="w-10 h-10 rounded-full bg-[var(--integrity-navy)]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--integrity-navy)] font-bold text-sm">{v.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[var(--obsidian)] truncate">{v.name}</p>
                  <p className="text-xs text-gray-400 truncate">{v.email}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--constituency-green)] mt-0.5">{v.ward}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[9px] text-gray-300">{new Date(v.createdAt).toLocaleDateString()}</p>
                  {v.phone && <p className="text-xs text-gray-400">{v.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
