import { auth } from "../../_lib/auth";
import { getTourBookings } from "../../_lib/data-service";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { TourBooking } from "../../_lib/types";
import { resolveGuestId } from "../../_lib/guest";

export const metadata = {
    title: "My Tours",
};

export default async function Page() {
    let session = null;
    try {
        session = await auth();
    } catch {
        session = null;
    }

    if (!session?.user) {
        return (
            <p className="text-lg">
                Sign in to view your tour reservations.
            </p>
        );
    }

    const guestId = await resolveGuestId(session);
    if (!guestId) {
        return (
            <p className="text-lg">
                Your account is signed in, but tour reservations are temporarily unavailable.
            </p>
        );
    }

    let bookings: TourBooking[] = [];
    try {
        bookings = await getTourBookings(guestId);
    } catch {
        bookings = [];
    }

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Your Tour Reservations
            </h2>

            {bookings.length === 0 ? (
                <p className="text-lg">
                    You haven&apos;t reserved any tours yet. Explore our{" "}
                    <Link className="underline text-accent-500" href="/tours">
                        curated journeys
                    </Link>
                    .
                </p>
            ) : (
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <TourBookingCard booking={booking} key={booking.id} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function TourBookingCard({ booking }: { booking: TourBooking }) {
    const {
        total_price,
        num_guests,
        status,
        order_date,
        tours
    } = booking;

    if (!tours) return null;
    const { name, image, duration_days } = tours;

    return (
        <div className="flex border border-primary-800 bg-primary-950 overflow-hidden">
            <div className="relative h-32 w-32 shrink-0">
                <Image
                    src={image}
                    fill
                    alt={`Tour ${name}`}
                    className="object-cover border-r border-primary-800"
                />
            </div>

            <div className="flex-grow px-6 py-3 flex flex-col">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-accent-400 italic uppercase tracking-wider">
                        {name} &mdash; {duration_days} Days
                    </h3>
                    {status === "unconfirmed" ? (
                        <span className="bg-yellow-800 text-yellow-200 h-6 px-3 text-[10px] uppercase font-bold flex items-center rounded-sm">
                            Pending
                        </span>
                    ) : (
                        <span className="bg-green-800 text-green-200 h-6 px-3 text-[10px] uppercase font-bold flex items-center rounded-sm">
                            Confirmed
                        </span>
                    )}
                </div>

                <p className="text-lg text-primary-300 font-light mt-1">
                    {num_guests} Traveler{num_guests > 1 ? "s" : ""}
                </p>

                <div className="flex items-baseline gap-3 mt-auto">
                    <p className="text-xl font-semibold text-primary-50">${total_price}</p>
                    <p className="text-primary-400 text-xs uppercase tracking-widest">
                        Ordered on {format(new Date(order_date), "MMM dd yyyy")}
                    </p>
                </div>
            </div>
        </div>
    );
}
