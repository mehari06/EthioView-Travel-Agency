import Image from "next/image";
import TextExpander from "./TextExpander";
import { MapPinIcon, UsersIcon, SparklesIcon, HeartIcon, MapIcon } from "@heroicons/react/24/solid";
import { Cabin as CabinType } from "../_lib/types";

interface CabinProps {
  cabin: CabinType;
}

function Cabin({ cabin }: CabinProps) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  // Robust image mapping to ensure correct paths
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

  return (
    <div className="card grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 p-8 lg:p-10 mb-16">
      <div className="relative h-[320px] lg:h-full overflow-hidden rounded-3xl group">
        <Image
          src={displayImage || "/images/lodge.jpg"}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          alt={`Lodge ${name}`}
        />
        <div className="absolute top-4 left-4 tag bg-white/90 text-slate-700">
          Lodge stay
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Lodge {name}
          </h3>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              From
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              ${regularPrice - discount}
              {discount > 0 && (
                <span className="text-sm text-slate-400 line-through ml-2">
                  ${regularPrice}
                </span>
              )}
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
          <TextExpander>{description || ""}</TextExpander>
        </p>

        <ul className="mt-8 grid gap-4 text-slate-700">
          <li className="flex gap-4 items-center">
            <UsersIcon className="h-6 w-6 text-brand-emerald-600" />
            <span>
              Suited for up to <span className="font-semibold">{maxCapacity}</span>{" "}
              guests
            </span>
          </li>
          <li className="flex gap-4 items-center">
            <MapPinIcon className="h-6 w-6 text-brand-emerald-600" />
            <span>
              Perched in the <span className="font-semibold">Simien Highlands</span>
            </span>
          </li>
          <li className="flex gap-4 items-center">
            <SparklesIcon className="h-6 w-6 text-brand-emerald-600" />
            <span>
              Includes <span className="font-semibold">Coffee Ceremony</span>{" "}
              daily
            </span>
          </li>
          <li className="flex gap-4 items-center">
            <MapIcon className="h-6 w-6 text-brand-emerald-600" />
            <span>
              Complimentary <span className="font-semibold">Village Walk</span>{" "}
              with expert guide
            </span>
          </li>
        </ul>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-500">
          <HeartIcon className="h-5 w-5 text-brand-emerald-600" />
          <p className="text-sm uppercase tracking-[0.2em]">
            A sanctuary for the soul
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cabin;
