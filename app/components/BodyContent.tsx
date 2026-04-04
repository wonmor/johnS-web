"use client";

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

      <main className="mb-10 flex-grow pt-14 sm:pt-16">{children}</main>

      <PolicyModal />
      <EulaModal />

      <div
        data-chrome-surface="light"
        className={`bg-gradient-to-b from-[#f5f0e6] via-[#f5f0e6] to-[#020824] text-black selection:bg-black selection:text-[#f5f0e6] ${
          locale === "ko" ? "" : "font-mono"
        }`}
      >
        <header className="mx-auto max-w-4xl px-6 pb-10 pt-12">
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
            <p className="text-sm leading-relaxed text-white">
              {t("orchestr.features")}
            </p>
          </div>

          <div className="mt-6 flex justify-start gap-6">
            <a
              href="https://orchestrsim.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white bg-transparent px-6 py-2 text-white transition hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/60 active:bg-white active:text-black"
            >
              {t("orchestr.cta")}
            </a>
          </div>
        </header>
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

function SilhouetteGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
    </linearGradient>
  );
}

function TowerBridgeSilhouette({ fillUrl }: { fillUrl: string }) {
  return (
    <g fill={fillUrl}>
      <rect x="0" y="250" width="1200" height="50" />
      {/* Left tower */}
      <rect x="378" y="132" width="94" height="118" />
      <rect x="392" y="92" width="66" height="42" />
      <rect x="404" y="58" width="42" height="36" />
      <rect x="382" y="124" width="86" height="10" />
      <polygon points="392,92 425,58 458,92" />
      {/* High-level walkways */}
      <rect x="472" y="88" width="256" height="9" />
      <rect x="472" y="118" width="256" height="9" />
      {/* Right tower */}
      <rect x="728" y="132" width="94" height="118" />
      <rect x="742" y="92" width="66" height="42" />
      <rect x="754" y="58" width="42" height="36" />
      <rect x="732" y="124" width="86" height="10" />
      <polygon points="742,92 775,58 808,92" />
      {/* Lower deck / river crossing */}
      <rect x="472" y="218" width="256" height="12" />
      <path
        d="M 472 230 Q 600 198 728 230"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeOpacity="0.35"
      />
      {/* Suspension hints */}
      <path
        d="M 425 98 L 600 75 L 775 98"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeOpacity="0.28"
      />
    </g>
  );
}

function NSeoulTowerSilhouette({ fillUrl }: { fillUrl: string }) {
  return (
    <g fill={fillUrl}>
      <rect x="0" y="250" width="1200" height="50" />
      {/* Base / mount */}
      <rect x="485" y="218" width="230" height="32" rx="2" />
      <rect x="545" y="198" width="110" height="22" />
      {/* Lower shaft */}
      <rect x="565" y="145" width="70" height="55" />
      {/* Main observation mass */}
      <rect x="495" y="128" width="210" height="22" />
      <ellipse cx="600" cy="128" rx="108" ry="14" />
      {/* Tapering tower above deck */}
      <polygon points="565,128 575,72 625,72 635,128" />
      <rect x="580" y="55" width="40" height="22" />
      {/* Upper lattice / secondary volume */}
      <rect x="572" y="38" width="56" height="20" />
      {/* Spire + mast */}
      <rect x="595" y="18" width="10" height="24" />
      <polygon points="600,12 590,22 610,22" />
      <path
        d="M 530 138 Q 600 108 670 138"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeOpacity="0.28"
      />
    </g>
  );
}

function LondonSkylineSilhouetteFr({ fillUrl }: { fillUrl: string }) {
  return (
    <g fill={fillUrl}>
      <rect x="0" y="250" width="1200" height="50" />
      <g>
        <rect x="70" y="190" width="30" height="60" />
        <rect x="170" y="190" width="30" height="60" />
        <polygon points="70,190 85,160 100,190" />
        <polygon points="170,190 185,160 200,190" />
        <rect x="80" y="220" width="110" height="8" />
        <path
          d="M90 220 C 120 190 150 190 180 220"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeOpacity="0.35"
        />
      </g>
      <g>
        <rect x="10" y="220" width="40" height="30" />
        <rect x="40" y="210" width="35" height="40" />
        <ellipse cx="135" cy="205" rx="18" ry="35" />
      </g>
      <g>
        <rect x="420" y="200" width="260" height="50" />
        <rect x="430" y="180" width="12" height="20" />
        <rect x="455" y="185" width="10" height="15" />
        <rect x="480" y="178" width="12" height="22" />
        <rect x="505" y="185" width="10" height="15" />
        <rect x="560" y="130" width="40" height="120" />
        <circle
          cx="580"
          cy="160"
          r="12"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <polygon points="560,130 580,95 600,130" />
      </g>
      <g>
        <circle
          cx="920"
          cy="195"
          r="60"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeOpacity="0.35"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 12;
          const cx = 920 + 60 * Math.cos(angle);
          const cy = 195 + 60 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="4" />;
        })}
        <rect x="910" y="195" width="6" height="70" />
        <rect x="924" y="195" width="6" height="70" />
      </g>
    </g>
  );
}

function skylineForLocale(locale: Locale) {
  const id = `sil-grad-${locale}`;
  const fillUrl = `url(#${id})`;
  switch (locale) {
    case "en":
      return { gradId: id, body: <TowerBridgeSilhouette fillUrl={fillUrl} /> };
    case "ko":
      return {
        gradId: id,
        body: <NSeoulTowerSilhouette fillUrl={fillUrl} />,
      };
    default:
      return {
        gradId: id,
        body: <LondonSkylineSilhouetteFr fillUrl={fillUrl} />,
      };
  }
}

function WestminsterSilhouette() {
  const { locale } = useI18n();
  const { gradId, body } = skylineForLocale(locale);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-40 opacity-20 md:h-56 md:opacity-25 lg:h-64">
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <SilhouetteGradient id={gradId} />
        </defs>
        {body}
      </svg>
    </div>
  );
}
