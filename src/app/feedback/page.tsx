"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeComponent from '@/components/QRCodeComponent';
import { apiClient } from '@/lib/apiClient';
import type { FeedbackType } from '@/lib/types';

const TYPE_OPTIONS: { label: string; value: FeedbackType; icon: string }[] = [
  { label: 'Suggestion', value: 'SUGGESTION', icon: 'lightbulb' },
  { label: 'Compliment', value: 'COMPLIMENT', icon: 'thumb_up'  },
  { label: 'Criticism',  value: 'CRITICISM',  icon: 'flag'      },
];

export default function FeedbackPage() {
  const [type,      setType]      = useState<FeedbackType>('SUGGESTION');
  const [message,   setMessage]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (message.trim().length < 5) {
      setError('Message must be at least 5 characters.');
      return;
    }
    if (message.trim().length > 2000) {
      setError('Message must be under 2000 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/feedback', { type, message: message.trim() });
      setSubmitted(true);
      setMessage('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                    onClick={() => { setSubmitted(false); setType('SUGGESTION'); }}
                    className="text-[var(--midnight-green)] font-bold uppercase tracking-widest text-xs hover:underline"
                  >
                    Send Another Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Type selector */}
                  <div className="grid grid-cols-3 gap-4">
                    {TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setType(opt.value)}
                        className={`py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all flex flex-col items-center gap-1.5 ${
                          type === opt.value
                            ? 'bg-[var(--midnight-green)] text-white border-[var(--midnight-green)]'
                            : 'border-gray-100 text-gray-400 hover:border-gray-200'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#aaa] mb-2">
                        Your Thoughts
                        <span className="ml-2 normal-case font-normal text-gray-300">
                          ({message.length}/2000)
                        </span>
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What's on your mind? Be as specific as possible..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[var(--midnight-green)] focus:bg-white transition-all min-h-[200px] resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-500 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[var(--midnight-green)] text-white py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-60"
                    >
                      {submitting ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Feedback
                          <span className="material-symbols-outlined text-sm">send</span>
                        </>
                      )}
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
