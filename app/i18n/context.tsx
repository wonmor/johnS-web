"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CookieConsentDialog } from "../components/CookieConsentDialog";
import { LocaleOfferDialog } from "../components/LocaleOfferDialog";
import {
  type Locale,
  type MessageKey,
  messages,
} from "./messages";
import {
  DEFAULT_LOCALE,
  LOCALE_HINT_COOKIE,
  LOCALE_OFFER_DISMISSED_KEY,
  localeFromNavigator,
  parseLocaleCookieValue,
} from "./localeDetect";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STORAGE_KEY = "johnS-web-locale";

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return parseLocaleCookieValue(raw);
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

function dismissedOfferFingerprint(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LOCALE_OFFER_DISMISSED_KEY);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [navLocaleTick, setNavLocaleTick] = useState(0);
  const [localeOfferTarget, setLocaleOfferTarget] = useState<Locale | null>(
    null
  );
  const [localeTransitionPhase, setLocaleTransitionPhase] =
    useState<LocaleTransitionPhase>("idle");
  const timeoutIdsRef = useRef<number[]>([]);

  const clearTransitionTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  useIsomorphicLayoutEffect(() => {
    setLocaleState(readStoredLocale() ?? DEFAULT_LOCALE);
  }, []);

  useEffect(() => {
    const onLang = () => setNavLocaleTick((n) => n + 1);
    window.addEventListener("languagechange", onLang);
    return () => window.removeEventListener("languagechange", onLang);
  }, []);

  useEffect(() => {
    const detected = localeFromNavigator();
    if (detected === locale) {
      setLocaleOfferTarget(null);
      return;
    }
    const fingerprint = `${locale}|${detected}`;
    if (dismissedOfferFingerprint() === fingerprint) {
      setLocaleOfferTarget(null);
      return;
    }
    setLocaleOfferTarget(detected);
  }, [locale, navLocaleTick]);

  useEffect(() => {
    document.documentElement.lang =
      locale === "fr" ? "fr" : locale === "ko" ? "ko" : "en";
  }, [locale]);

  useEffect(() => () => clearTransitionTimeouts(), [clearTransitionTimeouts]);

  useEffect(() => {
    if (pathname !== "/privacy" && localeTransitionPhase === "invert") {
      setLocaleTransitionPhase("idle");
    }
  }, [pathname, localeTransitionPhase]);

  const dismissLocaleOffer = useCallback(() => {
    if (typeof window === "undefined") return;
    const detected = localeFromNavigator();
    if (detected !== locale) {
      window.localStorage.setItem(
        LOCALE_OFFER_DISMISSED_KEY,
        `${locale}|${detected}`
      );
    }
    setLocaleOfferTarget(null);
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      clearTransitionTimeouts();
      setLocaleTransitionPhase("idle");

      const onPrivacy =
        typeof window !== "undefined" &&
        window.location.pathname === "/privacy";

      if (!onPrivacy) {
        setLocaleState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
        persistLocaleHintCookie(next);
        return;
      }

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
    <I18nContext.Provider value={value}>
      {children}
      <CookieConsentDialog />
      {localeOfferTarget ? (
        <LocaleOfferDialog
          target={localeOfferTarget}
          onAccept={() => {
            const next = localeOfferTarget;
            setLocaleOfferTarget(null);
            if (typeof window !== "undefined") {
              window.localStorage.removeItem(LOCALE_OFFER_DISMISSED_KEY);
            }
            if (next && next !== locale) {
              setLocale(next);
            }
          }}
          onDecline={dismissLocaleOffer}
        />
      ) : null}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
