"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-4 px-6 rounded-full bg-white text-slate-700 font-semibold shadow-card flex gap-6 items-center border border-slate-100">
      <p className="text-sm">
        Don&apos;t forget to reserve your dates from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-2 hover:bg-slate-100 transition-all"
        onClick={resetRange}
        aria-label="Dismiss reminder"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
