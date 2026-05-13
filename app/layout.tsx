import Head from "next/head";
import type { Metadata } from "next";
import React from "react";
import { ChromeBackdropProvider } from "./components/ChromeBackdropProvider";
import { LanguageProvider } from "./i18n/context";
import { I18nShell } from "./components/I18nShell";
import { messages } from "./i18n/messages";
import "./globals.css";

const SITE_URL = "https://johnseong.com";
const SITE_TITLE = "John Seong — Aerospace & Software Engineer";
const SITE_DESCRIPTION =
  "John Seong (Wonmo Seong) — Apple WWDC23 Scholar, co-founder of Orchestr Aerospace, builder of Jebediah avionics, OpticALLY 3D Scan and ElectronVisual.org. UK Global Talent and US O-1A visa holder based between Quebec and London.";

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
    "Jebediah",
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
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>

      <body className="min-h-screen">
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
