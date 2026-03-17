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
  description: "Hi, I’m John. I Love Engineering.",
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

        <div className="bg-gradient-to-b from-black via-gray-900 to-black text-cyan-300 font-mono selection:bg-cyan-600 selection:text-black">
          {/* Orchestr section */}
          <header className="pt-12 pb-10 max-w-4xl mx-auto px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="text-left">
                <h1 className="text-5xl font-extralight tracking-widest drop-shadow-md">
                  ORCHESTR
                </h1>
                <span className="inline-block mt-1 text-xs tracking-[0.35em] text-cyan-300/80">
                  AVIONICS
                </span>
              </div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-cyan-300/70">
                MY&nbsp;STARTUP
              </div>
            </div>

            <div className="mt-8 max-w-2xl text-left space-y-3 text-gray-200">
              <p className="text-sm font-semibold text-red-400 tracking-[0.25em] uppercase">
                Introducing Orch Avionic 1 EFB.
                <span className="ml-2 inline-block rounded-full border border-red-400/60 px-2 py-[2px] text-[10px] tracking-[0.25em]">
                  NEW
                </span>
              </p>
              <p className="text-xl leading-relaxed">
                Your Predictive* Copilot in GA Flying.
                <br />
                <span className="italic">
                  Votre copilote prédictif* en aviation générale.
                </span>
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                ADS-B, GPS, handheld radio, fuel calculation and Jeppesen* charts.
                All in one form factor.
              </p>
            </div>

            <div className="mt-6 flex justify-start gap-6">
              <a
                href="https://orchestrsim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-cyan-500 rounded-md text-cyan-300 hover:text-black hover:bg-cyan-300 hover:border-cyan-300 transition"
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
        <path
          fill="url(#westminsterGradient)"
          d="
            M0,260
            L80,260 L80,210 L110,210 L110,180 L140,180 L140,210 L170,210 L170,190 L200,190 L200,210 L230,210 L230,170 L260,170 L260,210 L300,210
            L320,210 L320,160 L340,160 L340,140 L360,140 L360,160 L380,160 L380,210 L420,210 L420,150 L430,150 L430,100 L440,100 L440,70
            L445,70 L445,40 L450,40 L450,70 L455,70 L455,100 L465,100 L465,150 L475,150 L475,210 L520,210
            L540,210 L540,170 L560,170 L560,150 L580,150 L580,170 L600,170 L600,210 L640,210
            L660,210 L660,120 L670,120 L670,80 L680,80 L680,50 L685,50 L685,30 L690,30 L690,50 L695,50 L695,80 L705,80 L705,120 L715,120 L715,210 L760,210
            L780,210 L780,180 L800,180 L800,160 L820,160 L820,180 L840,180 L840,210 L880,210
            L900,210 L900,170 L920,170 L920,150 L940,150 L940,170 L960,170 L960,210 L1000,210
            L1020,210 L1020,190 L1040,190 L1040,210 L1080,210 L1080,230 L1120,230 L1120,260 L1200,260
            L1200,300 L0,300 Z
          "
        />
      </svg>
    </div>
  );
}
