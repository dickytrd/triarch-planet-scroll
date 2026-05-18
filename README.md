# KONEMEX S69 — Planet Exploration Site

> A new world beyond the void. Discover the layers of an uncharted planet.

## Tech Stack

- **Next.js 14** (App Router)
- **Three.js r162** — Custom ShaderMaterial sphere with Simplex noise
- **GSAP + ScrollTrigger** — All scroll animations & sphere morphing
- **Lenis** — Smooth scroll with snap
- **Tailwind CSS** — Utility styling
- **Satoshi** — Typography via Fontshare CDN

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Deploy to Vercel

```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — Push to GitHub, connect repo on vercel.com
# Vercel auto-detects Next.js. No config needed.
```

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout + metadata
│   ├── page.js            # Entry point (dynamic imports)
│   └── globals.css        # Global styles, variables, grain
│
├── components/
│   ├── ThreeScene.jsx     # Three.js canvas (fixed, z-index 1)
│   ├── Navigation.jsx     # Side dot navigation
│   ├── ScrollController.jsx  # Lenis + GSAP orchestration
│   │
│   └── sections/
│       ├── HeroSection.jsx        # S1 — Hero
│       ├── IntroSection.jsx       # S2 — Manifesto (pinned)
│       ├── FirstLayerSection.jsx  # S3 — Surface
│       ├── MiddleLayerSection.jsx # S4 — Wire mesh
│       ├── TheCenterSection.jsx   # S5 — Core reveal
│       ├── QuoteSection.jsx       # S6 — Quote
│       ├── GallerySection.jsx     # S7 — Accordion (pinned)
│       └── CTASection.jsx         # S8 — CTA + rebirth
│
└── lib/
    ├── sphereProxy.js     # Shared mutable state (GSAP ↔ Three.js)
    └── shaders.js         # GLSL vertex + fragment shaders
```

## Sphere Morph States

| Section | State | posX | Effect |
|---------|-------|------|--------|
| Hero    | Default solid | 0 | Floating, mouse parallax |
| Intro   | Default solid | 0 | Noise ramps up slightly |
| First Layer | Rough surface | +1.6 | noiseStrength: 0.18 |
| Middle Layer | Wireframe | −1.6 | opacity 0.18, wireframe 0.75 |
| The Center | Core reveal | +1.6 | Core scale 0.55, gold emissive |
| Quote | Small default | 0 | scale 0.28, all returns |
| Gallery | Hidden | — | scale 0.001 |
| CTA | Rebirth | 0 | scale back to 0.85 |

## Customization

### Replace gallery images
Edit `src/components/sections/GallerySection.jsx` — update the `image` URLs in `GALLERY_ITEMS`.

### Adjust sphere shaders
Edit `src/lib/shaders.js` — all GLSL is inline and commented.

### Timing / easing
Edit `src/components/ScrollController.jsx` — each section has its own `gsap.to(sphereProxy, {...})` block.

### Colors
Edit `src/app/globals.css` — all CSS variables are at the top of `:root`.
