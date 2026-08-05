import {
  ShieldCheck,
  KeyRound,
  Eye,
  UserCheck,
  ClipboardList,
  UserCog,
  DatabaseZap,
  AlertOctagon,
  Activity,
  FlaskConical,
  Undo2,
  Settings2,
  Link2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const controls = [
  { icon: KeyRound, title: "Role-based access", description: "Minimum required permissions for every connected system." },
  { icon: Eye, title: "Read-only where appropriate", description: "Reporting and analysis tools default to read-only access." },
  { icon: UserCheck, title: "Approval steps", description: "Sensitive actions can require explicit human approval." },
  { icon: ClipboardList, title: "Audit trails", description: "Actions taken by AI systems are recorded and reviewable." },
  { icon: UserCog, title: "Human escalation", description: "Unclear or high-risk conversations are handed to a person." },
  { icon: DatabaseZap, title: "Data minimization", description: "Systems access only the data required for the task." },
  { icon: AlertOctagon, title: "Error handling", description: "Defined fallback behavior when data or systems are unavailable." },
  { icon: Activity, title: "Monitoring", description: "Quality, adoption, and exceptions are tracked after launch." },
  { icon: FlaskConical, title: "Test environments", description: "Workflows are tested before controlled deployment." },
  { icon: Undo2, title: "Clear fallback behavior", description: "Systems know what to do when they cannot confidently act." },
  { icon: Settings2, title: "Client-controlled business rules", description: "You define the rules AI systems must follow." },
  { icon: Link2, title: "Vendor and platform disclosure", description: "Dependencies on third-party platforms are made explicit." },
];

export function SafetyAndControls() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Guardrails" title="Automation with guardrails." />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => {
            const Icon = control.icon;
            return (
              <div key={control.title} className="flex gap-3 rounded-xl border border-border bg-bg-raised/40 p-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-fg">{control.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{control.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent-soft p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" aria-hidden="true" />
          <p className="leading-relaxed text-fg">
            The safest AI system is not the one that acts on everything. It is the one that knows
            what it can do, what it cannot do, and when a person must take over.
          </p>
        </div>
      </div>
    </section>
  );
}
