"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { serifFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { BodyContent } from "./BodyContent";
import { FloatingLocaleHeader } from "./FloatingLocaleHeader";

const KO_SERIF_LINK_ID = "font-ko-serif-css";
const KO_SERIF_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&display=swap";

export function I18nShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale, localeTransitionPhase, privacyEntranceInvert } = useI18n();

  useEffect(() => {
    const needKoSerif = locale === "ko" || pathname === "/privacy";
    if (!needKoSerif) return;
    if (document.getElementById(KO_SERIF_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = KO_SERIF_LINK_ID;
    link.rel = "stylesheet";
    link.href = KO_SERIF_HREF;
    document.head.appendChild(link);
  }, [locale, pathname]);

  const fontClass =
    locale === "ko" ? "font-ko-serif" : serifFont.className;

  const txClass =
    pathname === "/privacy" &&
    (localeTransitionPhase === "invert" || privacyEntranceInvert)
      ? "locale-tx-root--invert"
      : "";

  return (
    <>
      <FloatingLocaleHeader />
      <div
        className={`locale-tx-root ${fontClass} ${txClass} flex min-h-screen flex-col bg-[#f5f0e6] text-[#1c1a17] antialiased`}
      >
        <BodyContent>{children}</BodyContent>
      </div>
    </>
  );
}
