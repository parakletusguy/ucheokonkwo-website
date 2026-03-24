"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import { tokenStore } from '@/lib/tokenStore';
import { useAuthStore } from '@/store/useAuthStore';

const AVATAR_KEY = 'adminAvatar';

const ROLE_META: Record<string, { icon: string; label: string; color: string; bg: string }> = {
  ADMIN:     { icon: 'shield_person',  label: 'Admin',     color: 'text-[var(--midnight-green)]', bg: 'bg-[var(--midnight-green)]/10' },
  MEDIA:     { icon: 'video_library',  label: 'Media',     color: 'text-blue-600',                bg: 'bg-blue-50'                    },
  VOLUNTEER: { icon: 'groups',         label: 'Volunteer', color: 'text-amber-600',               bg: 'bg-amber-50'                   },
};


export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, clearAuth, setUser } = useAuthStore();

  /* ── profile form ───────────────────────────────────────────────── */
  const [firstName,      setFirstName]      = useState(user?.firstName ?? '');
  const [lastName,       setLastName]       = useState(user?.lastName  ?? '');
  const [profileSaving,  setProfileSaving]  = useState(false);
  const [profileMsg,     setProfileMsg]     = useState<{ ok: boolean; text: string } | null>(null);

  /* ── password form ──────────────────────────────────────────────── */
  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [pwSaving,   setPwSaving]   = useState(false);
  const [pwMsg,      setPwMsg]      = useState<{ ok: boolean; text: string } | null>(null);

  /* ── avatar ─────────────────────────────────────────────────────── */
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(AVATAR_KEY);
    if (saved) setAvatar(saved);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      localStorage.setItem(AVATAR_KEY, dataUrl);
      setAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  /* ── logout ─────────────────────────────────────────────────────── */
  const [loggingOut, setLoggingOut] = useState(false);

  const displayName  = user ? `${user.firstName} ${user.lastName}` : 'Administrator';
  const displayEmail = user?.email ?? '—';
  const roles        = user?.roles ?? [];
  const initials     = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : 'AD';

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setProfileMsg({ ok: false, text: 'First name and last name are required.' });
      return;
    }
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      await apiClient.patch('/auth/me', { firstName: firstName.trim(), lastName: lastName.trim() });
      if (user) setUser({ ...user, firstName: firstName.trim(), lastName: lastName.trim() });
      setProfileMsg({ ok: true, text: 'Profile updated successfully.' });
    } catch {
      setProfileMsg({ ok: false, text: 'Could not save — profile updates are not available right now.' });
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw || !newPw || !confirmPw) {
      setPwMsg({ ok: false, text: 'Please fill in all password fields.' });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ ok: false, text: 'New passwords do not match.' });
      return;
    }
    if (newPw.length < 8) {
      setPwMsg({ ok: false, text: 'New password must be at least 8 characters.' });
      return;
    }
    setPwSaving(true);
    setPwMsg(null);
    try {
      await apiClient.patch('/auth/me/password', { currentPassword: currentPw, newPassword: newPw });
      setPwMsg({ ok: true, text: 'Password changed successfully.' });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch {
      setPwMsg({ ok: false, text: 'Could not change password — this feature may not be available yet.' });
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await apiClient.post('/auth/logout'); } finally {
      tokenStore.clear();
      clearAuth();
      router.replace('/admin/login');
    }
  };

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2] inset-x-0 bottom-0 top-14 lg:top-0 lg:left-64">

      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center">
        <h1 className="font-bold text-sm text-[var(--obsidian)]">Profile &amp; Settings</h1>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto">

          {/* Hero */}
          <div className="flex items-end gap-6 mb-8">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--midnight-green)] to-[#005c2e] flex items-center justify-center shadow-xl overflow-hidden">
                {avatar
                  ? <Image src={avatar} alt="avatar" fill className="object-cover" sizes="96px" />
                  : <span className="text-3xl font-bold text-white">{initials}</span>
                }
              </div>
              {/* Upload button */}
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--midnight-green)] rounded-xl shadow-lg flex items-center justify-center hover:bg-[#005c2e] transition-colors"
                title="Upload photo"
              >
                <span className="material-symbols-outlined text-white text-[15px]">photo_camera</span>
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="pb-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Campaign Official</p>
              <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] leading-tight">{displayName}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{displayEmail}</p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* Left */}
            <div className="lg:col-span-8 space-y-5">

              {/* Edit Profile */}
              <form onSubmit={handleProfileSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--midnight-green)] font-serif">Edit Profile</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Update your display name</p>
                  </div>
                  <span className="material-symbols-outlined text-[var(--midnight-green)] text-[22px]">manage_accounts</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={displayEmail}
                    disabled
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Email cannot be changed here.</p>
                </div>

                {profileMsg && (
                  <div className={`mb-4 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    profileMsg.ok
                      ? 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    <span className="material-symbols-outlined text-[16px]">{profileMsg.ok ? 'check_circle' : 'error'}</span>
                    {profileMsg.text}
                  </div>
                )}

                <div className="h-px bg-gray-100 mb-4" />

                <div className="mb-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Assigned Roles</label>
                  {roles.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {roles.map((role: string) => {
                        const meta = ROLE_META[role] ?? { icon: 'badge', label: role, color: 'text-gray-600', bg: 'bg-gray-100' };
                        return (
                          <span key={role} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${meta.bg} ${meta.color}`}>
                            <span className="material-symbols-outlined text-[14px]">{meta.icon}</span>
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No roles assigned</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={profileSaving}
                  className="h-10 px-6 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {profileSaving
                    ? <span className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">save</span>
                  }
                  {profileSaving ? 'Saving…' : 'Save Changes'}
                </button>
              </form>

              {/* Change Password */}
              <form onSubmit={handlePasswordChange} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-[var(--obsidian)] font-serif">Change Password</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Update your login credentials</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 text-[22px]">lock</span>
                </div>

                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Current Password</label>
                    <input
                      type="password"
                      value={currentPw}
                      onChange={e => setCurrentPw(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">New Password</label>
                      <input
                        type="password"
                        value={newPw}
                        onChange={e => setNewPw(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                        placeholder="Min. 8 characters"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPw}
                        onChange={e => setConfirmPw(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                        placeholder="Re-enter password"
                      />
                    </div>
                  </div>
                </div>

                {pwMsg && (
                  <div className={`mb-4 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    pwMsg.ok
                      ? 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    <span className="material-symbols-outlined text-[16px]">{pwMsg.ok ? 'check_circle' : 'error'}</span>
                    {pwMsg.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pwSaving}
                  className="h-10 px-6 bg-[var(--obsidian)] text-white font-bold text-xs rounded-xl hover:bg-[var(--obsidian)]/80 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {pwSaving
                    ? <span className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">key</span>
                  }
                  {pwSaving ? 'Updating…' : 'Update Password'}
                </button>
              </form>

            </div>

            {/* Right */}
            <aside className="lg:col-span-4 space-y-5">

              {/* Active Session */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="material-symbols-outlined text-[var(--midnight-green)] text-[20px]">lock_open</span>
                  <h3 className="font-bold text-[var(--obsidian)]">Active Session</h3>
                </div>

                <div className="p-4 bg-[var(--midnight-green)]/5 rounded-xl mb-5 border border-[var(--midnight-green)]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[var(--midnight-green)] uppercase tracking-widest">Token Integrity</span>
                    <span className="flex h-2 w-2 rounded-full bg-[var(--midnight-green)] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Continuous token rotation is active. Your session refreshes automatically.
                  </p>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">laptop</span>
                    <span className="text-xs font-medium text-gray-600">Browser Session</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 bg-[var(--midnight-green)]/10 text-[var(--midnight-green)] rounded-full font-bold">CURRENT</span>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {loggingOut
                    ? <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                    : <span className="material-symbols-outlined text-[16px]">logout</span>
                  }
                  {loggingOut ? 'Logging out…' : 'Log Out'}
                </button>
              </div>

              {/* Version info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Portal Info</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Version',      value: 'v1.0.0'        },
                    { label: 'Campaign',     value: 'Uche Okonkwo'  },
                    { label: 'Party',        value: 'ADC'           },
                    { label: 'Constituency', value: 'Idemili N & S' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{row.label}</span>
                      <span className="text-xs font-bold text-[var(--obsidian)]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </aside>
          </div>

          <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest mt-8 pb-2">
            Portal v1.0 · Uche Okonkwo 2025
          </p>
        </div>
      </div>
    </div>
  );
}
