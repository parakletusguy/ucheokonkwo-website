import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Noto_Serif } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

/* Noto Serif supports Igbo/Yoruba tonal marks (combining diacritics) */
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hon. Uchenna Harris Okonkwo | African Democratic Congress",
  description: "Official website of Hon. Uchenna Harris Okonkwo — Constituency-First digital platform for Idemili North & South, serving in Igbo, Yoruba, Hausa, Pidgin and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)] ${outfit.variable} ${cormorantGaramond.variable} ${notoSerif.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
