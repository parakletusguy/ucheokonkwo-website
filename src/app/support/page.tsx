"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeComponent from '@/components/QRCodeComponent';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function SupportPage() {
  const { t } = useLanguageStore();
  const [amount, setAmount] = useState('');

  const handleSupport = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Redirecting to payment gateway for ${amount} Naira... (Integration in progress)`);
  };

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Support the Movement
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Your contributions help us deliver sustainable empowerment programs and effective representation for Idemili.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Cash Contributions */}
          <section className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-[var(--midnight-green)]">payments</span>
              Make a Contribution
            </h2>
            <form onSubmit={handleSupport} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Select or Enter Amount (NGN)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['5,000', '10,000', '25,000'].map((val) => (
                    <button 
                      key={val} 
                      type="button"
                      onClick={() => setAmount(val.replace(',', ''))}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${amount === val.replace(',', '') ? 'bg-[var(--midnight-green)] text-white border-[var(--midnight-green)]' : 'border-gray-100 text-gray-500 hover:border-[var(--midnight-green)]'}`}
                    >
                      ₦{val}
                    </button>
                  ))}
                </div>
                <input 
                  type="number" 
                  placeholder="Custom Amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all"
                />
              </div>
              
              <button className="w-full bg-[var(--midnight-green)] text-[var(--sunlight-yellow)] py-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all shadow-lg flex items-center justify-center gap-3 group">
                Contribute via Paystack
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </button>
              
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">
                Securely processed by Paystack
              </p>
            </form>
          </section>

          {/* Non-Cash / Major Contributions */}
          <section className="space-y-8">
            <div className="bg-[var(--midnight-green)] p-10 rounded-3xl text-white">
              <h2 className="text-2xl font-bold font-serif mb-4">Major Contributions</h2>
              <p className="text-white/70 font-light leading-relaxed mb-8">
                For major Naira contributions or non-cash support (equipment, facilities, or professional services), please contact the office directly.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:support@uchennaokonkwo.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--sunlight-yellow)]/20 transition-all">
                    <span className="material-symbols-outlined text-sm">mail</span>
                  </div>
                  <span className="text-sm font-medium">support@uchennaokonkwo.com</span>
                </a>
                <a href="tel:+2348000000000" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--sunlight-yellow)]/20 transition-all">
                    <span className="material-symbols-outlined text-sm">call</span>
                  </div>
                  <span className="text-sm font-medium">+234 Office Direct</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <QRCodeComponent 
                value="https://www.uchennaokonkwo.com/support" 
                size={140}
                label="Direct Support QR"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
