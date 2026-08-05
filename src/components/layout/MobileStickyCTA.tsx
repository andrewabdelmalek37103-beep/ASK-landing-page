"use client";

import { useEffect, useState } from "react";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      )}
      aria-hidden={!visible}
    >
      <TrackedCTA
        event="mobile_sticky_cta_clicked"
        ctaLocation="mobile_sticky"
        action="book"
        className="w-full"
        tabIndex={visible ? 0 : -1}
      >
        {siteConfig.cta.primaryLong}
      </TrackedCTA>
    </div>
  );
}
