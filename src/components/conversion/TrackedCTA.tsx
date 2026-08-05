"use client";

import { forwardRef } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { useBookingModal } from "@/components/conversion/booking-modal-context";
import { track } from "@/lib/analytics";
import type { AnalyticsEventName } from "@/types";

type TrackedCTAAction = "book" | "scroll" | "external";

export interface TrackedCTAProps extends Omit<ButtonProps, "onClick"> {
  event: AnalyticsEventName;
  ctaLocation: string;
  action?: TrackedCTAAction;
  /** Anchor selector for "scroll" (e.g. "#systems") or URL for "external". */
  href?: string;
  systemName?: string;
  onActivate?: () => void;
}

export const TrackedCTA = forwardRef<HTMLButtonElement, TrackedCTAProps>(function TrackedCTA(
  { event, ctaLocation, action = "book", href, systemName, onActivate, children, ...props },
  ref
) {
  const { open } = useBookingModal();

  function handleClick() {
    track(event, { ctaLocation, systemName });

    if (action === "book") {
      open(ctaLocation);
    } else if (action === "scroll" && href) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action === "external" && href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }

    onActivate?.();
  }

  return (
    <Button ref={ref} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
});
