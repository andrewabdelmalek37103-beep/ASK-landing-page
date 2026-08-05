import { heroContent } from "@/content/home";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h1 className="text-balance font-heading text-4xl font-medium leading-[1.1] text-fg sm:text-5xl lg:text-[3.25rem]">
            {heroContent.headline}
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
            {heroContent.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <TrackedCTA event="hero_primary_cta_clicked" ctaLocation="hero" action="book" size="lg">
              {heroContent.primaryCta}
            </TrackedCTA>
            <TrackedCTA
              event="hero_secondary_cta_clicked"
              ctaLocation="hero"
              action="scroll"
              href="#example-systems"
              variant="secondary"
              size="lg"
            >
              {heroContent.secondaryCta}
            </TrackedCTA>
          </div>

          <p className="mt-4 text-sm text-fg-subtle">{heroContent.microcopy}</p>
          <p className="mt-8 border-t border-border pt-6 text-sm text-fg-muted">
            {heroContent.credibility}
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
