"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdcLogo from '@/components/AdcLogo';
import { apiClient } from '@/lib/apiClient';
import { tokenStore } from '@/lib/tokenStore';
import { useAuthStore } from '@/store/useAuthStore';
import type { AuthResponse, Role } from '@/lib/types';

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // shared fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // register-only fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<Role>('ADMIN');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const storeAuth = (data: AuthResponse) => {
    tokenStore.set(data.accessToken, data.refreshToken);
    setUser({
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      roles: data.user.userRoles.map((r) => r.role),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', { email, password });
        storeAuth(data);
      } else {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', {
          email,
          password,
          firstName,
          lastName,
          role,
        });
        storeAuth(data);
      }
      router.replace('/admin');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string | string[] } } };
      const msg = axiosErr?.response?.data?.message;
      if (Array.isArray(msg)) {
        setError(msg[0]);
      } else {
        setError(msg ?? (mode === 'login' ? 'Invalid credentials.' : 'Registration failed.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--midnight-green)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay opacity-20 pointer-events-none" />
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

        {/* Mode toggle */}
        <div className="flex w-full bg-white/10 rounded-xl p-1 gap-1">
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                mode === m
                  ? 'bg-[var(--sunlight-yellow)] text-[var(--midnight-green)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 flex flex-col gap-4"
        >
          {mode === 'register' && (
            <>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ada"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Okonkwo"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] transition-all"
                >
                  <option value="ADMIN" className="bg-[var(--midnight-green)]">Admin</option>
                  <option value="MEDIA" className="bg-[var(--midnight-green)]">Media</option>
                  <option value="VOLUNTEER" className="bg-[var(--midnight-green)]">Volunteer</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2">
              Email
            </label>
            <input
              type="email"
              autoFocus
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sunlight-yellow)] mb-2">
              Password
            </label>
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Min 8 chars, upper, lower, number, symbol' : 'Enter your password'}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sunlight-yellow)] transition-all"
            />
            {mode === 'register' && (
              <p className="text-white/30 text-[9px] mt-1.5 leading-relaxed">
                Must include uppercase, lowercase, a number and a special character (@$!%*?&)
              </p>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2">
              <span className="material-symbols-outlined text-red-400 text-sm">error</span>
              <p className="text-red-300 text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password || (mode === 'register' && (!firstName || !lastName))}
            className="w-full bg-[var(--sunlight-yellow)] text-[var(--midnight-green)] py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[var(--midnight-green)] border-t-transparent rounded-full animate-spin" />
                <span>{mode === 'login' ? 'Verifying...' : 'Creating Account...'}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  {mode === 'login' ? 'lock_open' : 'person_add'}
                </span>
                <span>{mode === 'login' ? 'Enter Portal' : 'Create Account'}</span>
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
