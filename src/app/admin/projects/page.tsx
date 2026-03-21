"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { apiClient } from "@/lib/apiClient";
import type { Project, ProjectStatus } from "@/lib/types";

const LocationPicker = dynamic(
  () => import("@/components/admin/LocationPicker"),
  { ssr: false, loading: () => <div className="h-[260px] bg-gray-100 rounded-xl animate-pulse" /> }
);

const CONSTITUENCIES = ["All", "Idemili North", "Idemili South"];
const STATUSES: ProjectStatus[] = ["PLANNED", "ONGOING", "COMPLETED", "SUSPENDED"];
const STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNED: "bg-blue-50 text-blue-700",
  ONGOING: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-green-50 text-green-700",
  SUSPENDED: "bg-red-50 text-red-600",
};


// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onDelete,
  onEdit,
}: {
  project: Project;
  onDelete: () => void;
  onEdit: () => void;
  onDeleteMedia: (mediaId: string) => void;
}) {
  const thumb = project.Media[0];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex">
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-28 h-24 bg-gray-100 relative">
        {thumb ? (
          <Image src={thumb.url} alt="project" fill className="object-cover" sizes="112px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-gray-300 text-2xl">image</span>
          </div>
        )}
        {project.Media.length > 1 && (
          <span className="absolute bottom-1 right-1 bg-black/50 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            +{project.Media.length - 1}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm text-[var(--obsidian)] leading-tight line-clamp-1 flex-1">
              {project.title}
            </h3>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
          </div>
          {project.description && (
            <p className="text-[11px] text-gray-400 line-clamp-1 mb-1">{project.description}</p>
          )}
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span className="material-symbols-outlined text-[11px]">location_on</span>
            <span>{project.constituentName}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={onEdit}
            className="flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-lg border border-[var(--midnight-green)] text-[var(--midnight-green)] hover:bg-[var(--midnight-green)] hover:text-white transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Add / Edit Form ───────────────────────────────────────────────────────────

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    status: (initial?.status ?? "PLANNED") as ProjectStatus,
    constituentName: initial?.constituentName ?? "Idemili North",
    lat: initial?.latitude ?? null as number | null,
    lng: initial?.longitude ?? null as number | null,
    images: [] as File[],
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 10);
    setForm(f => ({ ...f, images: arr }));
    setPreviews(arr.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || form.title.trim().length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    if (form.lat === null || form.lng === null) {
      setError("Please tap the map to pin the project location.");
      return;
    }
    setSaving(true);
    setError("");

    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("status", form.status);
    fd.append("constituentName", form.constituentName);
    if (form.description.trim()) fd.append("description", form.description.trim());
    fd.append("latitude", String(form.lat));
    fd.append("longitude", String(form.lng));
    form.images.forEach(img => fd.append("images", img));

    try {
      const { data } = initial
        ? await apiClient.patch<Project>(`/projects/${initial.id}`, fd)
        : await apiClient.post<Project>("/projects", fd);
      onSave(data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string | string[] } } })?.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join("; ") : (msg ?? "Failed to save project."));
    } finally {
      setSaving(false);
    }
  };

  const set = useCallback(<K extends keyof typeof form>(k: K, v: typeof form[K]) =>
    setForm(f => ({ ...f, [k]: v })), []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">

      {/* Title */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Title *</label>
        <input
          value={form.title}
          onChange={e => set("title", e.target.value)}
          placeholder="Project title"
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)]"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={e => set("description", e.target.value)}
          placeholder="Brief description of the project"
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] resize-none"
        />
      </div>

      {/* Status + Constituency */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Status *</label>
          <select
            value={form.status}
            onChange={e => set("status", e.target.value as ProjectStatus)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] bg-white"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Constituency *</label>
          <select
            value={form.constituentName}
            onChange={e => set("constituentName", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--midnight-green)] bg-white"
          >
            <option>Idemili North</option>
            <option>Idemili South</option>
          </select>
        </div>
      </div>

      {/* Map */}
      <LocationPicker
        lat={form.lat}
        lng={form.lng}
        onChange={(lat, lng) => setForm(f => ({ ...f, lat, lng }))}
        onClear={() => setForm(f => ({ ...f, lat: null, lng: null }))}
      />

      {/* Images */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
          Images <span className="text-gray-300 normal-case font-normal">(up to 10, max 5MB each)</span>
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-sm text-gray-400 hover:border-[var(--midnight-green)] hover:text-[var(--midnight-green)] transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_photo_alternate</span>
          {form.images.length ? `${form.images.length} file(s) selected` : "Choose images"}
        </button>
        {previews.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {previews.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                <Image src={src} alt="" fill className="object-cover" sizes="64px" />
              </div>
            ))}
          </div>
        )}
        {initial && initial.Media.length > 0 && (
          <p className="text-[10px] text-gray-400 mt-1">
            {initial.Media.length} existing image(s) — uploading new ones appends them.
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-400 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex-1 py-3 rounded-xl bg-[var(--midnight-green)] text-white text-sm font-bold disabled:opacity-50"
        >
          {saving ? "Saving…" : initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    apiClient.get<Project[]>("/projects")
      .then(({ data }) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.constituentName === filter);

  const handleSave = (project: Project) => {
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === project.id);
      return idx >= 0 ? prev.map(p => p.id === project.id ? project : p) : [project, ...prev];
    });
    setView("list");
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project and all its images?")) return;
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Failed to delete project.");
    }
  };

  const handleDeleteMedia = async (project: Project, mediaId: string) => {
    try {
      await apiClient.delete(`/projects/${project.id}/media/${mediaId}`);
      setProjects(prev => prev.map(p =>
        p.id === project.id
          ? { ...p, Media: p.Media.filter(m => m.id !== mediaId) }
          : p
      ));
    } catch {
      alert("Failed to delete image.");
    }
  };

  const OVERLAY = "fixed z-[35] flex flex-col bg-[#f4f4f2] inset-x-0 bottom-0 top-14 lg:top-0 lg:left-64";

  if (view === "form") {
    return (
      <div className={OVERLAY} >
        {/* Form sub-header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center gap-3">
          <button
            onClick={() => { setView("list"); setEditing(null); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400 hover:text-[var(--obsidian)]"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h1 className="font-bold text-sm text-[var(--obsidian)]">
            {editing ? "Edit Project" : "New Project"}
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <ProjectForm
              initial={editing ?? undefined}
              onSave={handleSave}
              onCancel={() => { setView("list"); setEditing(null); }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={OVERLAY} >
      {/* Sub-header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-sm text-[var(--obsidian)]">Projects</h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
            {loading ? "…" : projects.length}
          </span>
        </div>
        <button
          onClick={() => { setEditing(null); setView("form"); }}
          className="h-9 px-4 flex items-center gap-1.5 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span className="hidden sm:inline">New Project</span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pt-6 pb-6 space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">

          {/* Constituency filter tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CONSTITUENCIES.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  filter === c
                    ? "bg-[var(--midnight-green)] text-white"
                    : "bg-white border border-gray-200 text-gray-400 hover:border-[var(--midnight-green)] hover:text-[var(--midnight-green)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Project list */}
          {loading ? (
            <div className="text-center py-12 text-gray-300">
              <span className="w-6 h-6 border-2 border-gray-200 border-t-[var(--midnight-green)] rounded-full animate-spin block mx-auto mb-2" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="w-20 h-20 rounded-3xl bg-[var(--midnight-green)]/8 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]/40">construction</span>
              </div>
              <div className="text-center">
                <p className="font-bold text-[var(--obsidian)] text-lg mb-1">
                  {filter === "All" ? "No projects yet" : `No projects in ${filter}`}
                </p>
                <p className="text-sm text-gray-400">
                  {filter === "All"
                    ? "Start documenting campaign projects for constituents to see."
                    : "Switch filter to \"All\" or add a project for this constituency."}
                </p>
              </div>
              {filter === "All" && (
                <button
                  onClick={() => { setEditing(null); setView("form"); }}
                  className="h-11 px-6 flex items-center gap-2 bg-gradient-to-r from-[var(--midnight-green)] to-[#005c2e] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  Add Your First Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => handleDelete(project.id)}
                  onEdit={() => { setEditing(project); setView("form"); }}
                  onDeleteMedia={(mediaId) => handleDeleteMedia(project, mediaId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
