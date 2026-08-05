# ASK AI Agency — Landing Page

Marketing site for ASK, an AI Growth & Operations Systems partner for e-commerce
brands. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer
Motion. The primary conversion goal is booking a free 30-minute **AI Growth
Audit**.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values described below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint     # ESLint
npm run build    # production build (also type-checks)
npm run start    # serve the production build locally
```

## Environment variables

All variables are documented in [.env.example](.env.example). None are
required for the site to build or run — every integration degrades
gracefully (hidden link, disabled tracking, local console log) when its
variable is left blank. Nothing is hardcoded in components; everything
reads from `process.env` via [src/config/site.ts](src/config/site.ts).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, Open Graph tags, sitemap entries. |
| `NEXT_PUBLIC_BOOKING_PROVIDER` | `tidycal` (default), `calendly`, `cal.com`, or `zcal`. |
| `NEXT_PUBLIC_BOOKING_URL` | Full booking page URL for the chosen provider. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown in the footer / thank-you page. Hidden if blank. |
| `NEXT_PUBLIC_WHATSAPP_URL` | Shown in the footer. Hidden if blank. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta (Facebook) Pixel. |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity. |
| `LEAD_WEBHOOK_URL` | Server-only. Receives lead form / assessment submissions (e.g. an n8n webhook). Never exposed to the client. |

## Editing content

Almost all copy lives outside of components, so most updates don't require
touching JSX:

- **`src/config/site.ts`** — business-level config: site name/tagline,
  booking provider details, nav links, CTA labels, `proofMode` switch
  (`"examples"` vs `"verified-case-studies"`).
- **`src/content/home.ts`** — hero copy (+ A/B variants), integrations
  strip, pain points, AI Opportunity Finder questions/scoring/results,
  example demo tabs, process steps, engagement options, differentiators,
  proof examples, verified case studies, ROI calculator defaults, booking
  intake questions, revenue ranges, bottleneck options.
- **`src/content/systems.ts`** — the three productized systems and the ten
  supporting modules.
- **`src/content/faq.ts`** — FAQ accordion content (also feeds the FAQPage
  JSON-LD in `layout.tsx`).

### Proof section

`siteConfig.proofMode` controls what `ProofSection` renders:

- `"examples"` (default) — anonymized architecture examples from
  `proofExamples`. Use this until real, client-approved results exist.
- `"verified-case-studies"` — renders `verifiedCaseStudies` instead. Only
  switch this once that array contains real, permissioned client data;
  never populate it with placeholder numbers, fake logos, or invented
  testimonials.

### A/B testing hero copy

`heroVariants` in `src/content/home.ts` contains headline/subheadline
variants (`A`, `B`, `C`). `Hero.tsx` currently renders `heroContent`
(variant A) directly, with no random assignment. To wire up
experimentation later:

1. Resolve the active variant server-side (e.g. from a cookie set by your
   experimentation platform, or `next/headers`) so assignment is
   persistent per visitor rather than random per request.
2. Pass the resolved copy into `Hero` as a prop instead of importing
   `heroContent` directly.
3. Track which variant was shown as an analytics property so downstream
   conversion can be segmented by variant.

## Booking provider setup (TidyCal default)

1. Create your event type in TidyCal (30 minutes, "Free AI Growth Audit").
2. Copy its public booking URL, e.g. `https://tidycal.com/your-handle/ai-growth-audit`.
3. Set `NEXT_PUBLIC_BOOKING_URL` to that full URL and leave
   `NEXT_PUBLIC_BOOKING_PROVIDER=tidycal`.
4. `BookingEmbed.tsx` automatically derives the `data-path` TidyCal's embed
   script needs from the URL's pathname (`extractTidyCalPath`) — there's no
   separate username/slug variable to maintain, and no real TidyCal handle
   is hardcoded anywhere in the codebase.

To use Calendly, Cal.com, or zcal instead, set
`NEXT_PUBLIC_BOOKING_PROVIDER` to `calendly`, `cal.com`, or `zcal` and
`NEXT_PUBLIC_BOOKING_URL` to that provider's booking page. Those providers
render through a generic iframe rather than TidyCal's embed script.

If `NEXT_PUBLIC_BOOKING_URL` is unset, the booking modal shows a fallback
message with a mailto/WhatsApp link instead of a broken embed. The booking
script itself is only injected after a visitor clicks a CTA (lazy-loaded),
never on initial page load.

## Analytics setup

`src/lib/analytics.ts` exposes a single `track(event, properties)` function
used everywhere in the app. It fans out to every provider that has a
configured ID and no-ops (falls back to `console.log` outside production)
for any provider left blank — so partial configuration is always safe and
nothing errors when IDs are absent.

- **GA4**: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and load the `gtag.js`
  snippet (e.g. via `next/script` in `layout.tsx`, or through GTM).
- **GTM**: set `NEXT_PUBLIC_GTM_ID` and add the GTM container snippet;
  `track()` pushes `{ event, ...properties }` onto `window.dataLayer`.
- **Meta Pixel**: set `NEXT_PUBLIC_META_PIXEL_ID` and load the Pixel base
  code; `track()` calls `fbq("trackCustom", event, properties)`.
- **Microsoft Clarity**: set `NEXT_PUBLIC_CLARITY_ID` and load the Clarity
  snippet; `track()` calls `clarity("event", event)`.

This project intentionally does not bundle the provider `<script>` tags
themselves (to avoid loading trackers with no ID configured). Add them via
`next/script` in `layout.tsx` once you have real IDs, each guarded by its
corresponding `siteConfig.analytics.*` value.

Every tracked event name is defined in the `AnalyticsEventName` union in
`src/types/index.ts`, including `hero_primary_cta_clicked`,
`booking_modal_opened`, `booking_completed`, `opportunity_finder_*`,
`roi_calculator_*`, `system_card_clicked`, `example_demo_changed`,
`faq_opened`, `whatsapp_clicked`, and `email_clicked`. Each call also
carries `ctaLocation`, UTM parameters, device category, and page path where
relevant — never sensitive personal data.

## Lead capture

`POST /api/lead` ([src/app/api/lead/route.ts](src/app/api/lead/route.ts))
validates submissions with Zod (`src/lib/validation.ts`), silently discards
honeypot-flagged submissions (responding with success so bots learn
nothing), and forwards valid leads to `LEAD_WEBHOOK_URL` as JSON — designed
to plug into an n8n webhook or similar automation tool. If the webhook is
unset, submissions are logged locally (non-production only, with the email
redacted) instead of failing the request.

**Rate limiting**: `src/lib/rate-limit.ts` uses an in-memory `Map` keyed by
IP. This resets on redeploy and does not work across multiple server
instances or serverless invocations — it's documented in the file as
dev-only. Replace it with a durable store (Redis, Upstash, Vercel KV) or
WAF-level rate limiting before production launch.

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket and import it into
   Vercel.
2. Add every variable from `.env.example` to the Vercel project's
   Environment Variables (Production and Preview).
3. Deploy. `next build` runs automatically and type-checks the project;
   the app is fully static except for `/api/lead`, which runs on the
   Node.js runtime.
4. Point your custom domain at the Vercel project and set
   `NEXT_PUBLIC_SITE_URL` to the final production URL (used for canonical
   links, Open Graph tags, and `sitemap.ts`).

## Conversion funnel

```text
Landing-page visit
→ Engaged visitor
→ Opportunity Finder or ROI calculator
→ Booking CTA
→ Booking modal
→ Completed booking
→ Attended audit
→ Qualified opportunity
→ Proposal
→ Closed client
```

Steps 1–6 are instrumented in this codebase via `track()`:

- **Landing-page visit** — page load.
- **Engaged visitor** — scroll/interaction beyond the hero.
- **Opportunity Finder / ROI calculator** — `opportunity_finder_started`,
  `opportunity_finder_question_completed`, `opportunity_finder_result_viewed`,
  `opportunity_finder_lead_submitted`, `roi_calculator_started`,
  `roi_calculator_completed`.
- **Booking CTA clicked** — `hero_primary_cta_clicked`,
  `hero_secondary_cta_clicked`, `navigation_cta_clicked`,
  `mobile_sticky_cta_clicked`, `roi_booking_cta_clicked`,
  `system_card_clicked`.
- **Booking modal opened** — `booking_modal_opened` (plus
  `booking_external_fallback_clicked` if the visitor uses the fallback
  link instead of the embed).
- **Completed booking** — `booking_completed`, fired once per session from
  `/thank-you` (deduped via `sessionStorage` so a refresh doesn't
  double-count).

Steps 7–10 happen after the call and should be tracked in whatever
CRM/pipeline tool you use downstream, ideally joined back to the lead by
email.

Suggested metrics to monitor once real traffic exists — deliberately with
no target percentages hardcoded or assumed anywhere in this project.
Benchmarks should be established from ASK's own traffic and sales data:

- Hero CTA click-through rate
- Booking-modal open rate
- Booking completion rate
- Assessment completion rate
- Calculator completion rate
- Visitor-to-booked-call conversion
- Booked-to-attended conversion (CRM-side)
- Attended-to-qualified conversion (CRM-side)
- Qualified-to-proposal conversion (CRM-side)
- Proposal-to-client conversion (CRM-side)

## Pre-launch checklist

- [ ] Replace `NEXT_PUBLIC_BOOKING_URL` with a real booking page
- [ ] Replace `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_WHATSAPP_URL`
- [ ] Set real analytics IDs (or intentionally leave blank)
- [ ] Set `LEAD_WEBHOOK_URL` to a real CRM/automation endpoint
- [ ] Replace `src/app/favicon.ico` and add `public/og-image.png` (1200×630)
- [ ] Add a founder photo if/when `FounderSection.tsx` should show one
- [ ] Have legal review `src/app/privacy/page.tsx` and
      `src/app/terms/page.tsx` (both are explicitly marked as placeholders
      in-page and are `noindex` until reviewed)
- [ ] Replace the in-memory rate limiter in `src/lib/rate-limit.ts` with a
      durable/production-grade solution
- [ ] Decide when to flip `siteConfig.proofMode` to
      `"verified-case-studies"` and populate `verifiedCaseStudies` with
      real, permissioned client data
