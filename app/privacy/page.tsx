"use client";

import Link from "next/link";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { messages } from "../i18n/messages";

const SECTION_IDS = { en: "privacy-en", fr: "privacy-fr", ko: "privacy-ko" } as const;

export default function PrivacyPolicyPage() {
  const { t, locale } = useI18n();
  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  return (
    <div
      className={`${fontClass} bg-[#020824] px-6 py-10 text-white antialiased sm:px-10 sm:py-14`}
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
            한국어
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

        <section id={SECTION_IDS.ko} className="scroll-mt-28 pb-12">
          <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
            한국어 — {messages.ko["privacy.title"]}
          </h2>
          <p className="text-[15px] leading-[1.65] text-white/82 sm:text-base">
            {messages.ko["privacy.body"]}
          </p>
        </section>
      </div>
    </div>
  );
}
