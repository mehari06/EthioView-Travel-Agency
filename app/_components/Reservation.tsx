import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import { Cabin } from "../_lib/types";

interface ReservationProps {
  cabin: Cabin;
}

async function Reservation({ cabin }: ReservationProps) {
  const defaultSettings = {
    id: 1,
    minBookingLength: 1,
    maxBookingLength: 30,
    maxGuestsPerBooking: 8,
    breakfastPrice: 0,
  };

  let settings = defaultSettings;
  let bookedDates: Date[] = [];
  try {
    const [dbSettings, dbBookedDates] = await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(cabin.id),
    ]);
    settings = dbSettings || defaultSettings;
    bookedDates = dbBookedDates || [];
  } catch {
    settings = defaultSettings;
    bookedDates = [];
  }

  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 min-h-[420px]">
      <div className="card p-6 lg:p-10">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Select your dates</h3>
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>

      <div className="card p-6 lg:p-10 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Complete your booking</h3>
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;
