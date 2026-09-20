export function TechMarquee() {
  const items = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind",
    "Node.js", "Express", "PHP", "Python", "MySQL", "MongoDB", "Git", "GitHub",
    "Figma", "Canva", "Photoshop", "Illustrator", "WordPress", "VS Code",
  ];
  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-4">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border bg-card/60 px-4 py-2 text-sm text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}