"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { Cabin, Settings } from "../_lib/types";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

interface DateSelectorProps {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? { from: undefined, to: undefined } : range;

  const { regularPrice, discount } = cabin;
  const numNights = (displayRange?.from && displayRange?.to) ? differenceInDays(displayRange.to, displayRange.from) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between p-6">
      <DayPicker
        className="place-self-center"
        mode="range"
        onSelect={(range) => setRange(range)}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-4 text-slate-600">
            <p className="text-xl font-semibold text-slate-900">
              ${regularPrice - discount}
            </p>
            {discount > 0 && (
              <span className="text-sm line-through text-slate-400">
                ${regularPrice}
              </span>
            )}
            <span className="text-sm">per night</span>
          </div>

          {numNights ? (
            <div className="flex items-center gap-3 text-slate-700">
              <span className="tag">{numNights} nights</span>
              <span className="text-lg font-semibold text-slate-900">
                ${cabinPrice}
              </span>
            </div>
          ) : null}

          {range?.from || range?.to ? (
            <button
              className="btn-outline text-sm px-4 py-2"
              onClick={resetRange}
            >
              Clear dates
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DateSelector;
