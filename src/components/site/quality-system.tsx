import { motion, useReducedMotion } from "motion/react";
import { WHY_US } from "@/lib/site-data";
import { useIsMobile } from "@/hooks/use-mobile";

const SIZE = 720;
const C = SIZE / 2;
const R = 262;

export function QualitySystem() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();

  const pts = WHY_US.map((_, i) => {
    const a = (-90 + i * (360 / WHY_US.length)) * (Math.PI / 180);
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  });

  if (isMobile) {
    return (
      <div className="mt-12 grid grid-cols-1 gap-3">
        {WHY_US.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            className="glass-card flex items-center gap-3 rounded-full border py-3 pl-3 pr-5"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
              <w.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold tabular-nums text-gold/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="font-medium">{w.title}</div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 relative mx-auto w-full max-w-[720px] aspect-square">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full">
        {pts.map((p, i) => (
          <motion.line
            key={i}
            x1={C} y1={C} x2={p.x} y2={p.y}
            stroke="oklch(0.79 0.16 84 / 0.25)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.7 }}
          />
        ))}
        <motion.circle
          cx={C} cy={C} r={R}
          fill="none"
          stroke="oklch(0.55 0.22 264 / 0.35)"
          strokeWidth={1.5}
          strokeDasharray="6 14"
          style={{ transformOrigin: `${C}px ${C}px` }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx={C} cy={C} r={150}
          fill="none"
          stroke="oklch(0.79 0.16 84 / 0.5)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transformOrigin: `${C}px ${C}px`, rotate: -90 }}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="glass-card flex h-52 w-52 flex-col items-center justify-center rounded-full border text-center shadow-glow-blue">
          <div className="font-display text-2xl font-bold text-shimmer">SoRa Quality</div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-gold">
            Quality · Trust
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold">
            Delivery · Support
          </div>
        </div>
      </motion.div>

      {pts.map((p, i) => {
        const w = WHY_US[i];
        return (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 130, damping: 15 }}
            whileHover={{ scale: 1.08 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
          >
            <div className="glass-card w-40 rounded-2xl border px-4 py-3 text-center transition-shadow hover:shadow-glow-gold">
              <div className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                <w.icon className="h-4.5 w-4.5" />
              </div>
              <div className="mt-2 text-sm font-medium leading-tight">{w.title}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
