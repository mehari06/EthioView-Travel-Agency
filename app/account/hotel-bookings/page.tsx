import { Suspense } from "react";
import { auth } from "@/app/_lib/auth";
import { getHotelBookings } from "@/app/_lib/data-service";
import Spinner from "@/app/_components/Spinner";
import { format, isPast } from "date-fns";
import { deleteHotelBookingAction } from "@/app/_lib/hotel-actions";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export const metadata = {
  title: "Hotel Bookings",
};

export default async function Page() {
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-slate-900 mb-7">
        Your Hotel Reservations
      </h2>

      <Suspense fallback={<Spinner />}>
        <HotelBookingList session={session} />
      </Suspense>
    </div>
  );
}

async function HotelBookingList({ session }: { session: any }) {
  if (!session?.user?.guestId) {
    return (
      <p className="text-lg text-slate-600">
        Sign in to view your hotel bookings.
      </p>
    );
  }

  let bookings: any[] = [];
  try {
    bookings = await getHotelBookings(session.user.guestId);
  } catch {
    bookings = [];
  }

  if (!bookings || bookings.length === 0) {
    return (
      <p className="text-lg text-slate-600">
        You have no hotel bookings yet. Visit our{" "}
        <a href="/hotels" className="underline text-brand-emerald-600">
          Hotels page
        </a>{" "}
        to make a reservation.
      </p>
    );
  }

  return (
    <ul className="space-y-6">
      {bookings.map((booking: any) => {
        const isUpcoming = !isPast(new Date(booking.check_in_date));
        const numNights = Math.ceil(
          (new Date(booking.check_out_date).getTime() -
            new Date(booking.check_in_date).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return (
          <li key={booking.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl text-slate-900 font-semibold mb-1">
                  {booking.hotel_packages.hotels.name}
                </h3>
                <p className="text-brand-emerald-600 font-semibold">
                  {booking.hotel_packages.name}
                </p>
              </div>
              <span
                className={`tag ${
                  isUpcoming
                    ? "bg-brand-emerald-50 text-brand-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {isUpcoming ? "Upcoming" : "Past"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3 text-slate-600">
                <CalendarDaysIcon className="h-5 w-5 text-brand-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Check-in</p>
                  <p className="font-semibold text-slate-900">
                    {format(new Date(booking.check_in_date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <CalendarDaysIcon className="h-5 w-5 text-brand-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Check-out</p>
                  <p className="font-semibold text-slate-900">
                    {format(new Date(booking.check_out_date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <UserGroupIcon className="h-5 w-5 text-brand-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Guests</p>
                  <p className="font-semibold text-slate-900">
                    {booking.num_guests}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <CurrencyDollarIcon className="h-5 w-5 text-brand-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500 uppercase">Total</p>
                  <p className="font-semibold text-slate-900">
                    ${booking.total_price}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
              <MapPinIcon className="h-4 w-4 text-brand-emerald-600" />
              <span>{booking.hotel_packages.hotels.location}</span>
              <span className="text-slate-400">&bull;</span>
              <span>
                {numNights} {numNights === 1 ? "night" : "nights"}
              </span>
            </div>

            {booking.special_requests && (
              <div className="mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-1">
                  Special Requests
                </p>
                <p className="text-slate-700">{booking.special_requests}</p>
              </div>
            )}

            {isUpcoming && (
              <form action={deleteHotelBookingAction.bind(null, booking.id)}>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-all text-sm font-semibold"
                >
                  Cancel Booking
                </button>
              </form>
            )}
          </li>
        );
      })}
    </ul>
  );
}
