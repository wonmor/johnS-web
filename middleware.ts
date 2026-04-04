import { NextRequest, NextResponse } from "next/server";
import {
  LOCALE_HINT_COOKIE,
  localeFromAcceptLanguageHeader,
} from "./app/i18n/localeDetect";

const PUBLIC_FILE = /\.(.*)$/;

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
    return withLocaleHintCookie(req, res);
  }

  return withLocaleHintCookie(req, NextResponse.next());
}