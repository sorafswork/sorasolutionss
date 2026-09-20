# AI Video Intro Splash

## Goal
Replace the current loading animation with the new five-second SoRa cinematic video, then reveal the existing homepage without changing its design or content.

## Implementation
- Use the generated optimized 16:9 video as a full-screen, muted, autoplaying, inline splash.
- Preserve the existing SoRa logo and render it with the final brand name and tagline over the closing moment.
- Add a smooth fade into the homepage when playback ends, plus a short fallback timeout if autoplay or loading fails.
- Keep the splash responsive with intentional cropping on mobile and honor reduced-motion preferences.
- Avoid replaying the intro repeatedly during the same browser session.

## Validation
- Verify desktop and mobile framing, video playback, fade timing, and homepage access.
- Confirm production build health and asset loading.
