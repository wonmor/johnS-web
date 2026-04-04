import Head from "next/head";
import React from "react";
import { LanguageProvider } from "./i18n/context";
import { I18nShell } from "./components/I18nShell";
import "./globals.css";

export const metadata = {
  title: "John Seong",
  description:
    "Hi, I’m John. I love aerospace, software, and design. Welcome to my personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>

      <body className="min-h-screen">
        <LanguageProvider>
          <I18nShell>{children}</I18nShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
