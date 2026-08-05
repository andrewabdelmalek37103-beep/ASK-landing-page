import { User } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-2xl border border-border bg-bg-raised/40 p-8 sm:grid-cols-[auto_1fr] sm:p-12">
          {/*
            Founder photo placeholder — replace with a real, approved photo via
            next/image (e.g. <Image src="/founder.jpg" alt="Founder name, ASK AI Agency" .../>).
            Do not replace this with a stock or AI-generated portrait.
          */}
          <div
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-elevated text-fg-subtle"
            role="img"
            aria-label="Founder photo placeholder"
          >
            <User className="h-10 w-10" aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-heading text-2xl font-medium text-fg sm:text-3xl">
              Enterprise operations thinking applied to e-commerce AI.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
              ASK combines hands-on e-commerce implementation with experience managing complex
              operations, transformation programs, reporting, governance, and cross-functional
              systems. The result is an approach focused on reliability, adoption, measurement,
              and business value—not experimentation for its own sake.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
