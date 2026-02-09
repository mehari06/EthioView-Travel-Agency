"use client";

import Image from "next/image";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import { Cabin } from "../_lib/types";
import { User } from "next-auth";

interface ReservationFormProps {
  cabin: Cabin;
  user: User;
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = (startDate && endDate) ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
        <p>Logged in as</p>

        <div className="flex gap-3 items-center">
          <div className="relative h-9 w-9">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full object-cover"
              src={user.image!}
              fill
              alt={user.name!}
            />
          </div>
          <p className="font-semibold text-slate-900">{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData: FormData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="text-base flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="input-label">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="input"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="input-label">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="input"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-slate-500 text-sm">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
