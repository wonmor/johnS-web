import type { Metadata } from "next";
import React from "react";
import { serifFont } from "./fonts";
import { ChromeBackdropProvider } from "./components/ChromeBackdropProvider";
import { LanguageProvider } from "./i18n/context";
import { I18nShell } from "./components/I18nShell";
import { messages } from "./i18n/messages";
import "./globals.css";

const SITE_URL = "https://johnseong.com";
const SITE_TITLE = "John Seong — Aerospace & Software Engineer";
const SITE_DESCRIPTION =
  "John Seong (Wonmo Seong) — Apple WWDC23 Scholar, co-founder of Orchestr Aerospace, builder of Jeb's avionics, OpticALLY 3D Scan and ElectronVisual.org. UK Global Talent and US O-1A visa holder based between Quebec and London.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — John Seong",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "John Seong",
    "Wonmo Seong",
    "Orchestr Aerospace",
    "Orchestre Avionique",
    "Jeb's",
    "Avionic 1",
    "Apple WWDC23 Scholar",
    "OpticALLY 3D Scan",
    "ElectronVisual",
    "Atomizer AR",
    "UK Global Talent",
    "US O-1A",
    "aerospace engineer",
    "iOS developer",
  ],
  authors: [{ name: "John Seong", url: SITE_URL }],
  creator: "John Seong",
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}?lang=en`,
      fr: `${SITE_URL}?lang=fr`,
      ko: `${SITE_URL}?lang=ko`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "John Seong",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/IMG_2530.jpg",
        width: 1200,
        height: 1200,
        alt: "John Seong — Apple WWDC23 Scholar",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/IMG_2530.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/pwa-icon.png",
    apple: "/pwa-icon.png",
  },
  category: "technology",
  // `next/head` is a no-op in the App Router — this is how the smart app
  // banner actually reaches the document head.
  other: {
    "apple-itunes-app": "app-id=6449015706",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "John Seong",
    alternateName: ["Wonmo Seong", "John Wonmo Seong"],
    url: SITE_URL,
    image: `${SITE_URL}/IMG_2530.jpg`,
    jobTitle: "Co-founder, Orchestr Aerospace",
    description: SITE_DESCRIPTION,
    award: [
      "Apple WWDC23 Swift Student Challenge — Distinguished Winner",
      "UK Global Talent Visa",
      "US O-1A Extraordinary Ability",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Orchestr Aerospace Inc",
      url: "https://orchestrsim.com",
    },
    sameAs: [
      "https://github.com/wonmor",
      "https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w",
    ],
  };

  return (
    <html lang="fr">
      {/* Serif on the body so floating chrome outside the shell inherits it too. */}
      <body className={`${serifFont.className} min-h-screen bg-[#f5f0e6]`}>
        {/* Warm the connection to the embedded ElectronVisual renderer before
            the iframe asks for it — saves the DNS + TLS round trips. */}
        <link rel="preconnect" href="https://electronvisual.org" crossOrigin="" />
        <link rel="dns-prefetch" href="https://electronvisual.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <LanguageProvider>
          <ChromeBackdropProvider>
            <I18nShell>{children}</I18nShell>
          </ChromeBackdropProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
