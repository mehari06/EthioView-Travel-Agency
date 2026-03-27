import Cabin from "../../_components/Cabin";
import Reservation from "../../_components/Reservation";
import Spinner from "../../_components/Spinner";
import AmenitiesList from "../../_components/AmenitiesList";
import { getCabin } from "../../_lib/data-service";
import { fallbackCabins, getFallbackCabinById } from "../../_lib/fallback-cabins";

import { Suspense } from "react";
import { Cabin as CabinType } from "../../_lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { cabinId: string } }) {
  const cabinId = Number(params.cabinId);
  let cabin: CabinType | undefined;
  try {
    cabin = await getCabin(cabinId);
  } catch {
    cabin = getFallbackCabinById(cabinId);
  }

  if (!cabin) {
    return {
      title: "Lodge",
      description: "Explore premium lodge stays across Ethiopia.",
    };
  }

  const { id, name, description, image } = cabin;

  // Robust image mapping for metadata
  const cabinImages: { [key: number]: string } = {
    1: "/images/lodge.jpg",
    2: "/images/cabin2.jpg",
    3: "/images/cabin3.jpg",
    4: "/images/cabin4.jpg",
    5: "/images/cabin5.jpg",
    6: "/images/lodge1.jpg",
    7: "/images/aregashlodge.jpg",
    8: "/images/debrezietlodge.jpg",
  };

  const displayImage = cabinImages[id] || (image?.startsWith("http")
    ? `/images/${image.split("/").pop()}`.replace(/%20/g, " ")
    : image);

  return {
    title: `Lodge ${name}`,
    description: description?.slice(0, 160) || `Experience luxury at Lodge ${name}.`,
    openGraph: {
      title: `Lodge ${name} | Ethioview Travel Agency`,
      description: description?.slice(0, 160),
      images: [displayImage],
    },
  };
}

export default async function Page({ params }: { params: { cabinId: string } }) {
  const cabinId = Number(params.cabinId);
  let cabin: CabinType | undefined;
  try {
    cabin = await getCabin(cabinId);
  } catch {
    cabin = getFallbackCabinById(cabinId);
  }

  const safeCabin = cabin || fallbackCabins[0];

  return (
    <section className="section">
      <div className="container-main">
        <Cabin cabin={safeCabin} />

        <AmenitiesList />

        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 text-slate-900">
            Reserve {safeCabin.name} today. Pay on arrival.
          </h2>

          <Suspense fallback={<Spinner />}>
            <Reservation cabin={safeCabin} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
