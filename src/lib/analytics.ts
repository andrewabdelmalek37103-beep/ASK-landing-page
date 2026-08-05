"use client";

import { siteConfig } from "@/config/site";
import type { AnalyticsEventName, AnalyticsEventProperties } from "@/types";
import { getUtmParams } from "@/lib/utils";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function getDeviceCategory(): string {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

/**
 * Fires a single analytics event to every configured provider.
 * Providers whose IDs are missing from the environment are silently skipped —
 * in that case (typically local development) the event is logged to the console instead.
 */
export function track(event: AnalyticsEventName, properties: AnalyticsEventProperties = {}) {
  if (typeof window === "undefined") return;

  const utm = getUtmParams();
  const payload = {
    ...properties,
    utmSource: properties.utmSource ?? utm.source,
    utmMedium: properties.utmMedium ?? utm.medium,
    utmCampaign: properties.utmCampaign ?? utm.campaign,
    device: properties.device ?? getDeviceCategory(),
    pagePath: properties.pagePath ?? window.location.pathname,
  };

  const { gaMeasurementId, gtmId, metaPixelId, clarityId } = siteConfig.analytics;
  let sentAnywhere = false;

  if (gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", event, payload);
    sentAnywhere = true;
  }

  if (gtmId && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload });
    sentAnywhere = true;
  }

  if (metaPixelId && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, payload);
    sentAnywhere = true;
  }

  if (clarityId && typeof window.clarity === "function") {
    window.clarity("event", event);
    sentAnywhere = true;
  }

  if (!sentAnywhere && process.env.NODE_ENV !== "production") {
    console.log(`[analytics] ${event}`, payload);
  }
}
