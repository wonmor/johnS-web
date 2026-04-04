"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tubeFont } from "../fonts";
import { COOKIE_LAW_SCOPE_COOKIE } from "../i18n/cookieLawRegion";
import { useI18n } from "../i18n/context";

export const COOKIE_CONSENT_STORAGE_KEY = "john-cookie-consent-v1";

const STATIC_MIRROR_ORIGIN = "https://static.johnseong.com";

function readCookieLawScopeRequired(): boolean {
  if (typeof document === "undefined") return false;
  const chunk = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_LAW_SCOPE_COOKIE}=`));
  if (!chunk) return false;
  const value = chunk.slice(COOKIE_LAW_SCOPE_COOKIE.length + 1);
  try {
    return decodeURIComponent(value) === "1";
  } catch {
    return value === "1";
  }
}

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

/** macOS-style sheet, light chrome; shown until dismissed (after locale offer if any). */
export function CookieConsentDialog() {
  const { t, locale, localeOfferActive } = useI18n();
  const pathname = usePathname() ?? "/";
  const cardBottom = bottomOffsetPx(pathname);
  const dimBottom = backdropBottom(pathname);
  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  const [visible, setVisible] = useState(false);
  const [scopeRequired, setScopeRequired] = useState(false);

  useLayoutEffect(() => {
    const sync = () => {
      const inScope = readCookieLawScopeRequired();
      setScopeRequired(inScope);
      if (!inScope) {
        setVisible(false);
        return;
      }
      try {
        const done =
          window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "1";
        setVisible(!done);
      } catch {
        setVisible(false);
      }
    };

    sync();
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
    };
  }, []);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  const showSheet =
    scopeRequired &&
    visible &&
    !localeOfferActive &&
    pathname !== "/privacy";

  useEffect(() => {
    if (!showSheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSheet, dismiss]);

  if (!showSheet) return null;

  return (
    <>
      <button
        type="button"
        aria-label={t("cookieConsent.closeOverlay")}
        className="fixed left-0 right-0 top-0 z-[46] cursor-default bg-transparent"
        style={{ bottom: dimBottom }}
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className={`pointer-events-auto fixed left-1/2 z-[47] w-[min(100%-1.5rem,28rem)] motion-reduce:animate-none animate-locale-offer-float overflow-hidden rounded-[10px] border border-black/[0.12] bg-[#ededed] shadow-[0_28px_90px_rgba(0,0,0,0.32),0_14px_40px_rgba(0,0,0,0.2),0_0_0_0.5px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] antialiased ${fontClass}`}
        style={{ bottom: cardBottom }}
      >
        <div className="relative flex h-8 select-none items-center border-b border-black/[0.06] bg-gradient-to-b from-[#fafafa] to-[#ececec] pt-px">
          <button
            type="button"
            aria-label={t("cookieConsent.closeOverlay")}
            onClick={dismiss}
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md hover:bg-black/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff]"
          >
            <span
              className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-[#d9362f] bg-[#ff5f57] shadow-[inset_0_-0.5px_1px_rgba(0,0,0,0.12)]"
              aria-hidden
            >
              <MacCloseIcon />
            </span>
          </button>
          <p className="w-full truncate px-12 text-center text-[11px] font-semibold text-[#4a4a4a]">
            {t("cookieConsent.barLabel")}
          </p>
        </div>

        <div className="bg-[#fbfbfb] px-4 pb-3.5 pt-3 sm:px-5 sm:pb-4 sm:pt-3.5">
          <p
            id="cookie-consent-title"
            className="text-center text-sm font-semibold tracking-[0.1em] text-[#1d1d1f] sm:text-base"
          >
            {t("cookieConsent.title")}
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-2 text-center text-[12px] leading-snug text-[#6e6e73] sm:mt-2 sm:text-[13px]"
          >
            {t("cookieConsent.bodyBefore")}
            <Link
              href="/privacy"
              className="font-semibold text-[#007aff] underline decoration-[#007aff]/40 underline-offset-[3px] transition hover:decoration-[#007aff]"
            >
              {t("privacy.title")}
            </Link>
            {t("cookieConsent.bodyAfter")}
          </p>
          <div className="mt-4 flex flex-col gap-1.5 sm:mt-4 sm:flex-row-reverse sm:justify-end sm:gap-2">
            <button
              type="button"
              onClick={dismiss}
              className="rounded-md border border-[#0051d0] bg-[#007aff] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[0_1px_0_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff] active:brightness-95 sm:min-w-[7rem] sm:text-[13px]"
            >
              {t("cookieConsent.accept")}
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.assign(STATIC_MIRROR_ORIGIN);
              }}
              className="rounded-md border border-black/[0.18] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#1d1d1f] shadow-[0_1px_0_rgba(0,0,0,0.06)] transition hover:bg-black/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007aff] active:bg-black/[0.07] sm:min-w-[7rem] sm:text-[13px]"
            >
              {t("cookieConsent.noToAll")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
