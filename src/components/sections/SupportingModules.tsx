import { Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { supportingModules } from "@/content/systems";

export function SupportingModules() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Add only what your business needs" title="Supporting modules" />

        <Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {supportingModules.map((module) => (
              <li
                key={module.name}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-bg-raised/50 px-4 py-3 text-sm text-fg-muted"
              >
                <Layers className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                {module.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
