import { Newsreader } from "next/font/google";

/** Site-wide serif — everything on the page is set in it. */
export const serifFont = Newsreader({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

/** Must match the Korean serif loaded in `I18nShell` when locale is Korean. */
export const koSerifFontStack = '"Noto Serif KR", serif';
