@AGENTS.md

# MKM Strategies website

- Static marketing site. Every page must prerender; the only server code is `POST /api/contact` (SMTP via nodemailer).
- Content source of truth: the 2026 company profile (brochure), captured in `src/content/company.ts`. The old WordPress site has older figures — don't copy from it.
- IA/routes: `src/config/navigation.ts` (from the navigation wireframes). Company facts: `src/config/site.ts`.
- Page side spacing: wrap page content in the `page-x` utility (`--page-margin` in globals.css from 1024px up, plus 24px padding). No max-width containers.
- Brand tokens: `src/app/globals.css` (`@theme`). Logo: `<Logo />` in `src/components/brand/`.
- Fonts (`src/app/fonts.ts`): exactly three — Butler (headings, 600 default / 700), Hanken Grotesk (body), Inter (labels/UI). Don't add others.
- No code comments. Keep code lean; put context in README.
- CSS Modules do not work (the Tailwind Turbopack rule in next.config.ts treats all .css as global). Use Tailwind classes, or a global .css file with component-prefixed class names.
- Client components must not import zod — form options live in `src/lib/enquiry-options.ts`.
- Cache Components is on: no `new Date()` / `Math.random()` in prerendered code — wrap in a `"use cache"` function.
