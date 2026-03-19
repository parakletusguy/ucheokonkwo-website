import type { MetadataRoute } from 'next';
import { agendaItems } from '@/data/achievements';

/**
 * Auto-generated sitemap for www.uchennaokonkwo.com
 * Add new blog slugs to the `blogSlugs` array as articles are published.
 */

const BASE_URL = 'https://www.uchennaokonkwo.com';
const NOW = new Date('2026-03-19');

const towns = [
  'ogidi', 'nkpor', 'obosi', 'ideani', 'uke', 'umuoji', 'ojoto',  // Idemili North
  'alor', 'nnobi', 'awka-etiti', 'oraukwu', 'oba', 'akwa',        // Idemili South
];

const blogSlugs = [
  'who-represents-idemili-north-south-house-of-reps',
  'uchenna-harris-okonkwo-profile-idemili-federal-rep',
  'annie-okonkwo-idemili-adc-representative',
  'complete-list-towns-idemili-north-south',
  'adc-anambra-action-democratic-congress-2026-2027',
  '10th-national-assembly-idemili-rep-performance',
  '2027-general-elections-idemili-voter-guide',
  'nkpor-ogidi-obosi-alor-development-updates',
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL + '/',               lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: BASE_URL + '/about',          lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE_URL + '/constituency',   lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE_URL + '/2027-elections', lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: BASE_URL + '/agenda',         lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/projects',       lastModified: NOW, changeFrequency: 'weekly',  priority: 0.8 },
    { url: BASE_URL + '/blog',           lastModified: NOW, changeFrequency: 'daily',   priority: 0.8 },
    { url: BASE_URL + '/towns',          lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/party',          lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE_URL + '/get-involved',   lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE_URL + '/contact',        lastModified: NOW, changeFrequency: 'yearly',  priority: 0.6 },
  ];

  // Town pages (Idemili North & South)
  const townPages: MetadataRoute.Sitemap = towns.map((town) => ({
    url: `${BASE_URL}/towns/${town}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Policy detail pages (58 items)
  const policyPages: MetadataRoute.Sitemap = agendaItems.map((item) => ({
    url: `${BASE_URL}/policy/${item.num}`,
    lastModified: NOW,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...townPages, ...blogPages,    ...policyPages,
    {
      url: `${BASE_URL}/projects/idemili-north`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects/idemili-south`,
      lastModified: NOW,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
