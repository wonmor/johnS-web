"use client";

import { useEffect } from "react";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { BodyContent } from "./BodyContent";

const IBM_PLEX_SANS_KR_LINK_ID = "font-ibm-plex-sans-kr-css";
const IBM_PLEX_SANS_KR_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap";

export function I18nShell({ children }: { children: React.ReactNode }) {
  const { locale, localeTransitionPhase } = useI18n();

  useEffect(() => {
    if (locale !== "ko") return;
    if (document.getElementById(IBM_PLEX_SANS_KR_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = IBM_PLEX_SANS_KR_LINK_ID;
    link.rel = "stylesheet";
    link.href = IBM_PLEX_SANS_KR_HREF;
    document.head.appendChild(link);
  }, [locale]);

  const fontClass =
    locale === "ko" ? "font-ibm-plex-sans-kr" : tubeFont.className;

  const txClass =
    localeTransitionPhase === "fade-out"
      ? "locale-tx-root--fade-out"
      : localeTransitionPhase === "invert"
        ? "locale-tx-root--invert"
        : localeTransitionPhase === "fade-in"
          ? "locale-tx-root--fade-in"
          : "";

  return (
    <div
      className={`locale-tx-root ${fontClass} ${txClass} flex min-h-screen flex-col bg-[#020824] pt-6 text-white antialiased`}
    >
      <BodyContent>{children}</BodyContent>
    </div>
  );
}
