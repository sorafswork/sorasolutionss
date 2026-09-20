import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, CheckCircle2, Star, Target, Eye, Heart } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import servicesBanner from "@/assets/services-banner.jpg";
import { HeroShowreel } from "@/components/site/hero-showreel";
import { BrandLink } from "@/components/site/brand-button";
import { SectionHeader } from "@/components/site/section-header";
import { Counter } from "@/components/site/counter";
import { TechMarquee } from "@/components/site/marquee";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES, STATS, WHY_US, TESTIMONIALS, PROCESS, FAQS } from "@/lib/site-data";
import { ContactSection } from "@/components/site/contact-section";
import { WorksShowcase } from "@/components/site/works-showcase";
import { CinematicBackdrop } from "@/components/site/cinematic-backdrop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoRa Innovative Solution — Your Vision. Our Innovation." },
      { name: "description", content: "Start your journey with SoRa Innovative Solution — premium websites, branding, video, and content that grow your business." },
      { property: "og:title", content: "SoRa Innovative Solution" },
      { property: "og:description", content: "Your Vision. Our Innovation. Premium digital services delivered end-to-end." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <CinematicBackdrop />
      <div className="relative z-10">
        <div id="home" className="scroll-mt-28">
          <Hero />
          <TrustStrip />
          <StatsBar />
        </div>
        <div id="about" className="scroll-mt-28">
          <AboutSection />
        </div>
        <div id="works" className="scroll-mt-28">
          <WorksShowcase />
        </div>
        <div id="services" className="scroll-mt-28">
          <ServicesPreview />
          <WhyUs />
          <ProcessSection />
          <TechStack />
        </div>
        <div id="testimonials" className="scroll-mt-28">
          <TestimonialsPreview />
        </div>
        <div id="faq" className="scroll-mt-28">
          <FaqSection />
        </div>
        <FinalCTA />
        <div id="contact" className="scroll-mt-28">
          <ContactSection />
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-16">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        {/* Moving video-like aurora */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl animate-spin-slow"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.56 0.22 264 / 0.55), oklch(0.62 0.26 310 / 0.55), oklch(0.72 0.20 200 / 0.55), oklch(0.82 0.16 87 / 0.45), oklch(0.56 0.22 264 / 0.55))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 animate-aurora opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(600px 400px at 20% 30%, oklch(0.62 0.26 310 / 0.35), transparent 60%), radial-gradient(500px 400px at 80% 60%, oklch(0.72 0.20 200 / 0.30), transparent 60%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Welcome to SoRa Innovative Solution
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.02]"
            >
              Building Digital Experiences That{" "}
              <span className="text-shimmer">Inspire Growth.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              <span className="font-display text-xl md:text-2xl text-foreground">Your Vision. <span className="text-gradient-gold">Our Innovation.</span></span>
              <br />
              Premium websites, branding, graphic design, and content strategies that
              turn ambitious ideas into measurable growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <BrandLink to="/#contact" variant="primary">
                Get Started <ArrowRight className="h-4 w-4" />
              </BrandLink>
              <BrandLink to="/#works" variant="outline">
                <Play className="h-4 w-4" /> View Our Works
              </BrandLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground"
            >
              {["Modern Websites", "Premium Branding", "Fast Delivery", "SEO Optimized"].map((b) => (
                <div key={b} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {b}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Animated project showreel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
          >
            <HeroShowreel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by startups, local businesses, creators & entrepreneurs
        </p>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl border p-5 text-center"
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-shimmer">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      {/* Banner image for services section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative mb-12 overflow-hidden rounded-3xl border border-border shadow-elevated"
      >
        <img
          src={servicesBanner}
          alt="Premium digital services delivered end-to-end"
          width={1920}
          height={720}
          loading="lazy"
          className="h-48 md:h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 md:px-12 max-w-2xl">
            <div className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-gold">What we do</div>
            <h3 className="mt-2 font-display text-2xl md:text-4xl font-bold leading-tight">
              Premium services, <span className="text-gradient-brand">delivered end-to-end</span>
            </h3>
          </div>
        </div>
      </motion.div>
      <SectionHeader
        eyebrow="What we do"
        title={<>Premium services, <span className="text-gradient-gold">delivered end-to-end</span></>}
        subtitle="From strategy to launch — everything your brand needs, under one roof."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 6).map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05 }}
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
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <BrandLink to="/#contact" variant="outline">
          Discuss your project <ArrowRight className="h-4 w-4" />
        </BrandLink>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="Why SoRa"
        title={<>Built on <span className="text-shimmer">quality</span>, backed by <span className="text-gradient-gold">care</span>.</>}
      />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
        {WHY_US.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="glass-card rounded-2xl border p-5 flex items-center gap-3"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <w.icon className="h-5 w-5" />
            </div>
            <div className="font-medium">{w.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
      <SectionHeader
        eyebrow="Technologies"
        title={<>The <span className="text-shimmer">modern stack</span> we build with</>}
      />
      <div className="mt-10">
        <TechMarquee />
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="Loved by clients"
        title={<>What our <span className="text-shimmer">clients</span> say</>}
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.slice(0, 3).map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-3xl border p-6"
          >
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground/90 leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-brand" />
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16 text-center shadow-elevated">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
            Let's build together
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight">
            Ready to launch something{" "}
            <span className="text-shimmer">unforgettable?</span>
          </h2>
          <p className="mt-4 font-display text-lg md:text-2xl font-bold uppercase tracking-[0.18em] text-gradient-gold">
            Let's build something rare.
          </p>
          <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
            Tell us about your project — we'll respond within 24 hours with a plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BrandLink to="/#contact" variant="primary">
              Get Free Quote <ArrowRight className="h-4 w-4" />
            </BrandLink>
            <BrandLink to="/#services" variant="gold">
              View Services
            </BrandLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  { icon: Target, title: "Our Mission", desc: "Empower every business with premium digital experiences that spark growth." },
  { icon: Eye, title: "Our Vision", desc: "Become a globally trusted studio known for craft, care, and consistency." },
  { icon: Heart, title: "Our Values", desc: "Integrity, creativity, transparency, and obsessive attention to detail." },
];

function AboutSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="Who we are"
        title={<>A modern digital studio built for <span className="text-shimmer">growth</span>.</>}
        subtitle="SoRa Innovative Solution blends technology, creativity, and strategy to help brands build a striking online identity and grow with confidence."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl border p-6"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow-blue">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-shimmer">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="How we work"
        title={<>A <span className="text-shimmer">clear process</span>, idea to launch</>}
        subtitle="Nine focused steps that keep every project on track and every client in the loop."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PROCESS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl border p-5 flex items-start gap-4"
          >
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow-blue">
              <step.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-shimmer">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 md:px-6 py-20">
      <SectionHeader
        eyebrow="Questions"
        title={<>Frequently asked <span className="text-shimmer">questions</span></>}
        subtitle="Everything you might want to know before starting a project."
      />
      <div className="mt-10 glass-card rounded-3xl border p-2 md:p-4">
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
  );
}