import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — SoRa Innovative Solutions" },
      { name: "description", content: "Answers to the most common questions about working with SoRa Innovative Solutions." },
      { property: "og:title", content: "FAQ — SoRa Innovative Solutions" },
      { property: "og:description", content: "Timelines, revisions, tech, SEO, support, and payment terms." },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  return (
    <>
      <PageHero
        eyebrow="Questions"
        title={<>Frequently asked <span className="text-gradient-brand">questions</span></>}
        subtitle="Everything you might want to know before starting a project."
      />
      <section className="mx-auto max-w-3xl px-4 md:px-6 py-12">
        <div className="glass-card rounded-3xl border p-2 md:p-4">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`i-${i}`}>
                <AccordionTrigger className="text-left font-display text-base md:text-lg font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}