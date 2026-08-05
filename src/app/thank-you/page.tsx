"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CalendarCheck, ClipboardList, MessageSquareText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

const prepPrompts = [
  "Your current tech stack (e-commerce platform, help desk, CRM, ERP, and any AI or automation tools already in use).",
  "The single biggest bottleneck slowing down revenue or operations right now.",
  "A rough sense of monthly order volume and customer conversation volume.",
  "Anyone else on your team who should weigh in on scope or approval decisions.",
];

const BOOKING_COMPLETED_KEY = "ask_booking_completed_tracked";

export default function ThankYouPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(BOOKING_COMPLETED_KEY)) return;
    window.sessionStorage.setItem(BOOKING_COMPLETED_KEY, "1");
    track("booking_completed", { ctaLocation: "thank_you_page" });
  }, []);

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-soft">
          <CalendarCheck className="h-7 w-7 text-cyan" aria-hidden="true" />
        </div>

        <h1 className="mt-6 text-balance font-heading text-3xl font-medium text-fg sm:text-4xl">
          You&apos;re booked. See you soon.
        </h1>
        <p className="mt-4 text-balance text-lg leading-relaxed text-fg-muted">
          Your {siteConfig.booking.durationMinutes}-minute AI Growth Audit is confirmed. A
          calendar invite and confirmation email are on their way.
        </p>

        <div className="mt-12 rounded-2xl border border-border bg-bg-raised/40 p-6 text-left sm:p-8">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
            <h2 className="font-heading text-lg font-medium text-fg">
              To get the most out of the call, have these ready
            </h2>
          </div>
          <ul className="mt-5 space-y-3">
            {prepPrompts.map((prompt) => (
              <li key={prompt} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                {prompt}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-sm text-fg-muted">
            Curious what a system could look like for your business before the call?
          </p>
          <Link
            href="/#example-systems"
            className="focus-ring rounded-md text-sm font-medium text-cyan hover:text-cyan/80"
          >
            Review example systems &rarr;
          </Link>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="flex items-center justify-center gap-2 text-sm text-fg-subtle">
            <MessageSquareText className="h-4 w-4 shrink-0" aria-hidden="true" />
            Need to reschedule or change something?{" "}
            {siteConfig.contact.email ? (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-ring rounded-md font-medium text-fg-muted underline underline-offset-2 hover:text-fg"
              >
                Contact us
              </a>
            ) : (
              "Use the link in your confirmation email."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
