import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import { getTours } from "../_lib/data-service";
import Image from "next/image";
import { ClockIcon, MapIcon, StarIcon } from "@heroicons/react/24/solid";
import ReserveTourForm from "../_components/ReserveTourForm";
import { Tour } from "../_lib/types";

export const metadata = {
  title: "Tours",
};

const fallbackTours: Tour[] = [
  {
    id: 1,
    name: "Wenchi Crater Lake Adventure",
    duration_days: 2,
    price: 280,
    difficulty: "Easy",
    description: "Boat rides, crater viewpoints, and a calm highland escape near Addis.",
    image: "/images/wenchi.jpg",
  },
  {
    id: 3,
    name: "Simien Highlands Wildlife Trek",
    duration_days: 5,
    price: 640,
    difficulty: "Moderate",
    description: "Hike dramatic escarpments and spot Gelada baboons and Walia ibex.",
    image: "/images/geladababbon.jpg",
  },
  {
    id: 4,
    name: "Lalibela Heritage Journey",
    duration_days: 3,
    price: 520,
    difficulty: "Easy",
    description: "Explore the iconic rock-hewn churches with local cultural guides.",
    image: "/images/lalibela.jpg",
  },
];

export default async function Page() {
  return (
    <section className="section">
      <div className="container-main">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Curated journeys
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Expertly crafted itineraries that go beyond sightseeing. From the
            Danakil floor to the Simien Peaks, every trip is designed for comfort
            and discovery.
          </p>
        </div>

        <div className="mt-10">
          <Suspense fallback={<Spinner />}>
            <TourList />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function TourList() {
  let tours: Tour[] = [];
  try {
    tours = await getTours();
  } catch (error) {
    console.error("Failed to load tours:", error);
    tours = fallbackTours;
  }

  if (!tours?.length) tours = fallbackTours;

  if (!tours.length)
    return (
      <p className="text-slate-600">
        Our expedition schedules are being finalized. Check back for upcoming
        departures.
      </p>
    );

  return (
    <div className="space-y-10">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

function TourCard({ tour }: { tour: Tour }) {
  const { name, duration_days, price, difficulty, description, image } = tour;

  // Robust image mapping to bypass DB update restrictions for the fresh assets
  const tourImages: { [key: number]: string } = {
    1: "/images/wenchi.jpg",
    2: "/images/dankil_depression.jpg",
    3: "/images/geladababbon.jpg",
    4: "/images/lalibela.jpg",
    5: "/images/omoperson.jpg",
    6: "/images/tisabay.jpg",
    7: "/images/feedingofhyenainharrar.jpg",
    8: "/images/hawassasaintgebrielmonstaery.jpg",
    13: "/images/hawassalake.jpg",
  };

  const displayImage = tourImages[tour.id] || (image
    ? `/images/${image.split("/").pop()}`.replace(/%20/g, " ")
    : image) || "/images/wenchi.jpg";

  return (
    <div className="card overflow-hidden grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative min-h-[280px] lg:min-h-full">
        <Image
          src={displayImage}
          fill
          alt={name}
          className="object-cover"
        />
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-4 w-4" />
            ))}
          </div>
          <span className="tag">{difficulty}</span>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
            {name}
          </h3>
          <p className="mt-3 text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
            <ClockIcon className="h-6 w-6 text-brand-emerald-600" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Duration
              </p>
              <p className="text-slate-900 font-semibold">{duration_days} days</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
            <MapIcon className="h-6 w-6 text-brand-emerald-600" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Group type
              </p>
              <p className="text-slate-900 font-semibold">Guaranteed</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-slate-100 pt-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Starting from
            </p>
            <p className="text-3xl font-semibold text-slate-900">
              ${price}{" "}
              <span className="text-sm font-medium text-slate-500">
                USD per seat
              </span>
            </p>
          </div>
          <div className="w-full md:w-auto min-w-[260px]">
            <ReserveTourForm tour={tour} session={null} />
          </div>
        </div>
      </div>
    </div>
  );
}
