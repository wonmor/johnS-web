import Image from 'next/image'

export default function Coding() {
    return (
        <div className="m-auto mb-5 justify-center items-center flex flex-col gap-4 relative md:w-1/2 p-5 md:p-0">
          <a
            href="https://electronvisual.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-600 border-2 rounded-xl p-5 hover:bg-gray-600 relative z-10 flex md:flex-row flex-col items-center"
          >
            <div className="md:w-1/2">
              <p className="text-2xl mb-10">
                Check out my website, ElectronVisualized.
                <br />
                <br />
                <span className="font-thin py-2">TAP TO NAVIGATE</span>
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
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/Icon1024.png"
                alt="Background Image"
                width={250}
                height={250}
              />
            </div>
          </a>

          <a
            href="https://apps.apple.com/us/app/atomizer-ar/id6449015706"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-600 border-2 rounded-xl p-5 hover:bg-gray-600 relative z-10 flex md:flex-row flex-col items-center"
          >
            <div className="md:w-1/2">
              <p className="text-2xl mb-10">
                Meet Atomizer AR. Available on the App Store.
                <br />
                <br />
                <span className="font-thin py-2">TAP TO NAVIGATE</span>
                <br />
                <br />
                <span className="text-lg font-light">
                  Atomic and molecular orbitals blended with real life.
                </span>
              </p>

              <div className="flex flex-row justify-center items-center gap-0 sm:gap-4 bg-black border-gray-600 border-2 w-fit p-5 rounded-xl">
                <Image
                  className="scale-75 sm:scale-100"
                  src="/apple-logo.png"
                  alt="Background Image"
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
              style={{ overflow: "hidden", borderRadius: "50px", scale: "0.75" }}
                src="/1024.png"
                alt="Background Image"
                width={250}
                height={250}
              />
            </div>
          </a>
        </div>
    )
}