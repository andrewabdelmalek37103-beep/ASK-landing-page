"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { painCards } from "@/content/home";

export function PainPoints() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The real problem"
          title="Where is your store leaking revenue or time?"
          description="Most e-commerce businesses do not have an AI problem. They have disconnected customer journeys, repetitive work, delayed decisions, and valuable data sitting in separate tools."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {painCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full transition-colors hover:border-accent/40">
                <CardContent className="flex h-full flex-col gap-3 pt-6">
                  <h3 className="font-heading text-lg font-medium text-fg">{card.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                    {card.description}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-cyan">
                    {card.impactLabel}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-balance text-lg text-fg-muted">
            ASK turns these disconnected tasks into coordinated AI growth and operations systems.
          </p>
          <TrackedCTA
            event="system_card_clicked"
            ctaLocation="pain_points"
            action="scroll"
            href="#opportunity-finder"
            variant="secondary"
          >
            Find My Highest-Impact Opportunity
          </TrackedCTA>
        </div>
      </div>
    </section>
  );
}
