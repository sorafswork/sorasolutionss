import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SERVICES } from "@/lib/site-data";
import { useIsMobile } from "@/hooks/use-mobile";

const SIZE = 720;
const C = SIZE / 2;
const R = 250;

export function ServiceMap() {
  const services = SERVICES.slice(0, 6);
  const [active, setActive] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();

  const points = services.map((_, i) => {
    const a = (-90 + i * (360 / services.length)) * (Math.PI / 180);
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });

  if (isMobile) {
    return (
      <div className="mt-12 relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-gold/40 to-transparent" />
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: -16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative mb-5 glass-card rounded-2xl border p-4"
          >
            <span className="absolute -left-[1.55rem] top-6 h-3 w-3 rounded-full bg-gradient-brand shadow-glow-blue" />
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-shimmer">{s.title}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 relative mx-auto w-full max-w-[720px] aspect-square">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="sm-core">
            <stop offset="0%" stopColor="oklch(0.55 0.22 264 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 264 / 0)" />
          </radialGradient>
        </defs>
        <circle cx={C} cy={C} r={200} fill="url(#sm-core)" />
        {[R * 0.62, R, R * 1.12].map((r, i) => (
          <motion.circle
            key={r}
            cx={C} cy={C} r={r}
            fill="none"
            stroke="oklch(0.79 0.16 84 / 0.12)"
            strokeDasharray="3 10"
            style={{ transformOrigin: `${C}px ${C}px` }}
            animate={reduce ? undefined : { rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 90 + i * 30, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {points.map((p, i) => (
          <motion.line
            key={i}
            x1={C} y1={C} x2={p.x} y2={p.y}
            stroke={active === i ? "oklch(0.79 0.16 84 / 0.9)" : "oklch(0.7 0.1 264 / 0.28)"}
            strokeWidth={active === i ? 2 : 1}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.8 }}
          />
        ))}
      </svg>

      {/* center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="glass-card rounded-full border px-8 py-8 shadow-glow-blue">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gold">SoRa</div>
          <div className="font-display text-lg font-bold leading-tight text-shimmer">Innovative<br />Solution</div>
        </div>
      </motion.div>

      {points.map((p, i) => {
        const s = services[i];
        const isActive = active === i;
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.1, type: "spring", stiffness: 120, damping: 14 }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                className={`glass-card w-44 rounded-2xl border p-4 text-center transition-shadow ${isActive ? "shadow-glow-gold" : ""}`}
              >
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-2 font-display text-sm font-bold text-shimmer">{s.title}</h3>
                <motion.p
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0 }}
                  className="overflow-hidden text-xs text-muted-foreground"
                >
                  <span className="block pt-2">{s.desc}</span>
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
