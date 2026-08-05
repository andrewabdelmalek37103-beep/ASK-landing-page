"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calculator, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { Button } from "@/components/ui/Button";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { roiDefaults } from "@/content/home";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

interface InputField {
  key: keyof typeof roiDefaults;
  label: string;
  suffix?: string;
}

const inputFields: InputField[] = [
  { key: "monthlyOrders", label: "Monthly orders" },
  { key: "monthlyEnquiries", label: "Monthly customer enquiries" },
  { key: "averageOrderValue", label: "Average order value", suffix: "$" },
  { key: "abandonedCartValue", label: "Estimated abandoned-cart value per month", suffix: "$" },
  { key: "manualOpsHoursPerWeek", label: "Manual operations hours per week" },
  { key: "hourlyCost", label: "Average employee hourly cost", suffix: "$" },
  { key: "repetitivePercentage", label: "Repetitive support enquiries", suffix: "%" },
  { key: "responseTimeHours", label: "Current average response time", suffix: "hrs" },
];

// Conservative default assumptions used inside the formulas below. Editable
// so a visitor can align the estimate with their own operation.
const defaultAssumptions = {
  avgHandlingMinutes: 6,
  automationRate: 50,
  cartRecoveryRate: 8,
};

export function ROICalculator() {
  const [inputs, setInputs] = useState(roiDefaults);
  const [assumptions, setAssumptions] = useState(defaultAssumptions);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function updateInput(key: keyof typeof roiDefaults, value: number) {
    if (!started) {
      setStarted(true);
      track("roi_calculator_started");
    }
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
    setRevealed(false);
  }

  function updateAssumption(key: keyof typeof defaultAssumptions, value: number) {
    setAssumptions((prev) => ({ ...prev, [key]: Number.isFinite(value) ? value : 0 }));
    setRevealed(false);
  }

  const results = useMemo(() => {
    const {
      monthlyEnquiries,
      manualOpsHoursPerWeek,
      hourlyCost,
      abandonedCartValue,
      repetitivePercentage,
    } = inputs;
    const { avgHandlingMinutes, automationRate, cartRecoveryRate } = assumptions;

    const annualManualOpsCost = manualOpsHoursPerWeek * hourlyCost * 52;

    const repetitiveEnquiriesPerMonth = monthlyEnquiries * (repetitivePercentage / 100);
    const automatableEnquiriesPerMonth = repetitiveEnquiriesPerMonth * (automationRate / 100);
    const automatedSupportHoursPerMonth = (automatableEnquiriesPerMonth * avgHandlingMinutes) / 60;

    const cartOpportunityMonthly = abandonedCartValue * (cartRecoveryRate / 100);
    const cartOpportunityAnnual = cartOpportunityMonthly * 12;

    const hoursReallocatedPerWeek =
      automatedSupportHoursPerMonth / 4.33 + manualOpsHoursPerWeek * (automationRate / 100);

    const salesValue = cartOpportunityAnnual;
    const cxValue = automatedSupportHoursPerMonth * 12 * hourlyCost;
    const opsValue = manualOpsHoursPerWeek * 52 * hourlyCost * (automationRate / 100);

    let suggestedSystem = "AI Sales & Recovery System";
    if (cxValue >= salesValue && cxValue >= opsValue) {
      suggestedSystem = "AI Customer Experience System";
    } else if (opsValue >= salesValue && opsValue >= cxValue) {
      suggestedSystem = "AI Operations Intelligence System";
    }

    return {
      annualManualOpsCost,
      repetitiveEnquiriesPerMonth,
      automatedSupportHoursPerMonth,
      cartOpportunityMonthly,
      hoursReallocatedPerWeek,
      suggestedSystem,
    };
  }, [inputs, assumptions]);

  function handleCalculate() {
    setRevealed(true);
    track("roi_calculator_completed", { assessmentResult: results.suggestedSystem });
  }

  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Opportunity estimator"
          title="Estimate the opportunity hidden in repetitive work."
          description="This is an estimation tool, not a guaranteed-results calculator. Adjust every number to match your business."
        />

        <Card className="mt-10 p-6 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            {inputFields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`roi-${field.key}`}
                  className="mb-1.5 block text-sm text-fg-muted"
                >
                  {field.label}
                </label>
                <div className="relative">
                  {field.suffix === "$" && (
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle">
                      $
                    </span>
                  )}
                  <input
                    id={`roi-${field.key}`}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={inputs[field.key]}
                    onChange={(e) => updateInput(field.key, e.target.valueAsNumber)}
                    className={cn(
                      "focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-fg",
                      field.suffix === "$" && "pl-8"
                    )}
                  />
                  {field.suffix && field.suffix !== "$" && (
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-subtle">
                      {field.suffix}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <button
              type="button"
              onClick={() => setShowAssumptions((v) => !v)}
              aria-expanded={showAssumptions}
              aria-controls="roi-assumptions-panel"
              className="focus-ring flex w-full items-center justify-between rounded-md text-left text-sm font-medium text-fg"
            >
              Formulas and assumptions used in this estimate
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", showAssumptions && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            {showAssumptions && (
              <div id="roi-assumptions-panel" className="mt-4 flex flex-col gap-5 text-sm text-fg-muted">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="roi-handling-minutes" className="mb-1.5 block">
                      Avg. handling time per enquiry (minutes)
                    </label>
                    <input
                      id="roi-handling-minutes"
                      type="number"
                      min={0}
                      value={assumptions.avgHandlingMinutes}
                      onChange={(e) => updateAssumption("avgHandlingMinutes", e.target.valueAsNumber)}
                      className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-3 py-2 text-fg"
                    />
                  </div>
                  <div>
                    <label htmlFor="roi-automation-rate" className="mb-1.5 block">
                      Realistic automation rate (%)
                    </label>
                    <input
                      id="roi-automation-rate"
                      type="number"
                      min={0}
                      max={100}
                      value={assumptions.automationRate}
                      onChange={(e) => updateAssumption("automationRate", e.target.valueAsNumber)}
                      className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-3 py-2 text-fg"
                    />
                  </div>
                  <div>
                    <label htmlFor="roi-cart-recovery" className="mb-1.5 block">
                      Illustrative cart-recovery rate (%)
                    </label>
                    <input
                      id="roi-cart-recovery"
                      type="number"
                      min={0}
                      max={100}
                      value={assumptions.cartRecoveryRate}
                      onChange={(e) => updateAssumption("cartRecoveryRate", e.target.valueAsNumber)}
                      className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-3 py-2 text-fg"
                    />
                  </div>
                </div>

                <ul className="list-inside list-disc space-y-1.5 leading-relaxed">
                  <li>
                    Estimated annual cost of manual work = manual ops hours/week × hourly cost × 52.
                  </li>
                  <li>
                    Repetitive enquiries/month = monthly enquiries × repetitive enquiries %.
                  </li>
                  <li>
                    Automatable support hours/month = repetitive enquiries/month × automation rate ×
                    avg. handling time, converted to hours.
                  </li>
                  <li>
                    Illustrative cart opportunity/month = abandoned-cart value/month × cart-recovery
                    rate.
                  </li>
                  <li>
                    Hours potentially reallocated/week = automatable support hours (weekly) + manual
                    ops hours/week × automation rate.
                  </li>
                  <li>
                    Suggested first system compares the annualized value of the cart-recovery,
                    support-automation, and operations-hours estimates above and recommends the
                    largest one.
                  </li>
                  <li>
                    These are conservative, editable default assumptions — not published industry
                    benchmarks.
                  </li>
                </ul>
              </div>
            )}
          </div>

          <Button onClick={handleCalculate} className="mt-6 w-full sm:w-auto">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Calculate My Opportunity
          </Button>

          <AnimatePresence>
          {revealed && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
            <div className="mt-8 border-t border-border pt-8">
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric
                  label={`Estimated annual cost of manual work: ${currencyFormatter.format(
                    results.annualManualOpsCost
                  )}`}
                />
                <Metric
                  label={`Repetitive enquiries: ~${numberFormatter.format(
                    results.repetitiveEnquiriesPerMonth
                  )} / month`}
                />
                <Metric
                  label={`Illustrative support capacity automatable: ~${numberFormatter.format(
                    results.automatedSupportHoursPerMonth
                  )} hrs / month`}
                />
                <Metric
                  label={`Illustrative abandoned-cart opportunity: ${currencyFormatter.format(
                    results.cartOpportunityMonthly
                  )} / month`}
                />
                <Metric
                  label={`Estimated hours potentially reallocated: ~${numberFormatter.format(
                    results.hoursReallocatedPerWeek
                  )} hrs / week`}
                />
                <Metric label={`Suggested first system to investigate: ${results.suggestedSystem}`} />
              </div>

              <p className="mt-6 text-sm text-fg-muted">
                The next step is validating these assumptions against your real store data.
              </p>

              <TrackedCTA
                event="roi_booking_cta_clicked"
                ctaLocation="roi_calculator"
                systemName={results.suggestedSystem}
                action="book"
                className="mt-4"
              >
                Validate My Opportunity
              </TrackedCTA>
            </div>
            </motion.div>
          )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
