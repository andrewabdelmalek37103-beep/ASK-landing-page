"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { faqItems } from "@/content/faq";
import { track } from "@/lib/analytics";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" eyebrow="FAQ" title="Frequently asked questions" />

        <Accordion
          type="single"
          collapsible
          className="mt-10"
          onValueChange={(value) => {
            if (value) track("faq_opened", { faqQuestion: value });
          }}
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
