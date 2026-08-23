"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { JebediahShowcase } from "./components/BodyContent";
import { LazyMountInView } from "./components/portfolio/LazyMountInView";
import { AppStoreBadge } from "./components/StoreBadges";
import { serifFont } from "./fonts";
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
    tintOnPaper: "",
  },
  {
    href: "https://web.archive.org/web/20240530133558/https://hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145",
    src: "/hdsb-wordmark.png",
    alt: "Halton District School Board",
    width: 400,
    height: 109,
    sizeClass: "h-12 sm:h-14",
    note: "(WebArchive.org)",
    // The wordmark ships in a pale blue meant for dark backgrounds — darken it
    // so it stays legible on paper.
    tintOnPaper: "[filter:brightness(0.62)_saturate(1.6)]",
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
const AtomModelCanvas = dynamic(
  () => import("./components/portfolio/AtomModelCanvas"),
  { ssr: false }
);

const tubeRed = "#f77f6b"; // legacy accent red (kept for logos)
const tubeBlue = "#003688";
const paper = "#f5f0e6"; // warm paper background, same cream as the hero
const ink = "#1c1a17"; // warm near-black text

type RoundelTheme = {
  ring: string;
  bar: string;
  decorStroke: string;
  /** Bridge + waves (FR); EN gets the Seoul tower under drifting clouds */
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
    default:
      return {
        ring: "#00B2A9",
        bar: "#007A8C",
        decorStroke: "#005A66",
        showBridgeAndWaves: false,
      };
  }
}

function roundelLandmarkSvg(locale: Locale): string | null {
  return locale === "en" ? "/n-seoul-tower-roundel.svg" : null;
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

type CloudPuff = {
  cx: number;
  baseCy: number;
  rx: number;
  ry: number;
  opacity: number;
};

/** Single drift speed (L→R, viewBox units per tick) — slower, uniform like wind. */
const CLOUD_DRIFT_PER_TICK = 0.11;

function initialCloudPuffs(): CloudPuff[] {
  return Array.from({ length: 38 }, () => ({
    cx: -40 + Math.random() * 185,
    baseCy: 4 + Math.random() * 92,
    /* Wide, shallow puffs — mostly flat / stratiform layers */
    rx: 3.5 + Math.random() * 13,
    ry: 0.22 + Math.random() * 1.05,
    opacity: 0.2 + Math.random() * 0.52,
  }));
}

/** Seoul roundel: puffs drift slowly in one direction (left → right). */
function RoundelCloudDecor({ decorStroke }: { decorStroke: string }) {
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

  const [puffs, setPuffs] = useState(() => initialCloudPuffs());
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    // rAF instead of a 16 ms interval: it yields to the compositor and pauses
    // outright when the tab is hidden.
    let frame = 0;
    const tick = () => {
      setPuffs((prev) =>
        prev.map((p) => {
          let nx = p.cx + CLOUD_DRIFT_PER_TICK;
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
          id="roundel-cloud-soft"
          x="-45%"
          y="-45%"
          width="190%"
          height="190%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.85 0.28" />
        </filter>
      </defs>
      <g filter="url(#roundel-cloud-soft)">
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
  const theme = getRoundelTheme(locale);
  const nameFontFamily = serifFont.style.fontFamily;

  const reducedMotion = usePrefersReducedMotion();
  const showFrBridge = theme.showBridgeAndWaves;
  const animateWaves = showFrBridge && !reducedMotion;

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

      {!showFrBridge ? (
        <>
          <RoundelCloudDecor decorStroke={theme.decorStroke} />
          <RoundelLandmarkFill locale={locale} color={theme.decorStroke} />
        </>
      ) : null}

      {/* Hollow center — paper, so it reads as a hole in the ring */}
      <div
        style={{
          position: "absolute",
          width: 70,
          height: 70,
          borderRadius: "50%",
          backgroundColor: paper,
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
  const wingColor = getRoundelTheme(locale).bar;
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

/**
 * Quebec's fleur-de-lis, the one off the flag, drawn in gold beside the
 * "built in Quebec" line. Decorative — the flag next to it already carries the
 * meaning, so it stays out of the accessibility tree. The petals are flattened
 * to polygons, so the mark needs no font and no asset of its own.
 */
function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 44"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      {/* centre petal */}
      <path d="M15.8 1.4 L15.4 2.2 L15.0 3.0 L14.7 3.8 L14.3 4.6 L14.0 5.4 L13.6 6.3 L13.3 7.2 L13.0 8.0 L12.7 8.9 L12.4 9.8 L12.2 10.7 L12.4 11.6 L12.7 12.5 L12.9 13.4 L13.2 14.3 L13.6 15.1 L13.9 16.0 L14.2 16.8 L14.6 17.6 L15.0 18.4 L15.5 19.2 L16.0 20.0 L16.0 20.0 L16.3 19.1 L16.5 18.3 L16.7 17.4 L16.9 16.5 L17.1 15.7 L17.3 14.8 L17.5 14.0 L17.7 13.2 L17.9 12.3 L18.1 11.5 L18.3 10.7 L18.1 9.9 L17.8 9.1 L17.6 8.2 L17.4 7.4 L17.2 6.5 L17.0 5.7 L16.8 4.9 L16.6 4.0 L16.5 3.1 L16.3 2.3 L16.2 1.4 Z" />
      {/* lateral petals, mirrored about x=16 */}
      <path d="M14.7 18.1 L14.3 18.0 L13.9 17.8 L13.4 17.5 L12.9 17.2 L12.5 16.9 L12.0 16.5 L11.5 16.1 L11.0 15.7 L10.5 15.2 L10.1 14.8 L9.5 14.5 L8.8 14.2 L8.2 14.0 L7.6 13.8 L6.9 13.6 L6.2 13.5 L5.5 13.5 L4.6 13.7 L3.9 14.2 L3.4 14.9 L3.1 15.6 L3.0 16.3 L3.0 17.1 L3.1 17.9 L3.3 18.9 L3.5 20.0 L3.8 21.3 L4.2 22.7 L4.6 24.4 L5.2 26.2 L5.2 26.2 L5.0 24.3 L4.9 22.6 L4.8 21.1 L4.8 19.9 L4.9 18.8 L5.0 17.9 L5.2 17.3 L5.4 16.8 L5.6 16.6 L5.7 16.6 L5.7 16.8 L5.5 17.0 L5.3 17.2 L5.3 17.3 L5.4 17.4 L5.7 17.7 L6.0 18.0 L6.3 18.3 L6.8 18.7 L7.3 19.1 L7.9 19.4 L8.6 19.6 L9.3 19.9 L10.1 20.2 L10.8 20.4 L11.6 20.6 L12.4 20.8 L13.2 20.8 L14.1 20.8 L14.9 20.7 Z" />
      <path d="M17.3 18.1 L17.7 18.0 L18.1 17.8 L18.6 17.5 L19.1 17.2 L19.5 16.9 L20.0 16.5 L20.5 16.1 L21.0 15.7 L21.5 15.2 L21.9 14.8 L22.5 14.5 L23.2 14.2 L23.8 14.0 L24.4 13.8 L25.1 13.6 L25.8 13.5 L26.5 13.5 L27.4 13.7 L28.1 14.2 L28.6 14.9 L28.9 15.6 L29.0 16.3 L29.0 17.1 L28.9 17.9 L28.7 18.9 L28.5 20.0 L28.2 21.3 L27.8 22.7 L27.4 24.4 L26.8 26.2 L26.8 26.2 L27.0 24.3 L27.1 22.6 L27.2 21.1 L27.2 19.9 L27.1 18.8 L27.0 17.9 L26.8 17.3 L26.6 16.8 L26.4 16.6 L26.3 16.6 L26.3 16.8 L26.5 17.0 L26.7 17.2 L26.7 17.3 L26.6 17.4 L26.3 17.7 L26.0 18.0 L25.7 18.3 L25.2 18.7 L24.7 19.1 L24.1 19.4 L23.4 19.6 L22.7 19.9 L21.9 20.2 L21.2 20.4 L20.4 20.6 L19.6 20.8 L18.8 20.8 L17.9 20.8 L17.1 20.7Z" />
      {/* band and flared foot */}
      <rect x="8.4" y="19.4" width="15.2" height="3.1" rx="1.55" />
      <path d="M13 22.9c-.6 4-2.8 7.3-2.6 11.1.2 3.4 2.6 5.6 5.6 7.9 3-2.3 5.4-4.5 5.6-7.9.2-3.8-2-7.1-2.6-11.1z" />
    </svg>
  );
}

function splitTitleYear(text: string): { main: string; year: string | null } {
  const m = text.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  if (!m) return { main: text, year: null };
  return { main: m[1].trim(), year: m[2].trim() };
}

const ATOM_VIEWERS = [
  {
    key: "gadolinium",
    modelPath: "/model-4.gltf",
    tabKey: "gltf.tabGd",
    titleKey: "gltf.gdTitle",
    bodyKey: "gltf.gdBody",
    loadingKey: "gltf.loadingGd",
    linkAfterBody: false,
  },
  {
    key: "benzene",
    modelPath: "/model-6.gltf",
    modelSize: 0.3,
    tabKey: "gltf.tabBenzene",
    titleKey: "gltf.benzeneTitle",
    bodyKey: "gltf.benzeneBody",
    loadingKey: "gltf.loadingBenzene",
    linkAfterBody: true,
  },
] as const;

type AtomViewerKey = (typeof ATOM_VIEWERS)[number]["key"];

/**
 * The .gltf snapshots render in-page again — no iframe to electronvisual.org.
 * OrbitControls still swallows wheel and touch events, so a page scroll that
 * reaches the canvas would die inside it. A shield sits over the viewer until
 * the visitor clicks in (same deal as a Google Maps embed): scrolling passes
 * straight through, dragging doesn't.
 */
function StaticModelViewer({
  modelPath,
  modelSize,
  title,
}: {
  modelPath: string;
  modelSize?: number;
  title: string;
}) {
  const { t } = useI18n();
  const [interactive, setInteractive] = useState(false);
  const shellRef = React.useRef<HTMLDivElement | null>(null);

  // Re-arm the shield once the viewer leaves the viewport, so scrolling back to
  // it later doesn't hit a still-live grab — the only way out on touch, where
  // there is no pointer to move away.
  useEffect(() => {
    const el = shellRef.current;
    if (!el || !interactive) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setInteractive(false);
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [interactive]);

  return (
    <div
      ref={shellRef}
      onMouseLeave={() => setInteractive(false)}
      className="relative h-[380px] w-full overflow-hidden rounded-xl bg-black ring-1 ring-black/10 sm:h-[480px]"
    >
      <Suspense fallback={<ModelLoading label={`${title}…`} />}>
        <AtomModelCanvas modelPath={modelPath} size={modelSize} />
      </Suspense>
      {!interactive ? (
        <button
          type="button"
          onClick={() => setInteractive(true)}
          aria-label={t("atoms.interact", { title })}
          className="group absolute inset-0 flex cursor-pointer items-end justify-center bg-transparent pb-4 transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/40"
        >
          <span className="rounded-full bg-black/55 px-3 py-1.5 text-[13px] text-white/70 backdrop-blur-sm transition-opacity duration-200 group-focus-visible:opacity-100 motion-reduce:transition-none sm:opacity-0 sm:group-hover:opacity-100">
            <span className="sm:hidden">{t("atoms.rotateTouch")}</span>
            <span className="hidden sm:inline">{t("atoms.rotatePointer")}</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** Fills the black frame while the model file is still downloading. */
function ModelLoading({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black text-sm font-light text-white/50">
      {label}
    </div>
  );
}

/** Quiet stand-in while the viewer is still out of view — matches the black frame it becomes. */
function RendererPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-[380px] items-center justify-center rounded-xl bg-black text-center text-xl font-light text-white/50 ring-1 ring-black/10 sm:h-[480px]">
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
      <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-black/10">
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
        <figcaption className="mt-2 text-sm text-[#1c1a17]/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
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
            yearClassName ?? "mt-0.5 block text-sm text-[#1c1a17]/50"
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
  const headerRoundelTheme = getRoundelTheme(locale);
  const [activeTab, setActiveTab] = useState<AtomViewerKey>("benzene");
  // Which viewers have been opened at least once — they stay mounted after.
  const [openedTabs, setOpenedTabs] = useState<Record<AtomViewerKey, boolean>>({
    benzene: true,
    gadolinium: false,
  });
  const [atoms3dUnlocked, setAtoms3dUnlocked] = useState(false);

  // The renderer computes its density server-side, so the wait starts when the
  // iframe does. Mount both viewers as soon as the browser is idle — hidden,
  // but already warming — instead of waiting for a scroll or a click.
  useEffect(() => {
    const conn = (navigator as { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    const warm = () => {
      setAtoms3dUnlocked(true);
      setOpenedTabs({ benzene: true, gadolinium: true });
    };

    const idle = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    if (idle) {
      const id = idle(warm, { timeout: 2500 });
      return () =>
        (
          window as unknown as { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback?.(id);
    }
    const t = setTimeout(warm, 1200);
    return () => clearTimeout(t);
  }, []);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [avatarRevealed, setAvatarRevealed] = useState(false);
  // Just long enough to land after first paint, so the portrait still fades in
  // rather than popping — it used to sit blank for a second and a half first.
  useEffect(() => {
    const t = setTimeout(() => setAvatarRevealed(true), 120);
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
      data-chrome-surface="light"
      className="flex flex-col gap-6 pb-14 sm:pb-16"
      style={{ background: paper, color: ink }}
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
            /* The portrait used to hit the banner's bottom edge as a hard cut
               just under the email line; fade it out into the paper instead. */
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 52%, rgba(0,0,0,0) 90%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 52%, rgba(0,0,0,0) 90%)",
            }}
          />
          <div className="relative z-10">
            <Link href="/" className="mx-auto block w-fit">
              <TubeRoundelWith787 />
            </Link>
            <p className="mt-4 text-xs tracking-[0.18em] text-[#1c1a17]/55 sm:text-sm">
              {t("hero.landmark")}
            </p>
            {/* The page's only h1 — everything below hangs off it. */}
            <h1 className="mt-2 text-2xl lowercase tracking-[0.16em]">
              {t("hero.line1")}
              <br />
              {t("hero.line2")}
            </h1>
            <a
              href={`mailto:${t("hero.email")}`}
              className="mt-3 inline-block text-[#1c1a17] underline decoration-[#1c1a17]/25 underline-offset-4 transition-colors hover:decoration-[#1c1a17]"
            >
              {t("hero.email")}
            </a>
          </div>
        </div>
        <div data-chrome-surface="light" className="bg-[#f5f0e6] py-8">
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
                  opacity: 0.55,
                  mixBlendMode: "multiply",
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
                transition: "opacity 420ms ease, transform 420ms ease",
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

            <div className="text-center">
              <p className="text-xl">{t("awards.wwdc")}</p>
              <p className="mt-1 text-sm text-[#1c1a17]/55">
                {t("awards.wwdcVenue")}
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center gap-2">
              <p className="flex items-center gap-1">
                <Image
                  src="/american-flag.png"
                  alt="American Flag"
                  width={24}
                  height={16}
                />
                <span>{t("awards.usVisa")}</span>
              </p>
              <p className="flex items-center gap-1">
                <Image src="/uk-flag.png" alt="UK Flag" width={24} height={16} />
                <span>{t("awards.ukVisa")}</span>
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
                  <span className="text-sm text-[#1c1a17]/70">
                    {t("awards.madeInQuebec")}
                  </span>
                  <FleurDeLis className="h-[18px] w-auto text-[#a67c00]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Media — logos sit bare on the background and only come up on hover */}
      <div className="mt-4 text-center">
        <p className="mb-3 text-sm text-[#1c1a17]/50">
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
                className={`w-auto object-contain ${logo.sizeClass} ${
                  logo.tintOnPaper ?? ""
                }`}
              />
              {"note" in logo && logo.note ? (
                <span className="text-xs text-[#1c1a17]/40">{logo.note}</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>

      {/* Navigation bar */}
      <nav
        aria-label={t("section.elsewhere")}
        className="m-auto flex w-fit flex-wrap justify-center gap-x-8 gap-y-3 text-base lowercase text-[#1c1a17]/60"
      >
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            className="underline decoration-transparent underline-offset-4 transition-colors duration-200 hover:text-[#1c1a17] hover:decoration-[#1c1a17]/40"
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
      <div className="pt-4 sm:pt-6">
        <h2 className="text-3xl font-light lowercase tracking-tight sm:text-4xl">
          {t("section.showcase")}
        </h2>
      </div>
      <JebediahShowcase />

      {/* Gadolinium / Benzene Tabs */}
      <div className={SECTION_CARD}>
        <h2 className={SECTION_HEADING}>{t("section.atoms")}</h2>
        {/* Segmented control: one pill, two states — reads as a switch, not two buttons */}
        <div
          role="tablist"
          aria-label={t("atoms.viewerLabel")}
          className="mb-5 flex w-full max-w-xs rounded-full border border-[#1c1a17]/15 p-1"
        >
          {ATOM_VIEWERS.map((viewer) => (
            <button
              key={viewer.key}
              type="button"
              role="tab"
              aria-selected={activeTab === viewer.key}
              className={`flex-1 rounded-full px-4 py-2 text-sm lowercase transition-colors duration-200 ${
                activeTab === viewer.key
                  ? "bg-[#1c1a17] text-[#f5f0e6]"
                  : "text-[#1c1a17]/60 hover:text-[#1c1a17]"
              }`}
              onClick={() => {
                setAtoms3dUnlocked(true);
                setActiveTab(viewer.key);
                setOpenedTabs((prev) => ({ ...prev, [viewer.key]: true }));
              }}
            >
              {t(viewer.tabKey)}
            </button>
          ))}
        </div>

        {/* Anchor sits on the viewer, so the nav tab lands on the renderer
            itself rather than the section heading above it. Both panels stay
            mounted once opened and the inactive one is only hidden — swapping
            tabs must not tear down a loaded renderer. */}
        <div id="section-atoms" className="scroll-mt-24">
          {ATOM_VIEWERS.map((viewer) =>
            openedTabs[viewer.key] ? (
              <div
                key={viewer.key}
                className={activeTab === viewer.key ? "" : "hidden"}
              >
                <LazyMountInView
                  unlock={atoms3dUnlocked}
                  rootMargin="220px 0px 260px 0px"
                  fallback={
                    <RendererPlaceholder label={t(viewer.loadingKey)} />
                  }
                >
                  <StaticModelViewer
                    modelPath={viewer.modelPath}
                    modelSize={"modelSize" in viewer ? viewer.modelSize : undefined}
                    title={t(viewer.titleKey)}
                  />
                </LazyMountInView>
                <div className="mt-5">
                  <h3 className="text-2xl lowercase">{t(viewer.titleKey)}</h3>
                  <p className="mt-2 text-[#1c1a17]/70">
                    {t(viewer.bodyKey)}
                    {viewer.linkAfterBody ? (
                      <>
                        {" "}
                        <a
                          href="https://electronvisual.org"
                          className={LINK_INLINE}
                        >
                          ElectronVisual.org
                        </a>
                        .
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            ) : null
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
              alt="Walter Kohn — From Kindertransport and Internment to DFT and the Nobel Prize (Sir David Clary FRS). Front cover features John Wonmo Seong's DFT electron density visualisation."
              width={865}
              height={947}
              className="h-full w-full rounded-lg object-cover ring-1 ring-black/10"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
            <Image
              src="/atomizer-screens.jpg"
              alt="Atomizer AR — 2023 Swift Student Challenge Winner; iron (Fe) and sodium (Na) electron configurations rendered in real time on iPhone"
              width={1077}
              height={1400}
              className="h-full w-full rounded-lg object-cover ring-1 ring-black/10"
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
              className="h-full w-full rounded-lg object-cover ring-1 ring-black/10"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
            <Image
              src="/electronvis-2.jpg"
              alt="ElectronVisualized molecular orbital render"
              width={1200}
              height={900}
              className="h-full w-full rounded-lg object-cover ring-1 ring-black/10"
              sizes="(max-width: 640px) 45vw, 20rem"
            />
          </div>
          {/* Row 3: preface credit, full width on a white card */}
          <a
            href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg bg-white p-3 ring-1 ring-black/10 transition hover:ring-black/25"
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
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1c1a17]/20 px-3 py-1 text-xs text-[#1c1a17]/65">
          <span aria-hidden>★</span>
          Apple Swift Student Challenge, 2023
        </div>
        <h2 className={SECTION_HEADING}>
          <ProjectTitle text={t("electron.title")} />
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-lg marker:text-[#1c1a17]/30">
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
        <h2 className={SECTION_HEADING}>{t("section.face")}</h2>
        {/* The mesh is lit pale, so it keeps a dark frame of its own on paper. */}
        <div className="overflow-hidden rounded-xl bg-[#0d0f14] ring-1 ring-black/10">
          <LazyMountInView
            rootMargin="240px 0px 320px 0px"
            fallback={
              <div className="flex h-[400px] items-center justify-center text-center text-2xl font-light text-white/50">
                {t("face.loading")}
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="flex h-[400px] items-center justify-center text-center text-2xl font-light text-white/50">
                  {t("face.loading")}
                </div>
              }
            >
              <FaceCanvas />
            </Suspense>
          </LazyMountInView>
        </div>
        <div className="mt-5">
          <h3 className="text-2xl lowercase">{t("face.title")}</h3>
          <p className="mt-2 text-[#1c1a17]/70">{t("face.body")}</p>
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
        <h2 className={SECTION_HEADING}>{t("orch.title")}</h2>
        <ul className="list-disc space-y-2 pl-5 text-lg marker:text-[#1c1a17]/30">
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
        <h2 className={SECTION_HEADING}>{t("exp.title")}</h2>
        {/* Timeline rail: one vertical line ties the roles together */}
        <ol className="space-y-6 border-l border-[#1c1a17]/15 pl-6 text-lg">
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
            <li key={role.title}>
              <h3 className="text-2xl lowercase">
                <ProjectTitle text={role.title} />
              </h3>
              <p className="text-[#1c1a17]/70">{role.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className={`${SECTION_CARD} space-y-8`}>
        <h2 className={SECTION_HEADING}>{t("section.moments")}</h2>
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
                className="aspect-[5/3] w-full rounded-xl object-cover ring-1 ring-black/10"
              />
              <figcaption className="mt-2 text-sm text-[#1c1a17]/55">
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
        <h2 className={SECTION_HEADING}>{t("edu.title")}</h2>
        <ol className="divide-y divide-[#1c1a17]/10 text-lg">
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
                  <p className="text-[#1c1a17]/70">{item.detail}</p>
                ) : null}
              </div>
              {item.code ? (
                <span
                  aria-hidden="true"
                  className="shrink-0 select-none text-5xl leading-none tracking-tight text-[#1c1a17]/10 sm:text-7xl"
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
