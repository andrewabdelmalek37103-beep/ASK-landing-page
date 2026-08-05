"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, e.g. index * 0.06. */
  delay?: number;
  /** Vertical offset the element rises from, in pixels. */
  y?: number;
  /** Re-run the animation every time the element re-enters the viewport. */
  once?: boolean;
  as?: "div" | "li";
}

/**
 * Restrained, scroll-triggered fade/rise-in wrapper used across sections for a
 * consistent entrance animation. Automatically skips the motion (renders
 * content in its final state immediately) when the visitor has requested
 * reduced motion at the OS level.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
