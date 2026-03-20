"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/apiClient';
import { useAuthStore } from '@/store/useAuthStore';
import type { Post, Project } from '@/lib/types';

const STATUS_BADGE: Record<string, { bg: string; dot: string; label: string }> = {
  PUBLISHED: { bg: 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]', dot: 'bg-[var(--midnight-green)]', label: 'Published' },
  DRAFT:     { bg: 'bg-gray-100 text-gray-500',                                  dot: 'bg-gray-400',                label: 'Draft'     },
  ARCHIVED:  { bg: 'bg-red-50 text-red-500',                                     dot: 'bg-red-400',                 label: 'Archived'  },
};

const ROLE_META: Record<string, { icon: string; label: string }> = {
  ADMIN:     { icon: 'shield_person', label: 'Admin'     },
  MEDIA:     { icon: 'video_library', label: 'Media'     },
  VOLUNTEER: { icon: 'groups',        label: 'Volunteer' },
};

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [posts, setPosts]         = useState<Post[]>([]);
  const [volunteers, setVolunteers] = useState(0);
  const [petitions, setPetitions]   = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading]         = useState(true);

  const initials    = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'AD';
  const displayName = user ? `${user.firstName} ${user.lastName}` : 'Administrator';
  const roles       = user?.roles ?? [];

  useEffect(() => {
    Promise.all([
      apiClient.get<Post[]>('/posts').then(({ data }) => data).catch(() => [] as Post[]),
      apiClient.get<unknown[]>('/volunteers').then(({ data }) => data).catch(() => []),
      apiClient.get<unknown[]>('/petitions').then(({ data }) => data).catch(() => []),
      apiClient.get<Project[]>('/projects').then(({ data }) => data).catch(() => [] as Project[]),
    ]).then(([p, vols, pets, projs]) => {
      setPosts(Array.isArray(p) ? p : []);
      setVolunteers(Array.isArray(vols) ? vols.length : 0);
      setPetitions(Array.isArray(pets) ? pets.length : 0);
      setProjectCount(Array.isArray(projs) ? projs.length : 0);
    }).finally(() => setLoading(false));
  }, []);

  const published  = posts.filter(p => p.status === 'PUBLISHED');
  const drafts     = posts.filter(p => p.status === 'DRAFT');
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2]" style={{ top: 0, bottom: 0, left: 256, right: 0 }}>

      {/* Top bar */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-8 h-16 flex items-center justify-between">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[16px]">search</span>
          <input
            placeholder="Search campaign…"
            className="bg-gray-50 border border-gray-200 rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
            readOnly
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-gray-400 hover:text-[var(--midnight-green)] transition-colors cursor-pointer text-[22px]">notifications</span>
          <Link href="/admin/settings">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--midnight-green)] to-[#005c2e] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-white">{initials}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-5 lg:p-7">

          {/* ── Hero header ─────────────────────────────────────────────── */}
          <header className="mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--midnight-green)] to-[#003318] flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-white">{initials}</span>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 bg-[var(--midnight-green)] text-white p-1 rounded-lg shadow">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-0.5">Campaign Official</p>
                <h1 className="text-2xl font-bold font-serif text-[var(--obsidian)] leading-tight">
                  {displayName}
                </h1>
              </div>
            </div>
          </header>

          {/* ── Bento grid ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-12 gap-5">

            {/* ── Left: Identity + Recent Posts ────────────────────────── */}
            <div className="col-span-12 lg:col-span-8 space-y-5">

              {/* Identity Ledger */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-base text-[var(--midnight-green)] font-serif">Identity Ledger</h2>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-1.5 text-xs font-bold text-[var(--midnight-green)] hover:bg-[var(--midnight-green)]/8 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">edit</span>
                    Edit Profile
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Legal Name</label>
                    <p className="font-semibold text-sm text-[var(--obsidian)]">{displayName}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Email Address</label>
                    <p className="font-semibold text-sm text-[var(--obsidian)]">{user?.email ?? '—'}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-100 mb-4" />

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Assigned User Roles</label>
                  <div className="flex flex-wrap gap-2">
                    {roles.length > 0 ? roles.map((role: string) => {
                      const meta = ROLE_META[role] ?? { icon: 'badge', label: role };
                      return (
                        <span
                          key={role}
                          className="px-3 py-1.5 bg-[var(--midnight-green)]/10 text-[var(--midnight-green)] rounded-lg font-bold text-xs flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[13px]">{meta.icon}</span>
                          {meta.label}
                        </span>
                      );
                    }) : (
                      <p className="text-sm text-gray-400">No roles assigned</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Recent Posts table */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-bold text-sm text-[var(--obsidian)]">Recent Posts</h2>
                  <Link
                    href="/admin/posts"
                    className="text-[10px] font-bold uppercase tracking-widest text-[var(--midnight-green)] hover:underline flex items-center gap-1"
                  >
                    View all
                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/80">
                        {['Title', 'Status', 'Date'].map(h => (
                          <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <tr key={i}>
                            <td colSpan={3} className="px-5 py-3">
                              <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                            </td>
                          </tr>
                        ))
                      ) : recentPosts.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-5 py-8 text-center">
                            <p className="text-sm text-gray-400">No posts yet.</p>
                            <Link href="/admin/editor" className="text-xs font-bold text-[var(--midnight-green)] hover:underline mt-1 inline-block">
                              Create your first post →
                            </Link>
                          </td>
                        </tr>
                      ) : recentPosts.map(post => {
                        const badge = STATUS_BADGE[post.status] ?? STATUS_BADGE.DRAFT;
                        return (
                          <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="px-5 py-3 text-sm font-medium text-[var(--obsidian)] max-w-xs">
                              <span className="line-clamp-1">{post.title || 'Untitled Post'}</span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${badge.bg}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                                {badge.label}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-xs text-gray-400">
                              {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* ── Right: Stats + Quick Actions ─────────────────────────── */}
            <aside className="col-span-12 lg:col-span-4 space-y-5">

              {/* Campaign stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Published',  value: published.length,  icon: 'public',       color: 'text-[var(--midnight-green)]', bg: 'bg-[var(--midnight-green)]/8', href: '/admin/posts'      },
                  { label: 'Drafts',     value: drafts.length,     icon: 'draft',         color: 'text-amber-600',               bg: 'bg-amber-50',                  href: '/admin/posts'      },
                  { label: 'Volunteers', value: volunteers,         icon: 'group',         color: 'text-blue-600',                bg: 'bg-blue-50',                   href: '/admin/volunteers' },
                  { label: 'Petitions',  value: petitions,          icon: 'inbox',         color: 'text-purple-600',              bg: 'bg-purple-50',                 href: '/admin/inbox'      },
                  { label: 'Projects',   value: projectCount,       icon: 'construction',  color: 'text-orange-600',              bg: 'bg-orange-50',                 href: '/admin/projects'   },
                  { label: 'All Posts',  value: posts.length,       icon: 'article',       color: 'text-gray-600',                bg: 'bg-gray-100',                  href: '/admin/posts'      },
                ].map(stat => (
                  <Link
                    key={stat.label}
                    href={stat.href}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className={`w-7 h-7 rounded-lg ${stat.bg} flex items-center justify-center mb-2`}>
                      <span className={`material-symbols-outlined text-[14px] ${stat.color}`}>{stat.icon}</span>
                    </div>
                    <div>
                      <p className={`text-xl font-bold ${stat.color}`}>{loading ? '…' : stat.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">{stat.label}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quick Actions</h3>
                <div className="space-y-1">
                  {[
                    { label: 'Create New Post',  href: '/admin/editor',     icon: 'edit_square'  },
                    { label: 'Add Project',       href: '/admin/projects',   icon: 'construction' },
                    { label: 'View Volunteers',   href: '/admin/volunteers', icon: 'group'        },
                    { label: 'Read Petitions',    href: '/admin/inbox',      icon: 'inbox'        },
                  ].map(a => (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[var(--midnight-green)]">{a.icon}</span>
                      <span className="text-xs font-semibold text-[var(--obsidian)]">{a.label}</span>
                      <span className="material-symbols-outlined text-[13px] text-gray-300 ml-auto group-hover:text-gray-500 transition-colors">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>

          <p className="text-center text-[10px] text-gray-300 uppercase tracking-widest mt-6 pb-2">
            Portal v1.0 · Uche Okonkwo 2025
          </p>
        </div>
      </div>
    </div>
  );
}
