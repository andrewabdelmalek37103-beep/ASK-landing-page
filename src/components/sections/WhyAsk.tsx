import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators } from "@/content/home";

export function WhyAsk() {
  return (
    <section id="why-ask" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why ASK"
          title="Built like an operating system, not a collection of automations."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="lg:col-span-1">
              <span className="font-heading text-2xl text-fg-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-heading text-lg font-medium text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
