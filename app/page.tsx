import Image from "next/image";

export default function Portfolio() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      {/* About */}
      <section className="fill-width-available p-6 max-w-2xl mb-12 flex flex-col items-center justify-center">
        <p className="text-2xl font-light">
          When I first discovered the art of coding and photography, they quickly became my
          passion.
        </p>

        <Image
          className="m-10 rounded-lg overflow-hidden border-4 border-white"
          src="/image2.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
        />

<p className="text-2xl font-light mb-10">
          In 2023, I visited Apple's legendary campus in Cupertino, the Apple Park.<br /><br />I was thrilled to meet CEO Tim Cook as well as influencers such as iJustine.<br /><br />We had an interesting conversation about where the industry is heading — beyond the current scope of computing.
        </p>

        <Image
          className="m-10 rounded-lg overflow-hidden border-4 border-white"
          src="/image3.png"
          alt="Picture of the author"
          width={500}
          height={500}
        />

        <p className="text-2xl font-light mb-10">
          Technology has become more than just a hobby or a career for me; it is
          a way of life.
        </p>
      </section>
    </div>
  );
}
