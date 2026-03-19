import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Noto_Serif } from "next/font/google";
import "./globals.css";
import PersonSchema from "../components/PersonSchema";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Noto Serif supports Igbo/Yoruba tonal marks (combining diacritics) */
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  title: {
    default: 'Hon. Uchenna "Harris" Okonkwo — Federal Rep, Idemili North & South | ADC',
    template: '%s | Hon. Uchenna Okonkwo',
  },
  description:
    "Official website of Hon. Uchenna 'Harris' Okonkwo, Federal House of Representatives member for Idemili North and South Federal Constituency, Anambra State. ADC · 10th National Assembly. Vision, constituency projects, and 2027 election updates.",
  keywords: [
    'Uchenna Okonkwo', 'Harris Okonkwo', 'reps in Nigeria', 'idemili reps',
    'idemili north and south federal constituency', 'idemili federal representative',
    'ADC Nigeria', 'Action Democratic Congress', '10th assembly rep', 'best 10th assembly rep',
    '2027 general elections idemili', 'Annie Okonkwo', 'towns in idemili',
    'idemili north', 'idemili south', 'Nkpor', 'Ogidi', 'Obosi', 'Alor',
    'Ideani', 'Nnewi', 'Anambra State', 'Nigeria House of Representatives',
  ],
  authors: [{ name: 'Office of Hon. Uchenna Okonkwo', url: 'https://www.uchennaokonkwo.com' }],
  creator: 'Office of Hon. Uchenna Okonkwo',
  publisher: 'Hon. Uchenna Okonkwo',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.uchennaokonkwo.com',
    languages: {
      'en-NG': 'https://www.uchennaokonkwo.com',
      ig: 'https://www.uchennaokonkwo.com/ig',
    },
  },
  openGraph: {
    type: 'profile',
    siteName: 'Hon. Uchenna Okonkwo — Official Website',
    title: "Hon. Uchenna 'Harris' Okonkwo — Federal Rep, Idemili North & South",
    description:
      'Official site of the ADC Federal Representative for Idemili North & South. Vision, constituency projects, and 2027 election updates.',
    url: 'https://www.uchennaokonkwo.com',
    locale: 'en_NG',
    images: [
      {
        url: 'https://www.uchennaokonkwo.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hon. Uchenna Harris Okonkwo, Federal Representative for Idemili North and South',
      },
    ],
    firstName: 'Uchenna',
    lastName: 'Okonkwo',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HarrisOkonkwo',
    creator: '@HarrisOkonkwo',
    title: "Hon. Uchenna 'Harris' Okonkwo — Idemili Federal Rep | ADC",
    description:
      'Official website of the Federal Representative for Idemili North & South. ADC · 10th National Assembly · 2027 Election Updates.',
    images: ['https://www.uchennaokonkwo.com/assets/og-image.jpg'],
  },
  other: {
    'geo.region': 'NG-AN',
    'geo.placename': 'Idemili North and South, Anambra State, Nigeria',
    'geo.position': '6.1500;6.9833',
    ICBM: '6.1500, 6.9833',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)] ${outfit.variable} ${cormorantGaramond.variable} ${notoSerif.variable}`}
      >
        <PersonSchema />
        {children}
      </body>
    </html>
  );
}
