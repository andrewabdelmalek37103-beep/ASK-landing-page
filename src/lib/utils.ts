import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Reads current UTM parameters from the URL, if present. */
export function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  const keys = ["source", "medium", "campaign", "term", "content"];
  for (const key of keys) {
    const value = params.get(`utm_${key}`);
    if (value) utm[key] = value;
  }
  return utm;
}

/** Preserves current querystring (e.g. UTM params) when appending to an external URL. */
export function appendUtmToUrl(url: string): string {
  if (typeof window === "undefined" || !url) return url;
  try {
    const current = new URLSearchParams(window.location.search);
    const utmEntries = Array.from(current.entries()).filter(([key]) =>
      key.startsWith("utm_")
    );
    if (utmEntries.length === 0) return url;
    const target = new URL(url);
    for (const [key, value] of utmEntries) {
      target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}
