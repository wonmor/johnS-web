import React from "react";
import "./globals.css";

import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "johnS",
  description: "Hi, I’m John. I’m a software engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          robotoMono.className,
          "flex flex-col min-h-screen bg-gray-800 text-white",
        ].join(" ")}
      >
        {/* Header */}
        <header className="p-6 border-b border-gray-600 text-center">
          <h1 className="text-6xl font-thin">john seong.</h1>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="p-6 border-t border-gray-600 font-light text-xl text-center">
          <p>
            &copy; {new Date().getFullYear()} John Seong. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
