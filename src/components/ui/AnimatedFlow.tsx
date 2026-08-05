import { cn } from "@/lib/utils";

interface AnimatedFlowProps {
  steps: string[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}

/** A restrained, CSS-driven connected-steps visual. No heavy animation libraries. */
export function AnimatedFlow({ steps, orientation = "vertical", className }: AnimatedFlowProps) {
  return (
    <ol
      className={cn(
        "flex list-none gap-0",
        orientation === "vertical" ? "flex-col" : "flex-col sm:flex-row",
        className
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step}
          className={cn(
            "flex gap-3",
            orientation === "horizontal" && "sm:flex-1 sm:flex-col sm:items-center sm:text-center"
          )}
        >
          <div
            className={cn(
              "flex items-center",
              orientation === "vertical" ? "flex-col" : "sm:w-full sm:flex-row"
            )}
          >
            <span
              className="relative h-2.5 w-2.5 shrink-0 rounded-full bg-accent motion-safe:animate-pulse-slow"
              style={{ animationDelay: `${i * 0.25}s` }}
              aria-hidden="true"
            />
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "shrink-0 bg-gradient-to-b from-accent/50 to-cyan/10",
                  orientation === "vertical"
                    ? "h-8 w-px"
                    : "hidden h-px w-full bg-gradient-to-r sm:block"
                )}
                aria-hidden="true"
              />
            )}
          </div>
          <p className="pb-6 text-sm leading-snug text-fg-muted sm:pb-0">{step}</p>
        </li>
      ))}
    </ol>
  );
}
