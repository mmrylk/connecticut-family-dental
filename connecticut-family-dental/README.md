# Connecticut Family Dental — Bridgeport

A responsive React 19 / TypeScript website with Tailwind CSS 4, Framer Motion, Lucide icons, and an interactive Three.js chrome tooth.

## Run

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run check
npm run build
```

Vite emits a static website to `dist/`. Serve it on any static hosting provider. Hosting identity for the connected Sites deployment is in `.openai/hosting.json`.

## Components

- `Header`: announcement, sticky frosted navigation, mobile navigation, telephone actions.
- `Hero` / `ToothCanvas`: local 1080p ambient video with poster, pause control, studio-lit chrome 3D model with pointer and keyboard rotation, WebGL fallback, reduced motion support.
- `Services`: five confirmed service categories and accessible details dialogs.
- `SmileSimulator`: keyboard- and pointer-operable before/after range slider.
- `Doctor`: supplied doctor name and practice introduction. Representative clinic photography is labeled; no fabricated doctor portrait or credentials.
- `NewPatients`: preparation steps, expandable FAQs, insurance verification, CareCredit information placeholder.
- `BookingModal`: three-step local visit planner; excludes weekends, ends at 6 PM Monday–Wednesday, 8 PM Thursday, and 2 PM Friday. Highlights Thursday evening slots. Includes a downloadable visit plan and click-to-call confirmation.
- `Contact`: Google map, directions, exact contact details and hours, parking guidance, mobile conversion bar.

## Integration status

The appointment planner is a frontend UI. It does not send requests, reserve appointments, or connect to a practice management system. Its completion screen explicitly directs patients to call for confirmation. Form details stay in React memory until the planner closes. A patient may explicitly download their own plan locally. Connect a practice-approved scheduling endpoint before enabling online submissions.

Insurance network names and financing availability were not supplied, so the site asks patients to verify them by telephone. CareCredit is a clearly labeled information placeholder. Parking availability was not confirmed, so the site directs patients to call for current parking/accessibility guidance.

## Assets

- Local clinic video/poster: Tima Miroshnichenko, [A View of Dental Clinic on Pexels](https://www.pexels.com/video/a-view-of-dental-clinic-5356842/). This is representative stock clinic imagery, not a claim about the physical practice.
- Smile comparison: AI-generated hypothetical example, visibly labeled as a simulation, not an actual patient result.
- Tooth: original procedural Three.js geometry, with Three.js RoomEnvironment studio reflections; no external 3D model dependencies.
- Fonts: Manrope and DM Sans via Google Fonts, with system fallbacks.
- Google Maps embed uses a public address query and needs no API key. The browser needs network access for maps and web fonts; all video, image and 3D assets are bundled locally.

All practice details follow the user-supplied brief. No testimonials, review counts, awards, insurance-network claims, or biographical credentials were invented.
