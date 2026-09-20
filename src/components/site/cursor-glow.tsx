import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden md:block h-[400px] w-[400px] rounded-full opacity-40 mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, oklch(0.82 0.14 25 / 0.35), transparent 60%)",
      }}
    />
  );
}