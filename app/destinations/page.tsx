import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import { getDestinations } from "../_lib/data-service";
import Image from "next/image";

export const metadata = {
  title: "Destinations",
};

export default function Page() {
  return (
    <section className="section">
      <div className="container-main">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Discover Ethiopia
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            From highland peaks to ancient cities, explore destinations curated
            for culture, comfort, and unforgettable views.
          </p>
        </div>

        <div className="mt-10">
          <Suspense fallback={<Spinner />}>
            <DestinationList />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function DestinationList() {
  const destinations = await getDestinations();

  if (!destinations.length)
    return (
      <p className="text-slate-600">
        Our destination profiles are currently being updated. Please check back
        soon.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}

function DestinationCard({ destination }: { destination: any }) {
  const { name, region, description, image, highlights } = destination;

  // Ensure image path is processed correctly for local serving
  const displayImage = image?.startsWith("http")
    ? `/images/${image.split("/").pop()}`.replace(/%20/g, " ")
    : image;

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative h-56">
        <Image
          src={displayImage || "/images/aksum.jpg"}
          fill
          alt={name}
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
          <span className="tag">{region}</span>
        </div>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Highlights
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights?.map((highlight: string, i: number) => (
              <span key={i} className="tag">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
