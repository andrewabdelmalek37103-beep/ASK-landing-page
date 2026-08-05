import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Metric } from "@/components/ui/Metric";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { systems } from "@/content/systems";

export function Systems() {
  return (
    <section id="systems" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Systems"
          title="Start with the system that solves your biggest constraint."
          description="You do not need every possible AI feature. You need the right system connected to a measurable business outcome."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {systems.map((system) => (
            <Card key={system.id} className="flex h-full flex-col">
              <CardContent className="flex h-full flex-col gap-5 pt-6">
                <div>
                  <h3 className="font-heading text-xl font-medium text-fg">{system.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{system.outcome}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {system.capabilities.slice(0, 6).map((capability) => (
                    <Badge key={capability} variant="outline">
                      {capability}
                    </Badge>
                  ))}
                  {system.capabilities.length > 6 && (
                    <Badge variant="outline">+{system.capabilities.length - 6} more</Badge>
                  )}
                </div>

                <p className="rounded-lg border border-border bg-bg-elevated/50 px-3 py-2.5 text-sm text-fg-muted">
                  <span className="font-medium text-fg">Best fit for: </span>
                  {system.bestFitFor}
                </p>

                <details className="group">
                  <summary className="focus-ring cursor-pointer list-none rounded-md text-sm font-medium text-accent-strong hover:text-accent">
                    See workflow, integrations &amp; metrics
                  </summary>
                  <div className="mt-4 flex flex-col gap-4 text-sm">
                    <div>
                      <p className="mb-2 font-medium text-fg">Common triggers</p>
                      <ul className="list-inside list-disc space-y-1 text-fg-muted">
                        {system.commonTriggers.map((trigger) => (
                          <li key={trigger}>{trigger}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 font-medium text-fg">Example workflow</p>
                      <ol className="list-inside list-decimal space-y-1 text-fg-muted">
                        {system.exampleWorkflow.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <p className="mb-2 font-medium text-fg">Relevant integrations</p>
                      <div className="flex flex-wrap gap-1.5">
                        {system.integrations.map((integration) => (
                          <Badge key={integration} variant="cyan">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 font-medium text-fg">Metrics to monitor</p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {system.metrics.map((metric) => (
                          <Metric key={metric} label={metric} />
                        ))}
                      </div>
                    </div>
                  </div>
                </details>

                <TrackedCTA
                  event="system_card_clicked"
                  ctaLocation="systems_section"
                  systemName={system.name}
                  action="book"
                  variant="secondary"
                  className="mt-auto"
                >
                  {system.ctaLabel}
                </TrackedCTA>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
