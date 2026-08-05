"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getUtmParams } from "@/lib/utils";
import { track } from "@/lib/analytics";

interface LeadCaptureFormProps {
  assessmentResult: string;
  primaryChallenge?: string;
  onSuccess?: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export function LeadCaptureForm({
  assessmentResult,
  primaryChallenge = "",
  onSuccess,
}: LeadCaptureFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const storeUrl = String(data.get("storeUrl") || "").trim();
    const consent = data.get("consent") === "on";

    const nextFieldErrors: Record<string, string> = {};
    if (!firstName) nextFieldErrors.firstName = "Enter your first name.";
    if (!email) nextFieldErrors.email = "Enter your business email.";
    if (!storeUrl) nextFieldErrors.storeUrl = "Enter your store or business website.";
    if (!consent) nextFieldErrors.consent = "Please confirm you agree to be contacted.";

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setState("error");
      setErrorMessage("Please fix the highlighted fields.");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          storeUrl,
          assessmentResult,
          primaryChallenge,
          consent: true,
          companyWebsite: String(data.get("companyWebsite") || ""),
          page: window.location.pathname,
          referrer: document.referrer || "",
          utm: getUtmParams(),
        }),
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(json?.error || "Something went wrong. Please try again.");
      }

      setState("success");
      track("opportunity_finder_lead_submitted", { assessmentResult });
      onSuccess?.();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-cyan/30 bg-cyan-soft px-5 py-4 text-sm text-fg"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
        <p>Your recommendation is on its way to your inbox. We&apos;ll follow up shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot field — hidden from real visitors, catches basic bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-firstName`} className="mb-1.5 block text-sm text-fg-muted">
          First name
        </label>
        <input
          id={`${formId}-firstName`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-fg placeholder:text-fg-subtle"
          aria-invalid={Boolean(fieldErrors.firstName)}
          aria-describedby={fieldErrors.firstName ? `${formId}-firstName-error` : undefined}
        />
        {fieldErrors.firstName && (
          <p id={`${formId}-firstName-error`} className="mt-1 text-sm text-red-400">
            {fieldErrors.firstName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm text-fg-muted">
          Business email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-fg placeholder:text-fg-subtle"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
        />
        {fieldErrors.email && (
          <p id={`${formId}-email-error`} className="mt-1 text-sm text-red-400">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-storeUrl`} className="mb-1.5 block text-sm text-fg-muted">
          Store or business website
        </label>
        <input
          id={`${formId}-storeUrl`}
          name="storeUrl"
          type="text"
          placeholder="yourstore.com"
          className="focus-ring w-full rounded-lg border border-border-strong bg-bg-elevated px-4 py-2.5 text-fg placeholder:text-fg-subtle"
          aria-invalid={Boolean(fieldErrors.storeUrl)}
          aria-describedby={fieldErrors.storeUrl ? `${formId}-storeUrl-error` : undefined}
        />
        {fieldErrors.storeUrl && (
          <p id={`${formId}-storeUrl-error`} className="mt-1 text-sm text-red-400">
            {fieldErrors.storeUrl}
          </p>
        )}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id={`${formId}-consent`}
          name="consent"
          type="checkbox"
          className="focus-ring mt-1 h-4 w-4 shrink-0 rounded border-border-strong"
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? `${formId}-consent-error` : undefined}
        />
        <label htmlFor={`${formId}-consent`} className="text-sm leading-snug text-fg-muted">
          ASK will use your information to send your assessment and follow up about the
          requested consultation. Your information will not be sold.
        </label>
      </div>
      {fieldErrors.consent && (
        <p id={`${formId}-consent-error`} className="-mt-2 text-sm text-red-400">
          {fieldErrors.consent}
        </p>
      )}

      {state === "error" && errorMessage && (
        <p role="alert" className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={state === "submitting"} className="mt-1">
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          "Send me this recommendation"
        )}
      </Button>
    </form>
  );
}
