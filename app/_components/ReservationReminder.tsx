"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[92vw] sm:w-auto max-w-3xl py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-full bg-white text-slate-700 font-semibold shadow-card flex flex-wrap gap-3 sm:gap-6 items-center border border-slate-100">
      <p className="text-xs sm:text-sm leading-relaxed">
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
