"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TerritoryTracker from '@/components/TerritoryTracker';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';
import type { Project, ProjectStatus } from '@/lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

const STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNED: 'bg-blue-100 text-blue-700',
  ONGOING: 'bg-amber-100 text-amber-700',
  COMPLETED: 'bg-green-100 text-green-700',
  SUSPENDED: 'bg-red-100 text-red-600',
};

const CONSTITUENCIES = ['All', 'Idemili North', 'Idemili South'];

function ProjectCard({ project }: { project: Project }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const media = project.Media ?? [];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
        {/* Image */}
        {media.length > 0 ? (
          <div
            className="relative w-full cursor-pointer"
            style={{ aspectRatio: '16/9' }}
            onClick={() => setLightbox(true)}
          >
            <Image
              src={media[imgIdx].url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {media.length > 1 && (
              <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {media.length} photos
              </span>
            )}
            <span className={`absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
          </div>
        ) : (
          <div className="w-full bg-gray-50 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
            <span className="material-symbols-outlined text-4xl text-gray-200">construction</span>
          </div>
        )}

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className="flex gap-1 px-3 pt-2 overflow-x-auto no-scrollbar">
            {media.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setImgIdx(i)}
                className={`flex-shrink-0 w-8 h-8 rounded overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-[var(--midnight-green)]' : 'border-transparent'}`}
              >
                <div className="relative w-full h-full">
                  <Image src={m.url} alt="" fill className="object-cover" sizes="32px" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-4 space-y-1">
          <h3 className="font-bold text-[var(--obsidian)] text-sm leading-tight">{project.title}</h3>
          {project.description && (
            <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
          )}
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
            <span className="material-symbols-outlined text-[12px]">location_on</span>
            {project.constituentName}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && media.length > 0 && (
        <div
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute top-4 right-4 text-white z-10" onClick={() => setLightbox(false)}>
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          {imgIdx > 0 && (
            <button
              className="absolute left-4 text-white z-10"
              onClick={e => { e.stopPropagation(); setImgIdx(i => i - 1); }}
            >
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
          )}
          {imgIdx < media.length - 1 && (
            <button
              className="absolute right-4 text-white z-10"
              onClick={e => { e.stopPropagation(); setImgIdx(i => i + 1); }}
            >
              <span className="material-symbols-outlined text-3xl">chevron_right</span>
            </button>
          )}
          <div className="relative w-full max-w-3xl px-16" style={{ aspectRatio: '16/9' }}>
            <Image src={media[imgIdx].url} alt={project.title} fill className="object-contain" sizes="100vw" />
          </div>
          <div className="absolute bottom-4 text-white text-xs font-bold opacity-60">
            {imgIdx + 1} / {media.length}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectsPage() {
  const { t } = useLanguageStore();
  const [backendProjects, setBackendProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setBackendProjects(Array.isArray(data) ? data : []))
      .catch(() => setBackendProjects([]))
      .finally(() => setLoadingProjects(false));
  }, []);

  const filtered = filter === 'All'
    ? backendProjects
    : backendProjects.filter(p => p.constituentName === filter);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Development Tracker', pcm: 'Project Tracker', ig: 'Ndekọ Ọrụ', ha: 'Bibiyar Ayyuka', yo: 'Itopase Ise' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Constituency Projects
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Radical transparency in action. Monitor the status, funding, and completion percentage of all our ongoing grassroots developments.
          </p>
        </div>

        <TerritoryTracker />

        {/* Backend Projects Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-3xl font-serif font-bold text-[var(--obsidian)]">Active Projects</h2>

              {/* Constituency filter */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {CONSTITUENCIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                      filter === c
                        ? 'bg-[var(--midnight-green)] text-white'
                        : 'bg-white border border-gray-200 text-gray-400 hover:border-[var(--midnight-green)] hover:text-[var(--midnight-green)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {loadingProjects ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                    <div className="bg-gray-100" style={{ aspectRatio: '16/9' }} />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 text-gray-300">
                <span className="material-symbols-outlined text-5xl block mb-3">construction</span>
                <p className="text-gray-400">
                  {backendProjects.length === 0
                    ? 'Projects will appear here once added.'
                    : `No projects in ${filter} yet.`}
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3 Years of Impact Section */}
        <section className="py-24 px-6 bg-[var(--off-white)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[var(--obsidian)] mb-4">Three Years of Tangible Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">A comprehensive breakdown of Hon. Uchenna Harris Okonkwo&apos;s infrastructure, education, and empowerment initiatives across Idemili North and South.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Infrastructure */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">foundation</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Infrastructure</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction/Rehabilitation of community road at Abatete (ongoing project)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of a six-classroom block at UPS Amafor Nkpor</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Renovation of Block C building at Notre Dame High School, Abatete</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Scheduled maintenance of the Administrative Block at Community Primary School, Obosi</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of a recreation arena for Community Primary School, Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of Cassava Processing Plant at Ojoto</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of Ojoto Road linking Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Construction of solar-powered borehole at Nnobi</li>
                </ul>
              </div>

              {/* Education */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">school</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Education</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Payment of fees for 250 JAMB candidates</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Scholarships for 500 Anambra students</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of a modern ICT centre at Boys Secondary School, Ojoto</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of student grants for university students</li>
                </ul>
              </div>

              {/* Social Amenities */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">water_drop</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Social Amenities</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Installation of solar-powered street lights across various communities (Ogidi, Nkpor, Obosi, Ojoto, Ideani, Nnobi, Awka-Etiti, Oba, UmuOji, Nnokwa, Eziowelle, Abacha, Abatete)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Supply of food items to 5,000 households, including the elderly, widows, and people living with disabilities</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Reticulation of a solar-powered borehole in three villages at Nnobi and donation of Shuttle bus to Idemili South LGA workers</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Support for rebuilding the community hall at Oba</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Repair/Maintenance of transformers at Ogidi</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Reticulation of borehole water at the Health Centre, Amafor Nkpor</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of relief materials for people affected by floods and gully erosion</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Support for repair of damaged Obosi Town hall</li>
                </ul>
              </div>

              {/* Empowerment */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl text-[var(--midnight-green)]">handshake</span>
                  <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)]">Empowerment</h3>
                </div>
                <ul className="space-y-4 text-gray-600 font-light text-sm leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Training of women and youths on renewable energy (solar, biomass, hydropower, and wind energy)</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of women and youths with strategic renewable energy skills in Nnokwa</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Bio-gas production training for Eziowelle youths and women</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of artisans with sewing & grinding machines, POS, clippers, and cash grants</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of farmers with 50kg bags of urea fertilisers</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Business grants to 100 SME owners</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Training of Youths on digital skills acquisition</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Attraction of climate adaptation, resilience, peace-building awareness, and sensitization for stakeholders</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Facilitation of federal government employment for professionals in Idemili North and South</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Facilitation of Trade and tech training for Idemili youths in China</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Empowerment of five Awka-Etiti youths with five Million Naira</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Youth Empowerment through Sponsorship of UAO Football League 2025</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Donation of one million to Nnokwa women</li>
                  <li className="flex items-start gap-3"><span className="text-[var(--sunlight-yellow)] font-bold mt-1">•</span> Donation of Sewing Machines and 500k to Eziowelle Skill acquisition Centre</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
