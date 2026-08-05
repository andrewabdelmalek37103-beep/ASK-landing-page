import { Hero } from "@/components/sections/Hero";
import { IntegrationStrip } from "@/components/sections/IntegrationStrip";
import { PainPoints } from "@/components/sections/PainPoints";
import { Systems } from "@/components/sections/Systems";
import { SupportingModules } from "@/components/sections/SupportingModules";
import { OpportunityFinder } from "@/components/sections/OpportunityFinder";
import { ExampleDemos } from "@/components/sections/ExampleDemos";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { Process } from "@/components/sections/Process";
import { EngagementOptions } from "@/components/sections/EngagementOptions";
import { WhyAsk } from "@/components/sections/WhyAsk";
import { FounderSection } from "@/components/sections/FounderSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { SafetyAndControls } from "@/components/sections/SafetyAndControls";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <IntegrationStrip />
      <PainPoints />
      <Systems />
      <SupportingModules />
      <OpportunityFinder />
      <ExampleDemos />
      <ROICalculator />
      <Process />
      <EngagementOptions />
      <WhyAsk />
      <FounderSection />
      <ProofSection />
      <SafetyAndControls />
      <BookingCTA />
      <FAQ />
      <FinalCTA />
    </>
  );
}
