import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X, Gift, ArrowRight } from "lucide-react";
const logo = "/logo.png";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

export function useSectionScroll() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (id: string) => {
    if (pathname !== "/") {
      navigate({ to: "/", hash: id });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `/#${id}`);
    }
  };
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      let current = "home";
      for (const l of NAV_LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 140) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSection = useActiveSection();
  const scrollToSection = useSectionScroll();
  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 18 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className={cn("mx-auto max-w-7xl px-4 md:px-6")}>
        <div className="relative rounded-2xl p-px bg-gradient-to-r from-primary/50 via-gold/40 to-primary/50">
        <div
          className={cn(
            "glass-card flex items-center justify-between rounded-2xl px-4 md:px-5 transition-all",
            scrolled
              ? "py-2 shadow-[0_18px_50px_-18px_oklch(0.55_0.22_264/0.75)]"
              : "py-3 shadow-[0_12px_40px_-22px_oklch(0.55_0.22_264/0.6)]",
          )}
        >
          <Link to="/" className="group flex items-center gap-2.5">
            <motion.img
              src={logo}
              alt="Sora Innovative Solution Logo"
              width={40}
              height={40}
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 rounded-xl object-contain ring-1 ring-primary/40"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            />
            <span className="hidden sm:block font-display font-bold text-lg leading-none">
              <span className="text-gradient-brand">SoRa</span>
              <span className="text-foreground/90"> Innovative Solution</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const active = pathname === "/" && activeSection === l.id;
              return (
                <motion.div key={l.id} whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  <a
                    href={`/#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    className={cn(
                      "group relative block px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-primary/20 ring-1 ring-primary/40 shadow-[0_0_22px_-4px_oklch(0.55_0.22_264/0.9)]"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    )}
                    <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative">{l.label}</span>
                    <span className="pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-300 group-hover:w-2/3" />
                  </a>
                </motion.div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-sora-offer"))}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold hover:bg-gold/20 transition-colors"
            >
              <Gift className="h-3.5 w-3.5" />
              Offer
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
            </button>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow-blue hover:scale-[1.03] transition-transform"
            >
              Get Free Quote <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-border p-2"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        </div>

        {/* Mobile */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 glass-card rounded-2xl border p-3"
          >
            <div className="grid gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`/#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-sm font-medium",
                    pathname === "/" && activeSection === l.id
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  window.dispatchEvent(new CustomEvent("open-sora-offer"));
                }}
                className="mt-1 flex items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-3 py-2 text-sm font-semibold text-gold"
              >
                <Gift className="h-4 w-4" /> View SoRa Offer
              </button>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                Get Free Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}