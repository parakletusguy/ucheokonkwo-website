"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQSchema, { DEFAULT_FAQS } from '@/components/FAQSchema';
import { useLanguageStore } from '@/store/useLanguageStore';

export default function ContactPage() {
  const { t } = useLanguageStore();

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({ en: 'Get In Touch', pcm: 'Holla Us', ig: 'Kpọtụrụ Anyị', ha: 'Tuntube Mu', yo: 'Kan Si Wa' })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Constituency Office
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Our doors are always open. Reach out for inquiries, community support, or to schedule a meeting with the representative&apos;s office.
          </p>
        </div>

        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 mb-24">
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-8">
              Office Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--midnight-green)]">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--obsidian)]">Address</h4>
                  <p className="text-gray-500 font-light">
                    Idemili North and South Federal Constituency Office<br />
                    Anambra State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--midnight-green)]">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--obsidian)]">Email Address</h4>
                  <p className="text-gray-500 font-light">
                    contact@uchennaokonkwo.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[var(--midnight-green)]">public</span>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--obsidian)]">Opening Hours</h4>
                  <p className="text-gray-500 font-light">
                    Monday - Friday: 9:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm h-64 grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126839.29742691866!2d6.86558531776953!3d6.1558223611116245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043936c53fa1109%3A0xe5a3ebce58428ea8!2sIdemili%20North%2C%20Anambra!5e0!3m2!1sen!2sng!4v1715093510000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps IDEMILI NORTH & SOUTH"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold font-serif text-[var(--obsidian)] mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full border-gray-200 rounded-md focus:ring-[var(--midnight-green)] focus:border-[var(--midnight-green)]" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border-gray-200 rounded-md focus:ring-[var(--midnight-green)] focus:border-[var(--midnight-green)]" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea className="w-full border-gray-200 rounded-md focus:ring-[var(--midnight-green)] focus:border-[var(--midnight-green)] h-32 resize-none" placeholder="How can we assist you?"></textarea>
              </div>
              <button className="w-full bg-[var(--midnight-green)] text-[var(--off-white)] py-4 font-bold uppercase tracking-wider hover:bg-[var(--obsidian)] transition-colors rounded-md mt-4 shadow-lg">
                Submit Message
              </button>
            </form>
          </div>
        </section>

        <FAQSchema faqs={DEFAULT_FAQS} />
      </main>
      <Footer />
    </>
  );
}
