"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/apiClient';
import type { Post } from '@/lib/types';

type Filter = 'All Posts' | 'Published' | 'Draft' | 'Archived';

const STATUS_BADGE: Record<string, { bg: string; dot: string; label: string }> = {
  PUBLISHED: { bg: 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]', dot: 'bg-[var(--midnight-green)]', label: 'Published' },
  DRAFT:     { bg: 'bg-gray-100 text-gray-500',                                  dot: 'bg-gray-400',                label: 'Draft'     },
  ARCHIVED:  { bg: 'bg-red-50 text-red-500',                                     dot: 'bg-red-400',                 label: 'Archived'  },
};

export default function PostsManagementPage() {
  const router = useRouter();
  const [posts, setPosts]           = useState<Post[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState<Filter>('All Posts');
  const [search, setSearch]         = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    apiClient.get<Post[]>('/posts')
      .then(({ data }) => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this post?')) return;
    setDeletingId(id);
    try {
      await apiClient.delete(`/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete post.');
    } finally {
      setDeletingId(null);
    }
  };

  const drafts    = posts.filter(p => p.status === 'DRAFT');
  const published = posts.filter(p => p.status === 'PUBLISHED');
  const archived  = posts.filter(p => p.status === 'ARCHIVED');

  const filtered = posts.filter(p => {
    const matchFilter =
      filter === 'All Posts' ? true :
      filter === 'Published' ? p.status === 'PUBLISHED' :
      filter === 'Draft'     ? p.status === 'DRAFT' :
      p.status === 'ARCHIVED';
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.author.firstName + ' ' + p.author.lastName).toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const FILTERS: Filter[] = ['All Posts', 'Published', 'Draft', 'Archived'];

  return (
    <div className="fixed z-[35] flex flex-col bg-[#f4f4f2]" style={{ top: 0, bottom: 0, left: 256, right: 0 }}>

      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm text-[var(--obsidian)]">Posts Management</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            {loading ? '…' : posts.length}
          </span>
        </div>
        <Link
          href="/admin/editor"
          className="h-9 px-4 flex items-center gap-1.5 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">edit_square</span>
          <span className="hidden sm:inline">Create New Post</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-5 max-w-7xl mx-auto space-y-5">

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Published',     value: published.length, icon: 'public', color: 'text-[var(--midnight-green)]', bg: 'bg-[var(--midnight-green)]/8' },
              { label: 'Active Drafts', value: drafts.length,    icon: 'draft',  color: 'text-amber-600',               bg: 'bg-amber-50'                  },
              { label: 'Archived',      value: archived.length,  icon: 'archive', color: 'text-red-500',                bg: 'bg-red-50'                    },
            ].map(card => (
              <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined text-[18px] ${card.color}`}>{card.icon}</span>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${card.color}`}>{loading ? '…' : card.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Toolbar */}
            <div className="px-5 py-3.5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      filter === f
                        ? 'bg-[var(--midnight-green)]/10 text-[var(--midnight-green)]'
                        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="sm:ml-auto relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 text-[16px]">search</span>
                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search posts…"
                  className="w-full sm:w-56 bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[var(--midnight-green)] transition-colors"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/80">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden md:table-cell">Author</th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden lg:table-cell">Created</th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        <td colSpan={5} className="px-5 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                        </td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-300 text-2xl">article</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-400">No posts found</p>
                          <Link href="/admin/editor" className="text-xs font-bold text-[var(--midnight-green)] hover:underline flex items-center gap-1">
                            Create your first post
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map(post => {
                      const badge = STATUS_BADGE[post.status] ?? STATUS_BADGE.DRAFT;
                      const isArchived = post.status === 'ARCHIVED';
                      return (
                        <tr key={post.id} className="group hover:bg-gray-50/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className={`flex flex-col ${isArchived ? 'opacity-50' : ''}`}>
                              <span className="text-sm font-semibold text-[var(--obsidian)] line-clamp-1">
                                {post.title || 'Untitled Post'}
                              </span>
                              {post.multilingualContent && post.multilingualContent.length > 0 && (
                                <span className="flex items-center gap-0.5 text-[10px] text-[var(--midnight-green)] font-bold mt-0.5">
                                  <span className="material-symbols-outlined text-[11px]">translate</span>
                                  {post.multilingualContent.length} language{post.multilingualContent.length > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <div className={`flex items-center gap-2 ${isArchived ? 'opacity-50' : ''}`}>
                              <div className="w-6 h-6 rounded-full bg-[var(--midnight-green)]/15 flex items-center justify-center flex-shrink-0">
                                <span className="text-[9px] font-bold text-[var(--midnight-green)]">
                                  {post.author.firstName.charAt(0)}{post.author.lastName.charAt(0)}
                                </span>
                              </div>
                              <span className="text-xs text-gray-600 whitespace-nowrap">
                                {post.author.firstName} {post.author.lastName}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badge.bg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              {badge.label}
                            </span>
                          </td>
                          <td className={`px-5 py-4 text-xs text-gray-400 hidden lg:table-cell ${isArchived ? 'opacity-50' : ''}`}>
                            {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => router.push(`/admin/editor?id=${post.id}`)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-[var(--midnight-green)] hover:bg-[var(--midnight-green)]/8 transition-colors"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(post.id)}
                                disabled={deletingId === post.id}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                                title="Delete"
                              >
                                {deletingId === post.id
                                  ? <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                                  : <span className="material-symbols-outlined text-[18px]">delete</span>
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {!loading && filtered.length > 0 && (
              <div className="px-5 py-3.5 bg-gray-50/60 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Showing <span className="font-bold text-gray-600">{filtered.length}</span> of <span className="font-bold text-gray-600">{posts.length}</span> posts
                </span>
                {archived.length > 0 && (
                  <span className="text-[10px] text-gray-400">{archived.length} archived</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
