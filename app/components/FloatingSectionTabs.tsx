"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useChromeBackdropProbes } from "./ChromeBackdropProvider";
import { serifFont } from "../fonts";
import { useI18n } from "../i18n/context";
import type { MessageKey } from "../i18n/messages";

const SECTIONS: { id: string; labelKey: MessageKey }[] = [
  { id: "section-hero", labelKey: "navTab.hero" },
  { id: "section-atoms", labelKey: "navTab.atoms" },
  { id: "section-electron", labelKey: "navTab.electron" },
  { id: "section-face", labelKey: "navTab.face" },
  { id: "section-orch", labelKey: "navTab.orch" },
  { id: "section-fp", labelKey: "navTab.fp" },
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

/** Fade the bar out completely in the last ~20% of scroll range so the footer can breathe. */
function useHideTabBarNearDocumentBottom() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const MIN_EXTRA_SCROLL = 64;

    const tick = () => {
      const doc = document.documentElement;
      const scrollH = doc.scrollHeight;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollH <= vh + MIN_EXTRA_SCROLL) {
        setHidden((h) => (h ? false : h));
        return;
      }

      const distanceFromBottom = scrollH - (scrollY + vh);
      const fadeZone = Math.max(140, Math.min(300, Math.round(vh * 0.22)));
      const nextHidden = distanceFromBottom < fadeZone;
      setHidden((h) => (h === nextHidden ? h : nextHidden));
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return hidden;
}

export function FloatingSectionTabs() {
  const pathname = usePathname();
  const { t, locale, localeTransitionPhase } = useI18n();
  const { bottomUseLightChrome } = useChromeBackdropProbes();
  const { activeId, setActiveId } = useActiveSectionTab();
  const hiddenNearBottom = useHideTabBarNearDocumentBottom();
  const invert =
    localeTransitionPhase === "invert" && pathname === "/privacy";

  const fontClass =
    serifFont.className;

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
    ? "border-[0.5px] border-[#1c1a17]/15 bg-[#f5f0e6]/75 text-[#1c1a17] shadow-[0_10px_44px_rgba(28,26,23,0.12),inset_0_1px_0_rgba(255,255,255,0.75)]"
    : "border-[0.5px] border-white/[0.12] bg-[#060d20]/38 text-white shadow-[0_14px_48px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)]";

  const btnBase = `min-h-[2.75rem] shrink-0 rounded-full px-2.5 py-1.5 text-center text-[0.75rem] lowercase leading-snug transition-[background-color,color,opacity,font-weight] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-[0.875rem] ${fontClass}`;

  const btnLightIdle = `${btnBase} text-[#1c1a17]/70 hover:bg-[#1c1a17]/[0.06] hover:text-[#1c1a17] focus-visible:outline-[#1c1a17]/25 active:bg-[#1c1a17]/10`;
  const btnLightOn = `${btnBase} font-semibold text-[#1c1a17] shadow-[inset_0_0_0_1px_rgba(28,26,23,0.12)] bg-[#1c1a17]/[0.06] focus-visible:outline-[#1c1a17]/30`;

  const btnDarkIdle = `${btnBase} font-medium text-white/72 hover:bg-white/10 hover:text-white focus-visible:outline-white/35 active:bg-white/16`;
  const btnDarkOn = `${btnBase} font-bold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] bg-white/12 focus-visible:outline-white/40`;

  return (
    <nav
      aria-label={t("navTab.label")}
      aria-hidden={hiddenNearBottom}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 antialiased motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out ${
        hiddenNearBottom
          ? "translate-y-4 opacity-0 motion-reduce:translate-y-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        data-chrome-hit-skip
        className={`locale-tx-root flex max-w-full items-stretch gap-0.5 overflow-x-auto rounded-[2.25rem] border-solid px-1 py-1 backdrop-blur-2xl backdrop-saturate-[1.8] transition-[background,background-color,box-shadow,border-color,color] duration-300 ease-out [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:max-w-[min(100%,44rem)] sm:gap-1 sm:px-1.5 sm:py-1.5 ${hiddenNearBottom ? "pointer-events-none" : "pointer-events-auto"} ${pill} ${invert ? "locale-tx-root--invert" : ""}`}
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
