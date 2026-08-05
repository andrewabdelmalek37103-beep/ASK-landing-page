import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { engagementOptions } from "@/content/home";
import { cn } from "@/lib/utils";

export function EngagementOptions() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Engagement"
          title="Choose the level of transformation your business needs."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {engagementOptions.map((option, i) => (
            <Reveal key={option.id} delay={i * 0.08}>
            <Card
              className={cn(
                "flex h-full flex-col",
                option.badge && "border-accent/50 shadow-lg shadow-accent/5"
              )}
            >
              <CardContent className="flex h-full flex-col gap-5 pt-6">
                {option.badge && <Badge className="w-fit">{option.badge}</Badge>}
                <div>
                  <h3 className="font-heading text-xl font-medium text-fg">{option.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    <span className="font-medium text-fg">Best for: </span>
                    {option.bestFor}
                  </p>
                </div>

                <ul className="flex-1 space-y-2.5">
                  {option.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <TrackedCTA
                  event="system_card_clicked"
                  ctaLocation="engagement_options"
                  systemName={option.name}
                  action="book"
                  variant={option.badge ? "primary" : "secondary"}
                  className="mt-auto"
                >
                  {option.ctaLabel}
                </TrackedCTA>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-fg-subtle">
          Every project is scoped around the business outcome, data, platforms, complexity, and
          level of ongoing support required.
        </p>
      </div>
    </section>
  );
}
