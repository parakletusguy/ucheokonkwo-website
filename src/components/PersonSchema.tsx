/**
 * PersonSchema.tsx
 * Injects the Person + GovernmentOrganization + WebSite JSON-LD schemas
 * for Hon. Uchenna Okonkwo into every page via the root layout.
 *
 * Usage: Import and render inside RootLayout's <head> or top of <body>.
 */

const SITE_URL = 'https://www.uchennaokonkwo.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Uchenna Okonkwo',
  alternateName: ['Harris Okonkwo', 'Hon. Harris Okonkwo', 'Hon. Uchenna Okonkwo'],
  givenName: 'Uchenna',
  familyName: 'Okonkwo',
  jobTitle: 'Federal Representative, Idemili North and South Federal Constituency',
  description:
    "Hon. Uchenna 'Harris' Okonkwo is the Federal House of Representatives member for Idemili North and South Federal Constituency, Anambra State, serving in the 10th National Assembly under the Action Democratic Congress (ADC).",
  nationality: { '@type': 'Country', name: 'Nigeria' },
  spouse: { '@type': 'Person', name: 'Annie Okonkwo' },
  affiliation: {
    '@type': 'Organization',
    name: 'Action Democratic Congress',
    alternateName: 'ADC',
    url: 'https://adcnigeria.net',
  },
  memberOf: {
    '@type': 'GovernmentOrganization',
    name: 'Nigerian House of Representatives — 10th National Assembly',
    url: 'https://www.nass.gov.ng',
  },
  url: SITE_URL,
  sameAs: [
    'https://www.nass.gov.ng',
    'https://twitter.com/HarrisOkonkwo',
    'https://www.facebook.com/HarrisOkonkwo',
  ],
  image: `${SITE_URL}/assets/og-image.jpg`,
  worksFor: {
    '@type': 'GovernmentOrganization',
    name: 'Idemili North and South Federal Constituency Office',
  },
};

const officeSchema = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  '@id': `${SITE_URL}/#office`,
  name: 'Office of Hon. Uchenna Okonkwo — Idemili North and South Federal Constituency',
  description:
    'Constituency office of the Federal Representative for Idemili North and South, Anambra State, Nigeria.',
  url: SITE_URL,
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Idemili North, Anambra State, Nigeria' },
    { '@type': 'AdministrativeArea', name: 'Idemili South, Anambra State, Nigeria' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Idemili',
    addressRegion: 'Anambra State',
    addressCountry: 'NG',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.15,
    longitude: 6.9833,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Constituency Office',
    url: `${SITE_URL}/contact`,
  },
  member: { '@id': `${SITE_URL}/#person` },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Hon. Uchenna Okonkwo — Official Website',
  url: SITE_URL,
  description:
    "Official website of Hon. Uchenna 'Harris' Okonkwo, Federal Representative for Idemili North and South, Anambra State.",
  publisher: { '@id': `${SITE_URL}/#person` },
  inLanguage: ['en-NG', 'ig'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function PersonSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(officeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
