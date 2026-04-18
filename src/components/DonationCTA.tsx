import Link from "next/link";

export default function DonationCTA() {
  return (
    <section className="relative overflow-hidden py-24 bg-[var(--midnight-green)]">
      {/* Decorative background orbs */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "var(--sunlight-yellow)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "var(--sunlight-yellow)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left copy */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-[var(--sunlight-yellow)] text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Support Our Movement
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white serif-font mb-5 leading-tight">
            Invest in a Better <br className="hidden lg:block" />
            Tomorrow
          </h2>
          <p className="text-white/60 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
            Every contribution — big or small — powers the community programmes,
            youth empowerment initiatives, and grassroots campaigns that are
            driving shared prosperity across Idemili North & South.
          </p>

          {/* Quick impact stats */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8">
            {[
              { value: "₦10K", label: "Empowers an Idemili youth" },
              { value: "₦50K", label: "Funds a local health drive" },
              { value: "₦100K", label: "Sponsors a local scholarship" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-[var(--sunlight-yellow)] text-2xl font-bold serif-font">
                  {stat.value}
                </p>
                <p className="text-white/50 text-xs font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA card */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col items-center gap-6 text-center">
            {/* Icon - Updated to Handshake for ADC Trust Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-[var(--sunlight-yellow)]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-[var(--sunlight-yellow)]">
                handshake
              </span>
            </div>

            <div>
              <p className="text-white font-semibold text-lg mb-1">
                Ready to make an impact?
              </p>
              <p className="text-white/50 text-sm">
                Secure bank transfer — only 2 minutes.
              </p>
            </div>

            <Link
              href="/donate"
              className="group inline-flex items-center gap-3 bg-[var(--sunlight-yellow)] text-[var(--obsidian)] px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-black/20"
            >
              Donate Now
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <p className="text-white/30 text-[11px]">
              Access Bank · 0066712737 · Uchenna Harris Okonkwo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
