"use client";

import { usePathname } from "next/navigation";
import { serifFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { BodyContent } from "./BodyContent";
import { FloatingLocaleHeader } from "./FloatingLocaleHeader";

export function I18nShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { localeTransitionPhase, privacyEntranceInvert } = useI18n();

  const fontClass = serifFont.className;

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
