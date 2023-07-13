import Image from "next/image";
import Link from "next/link";

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
          "flex flex-col min-h-screen bg-gray-900 text-white",
        ].join(" ")}
      >
        {/* Header */}
        <a href="/">
          <header className="p-6 border-b border-gray-600 justify-center items-center text-center flex flex-col gap-4 mb-5">
            <div className="flex flex-row gap-4 items-center">
              <Image
              className="rounded-lg overflow-hidden"
              src="/profile.png"
              alt="Profile Picture"
              width={100}
              height={100}
            />
            <h1 className="text-6xl font-thin">johnS</h1>
            </div>

            <div className="font-thin text-2xl w-fit m-auto flex flex-col gap-4 justify-center bg-gray-800 rounded-lg p-5">
              <Link
                className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
                href="/coding"
              >
                <span>Coding<br />Projects</span>
              </Link>

            <div className="border-b-2 border-gray-600"></div>

            <Link
              className="bg-transparent text-white hover:bg-gray-600 rounded-lg p-2"
              href="/photography"
            >
              <span>Photography<br />Business</span>
            </Link>
          </div>
          </header>
        </a>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="flex flex-col gap-7 p-6 border-t border-gray-600 font-light text-xl text-center">
          <p>
            &copy; {new Date().getFullYear()} John Seong.<br /><span className="text-gray-400">Based in Irvine, California.</span>
          </p>

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
              href="https://medium.com/@wonmor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Medium</span>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
