"use client";

import React from "react";

const BADGE_BASE =
  "inline-flex h-[52px] items-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 transition-colors hover:border-white/40";

/**
 * Locally rendered App Store badge. Replaces the remotely hosted PNG badges the
 * page used to pull from GitHub, so every store link shares one look and no
 * layout shift waits on a third-party image.
 */
export function AppStoreBadge({
  href,
  ariaLabel,
  className,
}: {
  href: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${BADGE_BASE} ${className ?? ""}`}
    >
      <svg aria-hidden viewBox="0 0 384 512" className="h-6 w-6 fill-white">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-wide text-white/70">
          Download on the
        </span>
        <span className="mt-0.5 text-base font-semibold text-white">
          App Store
        </span>
      </span>
    </a>
  );
}

export function GooglePlayBadge({
  href,
  ariaLabel,
  className,
}: {
  href: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${BADGE_BASE} ${className ?? ""}`}
    >
      <svg aria-hidden viewBox="0 0 512 512" className="h-[22px] w-[22px]">
        <path
          fill="#00d3ff"
          d="M48 59.5C45 63 43.3 68.4 43.3 75.4v361.2c0 7 1.7 12.4 4.7 15.9l1.2 1.2 202.4-202.4v-4.8L49.2 58.3z"
        />
        <path
          fill="#ffce00"
          d="M319 327.6l-67.4-67.5v-4.8l67.5-67.5 1.5.9 79.9 45.4c22.8 13 22.8 34.2 0 47.2l-79.9 45.4z"
        />
        <path
          fill="#ff3d00"
          d="M320.5 326.7L251.6 257.8 48 461.4c7.5 7.9 19.9 8.9 33.9 1L320.5 326.7"
        />
        <path
          fill="#00e676"
          d="M320.5 188.9L81.9 53.7C67.9 45.7 55.5 46.8 48 54.7l203.6 203.1z"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-wide text-white/70">
          Get it on
        </span>
        <span className="mt-0.5 text-base font-semibold text-white">
          Google Play
        </span>
      </span>
    </a>
  );
}
