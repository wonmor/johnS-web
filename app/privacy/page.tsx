"use client";

import Link from "next/link";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { messages } from "../i18n/messages";

const SECTION_IDS = { en: "privacy-en", fr: "privacy-fr", ko: "privacy-ko" } as const;

export default function PrivacyPolicyPage() {
  const { t } = useI18n();

  return (
    <div
      className={`${tubeFont.className} bg-[#020824] px-6 py-10 text-white antialiased sm:px-10 sm:py-14`}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-white/65 transition hover:text-white"
        >
          {t("privacy.backHome")}
        </Link>

        <h1 className="mb-3 text-2xl font-light uppercase tracking-[0.12em] sm:text-3xl sm:tracking-[0.14em]">
          {t("privacy.title")}
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-white/70">
          {t("privacy.allVersions")}
        </p>

        <nav
          aria-label="Policy languages"
          className="mb-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/10 pb-6 text-sm"
        >
          <a
            href={`#${SECTION_IDS.en}`}
            className="rounded-sm text-white/85 ring-offset-[#020824] transition hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/40"
          >
            English
          </a>
          <span className="text-white/25" aria-hidden>
            ·
          </span>
          <a
            href={`#${SECTION_IDS.fr}`}
            className="rounded-sm text-white/85 ring-offset-[#020824] transition hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Français
          </a>
          <span className="text-white/25" aria-hidden>
            ·
          </span>
          <a
            href={`#${SECTION_IDS.ko}`}
            className="rounded-sm text-white/85 ring-offset-[#020824] transition hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span className="font-ibm-plex-sans-kr">한국어</span>
          </a>
        </nav>

        <section id={SECTION_IDS.en} className="mb-20 scroll-mt-28">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
            English — {messages.en["privacy.title"]}
          </h2>
          <p className="text-[15px] leading-[1.65] text-white/82 sm:text-base">
            {messages.en["privacy.body"]}
          </p>
        </section>

        <section id={SECTION_IDS.fr} className="mb-20 scroll-mt-28">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
            Français — {messages.fr["privacy.title"]}
          </h2>
          <p className="text-[15px] leading-[1.65] text-white/82 sm:text-base">
            {messages.fr["privacy.body"]}
          </p>
        </section>

        <section
          id={SECTION_IDS.ko}
          className="font-ibm-plex-sans-kr scroll-mt-28 pb-12"
        >
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
            한국어 — {messages.ko["privacy.title"]}
          </h2>
          <p className="text-[15px] leading-[1.65] text-white/82 sm:text-base">
            {messages.ko["privacy.body"]}
          </p>
        </section>

        <div className="border-t border-white/10 pt-10">
          <a
            href="https://github.com/wonmor/johnS-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("privacy.githubAria")}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90 ring-offset-[#020824] transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <svg
              className="h-[1.1em] w-[1.1em] shrink-0 opacity-90"
              viewBox="0 0 98 96"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.294 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.23-5.378-22.23-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
            {t("privacy.github")}
          </a>
        </div>

        <div className="pt-20 pb-10 sm:pt-28 sm:pb-14">
          <Link
            href="/"
            className="inline-block text-sm text-white/65 transition hover:text-white"
          >
            {t("privacy.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
