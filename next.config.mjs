/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Security ──────────────────────────────────────────────────────────────
  poweredByHeader: false,

  // ── Optimization ──────────────────────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── Image Optimization ─────────────────────────────────────────────────────
  images: {
    // Support WebP/AVIF for ~60-70% smaller images on 3G
    formats: ['image/avif', 'image/webp'],
    // Remote image domains used by Stitch AI-generated content
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    // Reduce quality slightly for much smaller file sizes on mobile
    deviceSizes: [375, 640, 750, 828, 1080],
    imageSizes: [48, 96, 128, 256],
  },

  // ── Experimental ──────────────────────────────────────────────────────────
  experimental: {
    // Inline critical CSS on first load — eliminates a network round trip
    optimizeCss: false, // Disabled - requires 'critters' package, enable after: npm install critters
  },

  // ── Headers — HTTP Caching ────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Global SEO Robots Tag
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        ],
      },
      {
        // Cache all static assets aggressively (JS, CSS, fonts)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache hero portrait image (rarely changes)
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
