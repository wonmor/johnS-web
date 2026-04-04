import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_LAW_SCOPE_COOKIE,
  countryRequiresCookieConsent,
} from "./app/i18n/cookieLawRegion";
import {
  LOCALE_HINT_COOKIE,
  localeFromAcceptLanguageHeader,
} from "./app/i18n/localeDetect";

const PUBLIC_FILE = /\.(.*)$/;

function detectCountry(req: NextRequest): string | undefined {
  const fromGeo = req.geo?.country;
  if (fromGeo) return fromGeo;
  const vercel = req.headers.get("x-vercel-ip-country");
  if (vercel) return vercel;
  const cf = req.headers.get("cf-ipcountry");
  if (cf && cf !== "XX") return cf;
  return undefined;
}

function withCookieLawScopeCookie(req: NextRequest, res: NextResponse) {
  let required = countryRequiresCookieConsent(detectCountry(req));
  if (process.env.COOKIE_CONSENT_DEBUG === "1") {
    required = true;
  }
  res.cookies.set(COOKIE_LAW_SCOPE_COOKIE, required ? "1" : "0", {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  return res;
}

function withLocaleHintCookie(req: NextRequest, res: NextResponse) {
  if (!req.cookies.get(LOCALE_HINT_COOKIE)) {
    res.cookies.set(
      LOCALE_HINT_COOKIE,
      localeFromAcceptLanguageHeader(req.headers.get("accept-language")),
      { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" }
    );
  }
  return res;
}

function sealResponse(req: NextRequest, res: NextResponse) {
  return withLocaleHintCookie(req, withCookieLawScopeCookie(req, res));
}

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  if (req.nextUrl.locale === "default") {
    const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
    const res = NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
    return sealResponse(req, res);
  }

  return sealResponse(req, NextResponse.next());
}