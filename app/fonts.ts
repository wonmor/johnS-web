import { Barlow } from "next/font/google";

export const tubeFont = Barlow({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

/** Must match the IBM Plex Sans KR family loaded in `I18nShell` when locale is Korean. */
export const ibmPlexSansKRFontStack = '"IBM Plex Sans KR", sans-serif';
