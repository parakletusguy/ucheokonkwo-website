"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

const agendaItems = [
  // --- BILLS (2023-2025) ---
  {
    num: '01',
    tag: 'Bill (2023)',
    tagColor: 'bg-[var(--sunlight-yellow)]/20 text-[var(--sunlight-yellow)]',
    title: 'Entrepreneurship\nCollege, Ogidi',
    desc: 'Federal College of Entrepreneurship and Skills acquisition (Establishment) Bill.',
    urgent: true,
  },
  {
    num: '02',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Medical Centre\nAwka-Etiti',
    desc: 'Federal Medical Centre Act (Amendment) Bill to upgrade healthcare in Idemili.',
    urgent: false,
  },
  {
    num: '03',
    tag: 'Bill (2023)',
    tagColor: 'bg-[var(--midnight-green)]/20 text-[var(--midnight-green)]',
    title: 'Federal Polytechnic\nOba',
    desc: 'Federal Polytechnic Act (Amendment) Bill for educational expansion in Oba community.',
    urgent: false,
    highlighted: true,
  },
  {
    num: '04',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Agric Research\nNnobi',
    desc: 'Agricultural Research Council of Nigeria Act (Amendment) Bill for Nnobi.',
    urgent: false,
  },
  {
    num: '05',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Police College\nUmuoji',
    desc: 'The Nigerian Police Training College (Amendment) Bill to secure our communities.',
    urgent: false,
  },
  {
    num: '06',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Mining Security\nPPP',
    desc: 'Mining Intelligence and Security Through Public-Private Partnership (Amendment) Bill.',
    urgent: false,
  },
  {
    num: '07',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Sustainable\nMining Infra',
    desc: 'Sustainable Mining Infrastructure Development Bill for resource optimization.',
    urgent: false,
  },
  {
    num: '08',
    tag: 'Bill (2023)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Mining Dev\nBank (NMDB)',
    desc: 'The Nigerian Mining Development Bank NMDB (Establishment) Bill.',
    urgent: false,
  },
  {
    num: '09',
    tag: 'Bill (2025)',
    tagColor: 'bg-[var(--sunlight-yellow)]/20 text-[var(--sunlight-yellow)]',
    title: 'Labour Act\nAmendment',
    desc: 'Comprehensive Labour Act (Amendment) Bill to protect Nigerian workers.',
    urgent: false,
  },
  {
    num: '10',
    tag: 'Bill (2025)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Vocational College\nOjoto',
    desc: 'Federal College of Vocational and Skill Acquisition, Ojoto (Establishment) Bill.',
    urgent: false,
  },
  {
    num: '11',
    tag: 'Bill (2025)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Teaching Hospital\nOba',
    desc: 'Federal Teaching Hospital, Oba (Establishment) Bill for advanced healthcare.',
    urgent: false,
  },
  {
    num: '12',
    tag: 'Bill (2025)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Nursing College\nOjoto',
    desc: 'Federal College of Nursing and midwifery, Ojoto (Establishment) Bill.',
    urgent: false,
  },
  {
    num: '13',
    tag: 'Bill (2025)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Training Centre\nOjoto',
    desc: 'Federal Vocational and Entrepreneurship Training Centre, Ojoto (Establishment) Bill.',
    urgent: false,
  },
  {
    num: '14',
    tag: 'Bill (2025)',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Women\'s Health\n& Surrogacy',
    desc: 'Women\'s Health and Surrogacy Protection Bill to safeguard maternal rights.',
    urgent: true,
  },
  {
    num: '15',
    tag: 'Bill (2025)',
    tagColor: 'bg-[var(--midnight-green)]/20 text-[var(--midnight-green)]',
    title: 'Obosi LGA\nCreation',
    desc: 'Alteration of 1999 Constitution for the Creation of Obosi Local Government Council.',
    urgent: false,
    highlighted: true,
  },
  // --- MOTIONS ---
  {
    num: '16',
    tag: 'Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Enekwasumpu\nBridge',
    desc: 'Motion for the construction of a Pedestrian bridge along Onitsha-Expressway.',
    urgent: false,
  },
  {
    num: '17',
    tag: 'Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Electricity\nMetering Program',
    desc: 'Investigation into funds disbursed to DisCos by CBN under Mass Metering loans.',
    urgent: true,
  },
  {
    num: '18',
    tag: 'Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Heritage Bank\nCrisis',
    desc: 'Urgent Need to investigate Heritage Bank Crisis and Protect depositors interest.',
    urgent: true,
  },
  {
    num: '19',
    tag: 'Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'NIRSAL Agric\nLending',
    desc: 'Repositioning Nigeria Incentive-Based Risk Sharing System for agricultural lending.',
    urgent: false,
  },
  {
    num: '20',
    tag: 'Motion',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Abatete Security\nIntervention',
    desc: 'Urgent motion to checkmate attacks by unknown gunmen in Idemili North.',
    urgent: true,
  },
  // --- PETITIONS ---
  {
    num: '21',
    tag: 'Petition',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Umuota Obosi\nErosion (NEWMAP)',
    desc: 'Petition on abandoned erosion project at Umuota village by NEWMAP.',
    urgent: false,
  },
  {
    num: '22',
    tag: 'Petition',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Property\nRights Defense',
    desc: 'Petition on Illegal Sale of Bequeathed Property in Idemili South.',
    urgent: false,
  },
  {
    num: '23',
    tag: 'Petition',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Port Consumption\nCosts',
    desc: 'Petition on high cost of importing consumer goods and shipping interventions.',
    urgent: false,
  },
  {
    num: '24',
    tag: 'Petition',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Citizen Justice\nDubai Death',
    desc: 'Petition on the mysterious death and burial of Mr. Ibeh Maxwell Onyeka in Dubai.',
    urgent: true,
  },
  // --- INFRASTRUCTURE (01-08) ---
  {
    num: '25',
    tag: 'Infrastructure',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Abatete\nCommunity Road',
    desc: 'Construction and rehabilitation of community road at Abatete (ongoing).',
    urgent: false,
  },
  {
    num: '26',
    tag: 'Education',
    tagColor: 'bg-[var(--sunlight-yellow)]/20 text-[var(--sunlight-yellow)]',
    title: 'UPS Amafor\nNkpor',
    desc: 'Construction of a brand new six-classroom block at UPS Amafor Nkpor.',
    urgent: false,
  },
  {
    num: '27',
    tag: 'Education',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Notre Dame\nAbatete',
    desc: 'Renovation of Block C building at Notre Dame High School, Abatete.',
    urgent: false,
  },
  {
    num: '28',
    tag: 'Education',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'CPS Obosi\nMaintenance',
    desc: 'Scheduled maintenance of the Administrative Block at Community Primary School, Obosi.',
    urgent: false,
  },
  {
    num: '29',
    tag: 'Infrastructure',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'CPS Oba\nArena',
    desc: 'Construction of a modern recreation arena for Community Primary School, Oba.',
    urgent: false,
  },
  {
    num: '30',
    tag: 'Industry',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Cassava Plant\nOjoto',
    desc: 'Construction of a state-of-the-art Cassava Processing Plant at Ojoto.',
    urgent: false,
  },
  {
    num: '31',
    tag: 'Infrastructure',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Ojoto-Oba\nLink Road',
    desc: 'Construction of strategic Ojoto Road linking to Oba community.',
    urgent: false,
  },
  {
    num: '32',
    tag: 'Amenities',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Nnobi Solar\nBorehole',
    desc: 'Construction of solar powered borehole at Nnobi to provide clean water.',
    urgent: false,
  },
  // --- EDUCATION (09-12) ---
  {
    num: '33',
    tag: 'Education',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'JAMB Fees\nSponsorship',
    desc: 'Full payment of registration fees for 250 JAMB candidates.',
    urgent: false,
  },
  {
    num: '34',
    tag: 'Education',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Anambra Student\nScholarships',
    desc: 'Merit-based scholarships for 500 bright Anambra students.',
    urgent: false,
  },
  {
    num: '35',
    tag: 'Education/Tech',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'ICT Centre\nOjoto',
    desc: 'Attraction of a modern ICT centre at Boys Secondary School, Ojoto.',
    urgent: false,
  },
  {
    num: '36',
    tag: 'Education',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'University\nGrants',
    desc: 'Successful attraction of student grants for university undergraduates.',
    urgent: false,
  },
  // --- SOCIAL AMENITIES (13-20) ---
  {
    num: '37',
    tag: 'Amenities',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Solar Street\nLights',
    desc: 'Installation of solar street lights across Ogidi, Nkpor, Obosi, Ojoto, Oba, etc.',
    urgent: false,
  },
  {
    num: '38',
    tag: 'Welfare',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Food Supply\nSocial Safety',
    desc: 'Food items delivered to 5,000 households (elderly, widows, and PWDs).',
    urgent: false,
  },
  {
    num: '39',
    tag: 'Amenities',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Nnobi Water\nReticulation',
    desc: 'Reticulation of solar-powered borehole in three villages at Nnobi.',
    urgent: false,
  },
  {
    num: '40',
    tag: 'Transport',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Shuttle Bus\nDonation',
    desc: 'Donation of a Shuttle bus to Idemili South L.G.A workers.',
    urgent: false,
  },
  {
    num: '41',
    tag: 'Infrastructure',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Oba Community\nHall',
    desc: 'Financial and administrative support for rebuilding the community hall at Oba.',
    urgent: false,
  },
  {
    num: '42',
    tag: 'Amenities',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Ogidi Transformer\nMaintenance',
    desc: 'Successful repair and maintenance of electricity transformers at Ogidi.',
    urgent: true,
  },
  {
    num: '43',
    tag: 'Health/Water',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Amafor Nkpor\nWater',
    desc: 'Reticulation of borehole water at the Health Centre, Amafor Nkpor.',
    urgent: false,
  },
  {
    num: '44',
    tag: 'Relief',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Flood & Erosion\nRelief',
    desc: 'Attraction of relief materials for people affected by floods and gully erosion.',
    urgent: true,
  },
  // --- EMPOWERMENT (21-34) ---
  {
    num: '45',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Renewable Energy\nTraining',
    desc: 'Training for women and youths on solar, biomass, and wind energy.',
    urgent: false,
  },
  {
    num: '46',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Nnokwa Energy\nSkills',
    desc: 'Empowerment of women and youths with strategic energy skills in Nnokwa.',
    urgent: false,
  },
  {
    num: '47',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Eziowelle Bio-gas\nTraining',
    desc: 'Bio-gas production training for Eziowelle youths and women.',
    urgent: false,
  },
  {
    num: '48',
    tag: 'Empowerment',
    tagColor: 'bg-[var(--sunlight-yellow)]/20 text-[var(--sunlight-yellow)]',
    title: 'Artisan\nTools Grant',
    desc: 'Sewing, grinding, POS machines, and cash grants for local artisans.',
    urgent: false,
    highlighted: true,
  },
  {
    num: '49',
    tag: 'Agriculture',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Fertilizer\nDistribution',
    desc: 'Empowerment of farmers with 50kg bags of urea fertilisers.',
    urgent: false,
  },
  {
    num: '50',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'SME Business\nGrants',
    desc: 'Direct business grants to 100 SME owners for local growth.',
    urgent: false,
  },
  {
    num: '51',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Digital Skills\nAcquisition',
    desc: 'Training program for Idemili youths on modern digital skills.',
    urgent: false,
  },
  {
    num: '52',
    tag: 'Advocacy',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Climate Adaptation\nSensitization',
    desc: 'Climate adaptation, resilience, and peace-building awareness.',
    urgent: false,
  },
  {
    num: '53',
    tag: 'Employment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Federal Job\nFacilitation',
    desc: 'Facilitation of federal government employment for local professionals.',
    urgent: false,
  },
  {
    num: '54',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'China Tech\nTraining',
    desc: 'Facilitation of Trade and tech training for Idemili youths in China.',
    urgent: false,
  },
  {
    num: '55',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Awka-Etiti Youth\nGrants',
    desc: 'Empowerment of five Awka-Etiti youths with 5 Million Naira.',
    urgent: false,
  },
  {
    num: '56',
    tag: 'Sports/Youth',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'UAO Football\nLeague 2025',
    desc: 'Youth Empowerment through Sponsorship of UAO Football League.',
    urgent: false,
  },
  {
    num: '57',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Nnokwa Women\nDonation',
    desc: 'Direct donation of one million Naira to Nnokwa women.',
    urgent: false,
  },
  {
    num: '58',
    tag: 'Empowerment',
    tagColor: 'bg-white/10 text-gray-300',
    title: 'Eziowelle Skill\nCentre',
    desc: 'Donation of Sewing Machines and 500k to Skill acquisition Centre.',
    urgent: false,
  },
];

export default function LegislativeAgenda() {
  const { t } = useLanguageStore();

  return (
    <section className="py-32 bg-[var(--midnight-green)] text-[var(--off-white)] overflow-hidden relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-overlay opacity-30 pointer-events-none z-0"/>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-20 flex justify-between items-end relative z-10">
        <div>
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[var(--sunlight-yellow)]"/>
            {t({ en: 'The Pillars', pcm: 'Di Main Things', ig: 'Ogidi Nke', ha: 'Ginshikan', yo: 'Awọn Ọwọn' })}
          </p>
          <h2 className="text-5xl lg:text-[6rem] font-bold leading-[0.9] tracking-tighter text-white serif-font">
            {t({ en: 'LEGISLATIVE', pcm: 'LAWMAKER', ig: 'IHE OMUME', ha: 'DOKA', yo: 'ASE' })}<br/>
            <span className="italic font-light text-white/50">
              {t({ en: 'Agenda', pcm: 'Plan', ig: 'Atụmatụ', ha: 'Ajanda', yo: 'Eto' })}
            </span>
          </h2>
        </div>
        <div className="hidden md:flex gap-4">
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all">
            <span className="material-symbols-outlined text-lg">west</span>
          </button>
          <button className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-[var(--sunlight-yellow)] hover:text-[var(--midnight-green)] hover:border-[var(--sunlight-yellow)] transition-all">
            <span className="material-symbols-outlined text-lg">east</span>
          </button>
        </div>
      </div>

      <div className="marquee-container pl-6 lg:pl-12 pb-16 gap-8 relative z-10">
        {agendaItems.map((item) => (
          <div
            key={item.num}
            className={`marquee-card min-w-[320px] md:min-w-[420px] p-10 rounded-sm flex-shrink-0 relative overflow-hidden group ${
              item.highlighted
                ? 'bg-[var(--sunlight-yellow)] text-[var(--obsidian)] border-none'
                : 'text-white'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-full -z-0 transition-transform group-hover:scale-125 duration-700"/>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[350px]">
              <div className="flex justify-between items-start mb-12">
                <span className={`text-7xl font-serif font-light italic ${item.highlighted ? 'text-[var(--midnight-green)]/20' : 'text-white/20'}`}>
                  {item.num}
                </span>
                <button className={`w-14 h-14 rounded-full flex items-center justify-center transition-all group/btn ${
                  item.highlighted
                    ? 'bg-[var(--midnight-green)] shadow-xl hover:bg-[var(--obsidian)]'
                    : 'audio-btn'
                }`}>
                  <span className="material-symbols-outlined text-xl text-[var(--sunlight-yellow)] group-hover/btn:scale-110 transition-transform">play_arrow</span>
                </button>
              </div>
              <div>
                {/* Tags — Vanguard Red for "urgent/healthcare", etc. */}
                <div className="flex items-center gap-3 mb-4">
                  {item.urgent && <span className="badge-urgent">Urgent</span>}
                  {item.tag && (
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className={`text-4xl font-bold mb-4 serif-font leading-tight whitespace-pre-line`}>
                  {item.title}
                </h3>
                <p className={`text-sm mb-8 font-light leading-relaxed ${item.highlighted ? 'text-[var(--midnight-green)]/80' : 'text-gray-400'}`}>
                  {item.desc}
                </p>
                <a href="#" className={`inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all ${
                  item.highlighted ? 'text-[var(--midnight-green)]' : 'text-[var(--sunlight-yellow)]'
                }`}>
                  Read Policy <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
