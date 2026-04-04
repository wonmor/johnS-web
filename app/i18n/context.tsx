"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type Locale,
  type MessageKey,
  messages,
} from "./messages";
import {
  DEFAULT_LOCALE,
  LOCALE_HINT_COOKIE,
  localeFromNavigator,
  parseLocaleCookieValue,
} from "./localeDetect";

const STORAGE_KEY = "johnS-web-locale";

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return parseLocaleCookieValue(raw);
}

function readHintFromDocumentCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${LOCALE_HINT_COOKIE}=([^;]*)`)
  );
  return parseLocaleCookieValue(
    match?.[1] ? decodeURIComponent(match[1]) : null
  );
}

function persistLocaleHintCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_HINT_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

/** Let CSS filter transition reach the inverted state before swapping strings */
const INVERT_RAMP_MS = 520;
/** Keep inverted look briefly after locale change */
const INVERT_HOLD_MS = 420;

export type LocaleTransitionPhase = "idle" | "invert";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  localeTransitionPhase: LocaleTransitionPhase;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({
  children,
  serverHint,
}: {
  children: React.ReactNode;
  /** From `Accept-Language` cookie (middleware); improves first paint when repeat-visiting. */
  serverHint?: Locale | null;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    () => serverHint ?? DEFAULT_LOCALE
  );
  const [localeTransitionPhase, setLocaleTransitionPhase] =
    useState<LocaleTransitionPhase>("idle");
  const timeoutIdsRef = useRef<number[]>([]);

  const clearTransitionTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) {
      setLocaleState(stored);
      return;
    }
    const docHint = readHintFromDocumentCookie();
    if (docHint) {
      setLocaleState(docHint);
      return;
    }
    setLocaleState(localeFromNavigator());
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      locale === "fr" ? "fr" : locale === "ko" ? "ko" : "en";
  }, [locale]);

  useEffect(() => () => clearTransitionTimeouts(), [clearTransitionTimeouts]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      clearTransitionTimeouts();
      setLocaleTransitionPhase("idle");

      const run = () => {
        setLocaleTransitionPhase("invert");

        const t1 = window.setTimeout(() => {
          setLocaleState(next);
          window.localStorage.setItem(STORAGE_KEY, next);
          persistLocaleHintCookie(next);

          const t2 = window.setTimeout(() => {
            setLocaleTransitionPhase("idle");
          }, INVERT_HOLD_MS);

          timeoutIdsRef.current.push(t2);
        }, INVERT_RAMP_MS);

        timeoutIdsRef.current.push(t1);
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });
    },
    [locale, clearTransitionTimeouts]
  );

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) => {
      const table = messages[locale];
      let s: string = String(table[key] ?? messages.en[key] ?? key);
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replaceAll(`{${k}}`, String(v));
        }
      }
      return s;
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      localeTransitionPhase,
    }),
    [locale, setLocale, t, localeTransitionPhase]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
