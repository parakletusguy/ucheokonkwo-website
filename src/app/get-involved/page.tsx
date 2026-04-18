"use client";

import React, { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';

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
      const r = await fetch(`${API_BASE}/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: vName, email: vEmail, phone: vPhone || undefined, lga: vWard || undefined }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        const msg = Array.isArray(d.message) ? d.message.join(', ') : (d.message ?? 'Signup failed.');
        throw new Error(msg);
      }
      setVSuccess(true); setVName(''); setVEmail(''); setVPhone(''); setVWard('');
    } catch (err) { setVError(err instanceof Error ? err.message : 'Signup failed.'); }
    finally { setVLoading(false); }
  };

  const handlePetition = async (e: React.FormEvent) => {
    e.preventDefault();
    setPLoading(true); setPError('');
    try {
      const r = await fetch(`${API_BASE}/petitions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          constituentName: pName,
          topic: 'General Inquiry',
          message: pWard ? `[Ward: ${pWard}]\n${pMessage}` : pMessage,
        }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        const msg = Array.isArray(d.message) ? d.message.join(', ') : (d.message ?? 'Submission failed.');
        throw new Error(msg);
      }
      setPSuccess(true); setPName(''); setPWard(''); setPMessage('');
    } catch (err) { setPError(err instanceof Error ? err.message : 'Submission failed.'); }
    finally { setPLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[var(--off-white)]">
      {/* Hero banner */}
      <section className="bg-[var(--midnight-green)] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 texture-overlay opacity-20"/>
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[var(--sunlight-yellow)] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-[var(--sunlight-yellow)]"/>
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold serif-font leading-tight mb-6">
          </h1>
          <p className="text-blue-200 text-lg max-w-xl leading-relaxed">
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        {/* Volunteer Signup */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-full bg-[var(--midnight-green)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--midnight-green)]">group_add</span>
            </span>
            <div>
            </div>
          </div>

          {vSuccess ? (
            <div className="bg-[var(--midnight-green)]/10 border border-[var(--midnight-green)]/20 rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-[var(--midnight-green)] text-4xl block mb-2">check_circle</span>
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
                  <input type={type} required={required} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)]" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Ward</label>
                <select required value={vWard} onChange={(e) => setVWard(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)]">
                  <option value="">Select your ward…</option>
                  {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              {vError && <p className="text-xs text-[var(--sunlight-yellow)]">{vError}</p>}
              <button type="submit" disabled={vLoading} className="w-full bg-[var(--midnight-green)] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                {vLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : null}
              </button>
            </form>
          )}
        </section>

        {/* Constituency Petition */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-10 rounded-full bg-[var(--midnight-green)]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[var(--midnight-green)]">mail</span>
            </span>
            <div>
            </div>
          </div>

          {pSuccess ? (
            <div className="bg-[var(--midnight-green)]/5 border border-[var(--midnight-green)]/10 rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-[var(--midnight-green)] text-4xl block mb-2">mark_email_read</span>
            </div>
          ) : (
            <form onSubmit={handlePetition} className="space-y-4">
              {[
                { label: 'Your Name', value: pName, set: setPName, type: 'text' },
              ].map(({ label, value, set, type }) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</label>
                  <input type={type} required value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)]" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Ward</label>
                <select required value={pWard} onChange={(e) => setPWard(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[var(--obsidian)] focus:outline-none focus:border-[var(--midnight-green)]">
                  <option value="">Select your ward…</option>
                  {WARDS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Your Petition / Message</label>
              </div>
              {pError && <p className="text-xs text-[var(--sunlight-yellow)]">{pError}</p>}
              <button type="submit" disabled={pLoading} className="w-full bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] py-3 rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                {pLoading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/> : null}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
