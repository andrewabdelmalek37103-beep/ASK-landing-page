import { cn } from "@/lib/utils";

export function Metric({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-bg-elevated/50 px-3 py-2 text-sm text-fg-muted",
        className
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
      {label}
    </div>
  );
}
