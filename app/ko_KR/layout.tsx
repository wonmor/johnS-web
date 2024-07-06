import Link from "next/link";
import Script from "next/script";

import { Outfit } from "next/font/google";

import localFont from "next/font/local";

const lightFont = localFont({ src: "../../public/GmarketSansLight.otf" });
const mediumFont = localFont({ src: "../../public/GmarketSansMedium.otf" });

import "../globals.css";

const font = Outfit({
  subsets: ["latin"],
});

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
          lightFont.className,
          "flex flex-col min-h-screen bg-black text-white",
        ].join(" ")}
      >
        {/* Header */}
        <header className="p-6 border-b border-gray-600 bg-gray-900 justify-center items-center text-center flex flex-col gap-4 mb-5">
          <div className="flex items-center justify-center flex-row gap-4">
            <Link href="https://johnseong.info">
              <span>English</span>
            </Link>

            <Link href="https://johnseong.kr">
              <span>Korean</span>
            </Link>
          </div>
        </header>

        <div
          className={[
            mediumFont.className,
            "w-fit m-auto flex flex-wrap gap-4 justify-center rounded-lg pb-10",
          ].join(" ")}
        >
          <a
            className="bg-transparent text-white hover:bg-gray-800 rounded-lg p-2"
            href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>유튜브</span>
          </a>

          <div className="border-l-2 border-gray-600"></div>

          <a
            className="bg-transparent text-white hover:bg-gray-800 rounded-lg p-2"
            href="https://github.com/wonmor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>깃허브</span>
          </a>

          <div className="border-l-2 border-gray-600"></div>

          <a
            className="bg-transparent text-white hover:bg-gray-800 rounded-lg p-2"
            href="https://www.linkedin.com/in/john-seong-9194321a9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>링크드인</span>
          </a>

          <div className="border-l-2 border-gray-600"></div>

          <a
            className="bg-transparent text-white hover:bg-gray-800 rounded-lg p-2"
            href="https://www.flickr.com/photos/johnseongemini8/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>나의 사진 작품</span>
          </a>
        </div>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="flex flex-col gap-7 p-6 border-t border-gray-600 font-light text-xl text-center">
          <p>
            &copy; {new Date().getFullYear()} 성원모
            <br />
            <span className="text-gray-400">johnseong@havit.space</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
