"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ChromeSurface = "light" | "dark";

function surfaceAtPoint(x: number, y: number): ChromeSurface {
  const el = document.elementFromPoint(x, y);
  if (!el) return "dark";
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const attr = node.getAttribute("data-chrome-surface");
    if (attr === "light") return "light";
    if (attr === "dark") return "dark";
    node = node.parentElement;
  }
  return "dark";
}

type ChromeCtx = {
  topSurface: ChromeSurface;
  bottomSurface: ChromeSurface;
  topUseLightChrome: boolean;
  bottomUseLightChrome: boolean;
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

  useEffect(() => {
    let raf = 0;
    const sample = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = Math.min(w - 4, Math.max(4, w / 2));
      const yTop = Math.min(72, Math.max(8, h * 0.06));
      const yBottom = Math.max(h - 56, h * 0.88);
      setTopSurface(surfaceAtPoint(x, yTop));
      setBottomSurface(surfaceAtPoint(x, yBottom));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const value = useMemo(
    (): ChromeCtx => ({
      topSurface,
      bottomSurface,
      topUseLightChrome: topSurface === "dark",
      bottomUseLightChrome: bottomSurface === "dark",
    }),
    [topSurface, bottomSurface]
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
      bottomUseLightChrome: true,
    };
  }
  return ctx;
}
