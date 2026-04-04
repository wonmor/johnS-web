import Head from "next/head";
import React from "react";
import { ChromeBackdropProvider } from "./components/ChromeBackdropProvider";
import { LanguageProvider } from "./i18n/context";
import { I18nShell } from "./components/I18nShell";
import { messages } from "./i18n/messages";
import "./globals.css";

export const metadata = {
  title: messages.fr["meta.title"],
  description: messages.fr["meta.description"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>

      <body className="min-h-screen">
        <LanguageProvider>
          <ChromeBackdropProvider>
            <I18nShell>{children}</I18nShell>
          </ChromeBackdropProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
