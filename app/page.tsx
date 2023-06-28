import React from "react";
import Image from "next/image";

export default function Portfolio() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      {/* About */}
      <section className="p-6 max-w-2xl mb-12">
        <p className="text-2xl font-light">
          When I first discovered the art of coding, it quickly became my
          passion.
        </p>
        <div className="m-10 flex flex-row relative">
          <a
            href="https://electronvisual.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-white border-2 rounded-xl p-5 hover:bg-white hover:border-transparent hover:text-gray-800 relative z-10 flex items-center"
          >
            <div className="w-1/2">
              <p className="text-2xl">
                Check out my app, ElectronVisualized.
                <br />
                <br />
                An elegant and beautiful chemistry visualization tool.
              </p>
            </div>
            <div className="w-1/2 flex justify-center">
              <Image
                src="/molecular-orbital.png"
                alt="Background Image"
                width={250}
                height={250}
              />
            </div>
          </a>
        </div>

        <p className="text-2xl font-light mb-5">
          I found beauty in being able to express my thoughts and emotions.
        </p>

        <Image
          className="m-10"
          src="/image2.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />

        <p className="text-2xl font-light">
          A computer has become more than just a hobby or a career for me, it is
          a way of life.
        </p>
      </section>
    </div>
  );
}
