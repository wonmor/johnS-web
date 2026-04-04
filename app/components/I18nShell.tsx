"use client";

import { useEffect } from "react";
import { tubeFont } from "../fonts";
import { useI18n } from "../i18n/context";
import { BodyContent } from "./BodyContent";

const NANUM_LINK_ID = "font-nanum-gothic-css";
const NANUM_HREF =
  "https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap";

export function I18nShell({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  useEffect(() => {
    if (locale !== "ko") return;
    if (document.getElementById(NANUM_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = NANUM_LINK_ID;
    link.rel = "stylesheet";
    link.href = NANUM_HREF;
    document.head.appendChild(link);
  }, [locale]);

  const fontClass =
    locale === "ko" ? "font-nanum-gothic" : tubeFont.className;

  return (
    <div
      className={`${fontClass} flex min-h-screen flex-col bg-[#020824] pt-6 text-white antialiased`}
    >
      <BodyContent>{children}</BodyContent>
    </div>
  );
}
