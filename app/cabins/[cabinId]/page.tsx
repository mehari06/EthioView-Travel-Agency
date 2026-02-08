import Cabin from "../../_components/Cabin";
import Reservation from "../../_components/Reservation";
import Spinner from "../../_components/Spinner";
import AmenitiesList from "../../_components/AmenitiesList";
import { getCabin, getCabins } from "../../_lib/data-service";

import { Suspense } from "react";
import { Cabin as CabinType } from "../../_lib/types";

export async function generateMetadata({ params }: { params: { cabinId: string } }) {
  const { name } = await getCabin(Number(params.cabinId));
  return { title: `Lodge ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }: { params: { cabinId: string } }) {
  const cabin = await getCabin(Number(params.cabinId));

  return (
    <section className="section">
      <div className="container-main">
      <Cabin cabin={cabin} />

      <AmenitiesList />

      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10 text-slate-900">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
      </div>
    </section>
  );
}
