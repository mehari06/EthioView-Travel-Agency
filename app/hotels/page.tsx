import { Suspense } from "react";
import HotelCarousel from "../_components/HotelCarousel";
import HotelPackageCard from "../_components/HotelPackageCard";
import ReserveHotelForm from "../_components/ReserveHotelForm";
import { getHotelPackages, getHotels } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Hotels",
};

export default async function Page() {
  const session = await auth();
  const images = [
    ...Array.from(
      { length: 24 },
      (_, i) => `/ethiocabin/haileResort/haileResortHawassa (${i + 1}).jpg`
    ),
    "/ethiocabin/haileResort/adisabebahilton.webp",
  ];

  return (
    <section className="section">
      <div className="container-main">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Luxurious stays
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Experience Ethiopian hospitality at Hawassa Haile Resort. Enjoy
            lakeside views, premium amenities, and a relaxing retreat designed
            for comfort.
          </p>
        </div>

        <div className="mt-10">
          <HotelCarousel images={images} />
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-slate-900">
              Available packages
            </h2>
            <p className="mt-3 text-slate-600">
              Choose from curated room packages designed for business trips,
              family getaways, or romantic weekends.
            </p>
          </div>

          <div className="mt-8">
            <Suspense fallback={<Spinner />}>
              <PackageList session={session} />
            </Suspense>
          </div>
        </div>

        <div className="mt-14 card p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
            Resort features
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Panoramic lake views
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Fine dining restaurants
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Full-service wellness spa
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Modern conference facilities
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Outdoor swimming pools
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-emerald-600">&bull;</span> Traditional coffee ceremonies
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

async function PackageList({ session }: { session: any }) {
  const hotels = await getHotels();
  const haileResort = hotels?.find((h: any) => h.name === "Haile Resort Hawassa");

  if (!haileResort) {
    return (
      <p className="text-slate-600">
        Hotel information is being updated. Please check back later.
      </p>
    );
  }

  const packages = await getHotelPackages(haileResort.id);

  if (!packages || packages.length === 0) {
    return (
      <p className="text-slate-600">
        No packages available at the moment. Please check back later.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {packages.map((pkg: any) => (
        <div key={pkg.id} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <HotelPackageCard packageData={pkg} />
          <ReserveHotelForm packageData={pkg} session={session} />
        </div>
      ))}
    </div>
  );
}
