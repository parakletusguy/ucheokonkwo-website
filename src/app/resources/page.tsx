"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguageStore } from "@/store/useLanguageStore";

const BROCHURE_URL =
  "https://0k76b4agal.ufs.sh/f/fFqK3So2ZLuwWGG7yUmRpMHJBlGjscmXo9u1tzVAxvQ2YTdZ";
const BROCHURE_VIEWER = `https://docs.google.com/viewer?url=${encodeURIComponent(BROCHURE_URL)}&embedded=true`;

const QR_CODES = [
  {
    id:       "website",
    src:      "/website_qr.png",
    title:    "Official Website",
    subtitle: "Scan to visit uchennaokonkwo.com",
    url:      "https://www.uchennaokonkwo.com",
    filename: "Uche_Okonkwo_Website_QR.png",
  },
  {
    id:       "brochure",
    src:      "/brochure.png",
    title:    "Campaign Brochure",
    subtitle: "Scan to download the official e-brochure",
    url:      "https://www.uchennaokonkwo.com/resources",
    filename: "Uche_Okonkwo_Brochure_QR.png",
  },
];

/** Compress an image URL via canvas → WebP blob (falls back to PNG). */
async function compressImage(src: string, maxPx = 500, quality = 0.88): Promise<{ blob: Blob; ext: "webp" | "png" }> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = document.createElement("img");
    el.onload  = () => resolve(el);
    el.onerror = reject;
    el.src = src;
  });

  const scale  = Math.min(maxPx / img.naturalWidth, maxPx / img.naturalHeight, 1);
  const canvas = document.createElement("canvas");
  canvas.width  = Math.round(img.naturalWidth  * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) { resolve({ blob, ext: "webp" }); return; }
        // WebP not supported (Safari <16) — fall back to PNG
        canvas.toBlob((png) => resolve({ blob: png!, ext: "png" }), "image/png");
      },
      "image/webp",
      quality,
    );
  });
}

function QRCard({ qr }: { qr: typeof QR_CODES[0] }) {
  const [copied,       setCopied]       = useState(false);
  const [shared,       setShared]       = useState(false);
  const [downloading,  setDownloading]  = useState(false);
  const [sharing,      setSharing]      = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { blob, ext } = await compressImage(qr.src);
      const url = URL.createObjectURL(blob);
      const a   = document.createElement("a");
      a.href     = url;
      a.download = qr.filename.replace(".png", `.${ext}`);
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      const { blob, ext } = await compressImage(qr.src);
      const mime = ext === "webp" ? "image/webp" : "image/png";
      const file = new File([blob], qr.filename.replace(".png", `.${ext}`), { type: mime });

      if (typeof navigator !== "undefined" && navigator.share) {
        // Share with compressed file if browser supports it
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: `Uche Okonkwo — ${qr.title}`, text: qr.subtitle, files: [file] });
          setShared(true);
          setTimeout(() => setShared(false), 2500);
          return;
        }
        // Share URL only (desktop browsers that don't support file share)
        await navigator.share({ title: `Uche Okonkwo — ${qr.title}`, url: qr.url });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      }
    } catch {
      // User cancelled — fall through to clipboard
    } finally {
      setSharing(false);
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(`${qr.title} — ${qr.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* ignore */ }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* QR image */}
      <div className="bg-gray-50 flex items-center justify-center p-8 lg:p-12">
        <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={qr.src}
            alt={`QR code — ${qr.title}`}
            fill
            className="object-contain"
            sizes="224px"
          />
        </div>
      </div>

      {/* Info + actions */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-lg font-serif text-[var(--obsidian)]">{qr.title}</h3>
          <p className="text-sm text-gray-400 mt-0.5">{qr.subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Download — compressed WebP */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--midnight-green)] text-white rounded-xl py-3 text-xs font-bold uppercase tracking-widest hover:bg-[var(--obsidian)] transition-all shadow-sm disabled:opacity-60"
          >
            {downloading
              ? <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <span className="material-symbols-outlined text-[16px]">download</span>
            }
            {downloading ? "Compressing…" : "Save Image"}
          </button>

          {/* Share — compressed WebP */}
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-[var(--obsidian)] rounded-xl py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-60"
          >
            {sharing
              ? <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
              : <span className="material-symbols-outlined text-[16px]">
                  {shared ? "check_circle" : copied ? "content_copy" : "share"}
                </span>
            }
            {sharing ? "Preparing…" : shared ? "Shared!" : copied ? "Link Copied!" : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const { t } = useLanguageStore();
  const [showPdf, setShowPdf] = useState(false);

  return (
    <>
      <div className="fixed inset-0 texture-overlay pointer-events-none z-0"></div>
      <Header />
      <main className="pt-32 pb-24">
        {/* Page header */}
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-4">
            {t({
              en: "Knowledge & Assets",
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

        {/* ── E-Brochure ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 mb-16">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-[var(--midnight-green)]/5 to-transparent">
              <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)] mb-4">
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
                  <span className="material-symbols-outlined text-sm">download</span>
                  Download PDF
                </a>
                <button
                  onClick={() => setShowPdf(true)}
                  className="px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-200 text-[var(--obsidian)] hover:bg-gray-50 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Read Online
                </button>
              </div>
            </div>

            <div className="p-12 bg-[var(--midnight-green)] flex flex-col items-center justify-center text-center">
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-xl mb-5">
                <Image src="/brochure.png" alt="Brochure QR Code" fill className="object-contain" sizes="176px" />
              </div>
              <p className="text-[var(--sunlight-yellow)] font-bold text-xs uppercase tracking-[0.2em]">
                Scan to Access Brochure
              </p>
              <p className="text-white/60 text-[10px] mt-2 max-w-[200px]">
                Share this QR on print materials for instant access to the e-brochure.
              </p>
            </div>
          </div>
        </section>

        {/* ── QR Codes section ────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-[var(--midnight-green)] font-bold tracking-[0.3em] uppercase text-xs mb-2">
              Shareable Assets
            </p>
            <h2 className="text-3xl font-bold font-serif text-[var(--obsidian)]">
              QR Codes
            </h2>
            <p className="text-gray-500 font-light mt-2 max-w-xl">
              Download and share these QR codes on social media, flyers, or print materials.
              Scan with any smartphone camera to access instantly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {QR_CODES.map((qr) => (
              <QRCard key={qr.id} qr={qr} />
            ))}
          </div>

          {/* Usage tip */}
          <div className="mt-8 flex items-start gap-3 bg-[var(--midnight-green)]/5 border border-[var(--midnight-green)]/10 rounded-2xl px-5 py-4">
            <span className="material-symbols-outlined text-[var(--midnight-green)] text-[20px] flex-shrink-0 mt-0.5">tips_and_updates</span>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[var(--midnight-green)]">Tip:</strong> Print these QR codes on banners, flyers, and business cards to connect supporters directly to the campaign website and official materials. They work with any smartphone camera.
            </p>
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
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--midnight-green)] text-[18px]">picture_as_pdf</span>
                <span className="font-bold text-sm text-[var(--obsidian)]">Official E-Brochure</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={BROCHURE_URL}
                  download="Official_E-Brochure.pdf"
                  className="flex items-center gap-1.5 text-xs font-bold text-[var(--midnight-green)] hover:underline"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  Download
                </a>
                <button
                  onClick={() => setShowPdf(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-gray-500">close</span>
                </button>
              </div>
            </div>
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
