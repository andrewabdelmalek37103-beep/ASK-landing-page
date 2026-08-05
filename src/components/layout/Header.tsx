"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="focus-ring rounded-md" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <TrackedCTA
            event="navigation_cta_clicked"
            ctaLocation="header"
            action="book"
            size="sm"
          >
            {siteConfig.cta.primary}
          </TrackedCTA>
        </div>

        <button
          type="button"
          className="focus-ring rounded-md p-2 text-fg lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-bg px-4 pb-8 pt-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="focus-ring rounded-md px-2 py-3 text-base text-fg-muted hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <TrackedCTA
            event="navigation_cta_clicked"
            ctaLocation="mobile_menu"
            action="book"
            className="mt-4 w-full"
            onActivate={() => setMobileOpen(false)}
          >
            {siteConfig.cta.primary}
          </TrackedCTA>
        </div>
      )}
    </header>
  );
}
