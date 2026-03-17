"use client";

import React, { useState } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';

const WARDS = [
  'Abatete Ward',
  'Ideani Ward',
  'Nkpor Urban Ward 1',
  'Nkpor Urban Ward 2',
  'Nkpor/Oba Ward',
  'Obosi Ward',
  'Ogidi Ward',
  'Idemili South Ward 1',
  'Idemili South Ward 2',
  'Other',
];

export default function GetInvolvedPage() {
  const { t } = useLanguageStore();

  /* Volunteer form */
  const [vName, setVName] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vWard, setVWard] = useState('');
  const [vLoading, setVLoading] = useState(false);
  const [vSuccess, setVSuccess] = useState(false);
  const [vError, setVError] = useState('');

  /* Petition form */
  const [pName, setPName] = useState('');
  const [pWard, setPWard] = useState('');
  const [pMessage, setPMessage] = useState('');
  const [pLoading, setPLoading] = useState(false);
  const [pSuccess, setPSuccess] = useState(false);
  const [pError, setPError] = useState('');

  const handleVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setVLoading(true); setVError('');
    try {
      const r = await fetch('/api/volunteers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: vName, email: vEmail, phone: vPhone, ward: vWard }) });
      if (!r.ok) { const d = await r.json(); throw new Error(d.error); }
      setVSuccess(true); setVName(''); setVEmail(''); setVPhone(''); setVWard('');
    } catch (err) { setVError(err instanceof Error ? err.message : 'Signup failed.'); }
    finally { setVLoading(false); }
  };

  const handlePetition = async (e: React.FormEvent) => {
    e.preventDefault();
    setPLoading(true); setPError('');
    try {
      const r = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: pName, ward: pWard, message: pMessage }) });
      if (!r.ok) { const d = await r.json(); throw new Error(d.error); }
      setPSuccess(true); setPName(''); setPWard(''); setPMessage('');
    } catch (err) { setPError(err instanceof Error ? err.message : 'Submission failed.'); }
    finally { setPLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[var(--off-white)]">
      {/* Hero banner */}
      <section className="bg-[var(--integrity-navy)] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"/>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[var(--adc-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-[var(--adc-yellow)]"/>
            {t({ en: 'Join The Movement', pcm: 'Join Di Movement', ig: 'Soro N\'ụlọ Mmuta', ha: 'Shiga Cikin Motsi', yo: 'Darapọ Mọ Egbe' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold serif-font leading-tight mb-6">
            {t({ en: 'Get\nInvolved', pcm: 'Join\nUs', ig: 'Soro\nAnyị', ha: 'Shiga\nCiki', yo: 'Dara\nPọ' })}
          </h1>
          <p className="text-blue-200 text-lg max-w-xl leading-relaxed">
            {t({ en: 'Together, we can build a better Idemili. Sign up as a volunteer, or send a constituency petition directly to the office.', pcm: 'Together we go build better Idemili. Sign up as volunteer or send your message to di office.', ig: 'Ọnye ọ bụla na-enyere aka ka Idemili dị mma. Deere aha gị dịka onye ọrụ nnọchite anya.', ha: 'Tare, za a gina Idemili mafi kyau. Yi rijista a matsayin mai ba da kai.', yo: 'Papọ, a o kọ Idemili to dara. Forukọsilẹ gẹgẹbi oluyọọda.' })}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Volunteer Signup */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-full bg-[var(--constituency-green)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--constituency-green)]">group_add</span>
            </span>
            <div>
              <h2 className="text-2xl font-bold serif-font text-[var(--obsidian)]">{t({ en: 'Volunteer Portal', pcm: 'Join As Volunteer', ig: 'Deere Aha Dị Ka Onye Ọrụ Nnọchite Anya', ha: 'Portal na Masu Ba Da Kai', yo: 'Portal Oluyọọda' })}</h2>
              <p className="text-xs text-gray-400">{t({ en: 'Join the ADC campaign trail', pcm: 'Join ADC for dem campaign', ig: 'Soro ADC n\'oge ọchịchọ', ha: 'Shiga cikin yakin neman zabe na ADC', yo: 'Dara pọ mọ irin-ajo ipolongo ADC' })}</p>
            </div>
          </div>

          {vSuccess ? (
            <div className="bg-[var(--constituency-green)]/10 border border-[var(--constituency-green)]/20 rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-[var(--constituency-green)] text-4xl block mb-2">check_circle</span>
              <p className="font-bold text-[var(--constituency-green)]">{t({ en: 'Thank you! We\'ll be in touch.', pcm: 'E don do! We go call you.', ig: 'Daalụ! Anyị ga-akpọtụ gị.', ha: 'Nagode! Za mu tuntube ku.', yo: 'E dupe! A o kan si ọ.' })}</p>
            </div>
          ) : (
            <form onSubmit={handleVolunteer} className="space-y-4">
              {[
                { label: 'Full Name', value: vName, set: setVName, type: 'text', required: true },
                { label: 'Email Address', value: vEmail, set: setVEmail, type: 'email', required: true },
                { label: 'Phone (optional)', value: vPhone, set: setVPhone, type: 'tel', required: false },
              ].map(({ label, value, set, type, required }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</label>
                  <input type={type} required={required} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--constituency-green)]" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Ward</label>
                <select required value={vWard} onChange={(e) => setVWard(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--constituency-green)]">
                  <option value="">Select your ward…</option>
                  {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              {vError && <p className="text-xs text-[var(--vanguard-red)]">{vError}</p>}
              <button type="submit" disabled={vLoading} className="w-full bg-[var(--constituency-green)] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                {vLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : null}
                {t({ en: 'Sign Me Up', pcm: 'Add My Name', ig: 'Deere Aha M', ha: 'Yi Rijista', yo: 'Forukọsilẹ Mi' })}
              </button>
            </form>
          )}
        </section>

        {/* Constituency Petition */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-full bg-[var(--integrity-navy)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--integrity-navy)]">mail</span>
            </span>
            <div>
              <h2 className="text-2xl font-bold serif-font text-[var(--obsidian)]">{t({ en: 'Constitution Petition', pcm: 'Send Your Complaint', ig: 'Zipu Nkwupụta Gị', ha: 'Aika Koke', yo: 'Firanṣẹ Ẹbẹ' })}</h2>
              <p className="text-xs text-gray-400">{t({ en: 'Your voice goes directly to the office', pcm: 'Your message reach di office directly', ig: 'Nkwupụta gị ga-aga n\'ụlọ ọchịchọ', ha: 'Sakon ku zai isa ofishin kai tsaye', yo: 'Ohun rẹ lọ taara si ọfiisi' })}</p>
            </div>
          </div>

          {pSuccess ? (
            <div className="bg-[var(--integrity-navy)]/5 border border-[var(--integrity-navy)]/10 rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-[var(--integrity-navy)] text-4xl block mb-2">mark_email_read</span>
              <p className="font-bold text-[var(--integrity-navy)]">{t({ en: 'Petition received. Thank you for speaking up.', pcm: 'We don receive am. Dank you!', ig: 'Anyị natara nkwupụta gị. Daalụ.', ha: 'An karɓi kokinku. Nagode.', yo: 'A ti gba ẹbẹ kini. E dupe.' })}</p>
            </div>
          ) : (
            <form onSubmit={handlePetition} className="space-y-4">
              {[
                { label: 'Your Name', value: pName, set: setPName, type: 'text' },
              ].map(({ label, value, set, type }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</label>
                  <input type={type} required value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--integrity-navy)]" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Ward</label>
                <select required value={pWard} onChange={(e) => setPWard(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--integrity-navy)]">
                  <option value="">Select your ward…</option>
                  {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Your Petition / Message</label>
                <textarea required value={pMessage} onChange={(e) => setPMessage(e.target.value)} rows={5} placeholder={t({ en: 'Describe your concern or request…', pcm: 'Write your matter here…', ig: 'Dee ihe ịchọ ịkọ…', ha: 'Rubuta buƙatarka…', yo: 'Ṣapejuwe ibakẹjẹ rẹ…' })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--integrity-navy)] resize-none" />
              </div>
              {pError && <p className="text-xs text-[var(--vanguard-red)]">{pError}</p>}
              <button type="submit" disabled={pLoading} className="w-full bg-[var(--integrity-navy)] text-[var(--adc-yellow)] py-3 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                {pLoading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/> : null}
                {t({ en: 'Send Petition', pcm: 'Send Am', ig: 'Zipu Nkwupụta', ha: 'Aika Koke', yo: 'Firanṣẹ Ẹbẹ' })}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
