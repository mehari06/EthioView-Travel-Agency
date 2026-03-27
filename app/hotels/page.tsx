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

const fallbackHotel = {
  id: 1,
  name: "Haile Resort Hawassa",
};

const fallbackHotelPackages = [
  {
    id: 1,
    hotel_id: 1,
    name: "Deluxe Lake View Room",
    description: "Elegant room with balcony views over Lake Hawassa.",
    price_per_night: 165,
    max_capacity: 2,
    amenities: ["Breakfast included", "Free Wi-Fi", "Lake-view balcony", "Pool access"],
    image: "/images/haile-resort/haile-2.jpg",
  },
  {
    id: 2,
    hotel_id: 1,
    name: "Family Suite",
    description: "Spacious suite designed for family comfort and flexibility.",
    price_per_night: 240,
    max_capacity: 4,
    amenities: ["Breakfast included", "Two sleeping areas", "Garden view", "Kids-friendly setup"],
    image: "/images/haile-resort/haile-5.jpg",
  },
  {
    id: 3,
    hotel_id: 1,
    name: "Executive Business Suite",
    description: "Premium setup for work trips with added privacy and comfort.",
    price_per_night: 295,
    max_capacity: 2,
    amenities: ["Workspace", "Fast Wi-Fi", "Airport transfer support", "Lounge access"],
    image: "/images/haile-resort/haile-10.jpg",
  },
];

export default async function Page() {
  let session = null;
  try {
    session = await auth();
  } catch (error) {
    console.error("Failed to load session on hotels page:", error);
  }
  const images = [
    "/images/haile-resort/haile-2.jpg",
    "/images/haile-resort/haile-3.jpg",
    "/images/haile-resort/haile-5.jpg",
    "/images/haile-resort/haile-6.jpg",
    "/images/haile-resort/haile-7.jpg",
    "/images/haile-resort/haile-9.jpg",
    "/images/haile-resort/haile-10.jpg",
    "/images/haile-resort/haile-11.jpg",
    "/images/haile-resort/haile-12.jpg",
    "/images/haile-resort/haile-13.jpg",
    "/images/haile-resort/haile-14.jpg",
    "/images/haile-resort/haile-15.jpg",
    "/images/haile-resort/haile-16.jpg",
    "/images/haile-resort/haile-17.jpg",
    "/images/haile-resort/haile-18.jpg",
    "/images/haile-resort/haile-19.jpg",
    "/images/haile-resort/haile-20.jpg",
    "/images/haile-resort/haile-21.jpg",
    "/images/haile-resort/haile-23.jpg",
    "/images/haile-resort/haile-24.jpg",
    "/images/haile-resort/haile-25.jpg",
    "/images/sheratonhotel.jpg",
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
  let hotels: any[] = [];
  try {
    hotels = await getHotels();
  } catch (error) {
    console.error("Failed to load hotels:", error);
    hotels = [fallbackHotel];
  }

  if (!hotels?.length) hotels = [fallbackHotel];

  const haileResort =
    hotels?.find((h: any) => h.name === "Haile Resort Hawassa") || fallbackHotel;

  let packages: any[] = [];
  try {
    packages = await getHotelPackages(haileResort.id);
  } catch (error) {
    console.error("Failed to load hotel packages:", error);
    packages = fallbackHotelPackages;
  }

  if (!packages?.length) packages = fallbackHotelPackages;

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
