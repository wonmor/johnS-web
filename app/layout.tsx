import Image from "next/image";

import { Roboto_Mono } from "next/font/google";

import "./globals.css";

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
        <a href="/">
          <header className="p-6 border-b border-gray-600 justify-center items-center text-center flex flex-row gap-4 mb-5">
            <Image className="rounded-lg overflow-hidden" src="/profile.png" alt="Profile Picture" width={100} height={100} />
            <h1 className="text-6xl font-thin">johnS</h1>
          </header>
          </a>

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
