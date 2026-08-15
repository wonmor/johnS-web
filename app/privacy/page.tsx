"use client";

import Link from "next/link";
import { Fragment, useMemo } from "react";
import { serifFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { type Locale, messages } from "../i18n/messages";

const SECTION_IDS: Record<Locale, string> = {
  en: "privacy-en",
  fr: "privacy-fr",
  ko: "privacy-ko",
};

const ALL_LOCALES: Locale[] = ["en", "fr", "ko"];

function privacyLocalesOrder(current: Locale): Locale[] {
  return [current, ...ALL_LOCALES.filter((l) => l !== current)];
}

function navAnchorLabel(loc: Locale) {
  switch (loc) {
    case "en":
      return "English";
    case "fr":
      return "Français";
    case "ko":
      return (
        <span className="font-ko-serif" lang="ko">
          한국어
        </span>
      );
    default: {
      const _x: never = loc;
      return _x;
    }
  }
}

function sectionHeading(loc: Locale) {
  const title = messages[loc]["privacy.title"];
  switch (loc) {
    case "en":
      return (
        <>
          English — {title}
        </>
      );
    case "fr":
      return (
        <>
          Français — {title}
        </>
      );
    case "ko":
      return (
        <span className="font-ko-serif" lang="ko">
          한국어 — {title}
        </span>
      );
    default: {
      const _x: never = loc;
      return _x;
    }
  }
}

const navLinkClass =
  "rounded-sm text-[#1c1a17]/80 transition hover:text-[#1c1a17] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#1c1a17]/30";

export default function PrivacyPolicyPage() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  const localeOrder = useMemo(() => privacyLocalesOrder(locale), [locale]);

  return (
    <div
      className={`${serifFont.className} bg-[#f5f0e6] px-6 py-10 text-[#1c1a17] antialiased sm:px-10 sm:py-14`}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[#1c1a17]/60 transition hover:text-[#1c1a17]"
        >
          {t("privacy.backHome")}
        </Link>

        <h1 className="mb-3 text-3xl font-light lowercase tracking-tight sm:text-4xl">
          {t("privacy.title")}
        </h1>
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-[#1c1a17]/65">
          {t("privacy.allVersions")}
        </p>

        <nav
          aria-label="Policy languages"
          className="mb-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[#1c1a17]/12 pb-6 text-sm"
        >
          {localeOrder.map((loc, idx) => (
            <Fragment key={loc}>
              {idx > 0 ? (
                <span className="text-[#1c1a17]/25" aria-hidden>
                  ·
                </span>
              ) : null}
              <a href={`#${SECTION_IDS[loc]}`} className={navLinkClass}>
                {navAnchorLabel(loc)}
              </a>
            </Fragment>
          ))}
        </nav>

        {localeOrder.map((loc) => (
          <section
            key={loc}
            id={SECTION_IDS[loc]}
            className={`mb-20 scroll-mt-28${loc === "ko" ? " font-ko-serif" : ""}`}
            lang={loc === "ko" ? "ko" : loc === "fr" ? "fr" : "en"}
          >
            <h2 className="mb-5 text-sm lowercase text-[#1c1a17]/60">
              {sectionHeading(loc)}
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#1c1a17]/85 sm:text-base">
              {messages[loc]["privacy.body"]}
            </p>
          </section>
        ))}

        <div className="border-t border-[#1c1a17]/12 pt-10">
          <a
            href="https://github.com/wonmor/johnS-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("privacy.githubAria")}
            className="inline-flex items-center gap-2 rounded-md border border-[#1c1a17]/20 px-4 py-2.5 text-sm lowercase text-[#1c1a17]/80 transition hover:bg-[#1c1a17]/[0.05] hover:text-[#1c1a17] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#1c1a17]/30"
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

        <div className="pt-20 sm:pt-28">
          <Link
            href="/"
            className="inline-block text-sm text-[#1c1a17]/60 transition hover:text-[#1c1a17]"
          >
            {t("privacy.backHome")}
          </Link>
        </div>

        <footer
          className={`mt-12 border-t border-[#1c1a17]/12 pt-10 pb-10 text-center sm:mt-14 sm:pb-14 ${locale === "ko" ? "font-ko-serif" : ""}`}
          aria-label="Copyright"
        >
          <p
            className="text-xs leading-tight tracking-[0.12em] text-[#1c1a17]/50 sm:text-sm"
          >
            {t("topBar.copyright", { year })}
          </p>
        </footer>
      </div>
    </div>
  );
}
