"use client";

import { useI18n } from "../i18n/context";
import type { Locale, MessageKey } from "../i18n/messages";

const locales: Locale[] = ["en", "fr", "ko"];

const toggleLabelKey: Record<Locale, MessageKey> = {
  en: "langToggle.en",
  fr: "langToggle.fr",
  ko: "langToggle.ko",
};

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="inline-flex max-w-[100vw] flex-wrap items-center justify-center gap-0.5 rounded-md border border-white/20 bg-black/30 p-0.5"
      role="group"
      aria-label={t("langToggle.label")}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded px-1.5 py-0.5 text-[9px] font-medium tracking-wider transition sm:px-2 sm:text-[10px] ${
            locale === code
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white"
          }`}
          aria-pressed={locale === code}
        >
          {t(toggleLabelKey[code])}
        </button>
      ))}
    </div>
  );
}
