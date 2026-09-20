// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deployment target.
// - Inside Lovable the sandbox always builds for its own runtime (this option is ignored there).
// - On Vercel we must emit the Build Output API bundle (.vercel/output), otherwise Vercel
//   auto-detects "Vite" and serves the raw dist folder, which breaks SSR routes, assets and
//   anything rendered by the server (the "works on lovable.app, broken on Vercel" symptom).
// - NITRO_PRESET can override this for any other host (netlify, node-server, ...).
const preset =
  process.env.NITRO_PRESET ?? (process.env.VERCEL ? "vercel" : undefined);

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  ...(preset ? { nitro: { preset } } : {}),
});
