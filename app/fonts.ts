import { Barlow } from "next/font/google";

export const tubeFont = Barlow({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

/** Stack name must match Google Fonts family loaded in `I18nShell` when locale is Korean. */
export const nanumGothicFontStack = '"Nanum Gothic", sans-serif';
