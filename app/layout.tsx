import React from "react";

import "./globals.css";

import Head from "next/head";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Head>
          <title>johnS</title>
          <meta
            name="description"
            content="A portfolio website for John Seong, a software engineer."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-col min-h-screen bg-white text-gray-800">
          {/* Header */}
          <header className="p-6 bg-blue-500 text-white">
            <h1 className="text-3xl font-bold">John Seong</h1>
            <p className="text-lg">Software Engineer</p>
          </header>

          {/* Main content */}
          <main className="flex-grow flex flex-col items-center justify-center p-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="p-6 bg-blue-500 text-white text-center">
            <p>
              &copy; {new Date().getFullYear()} John Seong. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
