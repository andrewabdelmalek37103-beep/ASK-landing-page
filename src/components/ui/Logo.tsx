import { cn } from "@/lib/utils";

/**
 * Temporary wordmark. Replace with the final ASK logo (A / S / K, where the S
 * suggests a question or exclamation mark) once it is delivered — this
 * component is the single place that needs to change.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading", className)}>
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-semibold text-white"
        aria-hidden="true"
      >
        A
      </span>
      <span className="text-lg font-semibold tracking-tight text-fg">
        ASK<span className="text-accent-strong">.</span>
      </span>
    </span>
  );
}
