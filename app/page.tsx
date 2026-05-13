"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { LazyMountInView } from "./components/portfolio/LazyMountInView";
import { ibmPlexSansKRFontStack, tubeFont } from "./fonts";
import { useI18n } from "./i18n/context";
import type { Locale } from "./i18n/messages";

const BenzeneCanvas = dynamic(
  () => import("./components/portfolio/BenzeneCanvas"),
  { ssr: false }
);
const GadoliniumCanvas = dynamic(
  () => import("./components/portfolio/GadoliniumCanvas"),
  { ssr: false }
);
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

  useEffect(() => {
    const id = setInterval(() => {
      setPuffs((prev) =>
        prev.map((p) => {
          let nx = p.cx + KO_CLOUD_DRIFT_PER_TICK;
          if (nx > 122) nx = -32 - Math.random() * 28;
          return { ...p, cx: nx };
        })
      );
    }, 16);
    return () => clearInterval(id);
  }, []);

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
  const theme = getRoundelTheme(locale);
  const nameFontFamily =
    locale === "ko" ? ibmPlexSansKRFontStack : tubeFont.style.fontFamily;

  const showFrBridge = theme.showBridgeAndWaves;
  const showEnWater = locale === "en";
  const animateWaves = showFrBridge || showEnWater;

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
    const interval = setInterval(() => {
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
    }, 16);
    return () => clearInterval(interval);
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
          <RoundelLandmarkFill locale={locale} color={theme.decorStroke} />
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

      {locale === "ko" ? (
        <KoreanRoundelCloudDecor decorStroke={theme.decorStroke} />
      ) : null}

      {!showFrBridge && !showEnWater ? (
        <RoundelLandmarkFill locale={locale} color={theme.decorStroke} />
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
        <g fill={wingColor} opacity="0.05">
          <path d={`M 38 78 Q -5 66 -85 45 Q -30 58 10 70 Z`} />
          <path d={`M 102 78 Q 145 66 225 45 Q 170 58 130 70 Z`} />
        </g>


        {/* Subtle wing fill (kept ultra-thin) */}
        <g fill={wingColor} opacity="0.06">
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


export default function Portfolio() {
  const { t, locale } = useI18n();
  const headerRoundelTheme = getRoundelTheme(locale);
  const [activeTab, setActiveTab] = useState<"benzene" | "gadolinium">(
    "benzene"
  );
  const [atoms3dUnlocked, setAtoms3dUnlocked] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const benzeneRef = useRef<HTMLDivElement>(null);
  const gadoliniumRef = useRef<HTMLDivElement>(null);

  // Scroll-based tab switching
  useEffect(() => {
    const onScroll = () => {
      const benzeneTop = benzeneRef.current?.offsetTop || 0;
      const gadTop = gadoliniumRef.current?.offsetTop || 0;
      const scrollY = window.scrollY + window.innerHeight / 2;
      if (scrollY < gadTop) setActiveTab("benzene");
      else if (scrollY >= gadTop) setActiveTab("gadolinium");
      setHeroScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
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
          className="bg-[#f5f0e6] pb-8 pt-[calc(3.5rem+env(safe-area-inset-top)+3rem)] text-black sm:pt-[calc(4rem+env(safe-area-inset-top)+3.5rem)]"
        >
          <Link href="/" className="mx-auto block w-fit">
            <TubeRoundelWith787 />
          </Link>
          <p className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gray-600 sm:text-[0.7rem] sm:tracking-[0.26em]">
            {t("hero.landmark")}
          </p>
          <p className="mt-2 text-2xl uppercase tracking-[0.25em]">
            {t("hero.line1")}
            <br />
            {t("hero.line2")}
          </p>
          <span className="text-black">{t("hero.email")}</span>
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
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                style={{
                  width: "min(85vw, 30rem)",
                  height: "auto",
                  opacity: 0.4,
                  filter: "invert(1)",
                }}
              />
            <div
              className="relative rounded-full border-4 overflow-hidden"
              style={{
                borderColor: headerRoundelTheme.ring,
                width: 200,
                height: 200,
                boxSizing: "border-box",
              }}
            >
              <Image
                src="/IMG_2530.jpg"
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
                  transition: "opacity 400ms ease",
                }}
              />
              <Image
                src="/reach-logo.jpg"
                alt={t("awards.reachAlt")}
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
                  transition: "opacity 400ms ease",
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

      {/* Featured Media */}
      <div className="mt-4 text-center">
        <p className="mb-2 text-xs uppercase tracking-wider text-gray-400">
          {t("media.featured")}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-900 border border-white/10 rounded-md p-2 hover:bg-black transition-all"
          >
            <Image
              src="/mobilesyrup.png"
              alt="MobileSyrup"
              width={100}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </a>
          <a
            href="https://web.archive.org/web/20240530133558/https://hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gray-900 border border-white/10 rounded-md p-2 hover:bg-black transition-all"
          >
            <Image
              src="/hdsb.svg"
              alt="HDSB"
              width={100}
              height={40}
              style={{
                objectFit: "contain",
              }}
            />
          </a>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="w-fit m-auto flex flex-wrap justify-center gap-6 text-md font-medium text-gray-300">
        {/* <a
          className="hover:underline hover:text-[#e32017] transition-all"
          href="https://medium.com/@wonmor"
        >
          Articles
        </a> */}
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://github.com/wonmor"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="hover:underline hover:text-white transition-all"
          href="https://www.linkedin.com/in/john-seong-9194321a9/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </nav>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6">
      {/* Gadolinium / Benzene Tabs */}
      <div
        id="section-atoms"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-4 shadow-md"
      >
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "gadolinium"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white/60"
            }`}
            onClick={() => {
              setAtoms3dUnlocked(true);
              setActiveTab("gadolinium");
            }}
          >
            {t("gltf.tabGd")}
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "benzene"
                ? "bg-white text-black"
                : "bg-transparent text-white border border-white/60"
            }`}
            onClick={() => {
              setAtoms3dUnlocked(true);
              setActiveTab("benzene");
            }}
          >
            {t("gltf.tabBenzene")}
          </button>
        </div>

        <div ref={benzeneRef}>
          {activeTab === "benzene" && (
            <div className="bg-black rounded-md p-6 shadow-lg">
              <LazyMountInView
                unlock={atoms3dUnlocked}
                rootMargin="220px 0px 260px 0px"
                fallback={
                  <div className="flex h-[300px] items-center justify-center text-center text-3xl font-thin text-white">
                    {t("gltf.loadingBenzene")}
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-[300px] items-center justify-center text-center text-3xl font-thin text-white">
                      {t("gltf.loadingBenzene")}
                    </div>
                  }
                >
                  <BenzeneCanvas />
                </Suspense>
              </LazyMountInView>
              <div className="bg-gray-900 p-6 text-center text-white">
                <h4 className="text-2xl tracking-wide">
                  {t("gltf.benzeneTitle")}
                </h4>
                <p className="mt-2 text-gray-300">
                  {t("gltf.benzeneBody")}{" "}
                  <a
                    href="https://electronvisual.org"
                    className="hover:underline"
                  >
                    <code>ElectronVisual.org</code>
                  </a>
                  .
                </p>
                <a
                  href="https://electronvisual.org"
                  className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#003688]"
                >
                  {t("gltf.benzeneCta")} <code>ElectronVisual.org</code>
                </a>
              </div>
            </div>
          )}
        </div>

        <div ref={gadoliniumRef}>
          {activeTab === "gadolinium" && (
            <div className="bg-black rounded-md p-6 shadow-lg">
              <LazyMountInView
                unlock={atoms3dUnlocked}
                rootMargin="220px 0px 260px 0px"
                fallback={
                  <div className="flex h-[400px] items-center justify-center text-center text-3xl font-thin text-white">
                    {t("gltf.loadingGd")}
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-[400px] items-center justify-center text-center text-3xl font-thin text-white">
                      {t("gltf.loadingGd")}
                    </div>
                  }
                >
                  <GadoliniumCanvas />
                </Suspense>
              </LazyMountInView>
              <div className="bg-gray-900 p-6 text-center text-white">
                <h4 className="text-2xl tracking-wide">{t("gltf.gdTitle")}</h4>
                <p className="mt-2 text-gray-300">{t("gltf.gdBody")}</p>
                <a
                  href="https://github.com/wonmor/ElectronVisualized"
                  className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-[#003688]"
                >
                  {t("gltf.github")}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ElectronVisual Section */}
      <section
        id="section-electron"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-6 shadow-lg"
      >
        <h3 className="mb-4 text-3xl uppercase">
          {t("electron.title")}
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("electron.li1")}</li>
          <li>{t("electron.li2")}</li>
          <li>
            {t("electron.li3Before")}{" "}
            <a
              href="https://www.worldscientific.com/doi/suppl/10.1142/13806/suppl_file/13806_preface.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline"
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
                className="text-cyan-300 hover:underline"
              >
                https://doi.org/10.1142/13806
              </a>
              )
            </i>
          </li>
          <li>
            {t("electron.li4")}{" "}
            <a
              href="https://www.youtube.com/watch?v=kHcdvyaqslU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              YouTube
            </a>
          </li>
        </ul>
        {/* App Store badge */}
        <div className="mt-6 flex justify-left">
          <a
            href="https://apps.apple.com/us/app/atomizer-ar/id6449015706"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("electron.appStoreAtomizer")}
          >
            <img
              src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png?raw=true"
              alt={t("electron.appStoreBadgeAlt")}
              height={50}
              style={{ height: 50, cursor: "pointer" }}
            />
          </a>
        </div>
        <a
          href="https://www.electronvisual.org"
            className="mr-2 mt-4 inline-block rounded bg-white px-4 py-2 text-black hover:bg-gray-200"
        >
          {t("electron.visit")} <code>ElectronVisual.org</code>
        </a>
      </section>

      {/* 3D Face Model */}
      <div
        id="section-face"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-6 shadow-lg"
      >
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
        <div className="bg-gray-900 p-6 text-center text-white">
          <h4 className="text-2xl tracking-wide">{t("face.title")}</h4>
          <p className="mt-2 text-gray-300">{t("face.body")}</p>
          <a
            href="https://www.youtube.com/watch?v=LqiZKoXhtDA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded border border-white px-4 py-2 text-white transition hover:bg-white hover:text-black"
          >
            {t("face.cta")}
          </a>
        </div>
      </div>

      {/* OpticALLY Section */}
      <section
        id="section-orch"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-6 shadow-md"
      >
        <h3 className="mb-4 text-3xl uppercase">{t("orch.title")}</h3>
        <ul className="list-disc space-y-2 pl-6 text-lg">
          <li>{t("orch.li1")}</li>
          <li>{t("orch.li2")}</li>
          <li>{t("orch.li3")}</li>
        </ul>
        <div className="mt-6 flex justify-start">
          <a
            href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://apps.apple.com/bj/app/orch-3d-head-face-scan/id6468313142&ved=2ahUKEwj6r4XErruPAxWlDjQIHZQ5OhgQFnoECBsQAQ&usg=AOvVaw3DnwsFFuRSjo5L9x6z3-PF"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("orch.appStoreAlt")}
          >
            <img
              src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png?raw=true"
              alt={t("orch.appStoreAlt")}
              height={50}
              style={{ height: 50, cursor: "pointer" }}
            />
          </a>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <iframe
            className="m-auto max-w-full overflow-hidden rounded-lg shadow-lg"
            width="350"
            height="250"
            src="https://www.youtube.com/embed/LqiZKoXhtDA?si=T8ZAd0P-vh_x1XaY"
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <p className="mt-2 text-center text-sm italic text-gray-300">
            {t("footer.video2Caption")}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="section-exp"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-6 shadow-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <iframe
            className="m-auto max-w-full overflow-hidden rounded-lg shadow-lg"
            width="350"
            height="250"
            src="https://www.youtube.com/embed/F95lSwabPpE?si=WpEctEsx-AZGBeGr"
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <p className="mt-2 text-center text-sm italic text-gray-300">
            {t("footer.video1Caption")}
          </p>
        </div>
        <h3 className="mb-4 text-3xl uppercase">{t("exp.title")}</h3>
        <div className="space-y-6 text-lg">
          <div>
            <h4 className="text-2xl">{t("exp.orchestr")}</h4>
            <p>
              <a
                href={t("exp.orchestrSite")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                {t("exp.orchestrSite")}
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-2xl">{t("exp.reach")}</h4>
            <p>{t("exp.reachBody")}</p>
          </div>
          <div>
            <h4 className="text-2xl">{t("exp.snu")}</h4>
            <p>{t("exp.snuBody")}</p>
          </div>
        </div>
      </section>

      <div
        className="w-full scroll-mt-24 space-y-8 rounded-md border border-white/10 bg-black/60 p-6 shadow-md"
      >
        <div className="flex flex-col items-center text-center">
          <Image
            src="/IMG_3505.jpg"
            alt="With iJustine"
            width={320}
            height={192}
            style={{ objectFit: "contain" }}
          />
          <p className="mt-2 text-sm italic text-gray-300">
            {t("footer.photo1Caption")}
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/IMG_0629.jpeg"
            alt="With flight instructor"
            width={320}
            height={192}
            style={{ objectFit: "contain" }}
          />
          <p className="mt-2 text-sm italic text-gray-300">
            {t("footer.photo2Caption")}
          </p>
        </div>
      </div>

      {/* Education */}
      <section
        id="section-edu"
        className="w-full scroll-mt-24 rounded-md border border-white/10 bg-black/60 p-6 shadow-md"
      >
        <h3 className="mb-4 text-3xl uppercase">{t("edu.title")}</h3>
        <ol className="list-decimal space-y-6 pl-6 text-lg marker:text-gray-400">
          <li>
            <h4 className="text-2xl">{t("edu.hub.title")}</h4>
            <p className="text-gray-300">{t("edu.hub.detail")}</p>
          </li>
          <li>
            <h4 className="text-2xl">{t("edu.ocfc.title")}</h4>
            <p className="text-gray-300">{t("edu.ocfc.detail")}</p>
          </li>
          <li>
            <h4 className="text-2xl">{t("edu.sunrise.title")}</h4>
            <p className="text-gray-300">{t("edu.sunrise.detail")}</p>
          </li>
          <li>
            <p className="text-2xl">{t("edu.uci")}</p>
          </li>
        </ol>
      </section>
      </div>
    </div>
  );
}
