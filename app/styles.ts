/**
 * Shared class recipes. Every section, button and inline link on the site pulls
 * from here so shapes, spacing and hover behaviour stay in one place.
 *
 * The page is paper (#f5f0e6) and ink (#1c1a17): sections are separated by a
 * hairline rule rather than boxed in cards.
 */

export const SECTION_CARD =
  "w-full scroll-mt-24 border-t border-[#1c1a17]/12 pt-8 sm:pt-10";

export const SECTION_HEADING = "mb-4 text-3xl lowercase tracking-tight";

export const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-[#1c1a17] px-5 py-2 text-sm text-[#f5f0e6] transition-colors duration-200 hover:bg-[#1c1a17]/85";

export const BTN_GHOST =
  "inline-flex items-center justify-center rounded-full border border-[#1c1a17]/25 px-5 py-2 text-sm text-[#1c1a17] transition-colors duration-200 hover:bg-[#1c1a17] hover:text-[#f5f0e6]";

export const LINK_INLINE =
  "text-[#1c1a17] underline decoration-[#1c1a17]/30 underline-offset-4 transition-colors hover:decoration-[#1c1a17]";
