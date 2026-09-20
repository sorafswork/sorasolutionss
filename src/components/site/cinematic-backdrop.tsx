import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const CinematicScene = lazy(() => import("@/components/three/cinematic-scene"));

/**
 * Full-page 3D layer whose camera and scene are driven by scroll position.
 * Rendered behind the page content; never intercepts pointer events.
 */
export function CinematicBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <CinematicScene />
        </Suspense>
      </ClientOnly>
      {/* readability scrim so content stays crisp over the moving scene */}
      <div className="absolute inset-0 bg-background/55" />
    </div>
  );
}
