"use client";

import { useCallback, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { BookingModal } from "@/components/conversion/BookingModal";
import { BookingModalContext } from "@/components/conversion/booking-modal-context";

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((ctaLocation: string) => {
    if (typeof document !== "undefined") {
      triggerRef.current = document.activeElement as HTMLElement;
    }
    setIsOpen(true);
    track("booking_modal_opened", { ctaLocation });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus?.());
  }, []);

  return (
    <BookingModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  );
}
