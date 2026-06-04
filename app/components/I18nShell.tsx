"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { BodyContent } from "./BodyContent";
import { FloatingLocaleHeader } from "./FloatingLocaleHeader";

const IBM_PLEX_SANS_KR_LINK_ID = "font-ibm-plex-sans-kr-css";
const IBM_PLEX_SANS_KR_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap";

export function I18nShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, localeTransitionPhase, privacyEntranceInvert } = useI18n();

  useEffect(() => {
    const needIbm = locale === "ko" || pathname === "/privacy";
    if (!needIbm) return;
    if (document.getElementById(IBM_PLEX_SANS_KR_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = IBM_PLEX_SANS_KR_LINK_ID;
    link.rel = "stylesheet";
    link.href = IBM_PLEX_SANS_KR_HREF;
    document.head.appendChild(link);
  }, [locale, pathname]);

  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  const txClass =
    pathname === "/privacy" &&
    (localeTransitionPhase === "invert" || privacyEntranceInvert)
      ? "locale-tx-root--invert"
      : "";

  return (
    <>
      <FloatingLocaleHeader />
      <div
        className={`locale-tx-root ${fontClass} ${txClass} flex min-h-screen flex-col bg-[#020824] text-white antialiased`}
      >
        <BodyContent>{children}</BodyContent>
      </div>
    </>
  );
}
