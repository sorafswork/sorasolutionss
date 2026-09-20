import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/section-header";
import { BrandLink } from "@/components/site/brand-button";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SoRa Innovative Solutions" },
      { name: "description", content: "Web development, branding, graphic design, content, SEO, UI/UX, marketing and more — premium services under one roof." },
      { property: "og:title", content: "Services — SoRa Innovative Solutions" },
      { property: "og:description", content: "Premium digital services: web, branding, design, content, SEO, marketing." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Everything you need to <span className="text-gradient-brand">grow online</span>.</>}
        subtitle="A full-stack creative team, ready to design, build, and market your brand."
      />
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-glow-blue"
            >
            <div className="relative overflow-hidden">
              <img
                src={s.image}
                alt={`${s.title} poster`}
                width={1200}
                height={800}
                loading="lazy"
                className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow-blue">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-shimmer">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-foreground/80">
                    <Check className="h-4 w-4 text-gold" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <BrandLink to="/contact" variant="outline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </BrandLink>
              </div>
            </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}