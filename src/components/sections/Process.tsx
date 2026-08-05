import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedFlow } from "@/components/ui/AnimatedFlow";
import { processSteps, processDiagram } from "@/content/home";

export function Process() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How ASK works"
          title="From AI idea to a working business system."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-border bg-bg-raised/50 p-6"
            >
              <span className="font-heading text-3xl font-medium text-accent-strong">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-lg font-medium text-fg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
              <p className="mt-4 border-t border-border pt-3 text-xs font-medium uppercase tracking-wide text-cyan">
                {step.deliverable}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-bg-raised/30 p-6 sm:p-8">
          <p className="mb-6 text-sm font-medium text-fg-muted">System diagram</p>
          <AnimatedFlow steps={[...processDiagram]} orientation="horizontal" />
        </div>
      </div>
    </section>
  );
}
