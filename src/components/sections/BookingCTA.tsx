import { Target, ListChecks, Map, Check, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { goodFit, tooEarly } from "@/content/home";

const benefits = [
  { icon: Target, text: "Identify three priority AI opportunities." },
  { icon: ListChecks, text: "Select the best first system." },
  { icon: Map, text: "Map the required tools and data." },
];

export function BookingCTA() {
  return (
    <section id="book-audit" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="Find the first AI system your business should build."
          description="In a 30-minute AI Growth Audit, we will review your current bottleneck, existing technology, and highest-impact opportunities. You will leave with a clearer view of what to automate, what not to automate, and what should happen next."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.text}
                className="flex items-center gap-3 rounded-xl border border-border bg-bg-raised/40 p-5"
              >
                <Icon className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                <p className="text-sm text-fg">{benefit.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <TrackedCTA event="hero_primary_cta_clicked" ctaLocation="booking_cta_section" action="book" size="lg">
            Book Your Free AI Growth Audit
          </TrackedCTA>
          <p className="text-sm text-fg-subtle">
            No obligation. No generic sales presentation. Bring your store URL and biggest
            operational challenge.
          </p>
          <p className="text-sm text-fg-muted">
            Not ready to build yet? The audit can still help you create a practical AI roadmap.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan/30 bg-cyan-soft p-6">
            <h3 className="font-heading text-lg font-medium text-fg">Good fit</h3>
            <ul className="mt-4 space-y-2.5">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-bg-raised/40 p-6">
            <h3 className="font-heading text-lg font-medium text-fg">Probably too early</h3>
            <ul className="mt-4 space-y-2.5">
              {tooEarly.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
