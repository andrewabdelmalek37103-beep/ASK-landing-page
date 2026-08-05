import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

const footerLinks = [
  { label: "Systems", href: "#systems" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "AI Opportunity Finder", href: "#opportunity-finder" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              AI Growth &amp; Operations Systems for E-commerce Brands.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-fg">Site</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring rounded-md text-sm text-fg-muted hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book-audit"
                  className="focus-ring rounded-md text-sm text-fg-muted hover:text-fg"
                >
                  Book an Audit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-fg">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li>
                {siteConfig.contact.email ? (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    onClick={() => track("email_clicked", { ctaLocation: "footer" })}
                    className="focus-ring flex items-center gap-2 rounded-md text-sm text-fg-muted hover:text-fg"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-fg-subtle">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email not yet configured
                  </span>
                )}
              </li>
              <li>
                {siteConfig.contact.whatsappUrl ? (
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_clicked", { ctaLocation: "footer" })}
                    className="focus-ring flex items-center gap-2 rounded-md text-sm text-fg-muted hover:text-fg"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                ) : (
                  <span className="flex items-center gap-2 text-sm text-fg-subtle">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp not yet configured
                  </span>
                )}
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="focus-ring rounded-md text-sm text-fg-muted hover:text-fg"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="focus-ring rounded-md text-sm text-fg-muted hover:text-fg"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-xs text-fg-subtle">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
