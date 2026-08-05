"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CheckCircle2, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { demoTabs } from "@/content/home";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function ExampleDemos() {
  const [activeId, setActiveId] = useState(demoTabs[0].id);
  const activeTab = demoTabs.find((t) => t.id === activeId) ?? demoTabs[0];
  const shouldReduceMotion = useReducedMotion();

  function handleTabChange(id: string) {
    setActiveId(id);
    track("example_demo_changed", { demoTab: id });
  }

  return (
    <section id="example-systems" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Example systems"
          title="See what an AI system actually does."
          description="Not another chatbot floating in the corner. These systems retrieve information, follow business rules, update tools, trigger workflows, and escalate when human judgment is needed."
        />

        <div
          role="tablist"
          aria-label="Example AI system demos"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {demoTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              id={`demo-tab-${tab.id}`}
              aria-selected={activeId === tab.id}
              aria-controls={`demo-panel-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "focus-ring rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                activeId === tab.id
                  ? "border-accent bg-accent-soft text-accent-strong"
                  : "border-border-strong text-fg-muted hover:text-fg"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Card
          role="tabpanel"
          id={`demo-panel-${activeTab.id}`}
          aria-labelledby={`demo-tab-${activeTab.id}`}
          className="mt-8 overflow-hidden p-6 sm:p-10"
        >
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab.customerLine && (
            <div className="mb-6 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-fg-muted">
                  <User className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="rounded-2xl rounded-tl-sm bg-bg-elevated px-4 py-3 text-sm text-fg">
                  {activeTab.customerLine}
                </p>
              </div>
              {activeTab.aiLine && (
                <div className="flex items-start justify-end gap-3">
                  <p className="rounded-2xl rounded-tr-sm bg-accent-soft px-4 py-3 text-sm text-fg">
                    {activeTab.aiLine}
                  </p>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                    AI
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab.alertLine && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyan/30 bg-cyan-soft px-4 py-3.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
              <p className="text-sm text-fg">{activeTab.alertLine}</p>
            </div>
          )}

          <p className="mb-3 text-sm font-medium text-fg">What the system does behind the scenes</p>
          <ol className="grid gap-2.5 sm:grid-cols-2">
            {activeTab.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                <span>
                  <span className="text-fg-subtle">{i + 1}. </span>
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 border-t border-border pt-4">
            <Badge variant="outline">{activeTab.disclaimer}</Badge>
          </div>
        </motion.div>
        </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
