"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Metric } from "@/components/ui/Metric";
import { TrackedCTA } from "@/components/conversion/TrackedCTA";
import { LeadCaptureForm } from "@/components/conversion/LeadCaptureForm";
import {
  assessmentQuestions,
  assessmentResults,
  assessmentScoring,
} from "@/content/home";
import type { AssessmentSystemId } from "@/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function computeRecommendation(answers: Record<string, string>): AssessmentSystemId {
  const scores: Record<AssessmentSystemId, number> = {
    "sales-recovery": 0,
    "customer-experience": 0,
    "operations-intelligence": 0,
    "connected-operating-system": 0,
  };

  for (const [questionId, optionId] of Object.entries(answers)) {
    const system = assessmentScoring[questionId]?.[optionId];
    if (system) scores[system] += 1;
  }

  const priority: AssessmentSystemId[] = [
    "sales-recovery",
    "customer-experience",
    "operations-intelligence",
    "connected-operating-system",
  ];

  return priority.reduce((best, current) =>
    scores[current] > scores[best] ? current : best
  );
}

export function OpportunityFinder() {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showLeadForm, setShowLeadForm] = useState(false);

  const isComplete = stepIndex >= assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[stepIndex];

  const resultId = useMemo(() => computeRecommendation(answers), [answers]);
  const result = assessmentResults[resultId];

  function handleSelect(questionId: string, optionId: string) {
    if (!started) {
      setStarted(true);
      track("opportunity_finder_started");
    }

    const nextAnswers = { ...answers, [questionId]: optionId };
    setAnswers(nextAnswers);
    track("opportunity_finder_question_completed", { questionId });

    const nextIndex = stepIndex + 1;
    setStepIndex(nextIndex);

    if (nextIndex >= assessmentQuestions.length) {
      const finalResult = computeRecommendation(nextAnswers);
      track("opportunity_finder_result_viewed", { assessmentResult: finalResult });
    }
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleReset() {
    setStepIndex(0);
    setAnswers({});
    setShowLeadForm(false);
  }

  return (
    <section id="opportunity-finder" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="AI Opportunity Finder"
          title="Which AI system should your business build first?"
          description="Answer four questions and receive an initial recommendation based on your current bottleneck. No email required to see it."
        />

        <Card className="mt-10 overflow-hidden">
          {!isComplete && currentQuestion ? (
            <div className="p-6 sm:p-10">
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-fg-subtle">
                  Question {stepIndex + 1} of {assessmentQuestions.length}
                </p>
                <div className="flex gap-1.5" aria-hidden="true">
                  {assessmentQuestions.map((q, i) => (
                    <span
                      key={q.id}
                      className={cn(
                        "h-1.5 w-6 rounded-full",
                        i <= stepIndex ? "bg-accent" : "bg-border-strong"
                      )}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-heading text-2xl font-medium text-fg">
                {currentQuestion.question}
              </h3>

              <div className="mt-6 grid gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(currentQuestion.id, option.id)}
                    className="focus-ring flex items-center justify-between rounded-xl border border-border-strong bg-bg-elevated/40 px-5 py-4 text-left text-fg transition-colors hover:border-accent hover:bg-accent-soft"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-md text-sm text-fg-muted hover:text-fg"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-wide text-cyan">
                Recommended starting system
              </p>
              <h3 className="mt-2 font-heading text-2xl font-medium text-fg sm:text-3xl">
                {result.system}
              </h3>
              <p className="mt-4 leading-relaxed text-fg-muted">{result.reason}</p>

              <div className="mt-8">
                <p className="mb-3 font-medium text-fg">Example workflows</p>
                <ul className="space-y-2">
                  {result.workflows.map((workflow) => (
                    <li key={workflow} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                      {workflow}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="mb-3 font-medium text-fg">Metrics to track</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {result.metrics.map((metric) => (
                    <Metric key={metric} label={metric} />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <TrackedCTA
                  event="system_card_clicked"
                  ctaLocation="opportunity_finder_result"
                  systemName={result.system}
                  action="book"
                >
                  Discuss This Recommendation
                </TrackedCTA>
                <button
                  type="button"
                  onClick={handleReset}
                  className="focus-ring rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-fg-muted hover:border-accent hover:text-fg"
                >
                  Review Another System
                </button>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                {showLeadForm ? (
                  <LeadCaptureForm assessmentResult={result.system} />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(true)}
                    className="focus-ring text-sm font-medium text-accent-strong hover:text-accent"
                  >
                    Send me this recommendation by email
                  </button>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
