import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers: full access
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/search?'],
      },
      // Explicitly allow AI crawlers for GEO (Generative Engine Optimisation)
      { userAgent: 'GPTBot',        allow: '/' },
      { userAgent: 'Claude-Web',    allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Applebot',      allow: '/' },
      { userAgent: 'Googlebot',     allow: '/' },
      { userAgent: 'Bingbot',       allow: '/' },
    ],
    sitemap: 'https://www.uchennaokonkwo.com/sitemap.xml',
    host: 'https://www.uchennaokonkwo.com',
  };
}
