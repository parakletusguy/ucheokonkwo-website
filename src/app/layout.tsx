import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Hon. Harris Official Landing Page",
  description: "Multilingual Nigerian Blog / Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`antialiased selection:bg-[var(--midnight-green)] selection:text-[var(--sunlight-yellow)] ${outfit.variable} ${cormorantGaramond.variable}`}>
        {children}
      </body>
    </html>
  );
}
