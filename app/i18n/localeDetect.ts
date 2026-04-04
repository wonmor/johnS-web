import type { Locale } from "./messages";

/** Same-site cookie: set from `Accept-Language` in middleware; updated when the user picks a language. */
export const LOCALE_HINT_COOKIE = "john-locale-hint";

/** When no `en` / `fr` / `ko` match (and no saved choice), site defaults to French. */
export const DEFAULT_LOCALE: Locale = "fr";

export function localeFromLanguageTags(tags: string[]): Locale {
  for (const raw of tags) {
    const base = raw.trim().toLowerCase().split("-")[0];
    if (base === "ko") return "ko";
    if (base === "fr") return "fr";
    if (base === "en") return "en";
  }
  return DEFAULT_LOCALE;
}

export function localeFromAcceptLanguageHeader(
  header: string | null
): Locale {
  if (!header) return DEFAULT_LOCALE;
  const langs = header.split(",").map((s) => s.trim().split(";")[0]);
  return localeFromLanguageTags(langs);
}

/** Browser / OS language list (`navigator.languages` / `navigator.language`). */
export function localeFromNavigator(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const tags =
    navigator.languages && navigator.languages.length > 0
      ? Array.from(navigator.languages)
      : [navigator.language || DEFAULT_LOCALE];
  return localeFromLanguageTags(tags);
}

export function parseLocaleCookieValue(
  value: string | undefined | null
): Locale | null {
  if (value === "fr" || value === "en" || value === "ko") return value;
  return null;
}
