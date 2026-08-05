"use client";

import { createContext, useContext } from "react";

export interface BookingModalContextValue {
  isOpen: boolean;
  open: (ctaLocation: string) => void;
  close: () => void;
}

export const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return ctx;
}
