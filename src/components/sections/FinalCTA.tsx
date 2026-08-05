import { TrackedCTA } from "@/components/conversion/TrackedCTA";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-bg-raised/40 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-heading text-3xl font-medium text-fg sm:text-4xl">
          Stop adding disconnected AI tools. Build the system your business actually needs.
        </h2>
        <p className="mt-4 text-balance text-lg leading-relaxed text-fg-muted">
          Start with your biggest revenue or operations constraint. ASK will help you map the
          right first implementation.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <TrackedCTA event="hero_primary_cta_clicked" ctaLocation="final_cta" action="book" size="lg">
            Book Your Free AI Growth Audit
          </TrackedCTA>
          <TrackedCTA
            event="hero_secondary_cta_clicked"
            ctaLocation="final_cta"
            action="scroll"
            href="#opportunity-finder"
            variant="secondary"
            size="lg"
          >
            Run the AI Opportunity Finder
          </TrackedCTA>
        </div>

        <p className="mt-4 text-sm text-fg-subtle">
          30-minute consultation • Practical recommendations • No obligation
        </p>
      </div>
    </section>
  );
}
