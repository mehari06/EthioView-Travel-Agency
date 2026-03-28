import ReservationList from "../../_components/ReservationList";
import { auth } from "../../_lib/auth";
import { getBookings } from "../../_lib/data-service";
import { resolveGuestIds } from "../../_lib/guest";

export const metadata = {
  title: "Reservations",
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
        Sign in to view your reservations.
      </p>
    );
  }

  const guestIds = await resolveGuestIds(session);
  if (!guestIds.length) {
    return (
      <p className="text-lg">
        Your account is signed in, but reservations are temporarily unavailable.
      </p>
    );
  }

  let bookings = [];
  try {
    bookings = await getBookings(guestIds);
  } catch {
    bookings = [];
  }

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
