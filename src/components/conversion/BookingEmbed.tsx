"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { appendUtmToUrl } from "@/lib/utils";
import { track } from "@/lib/analytics";

const TIDYCAL_SCRIPT_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js";

/** Extracts the booking path TidyCal expects in data-path from a full URL or a bare path. */
function extractTidyCalPath(url: string): string {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\/+/, "");
  } catch {
    return url.replace(/^\/+/, "");
  }
}

type EmbedState = "idle" | "loading" | "ready" | "error";

function getInitialEmbedState(provider: string, url: string): EmbedState {
  if (!url) return "error";
  // Non-TidyCal providers render immediately via iframe below; only the
  // TidyCal embed needs to wait for its external script to load.
  return provider === "tidycal" ? "loading" : "ready";
}

export function BookingEmbed() {
  const { provider, url } = siteConfig.booking;
  const [state, setState] = useState<EmbedState>(() => getInitialEmbedState(provider, url));

  useEffect(() => {
    if (!url || provider !== "tidycal") return;

    let cancelled = false;
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TIDYCAL_SCRIPT_SRC}"]`
    );

    function onLoad() {
      if (!cancelled) setState("ready");
    }
    function onError() {
      if (!cancelled) setState("error");
    }

    if (existing) {
      // Script may already be loaded; embed.js scans the DOM for .tidycal-embed on load,
      // so re-running it after the node exists ensures the widget still initializes.
      onLoad();
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = TIDYCAL_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };
  }, [provider, url]);

  function handleExternalFallback() {
    track("booking_external_fallback_clicked", { ctaLocation: "booking_modal" });
  }

  if (state === "error" || !url) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="text-fg-muted">
          The booking calendar could not be loaded right now.
          {siteConfig.contact.email
            ? ` You can reach us directly at ${siteConfig.contact.email}, or try the link below.`
            : " Please try the link below, or contact us to schedule directly."}
        </p>
        {url ? (
          <a
            href={appendUtmToUrl(url)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleExternalFallback}
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white hover:bg-accent-strong"
          >
            Open booking page <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : (
          <p className="text-sm text-fg-subtle">
            Booking link not yet configured. Set NEXT_PUBLIC_BOOKING_URL to enable this button.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {state === "loading" && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-24 text-fg-muted">
          <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden="true" />
          <p className="text-sm">Loading the booking calendar…</p>
        </div>
      )}

      <div className={state === "ready" ? "min-h-[520px]" : "sr-only"}>
        {provider === "tidycal" ? (
          <div className="tidycal-embed" data-path={extractTidyCalPath(url)} />
        ) : (
          <iframe
            title="Book your AI Growth Audit"
            src={appendUtmToUrl(url)}
            className="h-[600px] w-full border-0"
            onLoad={() => setState("ready")}
            onError={() => setState("error")}
          />
        )}
      </div>

      <div className="border-t border-border px-6 py-4 text-center">
        <a
          href={appendUtmToUrl(url)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalFallback}
          className="focus-ring inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg"
        >
          Prefer to book in a new tab? <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
