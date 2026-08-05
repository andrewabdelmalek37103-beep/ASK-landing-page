import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "cyan" | "outline" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        variant === "default" && "border-accent/30 bg-accent-soft text-accent-strong",
        variant === "cyan" && "border-cyan/30 bg-cyan-soft text-cyan",
        variant === "outline" && "border-border-strong text-fg-muted",
        className
      )}
      {...props}
    />
  );
}
