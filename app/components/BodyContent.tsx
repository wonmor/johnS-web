"use client";

import Image from "next/image";
import Script from "next/script";
import React from "react";
import { useI18n } from "../i18n/context";
import type { Locale } from "../i18n/messages";

export function BodyContent({ children }: { children: React.ReactNode }) {
  const { t, locale } = useI18n();

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

      <WestminsterSilhouette />

      <main className="mb-10 flex-grow">{children}</main>

      <PolicyModal />
      <EulaModal />

      <div id="site-light-footer">
        <div
          data-chrome-surface="light"
          className={`bg-[#f5f0e6] text-black selection:bg-black selection:text-[#f5f0e6] ${
            locale === "ko" ? "" : "font-mono"
          }`}
        >
          <header className="mx-auto max-w-4xl px-6 pb-20 pt-12 sm:pb-24">
            <div className="flex items-start justify-between gap-4">
              <div className="text-left">
                <span
                  className="-ml-2 mb-1 inline-block opacity-95"
                  aria-hidden="true"
                >
                  <svg
                    width="46"
                    height="20"
                    viewBox="0 0 56 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-600"
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
                <h1 className="text-5xl font-extralight tracking-widest">
                  {t("orchestr.title")}
                </h1>
                <span className="mt-1 inline-block text-xs tracking-[0.35em] text-gray-700">
                  {t("orchestr.subtitle")}
                </span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-gray-500">
                {t("orchestr.badge")}
              </div>
            </div>

            <div className="mt-8 max-w-2xl space-y-3 text-left text-gray-800">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
                {t("orchestr.intro")}
                <span className="ml-2 inline-block rounded-full border border-red-500/60 px-2 py-[2px] text-[10px] tracking-[0.25em]">
                  {t("orchestr.new")}
                </span>
              </p>
              <p className="text-xl leading-relaxed">
                {t("orchestr.tagline")}
                {t("orchestr.taglineFrNote") ? (
                  <>
                    <br />
                    <span className="italic text-gray-700">
                      {t("orchestr.taglineFrNote")}
                    </span>
                  </>
                ) : null}
              </p>
              <p className="text-sm leading-relaxed text-gray-900">
                {t("orchestr.features")}
              </p>
            </div>

            <div className="mt-6 flex justify-start gap-6">
              <a
                href="https://orchestrsim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-black/75 bg-transparent px-6 py-2 text-black transition hover:bg-black hover:text-[#f5f0e6] focus:outline-none focus:ring-2 focus:ring-black/30 active:bg-black active:text-[#f5f0e6]"
              >
                {t("orchestr.cta")}
              </a>
            </div>
          </header>
        </div>
        <div
          data-chrome-surface="dark"
          className="relative isolate min-h-[min(40vh,26rem)] bg-[#020824] pb-16 pt-8"
        >
          {/* Blend cream → navy only inside this block so nothing overlaps the Orchestr section above the CTA on mobile */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-12 bg-gradient-to-b from-[#f5f0e6] to-[#020824] sm:h-14"
            aria-hidden
          />
          <AirshipFooterSilhouette />
        </div>
      </div>
    </>
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex h-[min(26vh,15rem)] justify-center md:h-[min(30vh,17rem)]"
      aria-hidden
    >
      <span className="sr-only">
        Decorative airship silhouette in the page background.
      </span>
      <div className="relative h-full w-full max-w-6xl opacity-[0.2] sm:opacity-[0.28]">
        <Image
          src="/decorative/airship-blimp.svg"
          alt=""
          fill
          className="object-contain object-bottom [filter:brightness(0)_invert(1)] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.2)_55%,transparent_95%)]"
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
