"use client";

import { useCallback, useEffect, useState } from "react";
import { useChromeBackdropProbes } from "./ChromeBackdropProvider";
import { tubeFont } from "../fonts";
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

/** Scroll spy only: which section is active in the tab bar. */
function useActiveSectionTab() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const tick = () => {
      const h = window.innerHeight;

      const line =
        window.scrollY + Math.min(130, Math.max(48, h * 0.18));
      let best = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top - 20 <= line) best = id;
      }
      setActiveId((prev) => (prev === best ? prev : best));
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return { activeId, setActiveId };
}

export function FloatingSectionTabs() {
  const { t, locale, localeTransitionPhase } = useI18n();
  const { bottomUseLightChrome } = useChromeBackdropProbes();
  const { activeId, setActiveId } = useActiveSectionTab();
  const invert = localeTransitionPhase === "invert";

  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  const scrollTo = useCallback(
    (id: string) => {
      setActiveId(id);
      document.getElementById(id)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    },
    [setActiveId]
  );

  const pill = bottomUseLightChrome
    ? "border-[0.5px] border-black/[0.08] bg-white/48 text-[#0c1220] shadow-[0_10px_44px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,0.92)]"
    : "border-[0.5px] border-white/[0.12] bg-[#060d20]/38 text-white shadow-[0_14px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)]";

  const btnBase = `min-h-[2.75rem] shrink-0 rounded-full px-2.5 py-1.5 text-center text-[0.65rem] leading-snug tracking-tight transition-[background-color,color,opacity,font-weight] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[0.8125rem] ${fontClass}`;

  const btnLightIdle = `${btnBase} font-medium text-[#0c1220]/50 hover:bg-black/[0.06] hover:text-[#0c1220]/85 focus-visible:outline-black/25 active:bg-black/10`;
  const btnLightOn = `${btnBase} font-bold text-[#020824] shadow-[inset_0_0_0_1px_rgba(12,18,32,0.12)] bg-black/[0.06] focus-visible:outline-black/30`;

  const btnDarkIdle = `${btnBase} font-medium text-white/50 hover:bg-white/10 hover:text-white/90 focus-visible:outline-white/35 active:bg-white/16`;
  const btnDarkOn = `${btnBase} font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] bg-white/12 focus-visible:outline-white/40`;

  return (
    <nav
      aria-label={t("navTab.label")}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 antialiased"
    >
      <div
        data-chrome-hit-skip
        className={`locale-tx-root pointer-events-auto flex max-w-full items-stretch gap-0.5 overflow-x-auto rounded-[2.25rem] border-solid px-1 py-1 backdrop-blur-2xl backdrop-saturate-[1.8] transition-[background,background-color,box-shadow,border-color,color] duration-300 ease-out [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:max-w-[min(100%,44rem)] sm:gap-1 sm:px-1.5 sm:py-1.5 ${pill} ${invert ? "locale-tx-root--invert" : ""}`}
      >
        {SECTIONS.map(({ id, labelKey }) => {
          const on = activeId === id;
          const cls = bottomUseLightChrome
            ? on
              ? btnLightOn
              : btnLightIdle
            : on
              ? btnDarkOn
              : btnDarkIdle;
          return (
            <button
              key={id}
              type="button"
              aria-current={on ? "true" : undefined}
              onClick={() => scrollTo(id)}
              className={cls}
            >
              {t(labelKey)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
