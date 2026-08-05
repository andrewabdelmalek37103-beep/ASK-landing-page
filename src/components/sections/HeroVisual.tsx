import {
  Store,
  Bot,
  MessagesSquare,
  Database,
  LayoutDashboard,
  UserCheck,
  Search,
  PackageCheck,
  Sparkles,
  ShoppingCart,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const flowStages = [
  { label: "Shopify / Storefront", icon: Store },
  { label: "AI Sales Agent", icon: Bot },
  { label: "WhatsApp + Instagram + Email", icon: MessagesSquare },
  { label: "Order and Customer Data", icon: Database },
  { label: "Operations Dashboard", icon: LayoutDashboard },
  { label: "Human Review and Optimization", icon: UserCheck },
];

const activityFeed = [
  { icon: Search, text: "Customer asks about a product" },
  { icon: PackageCheck, text: "AI checks product and inventory data" },
  { icon: Sparkles, text: "A recommended product is returned" },
  { icon: ShoppingCart, text: "Abandoned-cart follow-up is triggered" },
  { icon: Truck, text: "An order-status request is resolved" },
  { icon: LayoutDashboard, text: "Operations dashboard is updated" },
  { icon: UserCheck, text: "Human-review checkpoint available" },
];

export function HeroVisual() {
  return (
    <div className="relative rounded-2xl border border-border bg-bg-raised/70 p-5 shadow-2xl shadow-black/40 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-fg-muted">AI Commerce Control Room</p>
        <Badge variant="outline">Illustrative demo</Badge>
      </div>

      <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
        <ol className="flex list-none flex-col gap-4">
          {flowStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <li key={stage.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border-strong bg-bg-elevated text-accent-strong">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-fg">{stage.label}</span>
                {i < flowStages.length - 1 && (
                  <span className="sr-only"> then </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="rounded-xl border border-border bg-bg-elevated/60 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-fg-subtle">
            Live activity (illustrative)
          </p>
          <ul className="flex flex-col gap-3">
            {activityFeed.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.text}
                  className="flex items-start gap-2.5 text-sm text-fg-muted motion-safe:animate-fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" aria-hidden="true" />
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-fg-subtle">
            <RefreshCcw className="h-3 w-3" aria-hidden="true" />
            Numbers and events shown here are illustrative, not actual client results.
          </div>
        </div>
      </div>
    </div>
  );
}
