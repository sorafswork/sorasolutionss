import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/section-header";
import { WorksShowcase } from "@/components/site/works-showcase";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works — SoRa Innovative Solutions" },
      { name: "description", content: "Selected websites, branding, and design work from SoRa Innovative Solutions." },
      { property: "og:title", content: "Works — SoRa Innovative Solutions" },
      { property: "og:description", content: "A gallery of premium websites, brands, and design work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Works,
});

function Works() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>Our <span className="text-gradient-brand">works</span></>}
        subtitle="A curated selection of live client projects delivered by SoRa Innovative Solution."
      />
      <WorksShowcase />
    </>
  );
}
