"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Multi-color animated wordmark for "ASK_AI". Temporary until the final
 * delivered logo replaces it — this component is the single place that
 * needs to change.
 *
 * The gradient intentionally stays within the site's red/warm-accent
 * family (crimson -> coral -> peach) rather than a generic rainbow, so the
 * "multi-color" flourish still reads as on-brand rather than decorative
 * noise. All motion is disabled and replaced with a static gradient when
 * the visitor has requested reduced motion.
 */
const LOGO_GRADIENT =
  "linear-gradient(90deg, #ff3b3b, #ff6b6f, #ff8b7a, #ffb07c, #e5484d, #ff3b3b)";
const LOGO_CONIC_GRADIENT =
  "conic-gradient(from 0deg, #ff3b3b, #ff6b6f, #ff8b7a, #ffb07c, #e5484d, #ff3b3b)";

export function Logo({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={cn("relative inline-flex items-center gap-2.5 font-heading", className)}>
      {/* Icon mark: two counter-rotating conic-gradient layers plus a blurred halo. */}
      <span className="relative h-8 w-8 shrink-0">
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1 rounded-lg opacity-70 blur-md"
          style={{ background: LOGO_CONIC_GRADIENT }}
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }
          }
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden rounded-lg"
          style={{ background: LOGO_CONIC_GRADIENT }}
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={
            shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "linear" }
          }
        >
          <span className="absolute inset-0 bg-bg/30" aria-hidden="true" />
        </motion.span>
        <span
          aria-hidden="true"
          className="relative flex h-full w-full items-center justify-center text-sm font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]"
        >
          A
        </span>
      </span>

      {/* Wordmark: single continuous flowing gradient, wipe-in reveal on mount, periodic shimmer sweep. */}
      <span className="relative inline-block overflow-hidden">
        <motion.span
          role="img"
          aria-label="ASK AI"
          className="relative inline-block bg-clip-text text-lg font-semibold tracking-tight text-transparent"
          style={{ backgroundImage: LOGO_GRADIENT, backgroundSize: "300% 100%" }}
          initial={shouldReduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            shouldReduceMotion
              ? { backgroundPosition: "0% 50%" }
              : {
                  clipPath: "inset(0 0% 0 0)",
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  clipPath: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  backgroundPosition: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.6,
                  },
                }
          }
          whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
        >
          ASK_AI
        </motion.span>

        {!shouldReduceMotion && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            style={{ mixBlendMode: "overlay" }}
            initial={{ x: "-140%" }}
            animate={{ x: "240%" }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 3.6,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        )}
      </span>
    </span>
  );
}
