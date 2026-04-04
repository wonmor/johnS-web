"use client";

import { useI18n } from "../i18n/context";
import type { Locale, MessageKey } from "../i18n/messages";

const locales: Locale[] = ["en", "fr", "ko"];

const toggleLabelKey: Record<Locale, MessageKey> = {
  en: "langToggle.en",
  fr: "langToggle.fr",
  ko: "langToggle.ko",
};

export function LanguageToggle({
  lightChrome = false,
}: {
  /** Sitting on light frosted chrome (dark page behind) — higher contrast controls. */
  lightChrome?: boolean;
}) {
  const { locale, setLocale, t, localeTransitionPhase } = useI18n();
  const isTransitioning = localeTransitionPhase !== "idle";

  const shell = lightChrome
    ? "border-black/15 bg-black/[0.06]"
    : "border-white/35 bg-white/10";

  return (
    <div
      className={`inline-flex max-w-[100vw] flex-wrap items-center justify-center gap-0.5 rounded-md border p-0.5 sm:gap-1 sm:p-1 ${shell} ${
        isTransitioning ? "pointer-events-none opacity-70" : ""
      }`}
      role="group"
      aria-label={t("langToggle.label")}
      aria-busy={isTransitioning}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          disabled={isTransitioning}
          onClick={() => setLocale(code)}
          className={`rounded px-2 py-0.5 text-xs font-medium leading-none tracking-wider transition sm:px-2.5 sm:py-1 sm:text-sm ${
            locale === code
              ? lightChrome
                ? "bg-[#020824] text-white"
                : "bg-white text-black"
              : lightChrome
                ? "text-gray-600 hover:text-gray-900"
                : "text-white/85 hover:bg-white/15 hover:text-white"
          } ${isTransitioning ? "cursor-wait" : ""}`}
          aria-pressed={locale === code}
        >
          {t(toggleLabelKey[code])}
        </button>
      ))}
    </div>
  );
}
