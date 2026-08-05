import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent-soft p-5 text-sm leading-relaxed text-fg">
          <strong className="font-medium">Placeholder — requires legal review.</strong> This
          page is a structural draft only. It must be reviewed and completed by qualified legal
          counsel before {siteConfig.name} collects any personal data, in line with applicable
          regulations (including GDPR for EMEA visitors) before going live.
        </div>

        <h1 className="font-heading text-3xl font-medium text-fg sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-fg-subtle">Last updated: [insert date]</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-fg-muted">
          <div>
            <h2 className="font-heading text-lg font-medium text-fg">1. Who we are</h2>
            <p className="mt-2">
              [Insert legal entity name, registered address, and company registration number.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">2. What data we collect</h2>
            <p className="mt-2">
              [Describe data collected via the AI Opportunity Finder, ROI calculator, lead form,
              booking flow, and analytics tooling — e.g. name, email, company, website, form
              responses, and usage data such as device type and UTM parameters.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">3. How we use your data</h2>
            <p className="mt-2">
              [Describe use for scheduling the AI Growth Audit, follow-up communication,
              service delivery, and aggregated analytics.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">4. Legal basis for processing</h2>
            <p className="mt-2">
              [Specify legal basis under applicable law, e.g. consent, legitimate interest, or
              contract performance.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">5. Third-party services</h2>
            <p className="mt-2">
              [List third parties data may be shared with, such as the booking provider,
              analytics providers (GA4, GTM, Meta Pixel, Microsoft Clarity), and the lead
              webhook/CRM destination, plus their respective privacy policies.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">6. Data retention</h2>
            <p className="mt-2">[Specify how long data is retained and deletion process.]</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">7. Your rights</h2>
            <p className="mt-2">
              [Describe applicable rights — access, correction, deletion, portability,
              objection — and how to exercise them.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">8. Contact</h2>
            <p className="mt-2">
              {siteConfig.contact.email
                ? `Questions about this policy can be sent to ${siteConfig.contact.email}.`
                : "[Insert privacy contact email.]"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
