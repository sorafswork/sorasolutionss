import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Gift, Sparkles, X, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const PERKS = [
  { title: "30% OFF", desc: "on your first project" },
  { title: "Free Logo", desc: "with any website plan" },
  { title: "Priority Delivery", desc: "faster turnaround" },
  { title: "1 Month Support", desc: "post-launch care" },
];

export function OfferModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("open-sora-offer", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-sora-offer", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gold/30 blur-3xl" />
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 hover:bg-background"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative p-8">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
                  <Sparkles className="h-3 w-3" /> Limited Time
                </span>
              </div>
              <motion.div
                initial={{ rotate: -20, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow-blue"
              >
                <Gift className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight">
                Exclusive <span className="text-gradient-gold">SoRa Offer</span>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Kick off your next project this month and unlock premium perks.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {PERKS.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <div className="font-display font-bold text-gold">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.desc}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-blue"
                >
                  Claim Offer <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}