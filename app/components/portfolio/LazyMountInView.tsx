"use client";

import type { ReactNode } from "react";
import { useLazyInView } from "../../hooks/useLazyInView";

export function LazyMountInView({
  children,
  fallback,
  unlock,
  rootMargin,
  className,
  style,
}: {
  children: ReactNode;
  fallback: ReactNode;
  unlock?: boolean;
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, show } = useLazyInView({ unlock, rootMargin });
  return (
    <div ref={ref} className={className} style={style}>
      {show ? children : fallback}
    </div>
  );
}
