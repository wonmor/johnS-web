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
          "flex flex-col min-h-screen bg-[#f5f5f5] text-[#003688] pt-6", // Add pt-6 to offset the height of the fixed bar
        ].join(" ")}
      >
        {/* Fixed thin gray bar at the very top */}
        <div className="fixed top-0 left-0 w-full bg-gray-200 text-center text-xs text-gray-700 py-1 z-50">
          <p>NO COOKIES &copy; {new Date().getFullYear()} JOHN WONMO SEONG</p>
        </div>

        <main className="flex-grow mb-10">{children}</main>

        {/* Always-render the modals, but hidden by default */}
        <PolicyModal />
        <EulaModal />

        <footer className="text-center py-6 mt-auto border-t-4 border-[#003688] bg-[#f5f5f5] text-[#003688] text-md font-light">
          <div className="mt-6 flex flex-col items-center">
            <Image
              src="/IMG_3505.jpg"
              alt="With iJustine"
              width={320}
              height={192}
              style={{ objectFit: "contain" }}
            />
            <p className="italic text-sm mt-2">with iJustine, at Apple’s HQ</p>
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
              height="700"
              src="https://www.youtube.com/watch?v=LqiZKoXhtDA"
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
          {/* Header */}
          <header className="pt-12 pb-10 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-extralight tracking-widest drop-shadow-md mb-2">
              ORCHESTR <br /> AVIONICS
            </h1>
            <p className="text-xl text-gray-400 max-w-md mx-auto">
               We Bring Automation and AI to the Skies — through Fly-by-Large-Action-Model (LAM) System and Brain Computer Interface (BCI) Technology
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <a
                href="https://orchestrsim.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-cyan-500 rounded-md text-cyan-400 hover:text-white hover:border-cyan-400 transition"
              >
                Visit the Website
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
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg mb-2">Privacy Policy</h2>
        <p className="text-sm mb-4">
          We do not collect any usage of cookie data. Your rights under UK GDPR
          apply.
        </p>
        <button
          id="privacy-close"
          className="mt-2 px-3 py-1 border border-[#003688] rounded-md text-[#003688] text-sm hover:bg-[#003688] hover:text-white transition"
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
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg mb-2">EULA</h2>
        <p className="text-sm mb-4">
          Any software made by this company is licensed (UK law): no reverse
          engineering or redistribution.
        </p>
        <button
          id="eula-close"
          className="mt-2 px-3 py-1 border border-[#003688] rounded-md text-[#003688] text-sm hover:bg-[#003688] hover:text-white transition"
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
