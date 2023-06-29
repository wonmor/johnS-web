import Image from "next/image";

export default function Portfolio() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      {/* About */}
      <section className="fill-width-available p-6 max-w-2xl mb-12 flex flex-col items-center justify-center">
        <p className="text-2xl font-light">
          When I first discovered the art of coding, it quickly became my
          passion.
        </p>
        <div className="m-10 justify-center items-center flex flex-row relative">
          <a
            href="https://electronvisual.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-600 border-2 rounded-xl p-5 hover:bg-gray-600 relative z-10 flex items-center"
          >
            <div className="w-1/2">
              <p className="text-2xl mb-10">
                Check out my app, ElectronVisualized.
                <br />
                <br />
                <span className="text-lg font-light">
                  An elegant and beautiful chemistry visualization tool.
                </span>
              </p>

              <div className="flex flex-row justify-center items-center gap-0 sm:gap-4 bg-black border-gray-600 border-2 w-fit p-5 rounded-xl">
                <Image
                  className="scale-75 sm:scale-100"
                  src="/pwa-icon.png"
                  alt="Background Image"
                  width={75}
                  height={15}
                />
                <Image
                  className="scale-75 sm:scale-100"
                  src="/apple-logo.png"
                  alt="Background Image"
                  width={35}
                  height={35}
                />
                <Image
                  className="scale-75 sm:scale-100"
                  src="/playstore-logo.png"
                  alt="Background Image"
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div className="w-1/2">
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
          I find beauty in being able to express my thoughts and emotions.
        </p>

        <Image
          className="m-10 rounded-lg overflow-hidden border-4 border-white"
          src="/image2.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />

        <p className="text-2xl font-light mb-10">
          A computer has become more than just a hobby or a career for me; it is
          a way of life.
        </p>
      </section>
    </div>
  );
}
