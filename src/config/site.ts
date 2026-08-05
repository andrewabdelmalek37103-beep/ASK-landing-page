/**
 * Central, editable business configuration for the ASK AI Agency site.
 * Change links, labels, and integrations here rather than inside components.
 */

export type BookingProvider = "tidycal" | "calendly" | "cal.com" | "zcal";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const siteConfig = {
  name: "ASK AI Agency",
  shortName: "ASK",
  tagline: "AI systems that run your e-commerce operations—and help you sell more.",
  description:
    "ASK designs and implements AI systems for e-commerce customer support, sales recovery, WhatsApp, reporting, inventory, and operations.",
  url: siteUrl,
  locale: "en",

  // proofMode controls which proof module renders. Do not switch to
  // "verified-case-studies" until real, client-approved evidence exists.
  proofMode: "examples" as "examples" | "verified-case-studies",

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  },

  booking: {
    provider: (process.env.NEXT_PUBLIC_BOOKING_PROVIDER as BookingProvider) || "tidycal",
    // External URL used as a fallback link and for the "open in new tab" option.
    url: process.env.NEXT_PUBLIC_BOOKING_URL || "",
    title: "Free AI Growth Audit",
    durationMinutes: 30,
    description:
      "A focused consultation to identify where AI can increase revenue, reduce repetitive work, or improve your e-commerce operations. We will review your current stack, biggest bottleneck, and the best first system to investigate.",
  },

  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "",
  },

  nav: [
    { label: "Systems", href: "#systems" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Example Systems", href: "#example-systems" },
    { label: "Why ASK", href: "#why-ask" },
    { label: "FAQ", href: "#faq" },
  ],

  cta: {
    primary: "Book Your AI Growth Audit",
    primaryLong: "Book Your Free AI Growth Audit",
    secondary: "See Example Systems",
  },

  social: {
    // Populate once real, owned profiles exist.
    linkedin: "",
    instagram: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
