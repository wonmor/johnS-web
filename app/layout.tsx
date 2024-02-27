import Image from "next/image";
import Script from "next/script";

import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "John Seong",
  description: "Hi, I’m John. I’m a software engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6461064835542419"
      />

      <body
        className={[
          outfit.className,
          "flex flex-col min-h-screen bg-gray-900 text-white",
        ].join(" ")}
      >
        {/* Header */}
        <a href="/">
          <header className="p-6 border-b border-gray-600 justify-center items-center text-center flex flex-col gap-4 mb-5">
            <div className="flex flex-col gap-4 items-center">
            <h1 className="text-6xl font-thin neon-title flicker">@j0hnse0ng</h1>
         
            </div>
            <p className="text-xl">
              Computer Vision<br />Software Engineering<br />Photography
            </p>
          </header>
        </a>

        <div className="w-fit m-auto flex flex-wrap gap-4 justify-center bg-gray-800 rounded-lg p-5">
            <a
              className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
              href="https://github.com/wonmor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
            </a>

            <div className="border-l-2 border-gray-600"></div>

            <a
              className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
              href="https://www.linkedin.com/in/john-seong-9194321a9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
            </a>

            <div className="border-l-2 border-gray-600"></div>

            <a
              className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
              href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>YouTube</span>
            </a>

            <div className="border-l-2 border-gray-600"></div>

            <a
              className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
              href="https://www.flickr.com/photos/johnseongemini8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Flickr</span>
            </a>
          </div>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="flex flex-col gap-7 p-6 border-t border-gray-600 font-light text-xl text-center">
          <p>
            &copy; {new Date().getFullYear()} John Seong
            <br />
            <span className="text-gray-400">johnseong@havit.space</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
