export interface NavItem {
  label: string;
  href: string;
}

export interface Integration {
  name: string;
  category: string;
}

export interface PainCard {
  title: string;
  description: string;
  impactLabel: string;
}

export interface SystemMetric {
  label: string;
}

export interface System {
  id: string;
  name: string;
  outcome: string;
  capabilities: string[];
  commonTriggers: string[];
  exampleWorkflow: string[];
  integrations: string[];
  metrics: string[];
  bestFitFor: string;
  ctaLabel: string;
}

export interface SupportingModule {
  name: string;
}

export type AssessmentSystemId =
  | "sales-recovery"
  | "customer-experience"
  | "operations-intelligence"
  | "connected-operating-system";

export interface AssessmentOption {
  id: string;
  label: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: AssessmentOption[];
}

export interface AssessmentResult {
  id: AssessmentSystemId;
  system: string;
  reason: string;
  workflows: string[];
  metrics: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EngagementOption {
  id: string;
  name: string;
  bestFor: string;
  includes: string[];
  ctaLabel: string;
  badge?: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface DemoStep {
  label: string;
}

export interface DemoTab {
  id: string;
  label: string;
  customerLine?: string;
  aiLine?: string;
  alertLine?: string;
  steps: string[];
  disclaimer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable: string;
}

export interface ProofExample {
  id: string;
  title: string;
  components: string[];
  label: string;
}

export interface VerifiedCaseStudy {
  id: string;
  clientLogoAlt: string;
  quote: string;
  attribution: string;
  beforeState: string;
  implementedSystem: string;
  measuredResult: string;
  measurementPeriod: string;
  methodologyNote: string;
}

export interface AnalyticsEventProperties {
  ctaLocation?: string;
  systemName?: string;
  assessmentResult?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  device?: string;
  pagePath?: string;
  questionId?: string;
  demoTab?: string;
  faqQuestion?: string;
  [key: string]: string | number | boolean | undefined;
}

export type AnalyticsEventName =
  | "hero_primary_cta_clicked"
  | "hero_secondary_cta_clicked"
  | "navigation_cta_clicked"
  | "mobile_sticky_cta_clicked"
  | "booking_modal_opened"
  | "booking_external_fallback_clicked"
  | "booking_completed"
  | "opportunity_finder_started"
  | "opportunity_finder_question_completed"
  | "opportunity_finder_result_viewed"
  | "opportunity_finder_lead_submitted"
  | "roi_calculator_started"
  | "roi_calculator_completed"
  | "roi_booking_cta_clicked"
  | "system_card_clicked"
  | "example_demo_changed"
  | "faq_opened"
  | "whatsapp_clicked"
  | "email_clicked";
