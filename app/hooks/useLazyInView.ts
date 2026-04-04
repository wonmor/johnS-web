"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Expand the root bounding box (e.g. preload before scroll) */
  rootMargin?: string;
  /** When true, mount immediately (e.g. user opened this tab). */
  unlock?: boolean;
};

/**
 * Mount children only after the placeholder intersects the viewport once,
 * or when `unlock` becomes true (whichever comes first).
 */
export function useLazyInView({ rootMargin = "180px 0px 240px 0px", unlock }: Options) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(!!unlock);

  useEffect(() => {
    if (unlock) setShow(true);
  }, [unlock]);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [show, rootMargin]);

  return { ref, show };
}
