"use client";

import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "../i18n/context";

/** Outside `locale-tx-root` so `position: fixed` stays viewport-anchored while scrolling (and during invert). */
export function FloatingLocaleHeader() {
  const { t, localeTransitionPhase } = useI18n();
  const year = new Date().getFullYear();
  const invert = localeTransitionPhase === "invert";

  return (
    <div
      className={`locale-tx-root fixed left-1/2 top-3 z-50 flex max-w-[calc(100vw-1.25rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-white/15 bg-[#020824]/92 px-4 py-2 shadow-xl shadow-black/45 backdrop-blur-md sm:top-4 sm:gap-x-3 sm:px-5 sm:py-2 ${invert ? "locale-tx-root--invert" : ""}`}
    >
      <p className="text-center text-xs uppercase leading-tight tracking-[0.18em] text-gray-300 sm:text-sm sm:tracking-[0.2em]">
        {t("topBar.copyright", { year })}
      </p>
      <div className="flex shrink-0 items-center">
        <LanguageToggle />
      </div>
    </div>
  );
}
