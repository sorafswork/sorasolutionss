import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix;
    });
  }, [spring, suffix]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      0{suffix}
    </motion.span>
  );
}