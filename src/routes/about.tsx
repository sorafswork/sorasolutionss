import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/section-header";
import { BrandLink } from "@/components/site/brand-button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SoRa Innovative Solutions" },
      { name: "description", content: "Meet the team behind SoRa Innovative Solutions — a modern digital agency crafting premium web, brand, and content experiences." },
      { property: "og:title", content: "About SoRa Innovative Solutions" },
      { property: "og:description", content: "A modern digital agency crafting impactful digital experiences." },
    ],
  }),
  component: About,
});

const PILLARS = [
  { icon: Target, title: "Our Mission", desc: "Empower every business — big or small — with premium digital experiences that spark growth." },
  { icon: Eye, title: "Our Vision", desc: "To become a globally trusted creative studio known for craft, care, and consistency." },
  { icon: Heart, title: "Our Values", desc: "Integrity, creativity, transparency, and an obsessive attention to detail." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title={<>A modern digital agency built for <span className="text-gradient-brand">growth</span>.</>}
        subtitle="SoRa Innovative Solutions combines technology, creativity, and strategy to help businesses build strong online identities and grow with confidence."
      />
      <section className="mx-auto max-w-6xl px-4 md:px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-3xl border p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Craft, technology & <span className="text-gradient-gold">strategy</span>.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work with founders, creators, and marketing teams to turn ambitious ideas
              into polished digital products. From brand systems to production-ready
              websites, we sweat every pixel and every line of code so your business feels
              premium at every touchpoint.
            </p>
            <div className="mt-6 flex gap-3">
              <BrandLink to="/contact">Start a project <ArrowRight className="h-4 w-4" /></BrandLink>
              <BrandLink to="/works" variant="outline">See our work</BrandLink>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl border border-border bg-gradient-brand-soft overflow-hidden">
            <div className="absolute inset-8 rounded-2xl border border-primary/30 bg-card/70" />
            <div className="absolute inset-16 rounded-xl border border-gold/40 bg-card/50" />
            <div className="absolute inset-24 rounded-lg border border-primary/40 bg-gradient-brand opacity-70" />
          </div>
        </div>
      </section>
    </>
  );
}