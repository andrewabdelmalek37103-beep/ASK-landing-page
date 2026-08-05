import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrations } from "@/content/home";

export function IntegrationStrip() {
  return (
    <section className="border-y border-border bg-bg-raised/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="Connect the tools you already use."
          description="ASK builds around your current stack instead of forcing you into another disconnected platform."
        />

        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {integrations.map((integration) => (
            <li
              key={integration.name}
              className="rounded-full border border-border-strong bg-bg-elevated/60 px-4 py-2 text-sm text-fg-muted"
            >
              {integration.name}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-fg-subtle">
          Example integrations—not official partnership claims.
        </p>
      </div>
    </section>
  );
}
