import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { proofExamples, verifiedCaseStudies } from "@/content/home";

export function ProofSection() {
  if (siteConfig.proofMode === "verified-case-studies" && verifiedCaseStudies.length > 0) {
    return (
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Proof" title="Verified results from ASK clients." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {verifiedCaseStudies.map((study, i) => (
              <Reveal key={study.id} delay={i * 0.08}>
                <Card>
                  <CardContent className="flex flex-col gap-4 pt-6">
                    <p className="text-sm italic leading-relaxed text-fg">&ldquo;{study.quote}&rdquo;</p>
                    <p className="text-xs text-fg-subtle">{study.attribution}</p>
                    <dl className="space-y-2 border-t border-border pt-4 text-sm text-fg-muted">
                      <div>
                        <dt className="font-medium text-fg">Before</dt>
                        <dd>{study.beforeState}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-fg">Implemented system</dt>
                        <dd>{study.implementedSystem}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-fg">Measured result</dt>
                        <dd>{study.measuredResult}</dd>
                      </div>
                    </dl>
                    <p className="text-xs text-fg-subtle">
                      {study.measurementPeriod} · {study.methodologyNote}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proof"
          title="Example systems ASK can implement."
          description="ASK does not yet have enough verified, publishable customer results to show as case studies. These are anonymized architecture examples of the kind of system ASK builds."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {proofExamples.map((example, i) => (
            <Reveal key={example.id} delay={i * 0.08}>
              <Card>
                <CardContent className="flex h-full flex-col gap-4 pt-6">
                  <h3 className="font-heading text-lg font-medium text-fg">{example.title}</h3>
                  <ul className="flex-1 space-y-2">
                    {example.components.map((component) => (
                      <li key={component} className="flex items-start gap-2 text-sm text-fg-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                        {component}
                      </li>
                    ))}
                  </ul>
                  <Badge variant="outline" className="w-fit">
                    {example.label}
                  </Badge>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
