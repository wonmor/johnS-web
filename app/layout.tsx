import Script from "next/script";
import localFont from "next/font/local";
import Image from "next/image"; // <-- import Image component
import "./globals.css";

// Load custom London Underground font
const tubeFont = localFont({
  src: "../public/LondonTube.ttf",
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
      {/* Google Ads Script */}
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6461064835542419"
      />

      {/* Main App Body */}
      <body
        className={[
          tubeFont.className,
          "flex flex-col min-h-screen bg-[#f5f5f5] text-[#003688]",
        ].join(" ")}
      >

        {/* Navigation bar */}
        <nav className="w-fit m-auto mt-6 mb-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-[#003688]">
          <a
            className="hover:underline hover:text-[#e32017] transition-all"
            href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <a
            className="hover:underline hover:text-[#e32017] transition-all"
            href="https://github.com/wonmor"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="hover:underline hover:text-[#e32017] transition-all"
            href="https://www.linkedin.com/in/john-seong-9194321a9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="hover:underline hover:text-[#e32017] transition-all"
            href="https://www.flickr.com/photos/johnseongemini8/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flickr
          </a>
        </nav>

        {/* Main page content */}
        <main className="flex-grow">{children}</main>

        <footer className="text-center py-6 mt-auto border-t-4 border-[#003688] bg-[#f5f5f5] text-[#003688] text-sm font-light">
          <p>
            &copy; {new Date().getFullYear()} John Seong
            <br />
            <span className="text-gray-500">wonmor@gmail.com</span>
          </p>

          {/* First image with caption */}
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
        </footer>
           {/* Header styled like London Underground roundel */}
        <header className="bg-[#e32017] text-white p-6 text-center flex flex-col items-center justify-center gap-1">
          <h1 className="text-4xl tracking-widest uppercase">ORCHESTR INC.™</h1>
          <div className="bg-white h-2 w-36 mt-2 mb-1"></div>
          <p className="text-sm uppercase tracking-wide">
            A DELAWARE COMPANY BASED IN LONDON<br />
            UK 15387031
          </p>
        </header>
      </body>
    </html>
  );
}
