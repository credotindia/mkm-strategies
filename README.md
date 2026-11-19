# MKM Strategies — website

Next.js 16 (App Router, TypeScript, Tailwind CSS 4). Every page is prerendered as static HTML. The only server code is the contact form endpoint, which sends enquiries over SMTP.

## Quick start

```bash
nvm use            # Node 24 (see .nvmrc; Next 16 needs >= 20.9)
npm install
cp .env.example .env.local   # fill in SMTP credentials
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (prints which routes are static) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Architecture

- **Static pages.** No data fetching, no CMS. Content lives in TypeScript files and is rendered at build time.
- **One dynamic endpoint:** `POST /api/contact` → validates with zod → sends mail with nodemailer.
  - Hosting must run Node.js for this route (Vercel, Netlify, a Node server, Docker). A pure static host (S3, plain cPanel) can't run it.
  - Spam protection: hidden honeypot field. Add rate limiting or Cloudflare Turnstile if spam appears.
- **Cache Components** is enabled (Next 16 default). Keep pages free of `new Date()`, `Math.random()`, `cookies()`, `headers()` — or isolate them in a `"use cache"` function — so they stay static.

### Where things live

| Path | Contents |
| --- | --- |
| `src/config/site.ts` | Company name, contacts, offices |
| `src/config/navigation.ts` | Sitemap / menus from the navigation wireframes |
| `src/content/company.ts` | Brochure content: stats, sectors, track record, methodology, regions, founder |
| `src/app/globals.css` | Brand colour tokens (`bg-navy`, `text-ember`, …) |
| `src/app/fonts.ts` | Fonts via `next/font` |
| `src/components/brand/` | `<Logo />` (vector, inherits `currentColor`) |
| `src/components/page-loader.*` | First-load intro (CSS only) |
| `src/components/page-transition.tsx` | Menu-click curtain transition. Use `TransitionLink` for internal links |
| `src/components/home-hero.*` | Home hero: UAE-map mask over the DIFC photo, scroll-driven zoom (CSS only, static fallback) |
| `src/components/who-we-are.tsx`, `src/components/why-mkm.*` | Home sections: Who We Are (navy, title left / text right), From Advice to Execution (4×2 ruled grid around the UAE-map video) |
| `src/components/section-heading.*` | Shared section title: eyebrow + h2 + optional intro (`center` option). Colours follow the section's text colour; title sizes live in `globals.css` (`h2`) |
| `src/components/faq.*`, `src/content/faq.ts` | Home FAQ: two columns of `<details name="faq">` (one open at a time), square chevron toggles |
| `src/components/global-reach.*` | Home "Global Partnerships" section (flyward-style): pinned photo, scrolling content, pinned cut-out of hill/fort/flag in front (`public/images/global-reach-bg.webp` / `-fg.webp`), demo partner logos in `public/logos/demo/` |
| `src/components/arrow-link.*` | CTA button (archidomo-style inset arrow square): `outline`, `solid`, and `light` for dark backgrounds |
| `src/components/loop-video.tsx` | Muted looping video: loads and plays only near the viewport, pauses off-screen, stays on the poster for reduced motion |
| `src/components/hero-map-overlay.*` | Parked hero overlay (office callouts, emirate borders, drafting grid). Not rendered; to restore, render `<HeroMapOverlay />` right after the media in `home-hero.tsx` |
| `src/content/uae-map.ts`, `public/brand/uae-silhouette.svg` | UAE emirate borders, office points and mask (Natural Earth, public domain) |
| `src/lib/enquiry-*.ts`, `src/lib/mailer.ts` | Form options (zod-free, safe for client code), validation, SMTP |
| `public/brand/` | Logo SVGs (navy/white), app icons, "K" watermark images |

## Environment variables

See `.env.example`. Server-only except `NEXT_PUBLIC_SITE_URL`.

| Key | Example |
| --- | --- |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | `smtp.office365.com` / `587` / `false` |
| `SMTP_USER` / `SMTP_PASS` | SMTP account credentials |
| `CONTACT_FROM` | `MKM Strategies Website <no-reply@mkmstrategies.ae>` |
| `CONTACT_TO` | `contact@mkmstrategies.ae` |

Test the endpoint:

```bash
curl -X POST http://localhost:3000/api/contact -H 'Content-Type: application/json' \
  -d '{"intent":"Sell a business","name":"Test User","email":"test@example.com","message":"Testing the contact form."}'
```

## Brand assets

- **Logo:** vector paths extracted from the brochure cover (the live site only has a raster WebP). Navy `#0B1B3D`.
- **Favicon / app icons / OG image:** taken from the current mkmstrategies.ae site.
- **Hero photo:** DIFC Gate image from the company profile (page 2), navy duotone baked into `public/images/hero-difc.webp`. Confirm the stock licence covers web use.
- **UAE-map video:** `public/videos/mkm-uae-flag.webm` (client-supplied, VP9 1920×1080, 15s, 5.5 MB) with its first frame as `public/images/mkm-uae-flag-poster.webp`. WebM only for now; add an MP4 `<source>` if iPhones need it.
- **UAE map:** Natural Earth 1:10m admin-1 (public domain), simplified. Small islands dropped; Abu Musa and the Tunbs are not drawn.
- **Colours:** sampled from the brochure — confirm with the designer.
- **Fonts:** three, self-hosted via `next/font` (`src/app/fonts.ts`):
  - **Butler Free** — headings (`font-display`, default on h1–h6). SemiBold 600 is the default; Bold 700 via `font-bold`. Files and licence in `src/fonts/butler/` (by Fabian De Smet, free for commercial use; redistributed unmodified under its EULA — official site: [www.fabiandesmet.com](https://www.fabiandesmet.com)).
  - **Hanken Grotesk** — body (`font-sans`, the page default).
  - **Inter** — labels, nav, buttons (`font-ui`; `eyebrow` for small uppercase labels).
