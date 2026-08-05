import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name}.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent-soft p-5 text-sm leading-relaxed text-fg">
          <strong className="font-medium">Placeholder — requires legal review.</strong> This
          page is a structural draft only. It must be reviewed and completed by qualified legal
          counsel before {siteConfig.name} relies on it to govern its relationship with site
          visitors or clients.
        </div>

        <h1 className="font-heading text-3xl font-medium text-fg sm:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-fg-subtle">Last updated: [insert date]</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-fg-muted">
          <div>
            <h2 className="font-heading text-lg font-medium text-fg">1. Acceptance of terms</h2>
            <p className="mt-2">
              [Describe what constitutes acceptance of these terms by visiting the site,
              booking an audit, or engaging {siteConfig.name} for services.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">2. Services described</h2>
            <p className="mt-2">
              [Describe the free AI Growth Audit and the scope of paid implementation
              engagements, noting that specific deliverables are defined in a separate
              proposal or statement of work.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">3. No guaranteed outcomes</h2>
            <p className="mt-2">
              [State that estimates, example systems, and the ROI calculator are illustrative
              and do not constitute a guarantee of specific business results.]
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">4. Intellectual property</h2>
            <p className="mt-2">[Describe ownership of site content and delivered work product.]</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">5. Limitation of liability</h2>
            <p className="mt-2">[Insert applicable limitation-of-liability language.]</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">6. Governing law</h2>
            <p className="mt-2">[Specify governing jurisdiction.]</p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-medium text-fg">7. Contact</h2>
            <p className="mt-2">
              {siteConfig.contact.email
                ? `Questions about these terms can be sent to ${siteConfig.contact.email}.`
                : "[Insert legal contact email.]"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
