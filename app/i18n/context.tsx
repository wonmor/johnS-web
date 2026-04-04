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

const STORAGE_KEY = "johnS-web-locale";

const FADE_OUT_MS = 340;
const INVERT_HOLD_MS = 200;
const FADE_IN_CLEANUP_MS = 420;

export type LocaleTransitionPhase =
  | "idle"
  | "fade-out"
  | "invert"
  | "fade-in";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  localeTransitionPhase: LocaleTransitionPhase;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [localeTransitionPhase, setLocaleTransitionPhase] =
    useState<LocaleTransitionPhase>("idle");
  const timeoutIdsRef = useRef<number[]>([]);

  const clearTransitionTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "fr" || stored === "en" || stored === "ko") {
      setLocaleState(stored);
    }
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
        setLocaleTransitionPhase("fade-out");

        const t1 = window.setTimeout(() => {
          setLocaleState(next);
          window.localStorage.setItem(STORAGE_KEY, next);
          setLocaleTransitionPhase("invert");

          const t2 = window.setTimeout(() => {
            setLocaleTransitionPhase("fade-in");

            const t3 = window.setTimeout(() => {
              setLocaleTransitionPhase("idle");
            }, FADE_IN_CLEANUP_MS);

            timeoutIdsRef.current.push(t3);
          }, INVERT_HOLD_MS);

          timeoutIdsRef.current.push(t2);
        }, FADE_OUT_MS);

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
