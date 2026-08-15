"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useI18n } from "../i18n/context";
import type { MessageKey } from "../i18n/messages";
import { SECTION_CARD } from "../styles";
import { AppStoreBadge, GooglePlayBadge } from "./StoreBadges";

const JEBOS_GALLERY: { src: string; platform: string; captionKey: MessageKey }[] = [
  { src: "/gallery/ipad-jebediah/screens/screen-01.jpg", platform: "iPad", captionKey: "jebos.g.vfrPfd" },
  { src: "/gallery/ipad-jebediah/screens/screen-02.jpg", platform: "iPad", captionKey: "jebos.g.satelliteWx" },
  { src: "/gallery/ipad-jebediah/screens/screen-03.jpg", platform: "iPad", captionKey: "jebos.g.vfrLa" },
  { src: "/gallery/ipad-jebediah/screens/screen-04.jpg", platform: "iPad", captionKey: "jebos.g.ifrSocal" },
  { src: "/gallery/ipad-jebediah/screens/screen-05.jpg", platform: "iPad", captionKey: "jebos.g.planner" },
  { src: "/gallery/ipad-jebediah/screens/screen-06.jpg", platform: "iPad", captionKey: "jebos.g.traffic" },
  { src: "/gallery/ipad-jebediah/screens/extra-checklist.jpg", platform: "iPad", captionKey: "jebos.g.checklist" },
  { src: "/gallery/ipad-jebediah/screens/extra-poh.jpg", platform: "iPad", captionKey: "jebos.g.poh" },
  { src: "/gallery/ipad-jebediah/screens/extra-weather.jpg", platform: "iPad", captionKey: "jebos.g.briefing" },
  { src: "/gallery/ipad-jebediah/screens/extra-e6b.jpg", platform: "iPad", captionKey: "jebos.g.e6b" },
  { src: "/products/jebos-1.webp", platform: "Android", captionKey: "jebos.g.vfrSynthetic" },
  { src: "/products/jebos-2.webp", platform: "Android", captionKey: "jebos.g.ifrMontreal" },
  { src: "/products/jebos-3.webp", platform: "Android", captionKey: "jebos.g.airportDiagram" },
  { src: "/products/jebos-4.webp", platform: "Web", captionKey: "jebos.g.atc" },
  { src: "/products/jebos-5.webp", platform: "Web", captionKey: "jebos.g.checklist" },
  { src: "/products/jebos-6.webp", platform: "Web", captionKey: "jebos.g.airac" },
  { src: "/products/jebos-7.webp", platform: "Web", captionKey: "jebos.g.poh" },
  { src: "/products/jebos-8.webp", platform: "Web", captionKey: "jebos.g.pohSplit" },
  { src: "/products/jebos-9.webp", platform: "Web", captionKey: "jebos.g.satelliteTraffic" },
];

export function BodyContent({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
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
              data-chrome-surface="light"
              className="relative isolate flex min-h-[min(40vh,26rem)] flex-col bg-[#f5f0e6] pb-4 pt-8"
            >
              <AirshipFooterSilhouette />
              <div className="relative z-10 mt-auto flex justify-center px-4 pb-8 pt-6 sm:pb-10">
                <Link
                  href="/privacy"
                  className="pointer-events-auto text-center text-sm lowercase text-[#1c1a17]/70 underline decoration-[#1c1a17]/25 underline-offset-4 transition hover:text-[#1c1a17] hover:decoration-[#1c1a17]/60"
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
    <section id="section-jebediah" className={SECTION_CARD}>
      <div className="mb-8 flex items-center gap-4">
        <div className="overflow-hidden rounded-2xl border border-[#1c1a17]/12 shadow-[0_8px_24px_rgba(28,26,23,0.12)]">
          <Image
            src="/jebediah-icon.png"
            alt="Jeb's app icon"
            width={88}
            height={88}
            className="block h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
          />
        </div>
        <div className="text-sm text-[#1c1a17]/55">
          <p>{t("jebos.platforms")}</p>
          <p className="mt-1">{t("jebos.earlyAccess")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="w-full md:w-1/2">
          <div className="mb-3">
            <h2 className="text-2xl lowercase md:text-3xl">
              {t("orchestr.jebos.title")} flight bag
            </h2>
            {/* Platform tags read as one quiet set instead of four competing hues */}
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                t("orchestr.jebos.tag"),
                t("jebos.tagDesktop"),
                t("jebos.tagMobile"),
                t("jebos.tagWeb"),
              ].map(
                (label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-md border border-[#1c1a17]/20 px-2 py-0.5 text-xs lowercase text-[#1c1a17]/60"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
          <p className="mb-3 leading-relaxed">{t("jebos.pitch")}</p>
          <p className="mb-3 text-sm leading-relaxed text-[#1c1a17]/60">
            {t("orchestr.jebos.features")}
          </p>
          <p className="mb-5 text-sm leading-relaxed text-[#1c1a17]/60">
            {t("orchestr.jebos.desc")}
          </p>
          <div className="grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
            <AppStoreBadge
              href="https://apps.apple.com/us/app/jebediahs-flight-bag/id6766274262"
              ariaLabel={t("jebos.appStoreAlt")}
              className="w-full"
            />
            <GooglePlayBadge
              href="https://play.google.com/store/apps/details?id=com.orchestrsim.jebediah"
              ariaLabel={t("jebos.playAlt")}
              className="w-full"
            />
            <a
              href="https://orchaerospace.com/app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("jebos.webAlt")}
              className="inline-flex h-[52px] w-full items-center gap-2.5 rounded-xl border border-[#1c1a17]/25 px-4 transition-colors hover:bg-[#1c1a17]/[0.05]"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-[#1c1a17]" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[10px] lowercase text-[#1c1a17]/55">
                  {t("jebos.tryAs")}
                </span>
                <span className="mt-0.5 text-base lowercase">
                  {t("jebos.webApp")}
                </span>
              </span>
            </a>
            <a
              href="https://orchaerospace.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1c1a17] px-5 text-base lowercase text-[#f5f0e6] transition-colors hover:bg-[#1c1a17]/85"
            >
              {t("orchestr.jebos.cta")}
            </a>
          </div>
        </div>

        {/* Video demo */}
        <div className="w-full md:w-1/2">
          <div className="relative overflow-hidden rounded-2xl border border-[#1c1a17]/15">
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
                  {t("jebos.sound")}
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                  {t("jebos.mute")}
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
  const { t } = useI18n();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(
      () => setSlide((s) => (s + 1) % JEBOS_GALLERY.length),
      4000
    );
    return () => clearInterval(id);
  }, [paused, reducedMotion]);

  const current = JEBOS_GALLERY[slide];

  return (
    <div className="mt-10 w-full">
      <div
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#1c1a17]/15"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {JEBOS_GALLERY.map((item, i) => (
          <div
            key={item.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: slide === i ? 1 : 0 }}
            aria-hidden={slide !== i}
          >
            <Image
              src={item.src}
              alt={t(item.captionKey)}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        ))}
        {/* Caption overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-6 pb-4 pt-10">
          <div className="flex items-baseline gap-3">
            <span className="shrink-0 rounded-md border border-white/30 px-2 py-0.5 text-[11px] text-white/75">
              {current.platform}
            </span>
            <p className="text-sm font-medium text-white md:text-base">
              {t(current.captionKey)}
            </p>
          </div>
          {/* One slim progress rail beats nineteen dots */}
          <div
            className="mt-3 flex gap-1"
            role="tablist"
            aria-label={t("jebos.screenshots")}
          >
            {JEBOS_GALLERY.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={slide === i}
                aria-label={t(item.captionKey)}
                onClick={() => setSlide(i)}
                className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                  slide === i ? "bg-white" : "bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
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
      className={`fixed bottom-6 left-1/2 z-[35] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#1c1a17] px-5 py-2.5 shadow-[0_8px_28px_rgba(28,26,23,0.28)] transition-all duration-500 hover:bg-[#1c1a17]/85 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="flex h-2 w-2">
        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#f5f0e6] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5f0e6]" />
      </span>
      <span className="text-xs text-[#f5f0e6] sm:text-sm">
        {t("orchestr.floatingBanner")}
      </span>
      <svg
        className="h-3.5 w-3.5 text-[#f5f0e6]"
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

function PolicyModal() {
  const { t } = useI18n();
  return (
    <div
      id="privacy-modal"
      className="fixed inset-0 z-[60] hidden flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="w-full max-w-md rounded-lg border border-[#1c1a17]/10 bg-[#f5f0e6] p-6 text-[#1c1a17] shadow-lg">
        <h2 className="mb-2 text-lg lowercase">{t("privacy.title")}</h2>
        <p className="mb-4 text-sm text-[#1c1a17]/70">{t("privacy.body")}</p>
        <button
          id="privacy-close"
          className="mt-2 rounded-md border border-[#1c1a17]/30 px-3 py-1 text-sm transition hover:bg-[#1c1a17] hover:text-[#f5f0e6]"
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
      <div className="w-full max-w-md rounded-lg border border-[#1c1a17]/10 bg-[#f5f0e6] p-6 text-[#1c1a17] shadow-lg">
        <h2 className="mb-2 text-lg lowercase">{t("eula.title")}</h2>
        <p className="mb-4 text-sm text-[#1c1a17]/70">{t("eula.body")}</p>
        <button
          id="eula-close"
          className="mt-2 rounded-md border border-[#1c1a17]/30 px-3 py-1 text-sm transition hover:bg-[#1c1a17] hover:text-[#f5f0e6]"
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
      <div className="relative h-full w-full max-w-6xl opacity-[0.14] sm:opacity-[0.18]">
        <Image
          src="/decorative/airship-blimp.svg"
          alt=""
          fill
          className="object-contain object-bottom [filter:brightness(0)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0.22)_72%,transparent_100%)]"
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
          className="object-cover object-bottom opacity-[0.35] [filter:brightness(0)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.55)_0%,transparent_85%)]"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
