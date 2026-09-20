import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useSectionScroll } from "./nav";

type Variant = "primary" | "gold" | "outline";

export function BrandLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const styles: Record<Variant, string> = {
    primary: "bg-gradient-brand text-primary-foreground shadow-glow-blue",
    gold: "bg-gradient-gold text-gold-foreground shadow-glow-gold",
    outline: "border border-border bg-card/50 text-foreground hover:border-primary/60",
  };
  const scrollToSection = useSectionScroll();
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
    styles[variant],
    className,
  );
  if (to.startsWith("/#")) {
    const id = to.slice(2);
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
        <a
          href={to}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(id);
          }}
          className={classes}
        >
          {children}
        </a>
      </motion.div>
    );
  }
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        to={to}
        className={classes}
      >
        {children}
      </Link>
    </motion.div>
  );
}