import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  const filter = (searchParams?.capacity as string) ?? "all";

  return (
    <section className="section">
      <div className="container-main">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Elite highland lodges
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Boutique lodges with panoramic views, thoughtful service, and
            Ethiopian hospitality. Choose a stay that matches your pace and
            group size.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Filter />
        </div>

        <div className="mt-8">
          <Suspense fallback={<Spinner />} key={filter}>
            <CabinList filter={filter} />
            <ReservationReminder />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
