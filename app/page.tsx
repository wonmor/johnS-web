"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { JebediahShowcase } from "./components/BodyContent";
import { LazyMountInView } from "./components/portfolio/LazyMountInView";
import { AppStoreBadge } from "./components/StoreBadges";
import { ibmPlexSansKRFontStack, tubeFont } from "./fonts";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useI18n } from "./i18n/context";
import type { Locale } from "./i18n/messages";
import {
  BTN_GHOST,
  BTN_PRIMARY,
  LINK_INLINE,
  SECTION_CARD,
  SECTION_HEADING,
} from "./styles";

const MEDIA_LOGOS = [
  {
    href: "https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/",
    src: "/mobilesyrup.png",
    alt: "MobileSyrup",
    width: 1062,
    height: 161,
    sizeClass: "h-7 sm:h-8",
  },
  {
    href: "https://web.archive.org/web/20240530133558/https://hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145",
    src: "/hdsb-wordmark.png",
    alt: "Halton District School Board",
    width: 400,
    height: 109,
    sizeClass: "h-12 sm:h-14",
    note: "(WebArchive.org)",
  },
];

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w",
  },
  { label: "GitHub", href: "https://github.com/wonmor" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/john-seong-9194321a9/",
  },
  {
    label: "App Store",
    href: "https://apps.apple.com/ca/developer/wonmo-seong/id1625011193",
  },
];

const FaceCanvas = dynamic(
  () => import("./components/portfolio/FaceCanvas"),
  { ssr: false }
);

const tubeRed = "#f77f6b"; // legacy accent red (kept for logos)
const tubeBlue = "#003688";
const tubeGreyBg = "#020824"; // dark navy background to match layout
const tubeText = "#f9fafb"; // light text on dark

type RoundelTheme = {
  ring: string;
  bar: string;
  decorStroke: string;
  /** Bridge + waves (FR); EN waves behind Tower Bridge mask; KO uses animated clouds in roundel */
  showBridgeAndWaves: boolean;
};

function getRoundelTheme(locale: Locale): RoundelTheme {
  switch (locale) {
    case "fr":
      return {
        ring: tubeRed,
        bar: tubeBlue,
        decorStroke: tubeBlue,
        showBridgeAndWaves: true,
      };
    case "ko":
      return {
        ring: "#00B2A9",
        bar: "#007A8C",
        decorStroke: "#005A66",
        showBridgeAndWaves: false,
      };
    default:
      return {
        ring: "#9364CC",
        bar: "#5E2F88",
        decorStroke: "#4A2565",
        showBridgeAndWaves: false,
      };
  }
}

/**
 * Easter egg: the roundel's *visuals* (colours + landmark + animated decor) are
 * swapped between EN and KO — English viewers get the Seoul roundel, Korean
 * viewers get the London one. Font and copy still follow the real locale; FR is
 * left untouched.
 */
function roundelVisualLocale(locale: Locale): Locale {
  if (locale === "en") return "ko";
  if (locale === "ko") return "en";
  return locale;
}

function roundelLandmarkSvg(locale: Locale): string | null {
  switch (locale) {
    case "en":
      return "/tower-bridge-roundel.svg";
    case "ko":
      return "/n-seoul-tower-roundel.svg";
    default:
      return null;
  }
}

function RoundelLandmarkFill({
  locale,
  color,
}: {
  locale: Locale;
  color: string;
}) {
  const src = roundelLandmarkSvg(locale);
  if (!src) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "128%",
        height: "128%",
        transform: "translate(-50%, -50%)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        backgroundColor: color,
        opacity: 0.48,
        zIndex: 0,
      }}
    />
  );
}

type KoCloudPuff = {
  cx: number;
  baseCy: number;
  rx: number;
  ry: number;
  opacity: number;
};

/** Single drift speed (L→R, viewBox units per tick) — slower, uniform like wind. */
const KO_CLOUD_DRIFT_PER_TICK = 0.11;

function initialKoCloudPuffs(): KoCloudPuff[] {
  return Array.from({ length: 38 }, () => ({
    cx: -40 + Math.random() * 185,
    baseCy: 4 + Math.random() * 92,
    /* Wide, shallow puffs — mostly flat / stratiform layers */
    rx: 3.5 + Math.random() * 13,
    ry: 0.22 + Math.random() * 1.05,
    opacity: 0.2 + Math.random() * 0.52,
  }));
}

/** Korean roundel: puffs drift slowly in one direction (left → right). */
function KoreanRoundelCloudDecor({ decorStroke }: { decorStroke: string }) {
  const cloudStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120%",
    height: "120%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
    pointerEvents: "none",
  };

  const [puffs, setPuffs] = useState(() => initialKoCloudPuffs());
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    // rAF instead of a 16 ms interval: it yields to the compositor and pauses
    // outright when the tab is hidden.
    let frame = 0;
    const tick = () => {
      setPuffs((prev) =>
        prev.map((p) => {
          let nx = p.cx + KO_CLOUD_DRIFT_PER_TICK;
          if (nx > 122) nx = -32 - Math.random() * 28;
          return { ...p, cx: nx };
        })
      );
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <svg viewBox="0 0 100 100" style={cloudStyle} aria-hidden>
      <defs>
        <filter
          id="ko-roundel-cloud-soft"
          x="-45%"
          y="-45%"
          width="190%"
          height="190%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.85 0.28" />
        </filter>
      </defs>
      <g filter="url(#ko-roundel-cloud-soft)">
        {puffs.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.baseCy}
            rx={p.rx}
            ry={p.ry}
            fill={decorStroke}
            opacity={p.opacity * 0.52}
          />
        ))}
      </g>
    </svg>
  );
}

function TubeRoundel() {
  const { locale } = useI18n();
  // Visuals swap EN↔KO; font/copy stay on the real locale.
  const vLocale = roundelVisualLocale(locale);
  const theme = getRoundelTheme(vLocale);
  const nameFontFamily =
    locale === "ko" ? ibmPlexSansKRFontStack : tubeFont.style.fontFamily;

  const reducedMotion = usePrefersReducedMotion();
  const showFrBridge = theme.showBridgeAndWaves;
  const showEnWater = vLocale === "en";
  const animateWaves = (showFrBridge || showEnWater) && !reducedMotion;

  const [waves, setWaves] = useState(
    Array.from({ length: 30 }).map(() => ({
      x: 10 + Math.random() * 80,
      y: 72 + Math.random() * 18,
      length: 2 + Math.random() * 5,
    }))
  );

  useEffect(() => {
    if (!animateWaves) return;
    const speed = 0.3;
    let frame = 0;
    const tick = () => {
      setWaves((prev) =>
        prev
          .map((wave) => ({ ...wave, x: wave.x + speed }))
          .filter((wave) => wave.x <= 100)
          .concat(
            Array.from({ length: 1 }).map(() => ({
              x: -5 + Math.random() * 5,
              y: 72 + Math.random() * 18,
              length: 2 + Math.random() * 5,
            }))
          )
      );
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animateWaves]);

  const waveDecorStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120%",
    height: "120%",
    transform: "translate(-50%, -50%)",
    fill: "none",
    stroke: theme.decorStroke,
    strokeWidth: 2,
  };

  return (
    <div
      style={{
        position: "relative",
        width: 140,
        height: 140,
        borderRadius: "50%",
        backgroundColor: theme.ring,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      {showFrBridge ? (
        <svg
          viewBox="0 0 100 100"
          style={{ ...waveDecorStyle, zIndex: 0 }}
          aria-hidden
        >
          <line x1="30" y1="30" x2="30" y2="50" />
          <line x1="70" y1="30" x2="70" y2="50" />
          <line x1="30" y1="30" x2="50" y2="50" opacity={0.3} />
          <line x1="70" y1="30" x2="50" y2="50" opacity={0.3} />
          <line x1="30" y1="30" x2="0" y2="50" opacity={0.3} />
          <line x1="70" y1="30" x2="100" y2="50" opacity={0.3} />
          <line x1="0" y1="70" x2="100" y2="70" opacity={0.2} />
          {waves.map((wave, i) => (
            <line
              key={i}
              x1={wave.x}
              y1={wave.y}
              x2={wave.x + wave.length}
              y2={wave.y}
              stroke={theme.decorStroke}
              strokeOpacity={0.2}
              strokeWidth={1.2}
            />
          ))}
        </svg>
      ) : null}

      {showEnWater ? (
        <>
          <RoundelLandmarkFill locale={vLocale} color={theme.decorStroke} />
          <svg
            viewBox="0 0 100 100"
            style={{
              ...waveDecorStyle,
              zIndex: 1,
              clipPath: "inset(54% -10% -5% -10%)",
              WebkitClipPath: "inset(54% -10% -5% -10%)",
            }}
            aria-hidden
          >
            <line x1="0" y1="70" x2="100" y2="70" opacity={0.2} />
            {waves.map((wave, i) => (
              <line
                key={i}
                x1={wave.x}
                y1={wave.y}
                x2={wave.x + wave.length}
                y2={wave.y}
                stroke={theme.decorStroke}
                strokeOpacity={0.2}
                strokeWidth={1.2}
              />
            ))}
          </svg>
        </>
      ) : null}

      {vLocale === "ko" ? (
        <KoreanRoundelCloudDecor decorStroke={theme.decorStroke} />
      ) : null}

      {!showFrBridge && !showEnWater ? (
        <RoundelLandmarkFill locale={vLocale} color={theme.decorStroke} />
      ) : null}

      {/* Hollow center */}
      <div
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: "white",
          zIndex: 2,
        }}
      />

      {/* Name bar */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-15%",
          width: "130%",
          height: 30,
          backgroundColor: theme.bar,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <span
          style={{
            color: "white",
            fontFamily: nameFontFamily,
            letterSpacing: "0.05em",
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          JOHN SEONG
        </span>
      </div>
    </div>
  );
}

function TubeRoundelWith787({
  size = 140,
}: {
  size?: number;
}) {
  const { locale } = useI18n();
  const wingColor = getRoundelTheme(roundelVisualLocale(locale)).bar;
  // scale relative to your TubeRoundel's base 140×140
  const base = 140;
  const s = size / base;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        margin: "0 auto",
      }}
    >
      {/* Long, thin 787-style wings behind the roundel */}
      <svg
        viewBox="0 0 140 140"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${s})`,
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden
      >
        {/* Wings: thin stroked Bézier curves with raked tips */}
              {/* Wings: faint, thin, semi-transparent */}
        <g fill="none" stroke={wingColor} strokeOpacity="0.25" strokeLinecap="round">
          {/* Leading edge (left) */}
          <path
            d={`
              M 38 78
              C  10 70  -30 58  -85 45
            `}
            strokeWidth="2"
          />
          {/* Trailing edge (left) */}
          <path
            d={`
              M 40 82
              C  12 74  -28 63  -80 52
            `}
            strokeWidth="1.5"
          />
          {/* Raked tip (left) */}
          <path d={`M -85 45 L -92 42`} strokeWidth="1.5" />

          {/* Leading edge (right) */}
          <path
            d={`
              M 102 78
              C 130 70  170 58  225 45
            `}
            strokeWidth="2"
          />
          {/* Trailing edge (right) */}
          <path
            d={`
              M 100 82
              C 128 74  168 63  220 52
            `}
            strokeWidth="1.5"
          />
          {/* Raked tip (right) */}
          <path d={`M 225 45 L 232 42`} strokeWidth="1.5" />
        </g>

        {/* Very faint fill between edges */}
        <g fill={wingColor} opacity="0.11">
          <path d={`M 38 78 Q -5 66 -85 45 Q -30 58 10 70 Z`} />
          <path d={`M 102 78 Q 145 66 225 45 Q 170 58 130 70 Z`} />
        </g>

        {/* Engines — full circles, faint to match wings */}
        <g stroke={wingColor} strokeWidth="2" fill="none" opacity="0.25">
          {/* Left engine */}
          <circle cx="-5" cy="96" r="14" />
          {/* Right engine */}
          <circle cx="145" cy="96" r="14" />
        </g>

      </svg>

      {/* Your original roundel, unchanged, on top */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <TubeRoundel />
      </div>
    </div>
  );
}

function splitTitleYear(text: string): { main: string; year: string | null } {
  const m = text.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (!m) return { main: text, year: null };
  return { main: m[1].trim(), year: m[2].trim() };
}

/**
 * Live viewer from electronvisual.org rather than a local .gltf snapshot, so
 * the atom/molecule always uses the current renderer and DFT data.
 * `keyword` is an element symbol ("Gd") or a formula in the site's molecule
 * dictionary ("C6H6"); `fullscreen=true` drops its header and footer.
 */
function ElectronVisualEmbed({
  keyword,
  title,
}: {
  keyword: string;
  title: string;
}) {
  const src = `https://electronvisual.org/renderer?keyword=${encodeURIComponent(
    keyword
  )}&fullscreen=true`;

  return (
    <div>
      <div className="relative h-[380px] w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/10 sm:h-[480px]">
        <iframe
          src={src}
          title={`${title} — ElectronVisual.org renderer`}
          loading="lazy"
          allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/45">
        Live from ElectronVisual.org ·{" "}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          Open in new tab
        </a>
      </p>
    </div>
  );
}

/** Quiet stand-in while the viewer is still out of view. */
function RendererPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-[380px] items-center justify-center rounded-xl bg-black/40 text-center text-xl font-thin text-white/60 ring-1 ring-white/10 sm:h-[480px]">
      {label}
    </div>
  );
}

/** Responsive 16:9 YouTube embed — the old fixed 350×250 boxes never grew. */
function EmbeddedVideo({
  src,
  title,
  caption,
  className,
}: {
  src: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`mx-auto w-full max-w-2xl ${className ?? ""}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/15">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-white/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SectionKicker({ label }: { label: string }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
      <span>{label}</span>
    </p>
  );
}

function ProjectTitle({
  text,
  className,
  yearClassName,
}: {
  text: string;
  className?: string;
  yearClassName?: string;
}) {
  const { main, year } = splitTitleYear(text);
  return (
    <span className={className}>
      <span className="block">{main}</span>
      {year ? (
        <span
          className={
            yearClassName ??
            "mt-1 block text-xs font-medium uppercase tracking-[0.22em] text-white/60"
          }
        >
          {year}
        </span>
      ) : null}
    </span>
  );
}


export default function Portfolio() {
  const { t, locale } = useI18n();
  const headerRoundelTheme = getRoundelTheme(roundelVisualLocale(locale));
  const [activeTab, setActiveTab] = useState<"benzene" | "gadolinium">(
    "benzene"
  );
  const [atoms3dUnlocked, setAtoms3dUnlocked] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [avatarRevealed, setAvatarRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAvatarRevealed(true), 1500);
    return () => clearTimeout(t);
  }, []);
  // Scrolling used to flip the viewer tab on its own, which tore down the
  // mounted renderer mid-scroll. The tab is now click-only; scroll just drives
  // the hero portrait cross-fade.
  useEffect(() => {
    let queued = false;
    const measure = () => {
      queued = false;
      setHeroScrolled(window.scrollY > 300);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-chrome-surface="dark"
      className="flex flex-col gap-6 pb-14 sm:pb-16"
      style={{ background: tubeGreyBg, color: tubeText }}
    >
      {/* Header banner */}
      <div id="section-hero" className="scroll-mt-20 text-center">
        <div
          data-chrome-surface="light"
          className="relative overflow-hidden bg-[#f5f0e6] pb-8 pt-[calc(3.5rem+env(safe-area-inset-top)+3rem)] text-black sm:pt-[calc(4rem+env(safe-area-inset-top)+3.5rem)]"
        >
          <Image
            src="/hero-portrait.webp"
            alt=""
            aria-hidden
            width={1100}
            height={1300}
            priority
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain opacity-[0.24]"
          />
          <div className="relative z-10">
            <Link href="/" className="mx-auto block w-fit">
              <TubeRoundelWith787 />
            </Link>
            <p className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gray-600 sm:text-[0.7rem] sm:tracking-[0.26em]">
              {t("hero.landmark")}
            </p>
            {/* The page's only h1 — everything below hangs off it. */}
            <h1 className="mt-2 text-2xl uppercase tracking-[0.25em]">
              {t("hero.line1")}
              <br />
              {t("hero.line2")}
            </h1>
            <a
              href={`mailto:${t("hero.email")}`}
              className="mt-3 inline-block text-black underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-black"
            >
              {t("hero.email")}
            </a>
          </div>
        </div>
        <div data-chrome-surface="dark" className="bg-[#020824] py-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative flex items-center justify-center">
              <Image
                src="/signature.svg"
                alt=""
                aria-hidden
                width={480}
                height={232}
                priority
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none"
                style={{
                  width: "min(85vw, 30rem)",
                  height: "auto",
                  opacity: 0.7,
                  filter: "invert(1) drop-shadow(0 1px 6px rgba(0,0,0,0.45))",
                  mixBlendMode: "screen",
                }}
              />
            <div
              className="relative rounded-full border-4 overflow-hidden"
              style={{
                borderColor: headerRoundelTheme.ring,
                width: 200,
                height: 200,
                boxSizing: "border-box",
                opacity: avatarRevealed ? 1 : 0,
                transform: avatarRevealed ? "scale(1)" : "scale(0.92)",
                transition: "opacity 900ms ease, transform 900ms ease",
              }}
            >
              <Image
                src="/apple-park.jpg"
                alt={t("awards.wwdc")}
                width={200}
                height={200}
                priority
                sizes="200px"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: heroScrolled ? 0 : 1,
                  transition: "opacity 900ms ease",
                }}
              />
              <Image
                src="/IMG_6826.jpg"
                alt="Cockpit sunset — private pilot training"
                width={200}
                height={200}
                sizes="200px"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: heroScrolled ? 1 : 0,
                  transition: "opacity 900ms ease",
                }}
              />
            </div>
            </div>

            <div className="text-center text-white">
              <p className="text-xl font-medium">{t("awards.wwdc")}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-200">
                {t("awards.wwdcVenue")}
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center gap-2 text-white">
              <p className="flex items-center gap-1">
                <Image
                  src="/american-flag.png"
                  alt="American Flag"
                  width={24}
                  height={16}
                />
                <span className="text-white">{t("awards.usVisa")}</span>
              </p>
              <p className="flex items-center gap-1">
                <Image src="/uk-flag.png" alt="UK Flag" width={24} height={16} />
                <span className="text-white">{t("awards.ukVisa")}</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <Image
                  src="/south-korea-flag.svg"
                  alt="South Korean Flag"
                  width={24}
                  height={16}
                />
                <Image
                  src="/canada-flag.svg"
                  alt="Canadian Flag"
                  width={24}
                  height={16}
                />
                <span className="inline-flex items-center gap-1.5">
                  <Image
                    src="/quebec-flag.svg"
                    alt="Quebec Flag"
                    width={24}
                    height={16}
                  />
                  <span className="text-xs uppercase tracking-wide text-white sm:text-sm">
                    {t("awards.madeInQuebec")}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Media — logos sit bare on the background and only come up on hover */}
      <div className="mt-4 text-center">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
          {t("media.featured")}
        </p>
        {/* Stacked: the wide HDSB wordmark gets its own line so it can be read */}
        <div className="flex flex-col items-center gap-5">
          {MEDIA_LOGOS.map((logo) => (
            <a
              key={logo.alt}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-1 opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={`w-auto object-contain ${logo.sizeClass}`}
              />
              {"note" in logo && logo.note ? (
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {logo.note}
                </span>
              ) : null}
            </a>
          ))}
        </div>
      </div>

      {/* Navigation bar */}
      <nav
        aria-label="Elsewhere"
        className="m-auto flex w-fit flex-wrap justify-center gap-x-8 gap-y-3 text-base font-medium text-white/60"
      >
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            className="underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/50"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 sm:gap-10 sm:px-6">
      {/* Project showcase header */}
      <div className="pt-4 text-center sm:pt-6">
        <h2 className="text-4xl font-thin uppercase tracking-[0.18em] sm:text-6xl sm:tracking-[0.22em]">
          Showcase
        </h2>
      </div>
      <JebediahShowcase />

      {/* Gadolinium / Benzene Tabs */}
      <div className={SECTION_CARD}>
        <SectionKicker label="Interactive · 3D viewer" />
        <h2 className={SECTION_HEADING}>Atoms &amp; molecules</h2>
        {/* Segmented control: one pill, two states — reads as a switch, not two buttons */}
        <div
          role="tablist"
          aria-label="Molecule viewer"
          className="mx-auto mb-5 flex w-full max-w-xs rounded-full border border-white/15 bg-white/[0.04] p-1"
        >
          {(
            [
              { key: "gadolinium", label: t("gltf.tabGd") },
              { key: "benzene", label: t("gltf.tabBenzene") },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-white text-[#020824]"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => {
                setAtoms3dUnlocked(true);
                setActiveTab(tab.key);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Anchor sits on the viewer, so the nav tab lands on the renderer
            itself rather than the section heading above it. */}
        <div id="section-atoms" className="scroll-mt-24">
          {activeTab === "benzene" && (
            <div className="bg-black/80 rounded-2xl p-6 shadow-lg ring-1 ring-white/5">
              <LazyMountInView
                unlock={atoms3dUnlocked}
                rootMargin="220px 0px 260px 0px"
                fallback={<RendererPlaceholder label={t("gltf.loadingBenzene")} />}
              >
                <ElectronVisualEmbed
                  keyword="C6H6"
                  title={t("gltf.benzeneTitle")}
                />
              </LazyMountInView>
              <div className="mt-4 rounded-xl bg-white/5 p-6 text-center text-white ring-1 ring-white/10">
                <h3 className="text-2xl tracking-wide">
                  {t("gltf.benzeneTitle")}
                </h3>
                <p className="mt-2 text-white/70">
                  {t("gltf.benzeneBody")}{" "}
                  <a href="https://electronvisual.org" className={LINK_INLINE}>
                    <code>ElectronVisual.org</code>
                  </a>
                  .
                </p>
                <a
                  href="https://electronvisual.org"
                  className={`mt-4 ${BTN_GHOST}`}
                >
                  {t("gltf.benzeneCta")} ElectronVisual.org
                </a>
              </div>
            </div>
          )}
        </div>

        <div>
          {activeTab === "gadolinium" && (
            <div className="bg-black/80 rounded-2xl p-6 shadow-lg ring-1 ring-white/5">
              <LazyMountInView
                unlock={atoms3dUnlocked}
                rootMargin="220px 0px 260px 0px"
                fallback={<RendererPlaceholder label={t("gltf.loadingGd")} />}
              >
                <ElectronVisualEmbed keyword="Gd" title={t("gltf.gdTitle")} />
              </LazyMountInView>
              <div className="mt-4 rounded-xl bg-white/5 p-6 text-center text-white ring-1 ring-white/10">
                <h3 className="text-2xl tracking-wide">{t("gltf.gdTitle")}</h3>
                <p className="mt-2 text-white/70">{t("gltf.gdBody")}</p>
                <a
                  href="https://electronvisual.org"
                  className={`mt-4 ${BTN_GHOST}`}
                >
                  {t("gltf.benzeneCta")} ElectronVisual.org
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ElectronVisual Section */}
      <section id="section-electron" className={SECTION_CARD}>
        <div className="mb-6 space-y-3 sm:space-y-4">
          {/* Row 1: book cover (portrait) + Atomizer screens (portrait) side by side */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Image
              src="/walter-kohn-cover.png"
              alt="Walter Kohn — From Kindertransport and Internment to DFT and the Nobel Prize (David C. Clary). Front cover features John Wonmo Seong's DFT electron density visualisation."
              width={865}
              height={947}
              className="h-full w-full rounded-lg object-cover ring-1 ring-white/15"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
            <Image
              src="/atomizer-screens.jpg"
              alt="Atomizer AR — 2023 Swift Student Challenge Winner; iron (Fe) and sodium (Na) electron configurations rendered in real time on iPhone"
              width={1077}
              height={1400}
              className="h-full w-full rounded-lg object-cover ring-1 ring-white/15"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
          </div>
          {/* Row 2: two ElectronVisualized stills (landscape 4:3) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Image
              src="/electronvis-1.jpg"
              alt="ElectronVisualized DFT visualisation"
              width={1200}
              height={900}
              className="h-full w-full rounded-lg object-cover ring-1 ring-white/15"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
            <Image
              src="/electronvis-2.jpg"
              alt="ElectronVisualized molecular orbital render"
              width={1200}
              height={900}
              className="h-full w-full rounded-lg object-cover ring-1 ring-white/15"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
          </div>
          {/* Row 3: preface credit, full width on a white card */}
          <a
            href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg bg-white p-3 ring-1 ring-white/10 transition hover:ring-white/30"
            aria-label="Open Walter Kohn book preface PDF crediting John Wonmo Seong"
          >
            <Image
              src="/walter-kohn-preface.png"
              alt="Front cover credit: Adapted from an electron density map for the hydrogen molecule calculated with Density Functional Theory (courtesy of John Wonmo Seong)"
              width={1008}
              height={256}
              className="h-auto w-full object-contain"
              sizes="(max-width: 640px) 100vw, 42rem"
            />
          </a>
        </div>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
          <span aria-hidden>★</span>
          Apple Swift Student Challenge · 2023 Award
        </div>
        <SectionKicker label="iOS · WebXR · DFT" />
        <h2 className={SECTION_HEADING}>
          <ProjectTitle text={t("electron.title")} />
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("electron.li1")}</li>
          <li>{t("electron.li2")}</li>
          <li>
            {t("electron.li3Before")}{" "}
            <a
              href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_INLINE}
            >
              {t("electron.li3Book")}
            </a>
            {t("electron.li3After")}{" "}
            <i className="text-sm">
              {t("electron.li3Title")} (
              <a
                href="https://doi.org/10.1142/13806"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_INLINE}
              >
                doi.org/10.1142/13806
              </a>
              )
            </i>
          </li>
          <li>
            {t("electron.li4")}{" "}
            <a
              href="https://www.youtube.com/watch?v=5eT39MEA0ec"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK_INLINE}
            >
              YouTube
            </a>
          </li>
        </ul>
        {/* Actions: store badge and site link on one baseline */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <AppStoreBadge
            href="https://apps.apple.com/us/app/atomizer-ar/id6449015706"
            ariaLabel={t("electron.appStoreAtomizer")}
          />
          <a href="https://www.electronvisual.org" className={BTN_PRIMARY}>
            {t("electron.visit")} ElectronVisual.org
          </a>
        </div>
      </section>

      {/* 3D Face Model */}
      <div id="section-face" className={SECTION_CARD}>
        <SectionKicker label="iOS · TrueDepth · 3D" />
        <h2 className={SECTION_HEADING}>Face scan demo</h2>
        <LazyMountInView
          rootMargin="240px 0px 320px 0px"
          fallback={
            <div className="flex h-[400px] items-center justify-center text-center text-3xl font-thin text-white">
              {t("face.loading")}
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-[400px] items-center justify-center text-center text-3xl font-thin text-white">
                {t("face.loading")}
              </div>
            }
          >
            <FaceCanvas />
          </Suspense>
        </LazyMountInView>
        <div className="mt-4 rounded-xl bg-white/5 p-6 text-center text-white ring-1 ring-white/10">
          <h3 className="text-2xl tracking-wide">{t("face.title")}</h3>
          <p className="mt-2 text-white/70">{t("face.body")}</p>
          <a
            href="https://www.youtube.com/watch?v=LqiZKoXhtDA"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 ${BTN_GHOST}`}
          >
            {t("face.cta")}
          </a>
        </div>
      </div>

      {/* OpticALLY Section */}
      <section id="section-orch" className={SECTION_CARD}>
        <SectionKicker label="iOS · Patent pending" />
        <h2 className={SECTION_HEADING}>{t("orch.title")}</h2>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("orch.li1")}</li>
          <li>{t("orch.li2")}</li>
          <li>{t("orch.li3")}</li>
        </ul>
        <div className="mt-6 flex justify-start">
          <AppStoreBadge
            href="https://apps.apple.com/app/orch-3d-head-face-scan/id6468313142"
            ariaLabel={t("orch.appStoreAlt")}
          />
        </div>
        <EmbeddedVideo
          src="https://www.youtube.com/embed/LqiZKoXhtDA?si=T8ZAd0P-vh_x1XaY"
          title={t("orch.title")}
          caption={t("footer.video2Caption")}
          className="mt-8"
        />
      </section>

      {/* Experience Section */}
      <section id="section-exp" className={SECTION_CARD}>
        <EmbeddedVideo
          src="https://www.youtube.com/embed/F95lSwabPpE?si=WpEctEsx-AZGBeGr"
          title={t("exp.title")}
          caption={t("footer.video1Caption")}
          className="mb-8"
        />
        <SectionKicker label="Work · 2023 — present" />
        <h2 className={SECTION_HEADING}>{t("exp.title")}</h2>
        {/* Timeline rail: one vertical line ties the roles together */}
        <ol className="space-y-6 border-l border-white/15 pl-6 text-lg">
          {[
            {
              title: t("exp.orchestr"),
              body: (
                <a
                  href={t("exp.orchestrSite")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_INLINE}
                >
                  {t("exp.orchestrSite")}
                </a>
              ),
            },
            { title: t("exp.reach"), body: t("exp.reachBody") },
            { title: t("exp.snu"), body: t("exp.snuBody") },
          ].map((role) => (
            <li key={role.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.8125rem] top-2.5 h-1.5 w-1.5 rounded-full bg-white/40"
              />
              <h3 className="text-2xl uppercase">
                <ProjectTitle text={role.title} />
              </h3>
              <p className="text-white/70">{role.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className={`${SECTION_CARD} space-y-8`}>
        <div>
          <SectionKicker label="From the archive" />
          <h2 className="text-3xl uppercase tracking-tight">Moments</h2>
        </div>
        {/* Two photos side by side on desktop, stacked on phones */}
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              src: "/IMG_3505.jpg",
              alt: "With iJustine",
              caption: t("footer.photo1Caption"),
            },
            {
              src: "/IMG_0629.jpeg",
              alt: "With flight instructor",
              caption: t("footer.photo2Caption"),
            },
          ].map((photo) => (
            <figure key={photo.src} className="flex flex-col">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={640}
                height={384}
                sizes="(max-width: 640px) 100vw, 20rem"
                className="aspect-[5/3] w-full rounded-xl object-cover ring-1 ring-white/15"
              />
              <figcaption className="mt-2 text-sm text-white/60">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Education */}
      <section
        id="section-edu"
        className={SECTION_CARD}
      >
        <SectionKicker label="Education · Training" />
        <h2 className={SECTION_HEADING}>{t("edu.title")}</h2>
        <ol className="divide-y divide-white/10 text-lg">
          {[
            {
              title: t("edu.hub.title"),
              detail: t("edu.hub.detail"),
              code: "CYHU",
            },
            {
              title: t("edu.ocfc.title"),
              detail: t("edu.ocfc.detail"),
              code: "KSNA",
            },
            {
              title: t("edu.sunrise.title"),
              detail: t("edu.sunrise.detail"),
              code: null,
            },
            { title: t("edu.uci"), detail: null, code: null },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-start justify-between gap-4 py-5 first:pt-0 last:pb-0"
            >
              <div>
                <h3 className="text-2xl">
                  <ProjectTitle text={item.title} />
                </h3>
                {item.detail ? (
                  <p className="text-white/70">{item.detail}</p>
                ) : null}
              </div>
              {item.code ? (
                <span
                  aria-hidden="true"
                  className="shrink-0 select-none text-5xl font-bold uppercase leading-none tracking-tight text-white/10 sm:text-7xl"
                >
                  {item.code}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
      </div>
    </div>
  );
}
