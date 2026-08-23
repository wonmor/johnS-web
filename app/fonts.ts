import { Source_Serif_4 } from "next/font/google";

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
