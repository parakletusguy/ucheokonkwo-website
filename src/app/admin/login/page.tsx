"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdcLogo from '@/components/AdcLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.replace('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--midnight-green)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 texture-overlay opacity-20 pointer-events-none" />

      {/* Sunlight yellow glow blob */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[var(--sunlight-yellow)] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[var(--sunlight-yellow)] opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <AdcLogo size={72} />
          <div className="text-center">
            <h1 className="text-white font-bold text-2xl tracking-tight serif-font">Uche Okonkwo</h1>
            <p className="text-[var(--sunlight-yellow)] text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2"
            >
              Access Password
            </label>
            <input
              id="password"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter portal password"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] focus:bg-white/20 transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
              <span className="material-symbols-outlined text-red-400 text-sm">error</span>
              <p className="text-red-300 text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[var(--sunlight-yellow)] text-[var(--midnight-green)] py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>Enter Portal</span>
              </>
            )}
          </button>
        </form>

        <p className="text-white/30 text-[10px] font-medium tracking-widest uppercase">
          Authorised Personnel Only
        </p>
      </div>
    </div>
  );
}
