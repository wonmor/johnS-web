import Script from "next/script";
import localFont from "next/font/local";
import Image from "next/image"; // <-- import Image component
import "./globals.css";
import Head from "next/head";

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
      <Head>
        <meta name="apple-itunes-app" content="app-id=6449015706" />
      </Head>
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
        <nav className="w-fit m-auto mt-6 mb-10 flex flex-wrap justify-center gap-6 text-md font-medium text-[#003688]">
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

        <footer className="text-center py-6 mt-auto border-t-4 border-[#003688] bg-[#f5f5f5] text-[#003688] text-md font-light">
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

        <div className="flex justify-center mt-10 mb-6">
          <h1 className="text-4xl tracking-widest uppercase">
            COMPUTER
            <br />
            VISION. SORTED.
          </h1>
        </div>
        {/* Header styled like London Underground roundel */}
        <header className="bg-[#e32017] text-white p-6 text-center flex flex-col items-center justify-center gap-1">
          <h1 className="text-4xl tracking-widest uppercase mt-2">
            ORCHESTR<br />EUROPE LTD.
          </h1>
          <div className="bg-white h-2 w-36 mt-2 mb-1"></div>
          <p className="text-sm uppercase tracking-wide">
            SAN FRANCISCO AND LONDON
               <br />
            UK 15387031
          </p>
        </header>
      </body>
    </html>
  );
}

function CityOfLondonLogo() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-4"
    >
      <g transform="translate(0,80) scale(1,-1)">
        {/* Shield shape: white fill with subtle border */}
        <path
          d="M30 0 
             C10 0, 5 25, 5 45 
             C5 70, 30 80, 30 80 
             C30 80, 55 70, 55 45 
             C55 25, 50 0, 30 0Z"
          fill="white"
          stroke="#e32017"
          strokeWidth="2"
        />

        {/* Red circle near top */}
        <circle cx="30" cy="20" r="6" fill="#e32017" />

        {/* Small red dots near corners */}
<circle cx="20" cy="40" r="3" fill="#e32017" />
<circle cx="40" cy="40" r="3" fill="#e32017" />

      </g>
    </svg>
  );
}
