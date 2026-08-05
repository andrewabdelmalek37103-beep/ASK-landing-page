import type {
  AssessmentQuestion,
  AssessmentResult,
  AssessmentSystemId,
  DemoTab,
  Differentiator,
  EngagementOption,
  Integration,
  PainCard,
  ProcessStep,
  ProofExample,
} from "@/types";

export const heroContent = {
  headline: "AI systems that run your e-commerce operations—and help you sell more.",
  subheadline:
    "ASK designs and implements connected AI systems for customer support, sales recovery, WhatsApp, reporting, inventory, and daily operations—built around the tools your business already uses.",
  primaryCta: "Book Your Free AI Growth Audit",
  secondaryCta: "See Example Systems",
  microcopy: "30 minutes. No obligation. Leave with a prioritized AI opportunity map.",
  credibility: "Built for growing Shopify, WooCommerce, DTC, and social-commerce brands.",
};

/**
 * Hero copy variants, prepared for future A/B testing.
 * Variant A is the current default rendered by the Hero component.
 * See README "A/B testing preparation" for how to wire these into a
 * future experimentation platform.
 */
export const heroVariants = {
  A: {
    headline: "AI systems that run your e-commerce operations—and help you sell more.",
    subheadline:
      "Connect customer support, sales recovery, WhatsApp, reporting, inventory, and operations through systems built around your existing stack.",
  },
  B: {
    headline: "Turn repetitive e-commerce work into connected revenue systems.",
    subheadline:
      "ASK builds AI agents, workflows, dashboards, and integrations that reduce manual work and help your team act faster.",
  },
  C: {
    headline: "Stop adding AI tools. Build an AI-powered e-commerce operation.",
    subheadline:
      "Replace disconnected experiments with practical systems designed around sales, support, data, and daily operations.",
  },
} as const;

export const integrations: Integration[] = [
  { name: "Shopify", category: "Commerce platform" },
  { name: "WooCommerce", category: "Commerce platform" },
  { name: "WhatsApp", category: "Messaging" },
  { name: "Instagram", category: "Social" },
  { name: "Meta", category: "Social" },
  { name: "Klaviyo", category: "Marketing" },
  { name: "Gorgias", category: "Support" },
  { name: "Gmail", category: "Email" },
  { name: "Outlook", category: "Email" },
  { name: "Google Sheets", category: "Data" },
  { name: "Microsoft 365", category: "Productivity" },
  { name: "CRMs", category: "Sales" },
  { name: "ERPs", category: "Operations" },
  { name: "Marketplaces", category: "Commerce platform" },
  { name: "Custom APIs", category: "Integration" },
];

export const painCards: PainCard[] = [
  {
    title: "Customers leave before getting an answer.",
    description:
      "Product, delivery, availability, and policy questions go unanswered outside working hours.",
    impactLabel: "Potential impact: lost conversion",
  },
  {
    title: "Abandoned carts receive generic follow-ups.",
    description:
      "High-intent shoppers get the same message regardless of product, objection, history, or channel.",
    impactLabel: "Potential impact: unrecovered revenue",
  },
  {
    title: "Your team answers the same questions every day.",
    description:
      "Order tracking, returns, delivery areas, payment methods, and product questions consume valuable team capacity.",
    impactLabel: "Potential impact: support cost and slow response",
  },
  {
    title: "Operations depend on spreadsheets and manual checks.",
    description:
      "Inventory, order data, profitability, and channel performance require repetitive reconciliation.",
    impactLabel: "Potential impact: slow decisions and errors",
  },
  {
    title: "Your tools do not communicate.",
    description:
      "Shopify, WhatsApp, email, marketplaces, spreadsheets, support tools, and dashboards operate as separate systems.",
    impactLabel: "Potential impact: fragmented customer experience",
  },
  {
    title: "You have data but no daily intelligence.",
    description:
      "Reports explain what happened after the fact instead of alerting your team to what needs attention now.",
    impactLabel: "Potential impact: missed action",
  },
];

// --- AI Opportunity Finder ---------------------------------------------

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "channel",
    question: "Where do most of your sales happen?",
    options: [
      { id: "shopify", label: "Shopify" },
      { id: "woocommerce", label: "WooCommerce" },
      { id: "social", label: "WhatsApp or Instagram" },
      { id: "marketplaces", label: "Marketplaces" },
      { id: "multiple", label: "Multiple channels" },
    ],
  },
  {
    id: "time-sink",
    question: "What is currently consuming the most time?",
    options: [
      { id: "support", label: "Customer support" },
      { id: "follow-up", label: "Sales follow-up" },
      { id: "reporting", label: "Reporting" },
      { id: "inventory", label: "Inventory monitoring" },
      { id: "connecting", label: "Connecting systems" },
    ],
  },
  {
    id: "opportunity",
    question: "Where is the clearest commercial opportunity?",
    options: [
      { id: "conversions", label: "More conversions" },
      { id: "cart-recovery", label: "Recovering abandoned carts" },
      { id: "support-load", label: "Lower support workload" },
      { id: "decisions", label: "Better operational decisions" },
      { id: "cx", label: "Improving customer experience" },
    ],
  },
  {
    id: "maturity",
    question: "How mature is your current automation setup?",
    options: [
      { id: "manual", label: "Mostly manual" },
      { id: "few-automations", label: "A few disconnected automations" },
      { id: "poor-integration", label: "Several tools but poor integration" },
      { id: "advanced", label: "Advanced stack needing AI" },
      { id: "not-sure", label: "Not sure" },
    ],
  },
];

/** Maps each answer to the system it leans toward. Ties resolve to the connected operating system. */
export const assessmentScoring: Record<string, Record<string, AssessmentSystemId>> = {
  channel: {
    shopify: "sales-recovery",
    woocommerce: "sales-recovery",
    social: "customer-experience",
    marketplaces: "operations-intelligence",
    multiple: "connected-operating-system",
  },
  "time-sink": {
    support: "customer-experience",
    "follow-up": "sales-recovery",
    reporting: "operations-intelligence",
    inventory: "operations-intelligence",
    connecting: "connected-operating-system",
  },
  opportunity: {
    conversions: "sales-recovery",
    "cart-recovery": "sales-recovery",
    "support-load": "customer-experience",
    decisions: "operations-intelligence",
    cx: "customer-experience",
  },
  maturity: {
    manual: "customer-experience",
    "few-automations": "sales-recovery",
    "poor-integration": "connected-operating-system",
    advanced: "operations-intelligence",
    "not-sure": "connected-operating-system",
  },
};

export const assessmentResults: Record<AssessmentSystemId, AssessmentResult> = {
  "sales-recovery": {
    id: "sales-recovery",
    system: "AI Sales & Recovery System",
    reason:
      "Your answers point to a commercial bottleneck: shoppers and carts that need faster, more relevant follow-up before they convert elsewhere.",
    workflows: [
      "Personalized WhatsApp follow-up after a cart is abandoned",
      "AI product guidance that recommends in-stock, in-budget options",
      "Lead qualification and routing for high-value conversations",
    ],
    metrics: ["Recovered carts", "Conversion from assisted sessions", "Revenue influenced"],
  },
  "customer-experience": {
    id: "customer-experience",
    system: "AI Customer Experience System",
    reason:
      "Your answers point to support and conversation load: repetitive questions and response time are consuming capacity your team could use elsewhere.",
    workflows: [
      "Order-status and delivery questions resolved automatically",
      "Returns and policy guidance with clear escalation rules",
      "Sentiment and urgency detection to prioritize what needs a person",
    ],
    metrics: ["First-response time", "Automated resolution rate", "Customer satisfaction"],
  },
  "operations-intelligence": {
    id: "operations-intelligence",
    system: "AI Operations Intelligence System",
    reason:
      "Your answers point to a data and decision-making bottleneck: manual reporting and monitoring are slowing down what your team can act on.",
    workflows: [
      "Unified order and inventory data across channels",
      "Low-stock and unusual-demand alerts sent automatically",
      "Daily or weekly executive summary with a read-only AI analyst",
    ],
    metrics: ["Manual hours removed", "Inventory exceptions", "Decision response time"],
  },
  "connected-operating-system": {
    id: "connected-operating-system",
    system: "Connected AI Commerce Operating System",
    reason:
      "Your answers span multiple areas at once, which usually means the biggest constraint is fragmentation itself—tools and workflows that don't talk to each other yet.",
    workflows: [
      "A unified data layer connecting your storefront, support, and operations tools",
      "Coordinated sales, support, and reporting workflows with shared context",
      "Governance and human checkpoints across every connected workflow",
    ],
    metrics: ["Channel performance", "Manual hours removed", "Escalation rate"],
  },
};

// --- Live example demos --------------------------------------------------

export const demoTabs: DemoTab[] = [
  {
    id: "shopper",
    label: "Shopper conversion",
    customerLine: "I need a gift under €80 that can arrive before Friday.",
    aiLine:
      "I found three in-stock options within your budget that qualify for your delivery window. Is the gift for a specific occasion?",
    steps: [
      "Customer context retrieved",
      "Inventory checked",
      "Delivery rules checked",
      "Product recommendations created",
      "Recommendation sent",
      "Conversation logged",
      "Human escalation available",
    ],
    disclaimer: "Illustrative example—not a client result.",
  },
  {
    id: "order-support",
    label: "Order support",
    customerLine: "Can you change the delivery address for order #1482?",
    steps: [
      "Verify customer identity",
      "Retrieve the order",
      "Check whether fulfillment has started",
      "Apply the allowed address-change rule",
      "Update the relevant system or escalate",
      "Confirm the outcome",
      "Record the action",
    ],
    disclaimer: "Illustrative example—not a client result.",
  },
  {
    id: "operations-alert",
    label: "Operations alert",
    alertLine:
      "Product SKU-104 may go out of stock within five days based on recent order velocity.",
    steps: [
      "Inventory data checked",
      "Recent sales velocity calculated",
      "Supplier lead time reviewed",
      "Alert sent to the operations team",
      "Recommended action generated",
      "Dashboard updated",
    ],
    disclaimer: "Illustrative example—not a client result.",
  },
];

// --- Process ---------------------------------------------------------------

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Audit",
    description:
      "We examine your customer journey, repetitive tasks, existing tools, data sources, operational bottlenecks, and commercial goals.",
    deliverable: "Prioritized AI opportunity map.",
  },
  {
    step: 2,
    title: "Blueprint",
    description:
      "We define the workflow, business rules, data requirements, integrations, human checkpoints, KPIs, and implementation plan.",
    deliverable: "Technical and operational system blueprint.",
  },
  {
    step: 3,
    title: "Build and integrate",
    description:
      "ASK configures the tools, builds the necessary workflows, connects your platforms, tests edge cases, and prepares the system for controlled deployment.",
    deliverable: "Tested system connected to your existing stack.",
  },
  {
    step: 4,
    title: "Measure and optimize",
    description:
      "We monitor quality, adoption, errors, handoffs, commercial impact, and operational performance, then continuously improve the system.",
    deliverable: "Performance dashboard and optimization roadmap.",
  },
];

export const processDiagram = [
  "Business problem",
  "Workflow audit",
  "Data and integrations",
  "AI reasoning",
  "Business rules",
  "Human approval",
  "Action",
  "Measurement",
  "Optimization",
];

// --- Engagement options ------------------------------------------------

export const engagementOptions: EngagementOption[] = [
  {
    id: "starter",
    name: "AI Automation Starter",
    bestFor: "Brands that need to solve one clear operational bottleneck.",
    includes: [
      "One prioritized use case",
      "Workflow design",
      "Core integrations",
      "Testing",
      "Team handover",
      "Initial KPI setup",
    ],
    ctaLabel: "Discuss a Starter System",
  },
  {
    id: "sales-support",
    name: "AI Sales & Support System",
    bestFor:
      "Brands ready to connect customer conversations with sales, support, and order data.",
    includes: [
      "Sales or support AI agent",
      "WhatsApp, social, email, or website integration",
      "Store and order-data integration",
      "Human escalation",
      "Analytics",
      "Initial optimization period",
    ],
    ctaLabel: "Discuss Sales & Support",
    badge: "Most common starting point",
  },
  {
    id: "operating-system",
    name: "AI Commerce Operating System",
    bestFor:
      "Multi-channel businesses that need connected automation, dashboards, alerts, and AI decision support.",
    includes: [
      "Multiple connected workflows",
      "Unified commerce data layer",
      "Operations dashboards",
      "AI reporting and analysis",
      "Inventory or profitability alerts",
      "Governance and human controls",
      "Continuous optimization",
    ],
    ctaLabel: "Discuss the Operating System",
  },
];

// --- Why ASK -------------------------------------------------------------

export const differentiators: Differentiator[] = [
  {
    title: "E-commerce focused",
    description:
      "The systems are designed around product discovery, customer conversations, orders, inventory, channels, and commerce operations.",
  },
  {
    title: "Outcome first",
    description:
      "Every workflow begins with a measurable business constraint—not with a tool that ASK wants to sell.",
  },
  {
    title: "Connected to your stack",
    description:
      "ASK works around your existing platforms, APIs, spreadsheets, databases, and internal processes.",
  },
  {
    title: "Human-controlled AI",
    description:
      "High-risk, unusual, or sensitive actions can require approval or be escalated to a human.",
  },
  {
    title: "Built for continuous improvement",
    description:
      "AI quality, workflow performance, exceptions, and business outcomes are monitored after launch.",
  },
];

// --- Proof examples (proofMode: "examples") ------------------------------

export const proofExamples: ProofExample[] = [
  {
    id: "control-tower",
    title: "Omnichannel Operations Control Tower",
    components: [
      "Shopify order ingestion",
      "Marketplace order ingestion",
      "Automated data validation",
      "Unified SKU mapping",
      "Inventory monitoring",
      "Product and channel profitability",
      "Executive dashboards",
      "Daily alerts",
      "Read-only AI business analyst",
    ],
    label: "Example architecture. Results depend on the client's data and implementation.",
  },
  {
    id: "sales-recovery-workflow",
    title: "AI Sales Recovery Workflow",
    components: [
      "Abandoned-cart event",
      "Customer and cart context",
      "Personalized WhatsApp follow-up",
      "Product and delivery rules",
      "Objection classification",
      "Human handoff",
      "Revenue attribution",
    ],
    label: "Illustrative workflow—not a performance claim.",
  },
  {
    id: "support-workflow",
    title: "AI Customer Support Workflow",
    components: [
      "Customer identification",
      "Order lookup",
      "Policy retrieval",
      "Response generation",
      "Business-rule check",
      "Human escalation",
      "Quality monitoring",
    ],
    label: "Illustrative workflow—not a performance claim.",
  },
];

/**
 * Verified case studies. Empty until real, client-approved evidence exists.
 * Do not populate with placeholder or illustrative data — switch
 * `siteConfig.proofMode` to "verified-case-studies" only once entries exist here.
 */
export const verifiedCaseStudies: import("@/types").VerifiedCaseStudy[] = [];

// --- ROI calculator defaults (conservative) -------------------------------

export const roiDefaults = {
  monthlyOrders: 400,
  monthlyEnquiries: 300,
  averageOrderValue: 55,
  abandonedCartValue: 6000,
  manualOpsHoursPerWeek: 10,
  hourlyCost: 15,
  repetitivePercentage: 45,
  responseTimeHours: 6,
};

// --- Fit qualification -----------------------------------------------------

export const goodFit = [
  "You run an active e-commerce business.",
  "Your team repeats manual work every week.",
  "You use several disconnected platforms.",
  "You want a measurable system rather than another AI subscription.",
  "You are willing to provide the required access, data, and internal input.",
];

export const tooEarly = [
  "You are only looking for a generic ChatGPT prompt.",
  "You do not yet have a product, sales process, or operational workflow.",
  "You want guaranteed revenue without testing or implementation.",
  "You want fully autonomous high-risk decisions without controls.",
];

// --- Booking intake questions (for reference / TidyCal setup) ------------

export const bookingIntakeQuestions = [
  "What is your store or business website?",
  "Which platforms do you currently use?",
  "What is your approximate monthly online revenue range?",
  "What is your biggest sales or operations bottleneck?",
  "Which area would you most like to improve in the next 90 days?",
  "What have you already tried?",
  "Is there anything specific ASK should review before the call?",
];

export const revenueRanges = [
  "Pre-revenue or launching",
  "Under $10,000 per month",
  "$10,000–$50,000 per month",
  "$50,000–$250,000 per month",
  "Over $250,000 per month",
  "Prefer not to say",
];

export const bottleneckOptions = [
  "Customer support",
  "Abandoned-cart recovery",
  "Lead follow-up",
  "WhatsApp or Instagram sales",
  "Inventory and order operations",
  "Reporting and dashboards",
  "Connecting existing tools",
  "Unsure where to start",
];
