"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ChromeSurface = "light" | "dark";

/** Elements marked with this are ignored so we sample the page behind fixed chrome. */
const CHROME_HIT_SKIP = "[data-chrome-hit-skip]";

function isProbeDecorHit(el: Element): boolean {
  const tag = el.tagName;
  if (tag === "CANVAS" || tag === "VIDEO" || tag === "IFRAME") return true;
  return el.closest("[data-chrome-probe-skip]") !== null;
}

function surfaceAtPoint(x: number, y: number): ChromeSurface {
  const stack = document.elementsFromPoint(x, y);
  for (const hit of stack) {
    if (!(hit instanceof Element)) continue;
    if (hit.closest(CHROME_HIT_SKIP)) continue;
    if (isProbeDecorHit(hit)) continue;
    let node: Element | null = hit;
    while (node && node !== document.documentElement) {
      const attr = node.getAttribute("data-chrome-surface");
      if (attr === "light") return "light";
      if (attr === "dark") return "dark";
      node = node.parentElement;
    }
  }
  return "dark";
}

type ChromeCtx = {
  topSurface: ChromeSurface;
  bottomSurface: ChromeSurface;
  topUseLightChrome: boolean;
  /** True → frosted light pill (for light cream backdrops). False → dark glass (navy areas). */
  bottomUseLightChrome: boolean;
  /**
   * True when `data-chrome-surface` resolves to dark at that band (20% / 50% / 80% width).
   * Tab labels use white text when true, dark text when false.
   */
  bottomTabBackdropIsDark: readonly [boolean, boolean, boolean];
};

const ChromeBackdropContext = createContext<ChromeCtx | null>(null);

export function ChromeBackdropProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [topSurface, setTopSurface] = useState<ChromeSurface>("light");
  const [bottomSurface, setBottomSurface] =
    useState<ChromeSurface>("dark");
  const [bottomBand, setBottomBand] = useState<
    readonly [ChromeSurface, ChromeSurface, ChromeSurface]
  >(["dark", "dark", "dark"]);

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const clampX = (xn: number) => Math.min(w - 4, Math.max(4, xn));
      const xMid = clampX(w / 2);
      const yTop = Math.min(72, Math.max(8, h * 0.06));
      // One strip immediately above the floating tab bar (not ~78vh, which often still
      // hits navy body while the cream footer fills the lower viewport).
      const TAB_STACK_RESERVE = 118;
      const yBottom = Math.max(16, h - TAB_STACK_RESERVE);
      setTopSurface(surfaceAtPoint(xMid, yTop));
      const left = surfaceAtPoint(clampX(w * 0.2), yBottom);
      const center = surfaceAtPoint(xMid, yBottom);
      const right = surfaceAtPoint(clampX(w * 0.8), yBottom);
      setBottomSurface(center);
      setBottomBand([left, center, right]);
    };

    const onScroll = () => {
      sample();
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const value = useMemo(
    (): ChromeCtx => ({
      topSurface,
      bottomSurface,
      topUseLightChrome: topSurface === "dark",
      bottomUseLightChrome: bottomSurface === "light",
      bottomTabBackdropIsDark: [
        bottomBand[0] === "dark",
        bottomBand[1] === "dark",
        bottomBand[2] === "dark",
      ] as const,
    }),
    [topSurface, bottomSurface, bottomBand]
  );

  return (
    <ChromeBackdropContext.Provider value={value}>
      {children}
    </ChromeBackdropContext.Provider>
  );
}

export function useChromeBackdropProbes(): ChromeCtx {
  const ctx = useContext(ChromeBackdropContext);
  if (!ctx) {
    return {
      topSurface: "dark",
      bottomSurface: "dark",
      topUseLightChrome: true,
      bottomUseLightChrome: false,
      bottomTabBackdropIsDark: [true, true, true] as const,
    };
  }
  return ctx;
}
