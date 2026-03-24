"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRCodeComponent from "@/components/QRCodeComponent";
import { useLanguageStore } from "@/store/useLanguageStore";

const BROCHURE_URL =
  "https://0k76b4agal.ufs.sh/f/fFqK3So2ZLuw0XmHdJuwxI3nVmPfUXAuwtE9hzrJbYvLe5Tq";
const BROCHURE_VIEWER = `https://docs.google.com/viewer?url=${encodeURIComponent(BROCHURE_URL)}&embedded=true`;

export default function ResourcesPage() {
  const { t } = useLanguageStore();
  const [showPdf, setShowPdf] = useState(false);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({
              en: "Knowledge & Assets",
              pcm: "Information & Tools",
              ig: "Mmụta na Ngwa Ọrụ",
              ha: "Ilimi da Kayan Aiki",
              yo: "Imọ & Awọn Ohun-ini",
            })}
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold text-[var(--obsidian)] serif-font mb-6">
            Resources
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Access official documents, campaign materials, and educational
            resources championed by Hon. Uchenna Okonkwo.
          </p>
        </div>

        <section className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-[var(--midnight-green)]/5 to-transparent">
              <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-6">
                Official E-Brochure
              </h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                Download the comprehensive guide to Hon. Uchenna Okonkwo&apos;s
                legislative agenda, constituency achievements, and vision for
                Idemili.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href={BROCHURE_URL}
                  download="Official_E-Brochure.pdf"
                  className="bg-[var(--midnight-green)] text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all flex items-center gap-3 shadow-lg"
                >
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>
                  Download PDF
                </a>

                <button
                  onClick={() => setShowPdf(true)}
                  className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 text-[var(--obsidian)] hover:bg-gray-50 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                  Read Online
                </button>
              </div>
            </div>

            <div className="p-12 bg-[var(--midnight-green)] flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <QRCodeComponent
                  value="https://www.uchennaokonkwo.com/resources"
                  size={180}
                  label="Scan to Share"
                />
              </div>
              <p className="text-[var(--sunlight-yellow)] font-bold text-xs uppercase tracking-[0.2em] opacity-80">
                Easy Reference QR Code
              </p>
              <p className="text-white/60 text-[10px] mt-2 max-w-[200px]">
                Share this QR code on publicity materials to give people instant
                access to the e-brochure and resources.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* PDF Modal */}
      {showPdf && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPdf(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden"
            style={{ height: "min(90vh, 800px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--midnight-green)] text-[18px]">
                  picture_as_pdf
                </span>
                <span className="font-bold text-sm text-[var(--obsidian)]">
                  Official E-Brochure
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={BROCHURE_URL}
                  download="Official_E-Brochure.pdf"
                  className="flex items-center gap-1.5 text-xs font-bold text-[var(--midnight-green)] hover:underline"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    download
                  </span>
                  Download
                </a>
                <button
                  onClick={() => setShowPdf(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-gray-500">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Embedded PDF */}
            <iframe
              src={BROCHURE_VIEWER}
              className="flex-1 w-full"
              title="Official E-Brochure"
            />
          </div>
        </div>
      )}
    </>
  );
}
