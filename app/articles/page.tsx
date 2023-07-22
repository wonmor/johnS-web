"use client";

import { LinkPreview } from "@dhaiwat10/react-link-preview";

export default function Coding() {
  return (
    <div
      className="m-auto mb-5 justify-center items-center flex flex-col gap-4 relative"
      style={{ maxWidth: "50%" }}
    >
      <div className="mt-5 md:w-1/2">
        <p className="text-2xl mb-10">
          Here are some of the news articles I appeared in.
          <br />
          <br />
          <span className="text-lg font-light">
            Big shoutout to MobileSyrup and Halton District School Board for
            their support.
          </span>
        </p>

        <div className="flex flex-col gap-6">
          <LinkPreview
            url="https://www.hdsb.ca/our-board/Pages/News/News-Description.aspx?NewsID=1145"
            width="400px"
          />

          <LinkPreview
            url="https://mobilesyrup.com/2023/06/05/meet-the-six-canadian-winners-of-apples-wwdc23-swift-student-challenge/"
            width="400px"
          />
        </div>
      </div>
    </div>
  );
}
