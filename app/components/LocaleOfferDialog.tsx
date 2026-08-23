"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { serifFont } from "../fonts";
import type { Locale, MessageKey } from "../i18n/messages";
import { messages } from "../i18n/messages";

/** Space above viewport bottom: tab bar (~) + gap, or modest inset when tabs are hidden */
function bottomOffsetPx(pathname: string): string {
  if (pathname === "/") {
    return "calc(5rem + env(safe-area-inset-bottom, 0px))";
  }
  return "max(1.25rem, env(safe-area-inset-bottom, 0px))";
}

function backdropBottom(pathname: string): string {
  if (pathname === "/") {
    return "calc(4.35rem + env(safe-area-inset-bottom, 0px))";
  }
  return "0px";
}

function translateForLocale(locale: Locale, key: MessageKey): string {
  const table = messages[locale];
  return String(table[key] ?? messages.en[key] ?? key);
}

function MacCloseIcon() {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 12 12"
      fill="none"
      className="text-[#4b0c0c]"
      aria-hidden
    >
      <path
        d="M3 3l6 6M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LocaleOfferDialog({
  target,
  onAccept,
  onDecline,
}: {
  target: Locale;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const cardBottom = bottomOffsetPx(pathname);
  const dimBottom = backdropBottom(pathname);
  const mt = useMemo(
    () => (key: MessageKey) => translateForLocale(target, key),
    [target]
  );
  const fontClass = serifFont.className;

  const titleKey: MessageKey =
    target === "en" ? "localeOffer.titleEn" : "localeOffer.titleFr";
  const bodyKey: MessageKey =
    target === "en" ? "localeOffer.bodyEn" : "localeOffer.bodyFr";

  return (
    <>
      <button
        type="button"
        aria-label={mt("localeOffer.closeOverlay")}
        className="fixed left-0 right-0 top-0 z-[38] cursor-default bg-transparent motion-safe:transition-opacity"
        style={{ bottom: dimBottom }}
        onClick={onDecline}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="locale-offer-title"
        aria-describedby="locale-offer-desc"
        className={`pointer-events-auto fixed left-1/2 z-[45] w-[min(100%-1.5rem,28rem)] motion-reduce:animate-none animate-locale-offer-float overflow-hidden rounded-[10px] border border-white/[0.12] bg-[#2c2c2e] shadow-[0_28px_90px_rgba(0,0,0,0.55),0_14px_40px_rgba(0,0,0,0.35),0_0_0_0.5px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] antialiased ${fontClass}`}
        style={{ bottom: cardBottom }}
      >
        <div className="relative flex h-8 select-none items-center border-b border-white/[0.08] bg-gradient-to-b from-[#3d3d3f] to-[#2e2e30] pt-px">
          <button
            type="button"
            aria-label={mt("localeOffer.closeOverlay")}
            onClick={onDecline}
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a84ff]"
          >
            <span
              className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#d9362f] bg-[#ff5f57] shadow-[inset_0_-0.5px_1px_rgba(0,0,0,0.12)]"
              aria-hidden
            >
              <MacCloseIcon />
            </span>
          </button>
          <p className="w-full truncate px-12 text-center text-[11px] font-semibold text-[#d1d1d6]">
            {mt("langToggle.label")}
          </p>
        </div>

        <div className="bg-[#242426] px-4 pb-3.5 pt-3 sm:px-5 sm:pb-4 sm:pt-3.5">
          <p
            id="locale-offer-title"
            className="text-center text-sm font-semibold tracking-[0.1em] text-[#f5f5f7] sm:text-base"
          >
            {mt(titleKey)}
          </p>
          <p
            id="locale-offer-desc"
            className="mt-2 text-center text-[12px] leading-snug text-[#aeaeb2] sm:mt-2 sm:text-[13px]"
          >
            {mt(bodyKey)}
          </p>
          <div className="mt-4 flex flex-col-reverse gap-1.5 sm:mt-4 sm:flex-row sm:justify-end sm:gap-2">
            <button
              type="button"
              onClick={onDecline}
              className="rounded-md border border-white/[0.18] bg-white/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-[#e8e8ed] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a84ff] sm:min-w-[7rem] sm:text-[13px]"
            >
              {mt("localeOffer.decline")}
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-md border border-[#007aff] bg-[#007aff] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_1px_0_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a84ff] active:brightness-95 sm:min-w-[7rem] sm:text-[13px]"
            >
              {mt("localeOffer.accept")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
