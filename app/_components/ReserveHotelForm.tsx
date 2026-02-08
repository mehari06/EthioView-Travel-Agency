"use client";

import { useState } from "react";
import { differenceInDays } from "date-fns";
import { createHotelBookingAction } from "../_lib/hotel-actions";
import { Session } from "next-auth";
import SubmitButton from "./SubmitButton";

interface ReserveHotelFormProps {
  packageData: {
    id: number;
    name: string;
    price_per_night: number;
    max_capacity: number;
  };
  session: Session | null;
}

export default function ReserveHotelForm({
  packageData,
  session,
}: ReserveHotelFormProps) {
  const { id, price_per_night, max_capacity } = packageData;
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numGuests, setNumGuests] = useState(1);

  const numNights =
    checkInDate && checkOutDate
      ? differenceInDays(new Date(checkOutDate), new Date(checkInDate))
      : 0;

  const totalPrice = numNights * price_per_night;

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="card p-8">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
        Reserve this package
      </h3>

      {!session?.user ? (
        <p className="text-slate-600">Please sign in to book this package.</p>
      ) : (
        <form action={createHotelBookingAction} className="space-y-6">
          <input type="hidden" name="packageId" value={id} />
          <input type="hidden" name="totalPrice" value={totalPrice} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={minDate}
                required
                className="input"
              />
            </div>

            <div>
              <label className="input-label">Check-out Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || minDate}
                required
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="input-label">Number of Guests</label>
            <select
              name="numGuests"
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
              required
              className="input"
            >
              {Array.from({ length: max_capacity }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "guest" : "guests"}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="input-label">Special Requests (Optional)</label>
            <textarea
              name="specialRequests"
              rows={3}
              placeholder="Any special requirements or requests..."
              className="input resize-none"
            />
          </div>

          {numNights > 0 && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex justify-between text-slate-600 mb-2">
                <span>
                  {numNights} {numNights === 1 ? "night" : "nights"}
                </span>
                <span>
                  ${price_per_night} x {numNights}
                </span>
              </div>
              <div className="flex justify-between text-slate-900 text-xl font-semibold pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}

          <SubmitButton pendingLabel="Booking...">Book Now</SubmitButton>
        </form>
      )}
    </div>
  );
}
