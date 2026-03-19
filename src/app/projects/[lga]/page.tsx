import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { agendaItems } from '@/data/achievements';
import Link from 'next/link';

type Props = {
  params: { lga: string };
};

export async function generateStaticParams() {
  return [
    { lga: 'idemili-north' },
    { lga: 'idemili-south' },
  ];
}

export default function LGAProjectsPage({ params }: Props) {
  const lgaSlug = params.lga;
  const isNorth = lgaSlug === 'idemili-north';
  const lgaLabel = isNorth ? 'Idemili North' : 'Idemili South';
  const lgaKey = isNorth ? 'north' : 'south';

  // Filter items: include LGA specific and "general" (constituency-wide)
  const filteredItems = agendaItems.filter(
    (item) => item.lga === lgaKey || item.lga === 'general'
  );

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8 mt-4">
            <Link href="/" className="hover:text-[var(--midnight-green)] transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/projects" className="hover:text-[var(--midnight-green)] transition-colors">Projects</Link>
            <span className="opacity-30">/</span>
            <span className="text-[var(--midnight-green)]">{lgaLabel}</span>
          </nav>

          <header className="mb-20">
            <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6 leading-[1.1]">
              <span className="text-[var(--midnight-green)]">{lgaLabel}</span><br/>
              Progress & Impact
            </h1>
            <p className="text-lg text-gray-500 font-light max-w-2xl leading-relaxed">
              Tracking all active sites, legislative interventions, and community developments across {lgaLabel}. 
              Total {filteredItems.length} impact points identified.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.num} className="bg-white rounded-sm p-8 border border-gray-100 soft-shadow hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                {/* Decorative accent */}
                <div className={`absolute top-0 left-0 w-full h-1 ${item.tagColor.split(' ')[0]}`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <span className="text-[10px] font-mono text-gray-300">#{item.num}</span>
                </div>

                <h3 className="text-xl font-bold serif-font text-[var(--obsidian)] mb-4 group-hover:text-[var(--midnight-green)] transition-colors whitespace-pre-wrap">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-8 line-clamp-3">
                  {item.desc}
                </p>

                <Link 
                  href={`/policy/${item.num}`}
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--midnight-green)] group/link"
                >
                  Read Detailed Report 
                  <span className="material-symbols-outlined text-sm transform group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
