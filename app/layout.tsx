import Head from "next/head";
import { cookies } from "next/headers";
import React from "react";
import { ChromeBackdropProvider } from "./components/ChromeBackdropProvider";
import { LanguageProvider } from "./i18n/context";
import { I18nShell } from "./components/I18nShell";
import {
  DEFAULT_LOCALE,
  LOCALE_HINT_COOKIE,
  parseLocaleCookieValue,
} from "./i18n/localeDetect";
import { messages } from "./i18n/messages";
import "./globals.css";

export const metadata = {
  title: messages.fr["meta.title"],
  description: messages.fr["meta.description"],
};

function htmlLangFromLocale(locale: "en" | "fr" | "ko"): string {
  if (locale === "fr") return "fr";
  if (locale === "ko") return "ko";
  return "en";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverHint = parseLocaleCookieValue(
    cookies().get(LOCALE_HINT_COOKIE)?.value
  );
  const htmlLang = htmlLangFromLocale(serverHint ?? DEFAULT_LOCALE);

  return (
    <html lang={htmlLang}>
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>

      <body className="min-h-screen">
        <LanguageProvider serverHint={serverHint}>
          <ChromeBackdropProvider>
            <I18nShell>{children}</I18nShell>
          </ChromeBackdropProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
