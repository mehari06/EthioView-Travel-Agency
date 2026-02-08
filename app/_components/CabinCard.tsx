import Image from "next/image";
import Link from "next/link";
import { UsersIcon, WifiIcon, SunIcon, FireIcon } from "@heroicons/react/24/outline";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="card overflow-hidden flex flex-col md:flex-row">
      <div className="flex-1 relative min-h-[260px] overflow-hidden group">
        <Image
          src={image}
          fill
          alt={`Lodge ${name}`}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 tag bg-white/90 text-slate-700">
          Lodge
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div className="pt-8 pb-6 px-8">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Lodge {name}
            </h3>
            <div className="flex gap-2 text-slate-400">
              <WifiIcon title="Free Satellite WiFi" className="h-4 w-4" />
              <SunIcon title="Highland View" className="h-4 w-4" />
              <FireIcon title="Fireplace Included" className="h-4 w-4" />
            </div>
          </div>

          <div className="flex gap-3 items-center text-slate-600 mb-6">
            <UsersIcon className="h-5 w-5 text-brand-emerald-600" />
            <p className="text-sm md:text-base">
              Suited for up to <span className="font-semibold text-slate-900">{maxCapacity}</span> guests
            </p>
          </div>

          <div className="flex items-baseline gap-3 border-t border-slate-100 pt-4">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-semibold text-slate-900">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-slate-400">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-semibold text-slate-900">${regularPrice}</span>
            )}
            <span className="text-slate-500 text-xs uppercase tracking-widest">/ night</span>
          </div>
        </div>

        <div className="px-8 pb-8">
          <Link href={`/cabins/${id}`} className="btn-primary w-full md:w-auto">
            Lodge Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
