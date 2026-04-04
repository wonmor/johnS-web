/**
 * ISO 3166-1 alpha-2: EU members, EEA (non-EU), and UK — where this site shows
 * the essential-cookies consent sheet (UK GDPR / EU ePrivacy-style practice).
 */
export const COOKIE_CONSENT_REQUIRED_COUNTRIES = new Set([
  // European Union
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  // EEA, not EU
  "IS",
  "LI",
  "NO",
  // United Kingdom (UK GDPR)
  "GB",
]);

/** First-party flag set by middleware; readable by client (not HttpOnly). */
export const COOKIE_LAW_SCOPE_COOKIE = "john-cookie-law-scope";

export function countryRequiresCookieConsent(
  countryCode: string | undefined
): boolean {
  if (!countryCode || countryCode.length !== 2) return false;
  return COOKIE_CONSENT_REQUIRED_COUNTRIES.has(countryCode.toUpperCase());
}
