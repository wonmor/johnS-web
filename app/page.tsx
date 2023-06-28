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
            className="border-white border-2 rounded-xl p-5 hover:bg-white hover:border-transparent hover:text-gray-800 relative z-10 flex items-center"
          >
            <div className="w-1/2">
              <p className="text-2xl">
                Check out my app, ElectronVisualized.
                <br />
                <br />
                <span className="text-lg font-light">
                  An elegant and beautiful chemistry visualization tool.
                </span>
              </p>
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
          A computer has become more than just a hobby or a career for me, it is
          a way of life.
        </p>

        <div grid-cols-2 className="grid gap-4 text-center border-2 border-gray-600 rounded-lg p-5">
          <a className="bg-transparent text-white hover:bg-white hover:text-gray-800 rounded-lg p-2" href="https://github.com/wonmor" target="_blank" rel="noopener noreferrer">
            <span>GitHub</span>
          </a>

          <div className="border-b-2 border-gray-600"></div>

          <a className="bg-transparent text-white hover:bg-white hover:text-gray-800 rounded-lg p-2" href="https://www.linkedin.com/in/john-seong-9194321a9/" target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>
          </a>

          <div className="border-b-2 border-gray-600"></div>

          <a className="bg-transparent text-white hover:bg-white hover:text-gray-800 rounded-lg p-2" href="https://www.youtube.com/channel/UC2O-C28dSgDTZcYxv9OX20w" target="_blank" rel="noopener noreferrer">
            <span>YouTube</span>
          </a>
        </div>

      </section>
    </div>
  );
}
