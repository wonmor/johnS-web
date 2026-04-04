"use client";

import { usePathname } from "next/navigation";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";

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
  target: "en" | "ko";
  onAccept: () => void;
  onDecline: () => void;
}) {
  const { t, locale } = useI18n();
  const pathname = usePathname() ?? "/";
  const cardBottom = bottomOffsetPx(pathname);
  const dimBottom = backdropBottom(pathname);
  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  return (
    <>
      <button
        type="button"
        aria-label={t("localeOffer.closeOverlay")}
        className="fixed left-0 right-0 top-0 z-[38] bg-[#020824]/50 motion-safe:transition-opacity"
        style={{ bottom: dimBottom }}
        onClick={onDecline}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="locale-offer-title"
        aria-describedby="locale-offer-desc"
        className={`pointer-events-auto fixed left-1/2 z-[45] w-[min(100%-1.5rem,28rem)] motion-reduce:animate-none animate-locale-offer-float overflow-hidden rounded-[10px] border border-black/[0.12] bg-[#ededed] shadow-[0_24px_70px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] antialiased ${fontClass}`}
        style={{ bottom: cardBottom }}
      >
        <div className="relative flex h-9 select-none items-center border-b border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#ececec] pt-px">
          <button
            type="button"
            aria-label={t("localeOffer.closeOverlay")}
            onClick={onDecline}
            className="absolute left-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md hover:bg-black/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff]"
          >
            <span
              className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#d9362f] bg-[#ff5f57] shadow-[inset_0_-0.5px_1px_rgba(0,0,0,0.12)]"
              aria-hidden
            >
              <MacCloseIcon />
            </span>
          </button>
          <p className="w-full truncate px-14 text-center text-xs font-semibold text-[#4a4a4a]">
            {t("langToggle.label")}
          </p>
        </div>

        <div className="bg-[#fbfbfb] px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p
            id="locale-offer-title"
            className="text-center text-base font-semibold tracking-[0.12em] text-[#1d1d1f] sm:text-lg"
          >
            {target === "en"
              ? t("localeOffer.titleEn")
              : t("localeOffer.titleKo")}
          </p>
          <p
            id="locale-offer-desc"
            className="mt-3 text-center text-[13px] leading-relaxed text-[#6e6e73] sm:mt-3.5 sm:text-[0.9375rem]"
          >
            {target === "en"
              ? t("localeOffer.bodyEn")
              : t("localeOffer.bodyKo")}
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:mt-7 sm:flex-row sm:justify-end sm:gap-2">
            <button
              type="button"
              onClick={onDecline}
              className="rounded-md border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-medium text-[#1d1d1f] shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:bg-[#f5f5f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff] sm:min-w-[7.5rem]"
            >
              {t("localeOffer.decline")}
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-md border border-[#0051d0] bg-[#007aff] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff] active:brightness-95 sm:min-w-[7.5rem]"
            >
              {t("localeOffer.accept")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
