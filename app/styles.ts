/**
 * Shared class recipes. Every section card, button and inline link on the site
 * pulls from here so shapes, spacing and hover behaviour stay in one place.
 */

export const SECTION_CARD =
  "w-full scroll-mt-24 rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg transition-colors duration-300 hover:border-white/20 sm:p-8";

export const SECTION_HEADING = "mb-5 text-3xl uppercase tracking-tight";

export const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#020824] transition-colors duration-200 hover:bg-white/85";

export const BTN_GHOST =
  "inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#020824]";

export const LINK_INLINE =
  "text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white";
