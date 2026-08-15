"use client";

import { usePathname } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { useChromeBackdropProbes } from "./ChromeBackdropProvider";
import { useI18n } from "../i18n/context";

/** Outside `locale-tx-root` so `position: fixed` stays viewport-anchored while scrolling (and during invert). */
export function FloatingLocaleHeader() {
  const pathname = usePathname();
  const { t, localeTransitionPhase, privacyEntranceInvert } = useI18n();
  const { topUseLightChrome } = useChromeBackdropProbes();
  const year = new Date().getFullYear();
  const invert =
    pathname === "/privacy" &&
    (localeTransitionPhase === "invert" || privacyEntranceInvert);

  const chrome = topUseLightChrome
    ? "border-[#1c1a17]/12 bg-[#f5f0e6]/80 text-[#1c1a17] shadow-lg shadow-[#1c1a17]/10 backdrop-blur-md"
    : "border-white/22 bg-gradient-to-b from-[#010613] from-0% via-[#050b22] via-45% to-[#0d1733] to-100% text-white shadow-black/45 shadow-xl backdrop-blur-md";

  const copyrightMuted = topUseLightChrome
    ? "text-[#1c1a17]/55"
    : "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]";

  /* Same compact mobile sizing previously used for French — all locales for consistency */
  const copyrightSize =
    "text-[0.625rem] tracking-[0.14em] sm:text-sm sm:tracking-[0.2em]";

  return (
    <div
      data-chrome-hit-skip
      className={`locale-tx-root fixed left-1/2 top-3 z-50 flex max-w-[calc(100vw-1.25rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl px-4 py-2 transition-[background,background-image,box-shadow,border-color,color] duration-300 ease-out sm:top-4 sm:gap-x-3 sm:px-5 sm:py-2 ${chrome} ${invert ? "locale-tx-root--invert" : ""}`}
    >
      {pathname !== "/privacy" ? (
        <p
          className={`text-center lowercase leading-tight ${copyrightSize} ${copyrightMuted}`}
        >
          {t("topBar.copyright", { year })}
        </p>
      ) : null}
      <div className="flex shrink-0 items-center">
        <LanguageToggle lightChrome={topUseLightChrome} />
      </div>
    </div>
  );
}
