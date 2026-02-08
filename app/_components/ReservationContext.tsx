"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange;
  setRange: (range: DateRange | undefined) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const initialState: DateRange = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range: range || initialState, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
