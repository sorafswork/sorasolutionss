import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.jpg";
import w5 from "@/assets/w5.jpg";
import w6 from "@/assets/w6.jpg";
import w7 from "@/assets/w7.jpg";

type Slide = {
  img: string;
  title: string;
  category: string;
  line: string;
  url: string;
  domain: string;
};

const SLIDES: Slide[] = [
  { img: w1, title: "Skyfly International Pvt Ltd", category: "Corporate / Travel", line: "A polished global travel presence with packages, visa info and instant enquiries.", url: "https://www.skyflyintl.com/", domain: "skyflyintl.com" },
  { img: w2, title: "VY Enterprises", category: "Business / B2B", line: "A clean B2B showcase for eco-friendly products with direct buyer enquiries.", url: "https://www.vyenterprises.in/", domain: "vyenterprises.in" },
  { img: w3, title: "Blush Theory Art", category: "Personalized Digital Gifts", line: "Private, personalized surprise websites for couples and special milestones.", url: "https://blush-theory-art-studio.lovable.app", domain: "blushtheoryart.com" },
  { img: w4, title: "Artika Gallery", category: "Art & Creative", line: "An elegant visual-first gallery built to make artwork the hero.", url: "https://artika-creations.vercel.app/", domain: "artika-creations.com" },
  { img: w5, title: "Habit Flow", category: "Productivity", line: "A focused habit tracker with streaks, routines and progress visualisation.", url: "https://habit-track-w.netlify.app/", domain: "habitflow.app" },
  { img: w6, title: "Client Portfolio — Ratthi", category: "Personal Portfolio", line: "A modern motion-rich portfolio built around personal brand and projects.", url: "https://ratthi-portfolio.lovable.app", domain: "ratthi.dev" },
  { img: w7, title: "Skyfly India", category: "Travel / Corporate", line: "A lead-focused travel site promoting Indian tours with click-to-call booking.", url: "https://skyflyindia.in", domain: "skyflyindia.in" },
];

const DURATION = 5200;

export function HeroShowreel() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setDir(next > i || (i === SLIDES.length - 1 && next === 0) ? 1 : -1);
    setI((next + SLIDES.length) % SLIDES.length);
  }, [i]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => { setDir(1); setI((p) => (p + 1) % SLIDES.length); }, DURATION);
    return () => clearTimeout(t);
  }, [i, paused]);

  const s = SLIDES[i];

  return (
    <div
      className="relative mx-auto w-full max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-10 rounded-full bg-primary/20 blur-3xl" aria-hidden />
      <div className="absolute -inset-6 rounded-[2rem] bg-gold/10 blur-2xl" aria-hidden />

      {/* Device */}
      <motion.div
        animate={{ y: [0, -10, 0], rotateX: [0, 1.2, 0], rotateY: [0, -1.2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformPerspective: 1200 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
      >
        <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="ml-3 truncate text-xs text-muted-foreground">{s.domain}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Live
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.06, x: dir * 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.97, x: dir * -40 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {/* natural page scroll effect */}
              <motion.img
                src={s.img}
                alt={`${s.title} website preview`}
                loading="lazy"
                className="absolute inset-x-0 top-0 w-full"
                initial={{ y: "0%" }}
                animate={paused ? undefined : { y: ["0%", "-38%", "0%"] }}
                transition={{ duration: DURATION / 1000, ease: "easeInOut", times: [0, 0.72, 1] }}
                style={{ height: "175%", objectFit: "cover", objectPosition: "top" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border/50">
            <motion.div
              key={`p-${i}-${paused}`}
              className="h-full bg-gradient-gold"
              initial={{ width: "0%" }}
              animate={{ width: paused ? "100%" : "100%" }}
              transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Caption */}
      <div className="relative mt-5 min-h-[7.5rem] rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{s.category}</div>
            <h3 className="mt-1 font-display text-lg md:text-xl font-bold text-shimmer">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.line}</p>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/60"
            >
              View Project <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          aria-label="Previous project"
          onClick={() => go(i - 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition-colors hover:border-primary/60"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {SLIDES.map((sl, idx) => (
            <button
              key={sl.title}
              aria-label={`Show ${sl.title}`}
              onClick={() => go(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-7 bg-gradient-gold" : "w-2.5 bg-border hover:bg-primary/60",
              )}
            />
          ))}
        </div>
        <button
          aria-label="Next project"
          onClick={() => go(i + 1)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 transition-colors hover:border-primary/60"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
