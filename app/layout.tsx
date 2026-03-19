import Script from "next/script";
import localFont from "next/font/local";
import Head from "next/head";
import React from "react";
import Image from "next/image";
import "./globals.css";

const tubeFont = localFont({
  src: "../public/Outfit.ttf",
  display: "swap",
});

export const metadata = {
  title: "John Seong",
  description: "Hi, I’m John. I love aerospace, software, and design. Welcome to my personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>

      {/* This Script wires up your “Privacy” and “EULA” buttons to show/hide modals */}
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

      <body
        className={[
          tubeFont.className,
          // Minimal, typography‑centric dark navy theme
          "flex flex-col min-h-screen bg-[#020824] text-white pt-6 antialiased",
        ].join(" ")}
      >
        {/* Subtle Westminster silhouette in the background */}
        <WestminsterSilhouette />
        {/* Fixed minimal bar at the very top */}
        <div className="fixed top-0 left-0 w-full border-b border-white/10 bg-[#020824]/95 backdrop-blur text-center text-[11px] tracking-[0.22em] uppercase text-gray-300 py-1 z-50">
          <p>NO COOKIES &copy; {new Date().getFullYear()} JOHN WONMO SEONG</p>
        </div>

        <main className="flex-grow mb-10">{children}</main>

        {/* Always-render the modals, but hidden by default */}
        <PolicyModal />
        <EulaModal />

        <footer className="text-center py-10 mt-auto border-t border-white/10 bg-[#020824] text-white text-md font-light">
          <div className="mt-6 flex flex-col items-center">
            <Image
              src="/IMG_3505.jpg"
              alt="With iJustine"
              width={320}
              height={192}
              style={{ objectFit: "contain" }}
            />
            <p className="italic text-sm mt-2">with iJustine, at Apple Park during WWDC23</p>
          </div>

          {/* Second image with caption */}
          <div className="mt-6 flex flex-col items-center">
            <Image
              src="/IMG_0629.jpeg"
              alt="With flight instructor"
              width={320}
              height={192}
              style={{ objectFit: "contain" }}
            />
            <p className="italic text-sm mt-2">
              with my flight instructor at John Wayne Airport
            </p>
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
            <p className="italic text-sm mt-2">
              Microsoft Flight Simulator with brain-computer interface (BCI)
              control
            </p>
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
            <p className="italic text-sm mt-2">
              3D Head Scan Only Using an iPhone — for Pilot Helmet Design
              control
            </p>
          </div>
        </footer>

        <div className="bg-gradient-to-b from-[#f5f0e6] via-[#f5f0e6] to-[#020824] text-black font-mono selection:bg-black selection:text-[#f5f0e6]">
          {/* Orchestr section */}
          <header className="pt-12 pb-10 max-w-4xl mx-auto px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="text-left">
                <h1 className="text-5xl font-extralight tracking-widest">
                  ORCHESTR
                </h1>
                <span className="inline-block mt-1 text-xs tracking-[0.35em] text-gray-700">
                  AEROSPACE
                </span>
              </div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                MY&nbsp;STARTUP
              </div>
            </div>

            <div className="mt-8 max-w-2xl text-left space-y-3 text-gray-800">
              <p className="text-sm font-semibold text-red-600 tracking-[0.25em] uppercase">
                Introducing Orch Avionic 1 EFB.
                <span className="ml-2 inline-block rounded-full border border-red-500/60 px-2 py-[2px] text-[10px] tracking-[0.25em]">
                  NEW
                </span>
              </p>
              <p className="text-xl leading-relaxed">
                Your Predictive* Copilot in GA Flying.
                <br />
                <span className="italic text-gray-700">
                  Votre copilote prédictif* en aviation générale.
                </span>
              </p>
              <p className="text-sm text-white leading-relaxed">
                ADS-B, GPS, handheld radio, fuel calculation and Jeppesen* charts.
                All in one form factor.
              </p>
            </div>

            <div className="mt-6 flex justify-start gap-6">
              <a
                href="https://orchestrsim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-white rounded-md bg-transparent text-white hover:bg-white hover:text-black active:bg-white active:text-black transition focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Check it out
              </a>
            </div>
          </header>
        </div>
      </body>
    </html>
  );
}

function PolicyModal() {
  return (
    <div
      id="privacy-modal"
      className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-[#020824] border border-white/10 rounded-lg shadow-lg max-w-md w-full p-6 text-white">
        <h2 className="text-lg mb-2 tracking-wide">Privacy Policy</h2>
        <p className="text-sm mb-4 text-gray-300">
          We do not collect any usage of cookie data. Your rights under UK GDPR
          apply.
        </p>
        <button
          id="privacy-close"
          className="mt-2 px-3 py-1 border border-white/40 rounded-md text-white text-sm hover:bg-white hover:text-black transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function EulaModal() {
  return (
    <div
      id="eula-modal"
      className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-[#020824] border border-white/10 rounded-lg shadow-lg max-w-md w-full p-6 text-white">
        <h2 className="text-lg mb-2 tracking-wide">EULA</h2>
        <p className="text-sm mb-4 text-gray-300">
          Any software made by this company is licensed (UK law): no reverse
          engineering or redistribution.
        </p>
        <button
          id="eula-close"
          className="mt-2 px-3 py-1 border border-white/40 rounded-md text-white text-sm hover:bg-white hover:text-black transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function CityOfLondonLogo() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-4"
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="white"
        strokeWidth="8"
      />
    </svg>
  );
}

function WestminsterSilhouette() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 h-40 md:h-56 lg:h-64 opacity-20 md:opacity-25">
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="westminsterGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Simplified but recognisable London skyline:
            left: Tower Bridge / City,
            center: Palace of Westminster + Big Ben,
            right: London Eye */}
        <g fill="url(#westminsterGradient)">
          {/* Ground base */}
          <rect x="0" y="250" width="1200" height="50" />

          {/* Tower Bridge (left) */}
          <g>
            {/* Towers */}
            <rect x="70" y="190" width="30" height="60" />
            <rect x="170" y="190" width="30" height="60" />
            {/* Tower tops */}
            <polygon points="70,190 85,160 100,190" />
            <polygon points="170,190 185,160 200,190" />
            {/* Road deck */}
            <rect x="80" y="220" width="110" height="8" />
            {/* Suspension hint */}
            <path d="M90 220 C 120 190 150 190 180 220" fill="none" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.35" />
          </g>

          {/* City of London skyline (low blocks) */}
          <g>
            <rect x="10" y="220" width="40" height="30" />
            <rect x="40" y="210" width="35" height="40" />
            {/* The Gherkin-ish */}
            <ellipse cx="135" cy="205" rx="18" ry="35" />
          </g>

          {/* Palace of Westminster + Big Ben (center) */}
          <g>
            {/* Palace block */}
            <rect x="420" y="200" width="260" height="50" />
            {/* Palace turrets */}
            <rect x="430" y="180" width="12" height="20" />
            <rect x="455" y="185" width="10" height="15" />
            <rect x="480" y="178" width="12" height="22" />
            <rect x="505" y="185" width="10" height="15" />

            {/* Big Ben tower */}
            <rect x="560" y="130" width="40" height="120" />
            {/* Clock face */}
            <circle cx="580" cy="160" r="12" fill="none" stroke="#ffffff" strokeWidth="3" />
            {/* Spire */}
            <polygon points="560,130 580,95 600,130" />
          </g>

          {/* London Eye (right) */}
          <g>
            {/* Wheel */}
            <circle cx="920" cy="195" r="60" fill="none" stroke="#ffffff" strokeWidth="4" strokeOpacity="0.35" />
            {/* Pods */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (Math.PI * 2 * i) / 12;
              const cx = 920 + 60 * Math.cos(angle);
              const cy = 195 + 60 * Math.sin(angle);
              return (
                <circle key={i} cx={cx} cy={cy} r="4" />
              );
            })}
            {/* Support legs */}
            <rect x="910" y="195" width="6" height="70" />
            <rect x="924" y="195" width="6" height="70" />
          </g>
        </g>
      </svg>
    </div>
  );
}
