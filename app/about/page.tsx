import Image from "next/image";
import image1 from "../../public/about-1.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to Ethioview Travel Agency
        </h1>

        <div className="space-y-8">
          <p>
            Where Ethiopia&apos;s ancient heritage and modern comfort meet.
            Nestled in the breathtaking Simien Mountains, known as the &quot;Roof of Africa,&quot;
            Ethioview Travel Agency offers a sanctuary for those seeking to reconnect with the cradle of humanity.
          </p>
          <p>
            Our {cabins.length} luxury lodges provide a base for exploring the
            majestic peaks, home to the unique Walia Ibex and Gelada Baboons.
            Experience the warmth of a traditional coffee ceremony as the sun sets
            over the jagged cliffs.
          </p>
          <p>
            This is a place where legends come to life, from the rock-hewn churches
            of Lalibela to the ancient stelae of Axum. It&apos;s a journey through time,
            blended with the serenity of the highlands.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="Coffee ceremony in front of a luxury Ethiopian lodge"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.jpg"
          fill
          className="object-cover"
          alt="Our local guides and family who manage Ethioview Travel Agency"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          A Legacy of Highland Hospitality
        </h1>

        <div className="space-y-8">
          <p>
            For generations, our family has shared the secrets of these mountains
            with travelers from around the world. We believe that hospitality
            is a sacred tradition in Ethiopia, and treated as such at Ethioview Travel Agency.
          </p>
          <p>
            We blend the timeless beauty of the Simiens with the personal
            touch of a family heritage. Here, you discover not just a landscape,
            but a culture and a history that stretches back millennia. Join us
            at Ethioview Travel Agency, where the peaks touch the sky and every guest is
            royalty.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
