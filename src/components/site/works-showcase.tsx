import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ExternalLink, X, Clock, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/site/section-header";
import { cn } from "@/lib/utils";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";
import w5 from "@/assets/w5.jpg";
import w6 from "@/assets/w6.jpg";
import w7 from "@/assets/w7.jpg";

const CATEGORIES = ["All", "Corporate", "Business", "Personalized Gifts", "Art & Creative", "Portfolio", "Productivity"] as const;

type Project = {
  img: string;
  no: string;
  title: string;
  cat: string;
  category: string;
  about: string;
  services: string[];
  duration: string;
  url: string;
};

const PROJECTS: Project[] = [
  {
    img: w1,
    no: "01",
    title: "Skyfly International Pvt Ltd",
    cat: "Corporate",
    category: "Corporate / Travel",
    about: "A professional digital presence created for an international travel and tour company.",
    services: [
      "🌐 Corporate Website Design & Development",
      "✈️ Travel & Tour Package Presentation",
      "🗺️ Destination & Visa Information",
      "📋 Customer Enquiry & Lead Capture",
      "💬 WhatsApp & Call Integration",
      "📱 Mobile-Responsive Experience",
      "📲 Social Media / Digital Presence Support",
    ],
    duration: "15 Days",
    url: "https://www.skyflyintl.com/",
  },
  {
    img: w2,
    no: "02",
    title: "VY Enterprises",
    cat: "Business",
    category: "Business / B2B",
    about: "A professional business website created to present the company's products, services, and business information.",
    services: [
      "🌐 Business Website Design & Development",
      "📦 Product & Service Showcase",
      "🏢 Company Profile Presentation",
      "📝 Customer Enquiry System",
      "📄 Brochure / Business Information Section",
      "📞 Direct Contact Integration",
      "📱 Responsive Website Experience",
    ],
    duration: "12 Days",
    url: "https://www.vyenterprises.in/",
  },
  {
    img: w3,
    no: "03",
    title: "Blush Theory Art",
    cat: "Personalized Gifts",
    category: "Personalized Digital Gifts",
    about: "A unique digital surprise experience designed specifically for couples to celebrate their special moments.",
    services: [
      "💝 Personalized Couple Website",
      "🔗 Unique Private Personal Link",
      "📸 Personal Photos & Memories",
      "🎥 Videos & Special Moments",
      "💌 Personal Messages & Love Notes",
      "🎮 Interactive Games & Surprise Reveals",
      "✨ Custom Animations & Interactive Experiences",
      "💍 Special Experience for Anniversaries & Proposals",
    ],
    duration: "7 Days",
    url: "https://blush-theory-art-studio.lovable.app",
  },
  {
    img: w4,
    no: "04",
    title: "Artika Gallery",
    cat: "Art & Creative",
    category: "Art & Creative",
    about: "A visually focused online gallery created to showcase artwork and creative collections in an elegant digital space.",
    services: [
      "🎨 Creative Gallery Website",
      "🖼️ Artwork & Collection Showcase",
      "🔎 Category-Based Browsing",
      "✨ Interactive Artwork Viewing",
      "📋 Artwork Information Sections",
      "💬 Customer Enquiry Options",
      "📱 Responsive & Visual-First Design",
    ],
    duration: "10 Days",
    url: "https://artika-creations.vercel.app/",
  },
  {
    img: w5,
    no: "05",
    title: "Habit Flow",
    cat: "Productivity",
    category: "Productivity",
    about: "A simple and engaging productivity platform designed to help users build and maintain daily habits.",
    services: [
      "📊 Habit Tracking Dashboard",
      "✅ Daily Habit Management",
      "🔥 Streak & Progress Tracking",
      "📅 Routine Monitoring",
      "📈 Progress Visualization",
      "🎯 Clean Productivity-Focused UI",
      "📱 Responsive User Experience",
    ],
    duration: "14 Days",
    url: "https://habit-track-w.netlify.app/",
  },
  {
    img: w6,
    no: "06",
    title: "Client Portfolio — Ratthi",
    cat: "Portfolio",
    category: "Personal Portfolio",
    about: "A modern personal portfolio created to showcase professional skills, projects, achievements, and personal brand identity.",
    services: [
      "👤 Personal Portfolio Website",
      "🚀 Interactive Hero Section",
      "💼 Skills & Experience Showcase",
      "📂 Project Portfolio Section",
      "✨ Motion & Interactive Elements",
      "🎯 Personal Branding",
      "📩 Contact & Opportunity Section",
      "📱 Responsive Design",
    ],
    duration: "10 Days",
    url: "https://ratthi-portfolio.lovable.app",
  },
  {
    img: w7,
    no: "07",
    title: "Skyfly India",
    cat: "Corporate",
    category: "Travel / Corporate",
    about: "A modern travel website created to promote Indian tour packages and make travel enquiries easier for customers.",
    services: [
      "🌐 Travel Website Design & Development",
      "🏖️ Tour Package Showcase",
      "🗺️ Destination Presentation",
      "📋 Travel Enquiry System",
      "📞 Click-to-Call Integration",
      "💬 Quick Chat / Booking Contact",
      "📱 Mobile-First Travel Experience",
      "🎯 Lead-Focused Website Design",
    ],
    duration: "12 Days",
    url: "https://india-skyfly.lovable.app",
  },
];

export function WorksShowcase() {
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<Project | null>(null);
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <SectionHeader
          eyebrow="Recent work"
          title={<>Our <span className="text-gradient-gold">works</span></>}
          subtitle="A curated selection of live client projects delivered by SoRa Innovative Solution."
        />
        <div className="h-10" />
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all border",
                filter === c
                  ? "bg-gradient-brand text-primary-foreground border-transparent shadow-glow-blue"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-12">
          {list.map((p, i) => (
            <motion.article
              key={p.title + i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-glow-blue cursor-pointer"
              onClick={() => setActive(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActive(p)}
              aria-label={`View details for ${p.title}`}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={p.img}
                  alt={`${p.title} website mockup`}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold backdrop-blur-md">
                  {p.cat}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent opacity-90" />
                {/* live preview sweep */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
                  animate={{ x: ["0%", "420%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: (i % 6) * 0.6 }}
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-background/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary backdrop-blur-md">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-gold" /> Live
                </span>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-shimmer">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Tap to view project details</p>
                  </div>
                  <span className="rounded-full border border-primary/40 bg-primary/15 p-2 text-primary backdrop-blur-md transition-transform group-hover:scale-110">
                    <Sparkles className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl border border-primary/30 glass-card shadow-glow-blue"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 rounded-full border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-44 md:h-60 overflow-hidden rounded-t-3xl">
                <motion.img
                  src={active.img}
                  alt={`${active.title} website mockup`}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="p-6 md:p-8 -mt-10 relative"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {active.no} — {active.category}
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-shimmer">{active.title}</h2>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{active.about}</p>

                <div className="mt-6">
                  <h3 className="font-display text-sm font-bold uppercase tracking-widest text-primary">Services Delivered</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {active.services.map((s, idx) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18 + idx * 0.04 }}
                        className="rounded-xl border border-border bg-card/50 px-3 py-2 text-sm text-foreground/90"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
                  <Clock className="h-4 w-4" />
                  Project Duration: {active.duration}
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-blue transition-transform hover:scale-[1.03]"
                  >
                    Live Website <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-xs text-primary/90 break-all hover:text-gold"
                  >
                    {active.url}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
