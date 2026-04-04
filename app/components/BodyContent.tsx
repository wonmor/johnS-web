"use client";

import Image from "next/image";
import Script from "next/script";
import React from "react";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "../i18n/context";

export function BodyContent({ children }: { children: React.ReactNode }) {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

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

      <div className="fixed inset-x-0 top-0 z-50 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 border-b border-white/10 bg-[#020824]/95 px-3 py-1 backdrop-blur sm:gap-x-3 sm:px-4 sm:py-1">
        <p className="text-center text-xs uppercase leading-tight tracking-[0.18em] text-gray-300 sm:text-sm sm:tracking-[0.2em]">
          {t("topBar.copyright", { year })}
        </p>
        <div className="flex shrink-0 items-center">
          <LanguageToggle />
        </div>
      </div>

      <main className="mb-10 flex-grow pt-10 sm:pt-11">{children}</main>

      <PolicyModal />
      <EulaModal />

      <footer className="mt-auto border-t border-white/10 bg-[#020824] py-10 text-center text-md font-light text-white">
        <div className="mt-6 flex flex-col items-center">
          <Image
            src="/IMG_3505.jpg"
            alt="With iJustine"
            width={320}
            height={192}
            style={{ objectFit: "contain" }}
          />
          <p className="mt-2 text-sm italic">{t("footer.photo1Caption")}</p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <Image
            src="/IMG_0629.jpeg"
            alt="With flight instructor"
            width={320}
            height={192}
            style={{ objectFit: "contain" }}
          />
          <p className="mt-2 text-sm italic">{t("footer.photo2Caption")}</p>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <iframe
            className="m-auto overflow-hidden rounded-lg shadow-lg"
            width="350"
            height="250"
            src="https://www.youtube.com/embed/F95lSwabPpE?si=WpEctEsx-AZGBeGr"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="mt-2 text-sm italic">{t("footer.video1Caption")}</p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <iframe
            className="m-auto overflow-hidden rounded-lg shadow-lg"
            width="350"
            height="250"
            src="https://www.youtube.com/embed/LqiZKoXhtDA?si=T8ZAd0P-vh_x1XaY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="mt-2 text-sm italic">{t("footer.video2Caption")}</p>
        </div>
      </footer>

      <div
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

function WestminsterSilhouette() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 h-40 opacity-20 md:h-56 md:opacity-25 lg:h-64">
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="westminsterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="url(#westminsterGradient)">
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
      </svg>
    </div>
  );
}
