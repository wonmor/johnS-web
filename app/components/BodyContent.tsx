"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import type { Locale } from "../i18n/messages";

const JEBOS_GALLERY = [
  { src: "/products/jebos-1.webp", caption: "VFR sectional chart with synthetic vision PFD" },
  { src: "/products/jebos-2.webp", caption: "IFR enroute chart — Montreal waypoints and navaids" },
  { src: "/products/jebos-3.webp", caption: "Airport diagram viewer — KOWD Norwood Memorial" },
  { src: "/products/jebos-4.webp", caption: "Live ATC transcription with highlighted callsigns" },
  { src: "/products/jebos-5.webp", caption: "Preflight checklist — documents, walk-around, fuel, oil" },
  { src: "/products/jebos-6.webp", caption: "Settings — AIRAC data, navdata downloads" },
  { src: "/products/jebos-7.webp", caption: "POH reference — Cessna 152 V-speeds and weight limits" },
  { src: "/products/jebos-8.webp", caption: "Split view — POH sidebar with VFR map" },
  { src: "/products/jebos-9.webp", caption: "Satellite overlay with ADS-B traffic contacts" },
];

export function BodyContent({ children }: { children: React.ReactNode }) {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const showSiteFooter = pathname !== "/privacy";
  const [jebosVideoMuted, setJebosVideoMuted] = useState(true);
  const jebosVideoRefCb = useCallback((el: HTMLVideoElement | null) => {
    if (el) el.volume = 0.25;
  }, []);

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
            {/* ── Orchestr section: dark, matching OrchAerospace.com ── */}
            <div
              data-chrome-surface="dark"
              className="relative bg-[#060910] text-white selection:bg-cyan-400 selection:text-black"
            >
              <div className="mx-auto max-w-5xl px-6 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16">
                {/* Title row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="text-left">
                    <OrchAircraftIcon />
                    <h1
                      className="text-5xl font-bold uppercase tracking-tight sm:text-6xl"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                        textShadow:
                          "0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)",
                      }}
                    >
                      {t("orchestr.title")}
                    </h1>
                    <span className="mt-1 inline-block text-xs font-semibold tracking-[0.35em] text-white/60">
                      {t("orchestr.subtitle")}
                    </span>
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                    {t("orchestr.badge")}
                  </div>
                </div>

                {/* Intro */}
                <div className="mt-8 max-w-2xl space-y-3 text-left">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">
                    {t("orchestr.intro")}
                    <span className="ml-2 inline-block rounded-full border border-red-500/60 px-2 py-[2px] text-[10px] tracking-[0.25em] text-red-400">
                      {t("orchestr.new")}
                    </span>
                  </p>
                  <p className="text-xl leading-relaxed text-white/90">
                    {t("orchestr.tagline")}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {t("orchestr.features")}
                  </p>
                </div>

                {/* Hardware image */}
                <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/products/Avionic1.webp"
                    alt="Orch Avionic 1 hardware"
                    width={1200}
                    height={675}
                    className="w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>

                {/* JebediahOS section */}
                <div className="mt-20">
                  <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                    <div className="w-full md:w-1/2">
                      <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-2xl font-bold uppercase md:text-3xl">
                          {t("orchestr.jebos.title")}
                        </h3>
                        <span className="inline-flex items-center rounded-md border border-cyan-400 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                          {t("orchestr.jebos.tag")}
                        </span>
                      </div>
                      <p className="mb-3 leading-relaxed text-white/90">
                        {t("orchestr.jebos.desc")}
                      </p>
                      <p className="mb-5 text-sm leading-relaxed text-white/60">
                        {t("orchestr.jebos.features")}
                      </p>
                      <a
                        href="https://orchestrsim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-cyan-300"
                      >
                        {t("orchestr.jebos.cta")}
                      </a>
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
                          <source src="/products/jebos-wx-radar-demo.mp4" type="video/mp4" />
                        </video>
                        <button
                          type="button"
                          onClick={() => setJebosVideoMuted((m) => !m)}
                          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium hover:bg-black/80 transition-colors flex items-center gap-1.5"
                        >
                          {jebosVideoMuted ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                              PLAY SOUND
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                              MUTE
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Auto-cycling gallery */}
                  <JebosGallery />
                </div>

                {/* CTA */}
                <div className="mt-12 flex justify-start">
                  <a
                    href="https://orchestrsim.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    {t("orchestr.cta")} →
                  </a>
                </div>
              </div>
            </div>

            {/* Footer with privacy link */}
            <div
              data-chrome-surface="dark"
              className="relative isolate flex min-h-[min(40vh,26rem)] flex-col bg-[#020824] pb-4 pt-8"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-12 bg-gradient-to-b from-[#060910] to-[#020824] sm:h-14"
                aria-hidden
              />
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
          <p className="text-sm font-medium text-white md:text-base">
            {JEBOS_GALLERY[slide].caption}
          </p>
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
