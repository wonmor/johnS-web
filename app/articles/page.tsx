import Image from "next/image";

export default function Coding() {
  return (
    <div className="m-auto mb-5 justify-center items-center flex flex-col gap-4 relative">
      <div className="p-5 md:p-0 md:w-1/2">
        <p className="text-2xl font-light m-10 text-center">
          Here are some of the news articles
          <br />
          I've been featured in.
        </p>

        <div className="m-auto mb-5 justify-center items-center flex flex-col gap-4 relative">
          <a
            href="https://www.hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-600 border-2 rounded-xl p-5 hover:bg-gray-600 relative z-10 flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2">
              <p className="text-2xl">
                My School Board
                <br />
                <br />
                <span className="font-thin py-2">TAP TO NAVIGATE</span>
                <br />
                <br />
                <span className="text-lg font-light">
                  Grade 12 student at Garth Webb SS invited to Worldwide
                  Developers Conference at Apple Park in California.
                </span>
              </p>
            </div>
            <div className="md:w-1/2 m-5">
              <Image
                className="m-auto"
                src="/hdsb.svg"
                alt="Background Image"
                width={250}
                height={250}
              />
            </div>
          </a>

          <a
            href="https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-gray-600 border-2 rounded-xl p-5 hover:bg-gray-600 relative z-10 flex flex-col md:flex-row items-center"
          >
            <div className="md:w-1/2">
              <p className="text-2xl">
                MobileSyrup
                <br />
                <br />
                <span className="font-thin py-2">TAP TO NAVIGATE</span>
                <br />
                <br />
                <span className="text-lg font-light">
                  Meet the six Canadian winners of Apple’s WWDC 2023 Swift
                  Student Challenge.
                </span>
              </p>
            </div>
            <div className="md:w-1/2 m-5">
              <Image
                className="m-auto"
                src="/mobilesyrup.png"
                alt="Background Image"
                width={250}
                height={250}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
