"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeComponent from '@/components/QRCodeComponent';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function FeedbackPage() {
  const { t } = useLanguageStore();
  const [type, setType] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Your Voice Matters', pcm: 'Talk Your Own', ig: 'Olu Gị Dị Mkpa', ha: 'Muryarka Tana Da Mutu', yo: 'Ohun Rẹ Ṣe Pataki' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Feedback & Suggestions
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Hon. Uchenna Okonkwo values your input. Suggest improvements, share compliments, or provide constructive criticism.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-12">
            <div className="md:col-span-8 p-10 lg:p-16 border-r border-gray-50">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h2 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-2">Thank You!</h2>
                  <p className="text-gray-500 font-light mb-8">Your feedback has been received and will be reviewed by our team.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[var(--midnight-green)] font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Send Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-3 gap-4">
                    {['Suggestion', 'Compliment', 'Criticism'].map((t) => (
                      <button 
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={`py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${type === t ? 'bg-[var(--midnight-green)] text-white border-[var(--midnight-green)]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-2">Your Thoughts</label>
                      <textarea 
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What's on your mind? Be as specific as possible..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all min-h-[200px] resize-none"
                      />
                    </div>

                    <button className="w-full bg-[var(--midnight-green)] text-white py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all shadow-lg flex items-center justify-center gap-3">
                      Submit Feedback
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="md:col-span-4 p-10 bg-gray-50 flex flex-col items-center justify-center text-center">
              <QRCodeComponent 
                value="https://www.uchennaokonkwo.com/feedback" 
                size={140}
                label="Direct Feedback QR"
              />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">
                Scan on site
              </p>
              <p className="text-gray-400 text-[9px] mt-2 leading-relaxed">
                Use this QR on physical materials to gather community feedback instantly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
