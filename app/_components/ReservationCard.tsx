import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import { Booking } from "../_lib/types";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

interface ReservationCardProps {
  booking: Booking;
  onDelete: (bookingId: number) => void;
}

function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  const {
    id,
    start_date,
    end_date,
    num_nights,
    total_price,
    num_guests,
    created_at,
    cabins,
  } = booking;

  const name = cabins?.name;
  const image = cabins?.image;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      <div className="relative h-40 sm:h-32 w-full sm:aspect-square">
        {image && (
          <Image
            src={image}
            alt={`Lodge ${name}`}
            fill
            className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
          />
        )}
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold italic text-accent-400">
            {num_nights} nights in Lodge {name}
          </h3>
          {isPast(new Date(start_date)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">${total_price}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300 font-light">
            {num_guests} traveler{num_guests > 1 && "s"}
          </p>
          <p className="sm:ml-auto text-sm text-primary-400 font-light italic">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
        {!isPast(new Date(start_date)) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center sm:justify-start gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-r-0 sm:border-b border-primary-800 flex-1 px-3 py-3 hover:bg-accent-600 transition-all hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
