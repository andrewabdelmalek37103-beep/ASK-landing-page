"use client";

import dynamic from "next/dynamic";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { siteConfig } from "@/config/site";
import { useBookingModal } from "@/components/conversion/booking-modal-context";

const BookingEmbed = dynamic(
  () => import("@/components/conversion/BookingEmbed").then((m) => m.BookingEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[400px] items-center justify-center text-fg-muted">
        Preparing booking calendar…
      </div>
    ),
  }
);

export function BookingModal() {
  const { isOpen, close } = useBookingModal();

  return (
    <Dialog open={isOpen} onOpenChange={(next) => !next && close()}>
      <DialogContent
        title={siteConfig.booking.title}
        description={`${siteConfig.booking.durationMinutes} minutes · No obligation`}
      >
        {isOpen && <BookingEmbed />}
      </DialogContent>
    </Dialog>
  );
}
