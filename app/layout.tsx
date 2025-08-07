import Script from "next/script";
import localFont from "next/font/local";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import "./globals.css";

const tubeFont = localFont({
  src: "../public/LondonTube.ttf",
  display: "swap",
});

export const metadata = {
  title: "John Seong",
  description: "Hi, I’m John. I Love Engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6461064835542419"
      />

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
          "flex flex-col min-h-screen bg-[#f5f5f5] text-[#003688]",
        ].join(" ")}
      >
        <main className="flex-grow">{children}</main>

        <header className="bg-[#e32017] text-white p-6 text-center flex flex-col items-center gap-1">
          <CityOfLondonLogo />
          <h1 className="text-4xl tracking-widest uppercase mt-2">
            ORCHESTR<br />EUROPE LTD.
          </h1>
          <div className="bg-white h-2 w-36 my-2" />
          <p className="text-sm uppercase tracking-wide">
            A SOFTWARE COMPANY BASED IN<br />LONDON UK 15387031
          </p>

          <div className="mt-4 flex gap-3">
            <button
              id="privacy-btn"
              className="px-3 py-1 border border-white rounded-md text-white text-sm hover:bg-white hover:text-[#e32017] transition"
            >
              Privacy
            </button>
            <button
              id="eula-btn"
              className="px-3 py-1 border border-white rounded-md text-white text-sm hover:bg-white hover:text-[#e32017] transition"
            >
              EULA
            </button>
          </div>
        </header>

        {/* Always-render the modals, but hidden by default */}
        <PolicyModal />
        <EulaModal />

        <footer className="text-center py-6 mt-auto border-t-4 border-[#003688] bg-[#f5f5f5] text-[#003688] text-md font-light">
          <p>
            &copy; {new Date().getFullYear()} John Seong
            <br />
          </p>
          {/* …your footer images… */}
        </footer>
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
        <h2 className="text-lg font-bold mb-2">Privacy Policy</h2>
        <p className="text-sm mb-4">
          We collect minimal data (usage, cookies) to improve service. Your rights under UK GDPR apply.
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
        <h2 className="text-lg font-bold mb-2">EULA</h2>
        <p className="text-sm mb-4">
          This software is licensed (UK law): no reverse engineering or redistribution.
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
      width="80" height="80" viewBox="0 0 80 80"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      className="mr-4"
    >
      <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="8" />
    </svg>
  );
}
