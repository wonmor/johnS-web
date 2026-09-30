import { Instrument_Serif, Source_Serif_4 } from "next/font/google";

/**
 * Site-wide serif — the whole site is set in it. Source Serif 4 over
 * Crimson Text: it is variable across the 200–700 range the page already uses
 * (Crimson stops at 400/600/700), and its larger x-height holds up at the small
 * tracked-out sizes the section labels are set in.
 */
export const serifFont = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

/**
 * Display italic for the hero's two lines ("creative work" / "aerospace"),
 * the same face orchaerospace.com uses for its cursive headlines. Fallback
 * metrics are skipped: this Next release has no override entry for it and
 * would log an error at build.
 */
export const instrumentSerifItalic = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
  adjustFontFallback: false,
});
