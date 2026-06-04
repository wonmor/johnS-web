"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import type { Locale } from "../i18n/messages";

const JEBOS_GALLERY = [
  { src: "/gallery/ipad-jebediah/screens/screen-01.jpg", platform: "iPad", caption: "Split view — VFR sectional with Orch Vision synthetic PFD" },
  { src: "/gallery/ipad-jebediah/screens/screen-02.jpg", platform: "iPad", caption: "Satellite terrain map with NEXRAD-net weather overlay" },
  { src: "/gallery/ipad-jebediah/screens/screen-03.jpg", platform: "iPad", caption: "VFR sectional chart — Los Angeles terminal area" },
  { src: "/gallery/ipad-jebediah/screens/screen-04.jpg", platform: "iPad", caption: "IFR high-altitude enroute chart — SoCal Class B" },
  { src: "/gallery/ipad-jebediah/screens/screen-05.jpg", platform: "iPad", caption: "Flight plan builder with airport, VOR and fix search" },
  { src: "/gallery/ipad-jebediah/screens/screen-06.jpg", platform: "iPad", caption: "Live ADS-B traffic with synthetic vision attitude" },
  { src: "/gallery/ipad-jebediah/screens/extra-checklist.jpg", platform: "iPad", caption: "Preflight checklist — documents, walk-around, fuel, oil" },
  { src: "/gallery/ipad-jebediah/screens/extra-poh.jpg", platform: "iPad", caption: "POH reference — Cessna 152 V-speeds and weight limits" },
  { src: "/gallery/ipad-jebediah/screens/extra-weather.jpg", platform: "iPad", caption: "Weather briefing — METAR, TAF and PIREP overlay" },
  { src: "/gallery/ipad-jebediah/screens/extra-e6b.jpg", platform: "iPad", caption: "Built-in E6B flight computer for wind and fuel" },
  { src: "/products/jebos-1.webp", platform: "Android", caption: "VFR sectional chart with synthetic vision PFD" },
  { src: "/products/jebos-2.webp", platform: "Android", caption: "IFR enroute chart — Montreal waypoints and navaids" },
  { src: "/products/jebos-3.webp", platform: "Android", caption: "Airport diagram viewer — KOWD Norwood Memorial" },
  { src: "/products/jebos-4.webp", platform: "Web", caption: "Live ATC transcription with highlighted callsigns" },
  { src: "/products/jebos-5.webp", platform: "Web", caption: "Preflight checklist — documents, walk-around, fuel, oil" },
  { src: "/products/jebos-6.webp", platform: "Web", caption: "Settings — AIRAC data, navdata downloads" },
  { src: "/products/jebos-7.webp", platform: "Web", caption: "POH reference — Cessna 152 V-speeds and weight limits" },
  { src: "/products/jebos-8.webp", platform: "Web", caption: "Split view — POH sidebar with VFR map" },
  { src: "/products/jebos-9.webp", platform: "Web", caption: "Satellite overlay with ADS-B traffic contacts" },
];

export function BodyContent({ children }: { children: React.ReactNode }) {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const showSiteFooter = pathname !== "/privacy";

  return (
    <>
      <Script id="modal-toggle" strategy="afterInteractive">
        {`
          const toggle = (btnId, modalId, closeId) => {
            const btn = document.getElementById(btnId);
            const modal = document.getElementById(modalId);
            const close = document.getElementById(closeId);
            if (!btn || !modal || !close) return;
            btn.addEventListener('click',   () => modal.classList.remove('hidden'));
            close.addEventListener('click', () => modal.classList.add('hidden'));
          };
          toggle('privacy-btn', 'privacy-modal', 'privacy-close');
          toggle('eula-btn',    'eula-modal',    'eula-close');
        `}
      </Script>

      {showSiteFooter ? <WestminsterSilhouette /> : null}

      <main
        className={
          showSiteFooter ? "mb-10 flex-grow" : "min-h-[calc(100vh-5rem)] flex-grow"
        }
      >
        {children}
      </main>

      <PolicyModal />
      <EulaModal />

      {showSiteFooter ? (
        <>
          <FloatingOrchBanner />
          <div id="site-light-footer">
            {/* Footer with privacy link — bg matches the page so it blends seamlessly */}
            <div
              data-chrome-surface="dark"
              className="relative isolate flex min-h-[min(40vh,26rem)] flex-col bg-[#020824] pb-4 pt-8"
            >
              <AirshipFooterSilhouette />
              <div className="relative z-10 mt-auto flex justify-center px-4 pb-8 pt-6 sm:pb-10">
                <Link
                  href="/privacy"
                  className="pointer-events-auto text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 underline decoration-white/35 underline-offset-4 transition hover:text-white hover:decoration-white/60 sm:text-xs sm:tracking-[0.26em]"
                >
                  {t("privacy.title")}
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

/* ── Jebediah showcase: icon header + copy + autoplay video + gallery ── */
export function JebediahShowcase() {
  const { t } = useI18n();
  const [jebosVideoMuted, setJebosVideoMuted] = useState(true);
  const jebosVideoRefCb = useCallback((el: HTMLVideoElement | null) => {
    if (el) el.volume = 0.25;
  }, []);

  return (
    <section
      id="section-jebediah"
      className="w-full scroll-mt-24 rounded-2xl border border-white/10 bg-black/60 p-6 shadow-lg sm:p-8"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
          <Image
            src="/jebediah-icon.png"
            alt="Jeb's app icon"
            width={88}
            height={88}
            className="block h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
          />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/55">
            Available on iPad · Android · Web
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cyan-400/90">
            Early access
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="w-full md:w-1/2">
          <div className="mb-3">
            <h3 className="text-2xl uppercase md:text-3xl">
              <span className="block font-bold">{t("orchestr.jebos.title")}</span>
              <span className="mt-1 block font-thin tracking-[0.18em] text-white/70">
                Flight Bag
              </span>
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: t("orchestr.jebos.tag"), className: "border-cyan-400 text-cyan-400" },
                { label: "Desktop", className: "border-amber-400 text-amber-400" },
                { label: "Mobile", className: "border-emerald-400 text-emerald-400" },
                { label: "Web", className: "border-fuchsia-400 text-fuchsia-400" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${tag.className}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          <p className="mb-3 leading-relaxed text-white/90">
            Companion apps for iPad, Android tablets and the web share the same
            VFR/IFR chart engine, ADS-B traffic, METAR/TAF briefings, ATC
            transcription and POH library — so what you see on Avionic 1
            hardware mirrors to every device you fly with.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-white/60">
            {t("orchestr.jebos.features")}
          </p>
          <p className="mb-5 text-sm leading-relaxed text-white/70">
            {t("orchestr.jebos.desc")}
          </p>
          <a
            href="https://orchestrsim.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-cyan-300"
          >
            {t("orchestr.jebos.cta")}
          </a>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://apps.apple.com/us/app/jebediahs-flight-bag/id6766274262"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Jeb's Flight Bag on the App Store"
              className="inline-flex h-[46px] items-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 transition-colors hover:border-white/40"
            >
              <svg aria-hidden viewBox="0 0 384 512" className="h-6 w-6 fill-white">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-wide text-white/70">Download on the</span>
                <span className="mt-0.5 text-base font-semibold text-white">App Store</span>
              </span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.orchestrsim.jebediah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Jeb's Flight Bag on Google Play"
              className="inline-flex h-[46px] items-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 transition-colors hover:border-white/40"
            >
              <svg aria-hidden viewBox="0 0 512 512" className="h-[22px] w-[22px]">
                <path fill="#00d3ff" d="M48 59.5C45 63 43.3 68.4 43.3 75.4v361.2c0 7 1.7 12.4 4.7 15.9l1.2 1.2 202.4-202.4v-4.8L49.2 58.3z" />
                <path fill="#ffce00" d="M319 327.6l-67.4-67.5v-4.8l67.5-67.5 1.5.9 79.9 45.4c22.8 13 22.8 34.2 0 47.2l-79.9 45.4z" />
                <path fill="#ff3d00" d="M320.5 326.7L251.6 257.8 48 461.4c7.5 7.9 19.9 8.9 33.9 1L320.5 326.7" />
                <path fill="#00e676" d="M320.5 188.9L81.9 53.7C67.9 45.7 55.5 46.8 48 54.7l203.6 203.1z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-wide text-white/70">Get it on</span>
                <span className="mt-0.5 text-base font-semibold text-white">Google Play</span>
              </span>
            </a>
            <a
              href="https://orchaerospace.com/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try Jeb's Flight Bag on the Web"
              className="inline-flex h-[46px] items-center gap-2.5 rounded-xl border border-white/20 bg-black px-4 transition-colors hover:border-white/40"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-cyan-400" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[9px] uppercase tracking-wide text-white/70">Try it out on the</span>
                <span className="mt-0.5 text-base font-semibold text-white">Web</span>
              </span>
            </a>
          </div>
        </div>

        {/* Video demo */}
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-2xl border border-white/20">
            <video
              ref={jebosVideoRefCb}
              autoPlay
              loop
              muted={jebosVideoMuted}
              playsInline
              className="w-full"
            >
              <source src="/products/jebediah-ipad-demo.mp4" type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => setJebosVideoMuted((m) => !m)}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              {jebosVideoMuted ? (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                  PLAY SOUND
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  MUTE
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <JebosGallery />
    </section>
  );
}

/* ── JebediahOS auto-cycling screenshot gallery ── */
function JebosGallery() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % JEBOS_GALLERY.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-10 w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/20">
        {JEBOS_GALLERY.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: slide === i ? 1 : 0 }}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        ))}
        {/* Caption overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
          <div className="flex items-baseline gap-3">
            <span className="rounded-md border border-cyan-400/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {JEBOS_GALLERY[slide].platform}
            </span>
            <p className="text-sm font-medium text-white md:text-base">
              {JEBOS_GALLERY[slide].caption}
            </p>
          </div>
        </div>
        {/* Navigation dots */}
        <div className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-1.5">
          {JEBOS_GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                slide === i ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Floating banner that appears on scroll ── */
function FloatingOrchBanner() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const viewH = window.innerHeight;
    // Show after scrolling past 60% of viewport
    const showThreshold = viewH * 0.6;
    // Hide when the Orchestr footer section is in view
    const footer = footerRef.current ?? document.getElementById("site-light-footer");
    if (footer && !footerRef.current) footerRef.current = footer;

    if (footer) {
      const rect = footer.getBoundingClientRect();
      if (rect.top < viewH) {
        setVisible(false);
        return;
      }
    }
    setVisible(scrollY > showThreshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <a
      href="https://orchestrsim.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-1/2 z-[35] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-cyan-400/30 bg-[#060910]/90 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 hover:border-cyan-400/60 hover:bg-[#060910] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="flex h-2 w-2">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
      </span>
      <span className="text-xs font-medium tracking-wide text-white sm:text-sm">
        {t("orchestr.floatingBanner")}
      </span>
      <svg
        className="h-3.5 w-3.5 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </a>
  );
}

/* ── Small aircraft icon for Orchestr header ── */
function OrchAircraftIcon() {
  return (
    <span className="-ml-1 mb-2 inline-block opacity-60" aria-hidden="true">
      <svg
        width="46"
        height="20"
        viewBox="0 0 56 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M2 8.5H22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.6 2.8"
          opacity="0.9"
        />
        <path
          d="M2 13.5H20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.6 2.8"
          opacity="0.8"
        />
        <path
          d="M23 12L34 10.6L45 12L34 13.4L23 12Z"
          fill="currentColor"
        />
        <path
          d="M31.5 12L27 7.6H29.8L34 10.6L31.5 12Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M31.5 12L27 16.4H29.8L34 13.4L31.5 12Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M45 12L49.2 11.5L54 12L49.2 12.5L45 12Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function PolicyModal() {
  const { t } = useI18n();
  return (
    <div
      id="privacy-modal"
      className="fixed inset-0 z-[60] hidden flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#020824] p-6 text-white shadow-lg">
        <h2 className="mb-2 text-lg tracking-wide">{t("privacy.title")}</h2>
        <p className="mb-4 text-sm text-gray-300">{t("privacy.body")}</p>
        <button
          id="privacy-close"
          className="mt-2 rounded-md border border-white/40 px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black"
        >
          {t("privacy.close")}
        </button>
      </div>
    </div>
  );
}

function EulaModal() {
  const { t } = useI18n();
  return (
    <div
      id="eula-modal"
      className="fixed inset-0 z-[60] hidden flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-[#020824] p-6 text-white shadow-lg">
        <h2 className="mb-2 text-lg tracking-wide">{t("eula.title")}</h2>
        <p className="mb-4 text-sm text-gray-300">{t("eula.body")}</p>
        <button
          id="eula-close"
          className="mt-2 rounded-md border border-white/40 px-3 py-1 text-sm text-white transition hover:bg-white hover:text-black"
        >
          {t("eula.close")}
        </button>
      </div>
    </div>
  );
}

/** Decorative airship (blimp) silhouette; artwork from Open Clip Art Library (CC0). */
function AirshipFooterSilhouette() {
  return (
    <div
      data-chrome-probe-skip
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[min(30vh,17rem)] justify-center md:h-[min(34vh,20rem)]"
      aria-hidden
    >
      <span className="sr-only">
        Decorative airship silhouette in the page background.
      </span>
      <div className="relative h-full w-full max-w-6xl opacity-[0.42] sm:opacity-[0.52]">
        <Image
          src="/decorative/airship-blimp.svg"
          alt=""
          fill
          className="object-contain object-bottom [filter:brightness(0)_invert(1)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0.22)_72%,transparent_100%)]"
          sizes="(max-width:768px)100vw,72rem"
        />
      </div>
    </div>
  );
}

/**
 * London Tower Bridge silhouette from Wikimedia Commons (CC BY 3.0, author SelfishSeahorse).
 * https://commons.wikimedia.org/wiki/File:London_Tower_Bridge_Silhouette.svg
 */
function WestminsterSilhouette() {
  return (
    <div
      data-chrome-probe-skip
      className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-40 md:h-56 lg:h-64"
      aria-hidden
    >
      <span className="sr-only">
        Decorative skyline: London Tower Bridge silhouette, Wikimedia Commons, CC
        BY 3.0.
      </span>
      <div className="relative h-full w-full">
        <Image
          src="/decorative/london-tower-bridge-silhouette.svg"
          alt=""
          fill
          className="object-cover object-bottom [filter:brightness(0)_invert(1)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_85%)]"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
