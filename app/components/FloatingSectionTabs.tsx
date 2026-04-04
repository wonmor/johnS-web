"use client";

import { useCallback } from "react";
import { useChromeBackdropProbes } from "./ChromeBackdropProvider";
import { useI18n } from "../i18n/context";
import type { MessageKey } from "../i18n/messages";

const SECTIONS: { id: string; labelKey: MessageKey }[] = [
  { id: "section-hero", labelKey: "navTab.hero" },
  { id: "section-atoms", labelKey: "navTab.atoms" },
  { id: "section-electron", labelKey: "navTab.electron" },
  { id: "section-face", labelKey: "navTab.face" },
  { id: "section-orch", labelKey: "navTab.orch" },
  { id: "section-exp", labelKey: "navTab.exp" },
  { id: "section-edu", labelKey: "navTab.edu" },
];

export function FloatingSectionTabs() {
  const { t, localeTransitionPhase } = useI18n();
  const { bottomUseLightChrome } = useChromeBackdropProbes();
  const invert = localeTransitionPhase === "invert";

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, []);

  const pill = bottomUseLightChrome
    ? "border-black/12 bg-white/76 shadow-[0_12px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.85)]"
    : "border-white/14 bg-[#060d20]/52 shadow-[0_12px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)]";

  const btnBase =
    "min-h-[2.75rem] shrink-0 rounded-full px-2.5 py-1.5 text-center text-[0.65rem] font-semibold leading-snug tracking-tight transition-[background-color,color,opacity] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[0.8125rem]";

  const btn = bottomUseLightChrome
    ? `${btnBase} text-[#0c1220]/92 hover:bg-black/[0.07] hover:text-[#020824] focus-visible:outline-black/25 active:bg-black/10`
    : `${btnBase} text-white/92 hover:bg-white/12 hover:text-white focus-visible:outline-white/35 active:bg-white/16`;

  return (
    <nav
      aria-label={t("navTab.label")}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2"
    >
      <div
        className={`locale-tx-root pointer-events-auto flex max-w-full items-stretch gap-0.5 overflow-x-auto rounded-[2.25rem] px-1 py-1 backdrop-blur-2xl backdrop-saturate-[1.65] transition-[background,background-color,box-shadow,border-color] duration-300 ease-out [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:max-w-[min(100%,44rem)] sm:gap-1 sm:px-1.5 sm:py-1.5 ${pill} ${invert ? "locale-tx-root--invert" : ""}`}
      >
        {SECTIONS.map(({ id, labelKey }) => (
          <button key={id} type="button" onClick={() => scrollTo(id)} className={btn}>
            {t(labelKey)}
          </button>
        ))}
      </div>
    </nav>
  );
}
