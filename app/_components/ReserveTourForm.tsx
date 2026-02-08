"use client";

import { useFormStatus } from "react-dom";
import { createTourBooking } from "../_lib/actions";
import { Session } from "next-auth";
import { Tour } from "../_lib/types";

interface ReserveTourFormProps {
    tour: Pick<Tour, 'id' | 'price'>;
    session: Session | null;
}

export default function ReserveTourForm({ tour, session }: ReserveTourFormProps) {
    const { id, price } = tour;
    const tourData = { id, price };

    if (!session) {
        return (
            <div className="card p-6 text-center">
                <p className="text-slate-600 mb-4">Please sign in to reserve your seat.</p>
                <a href="/login" className="btn-secondary text-sm">
                    Login to Reserve
                </a>
            </div>
        );
    }

    return (
        <form action={(formData) => createTourBooking(tourData, formData)} className="flex flex-col gap-4">
            <div>
                <label htmlFor="numGuests" className="input-label">Seats</label>
                <select
                    name="numGuests"
                    id="numGuests"
                    className="input"
                    defaultValue="1"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Person{i > 0 ? 's' : ''}</option>
                    ))}
                </select>
            </div>
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className="btn-primary w-full disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
            {pending ? "Confirming..." : "Reserve Deposit"}
        </button>
    );
}
