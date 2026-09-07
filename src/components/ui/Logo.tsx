import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Final ASK wordmark, delivered as artwork (public/ask-logo-mark.png):
 * "A / S / K", where the S doubles as a stylized question mark. Rendered
 * as a white PNG with a transparent background so it drops onto the
 * site's dark, blue-to-teal gradient palette (see globals.css) without
 * any extra wrapper styling.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/ask-logo-mark.png"
        alt="ASK"
        width={721}
        height={247}
        priority
        className="h-7 w-auto object-contain"
      />
    </span>
  );
}
