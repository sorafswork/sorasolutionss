import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";
import { ScrollProgress } from "./scroll-progress";
import { BackToTop } from "./back-to-top";
import { CursorGlow } from "./cursor-glow";
import { OfferModal } from "./offer-modal";
import { AnimatedBackground } from "./animated-background";
import { LoadingScreen } from "./loading-screen";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <LoadingScreen />
      <AnimatedBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteNav />
      <main className="pt-24">{children}</main>
      <SiteFooter />
      <BackToTop />
      <OfferModal />
    </div>
  );
}