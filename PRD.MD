# Product Requirements Document
## Programmer Portfolio Website

| | |
|---|---|
| **Version** | 2.0 (Expanded, implementation-ready) |
| **Document type** | PRD — written for both human stakeholders and an AI coding agent |
| **Status** | Ready for development |
| **Owner** | [Your Name] |

> **Note on this version:** This document expands the original one-page brief into a fully specified implementation reference. Nothing about the original direction has been changed — the one-page layout, the "clean but Persona-5-inspired" aesthetic, the no-CMS/local-JSON approach, and the 5-phase plan are all preserved. What's been added is the detail needed for an AI agent (or any developer) to build it correctly on the first pass: exact color/type tokens, a real data schema, component-level specs, and a definition of done for every phase.

---

## 0. Quick Brief (read this first)

- **What we're building:** a one-page (single-scroll) portfolio site for a Software Programmer, built to convert recruiters and hiring managers into CV downloads and GitHub/live-demo clicks.
- **Visual identity:** clean, whitespace-forward, professional — a *toned-down* homage to Persona 5's UI language: strict black/white base, exactly **one** bold accent color, bold display typography, and a single recurring angled-cut geometric motif used only on buttons, cards, and tags. It is not a dark gamer aesthetic, not futuristic/sci-fi, and not animation-heavy.
- **Stack:** Nuxt 3 (Vue 3) + Tailwind CSS. No backend, no CMS, no database, no auth. All content lives in local JSON files under `/data`.
- **Hosting:** static/serverless — Vercel is the default recommendation.
- **Hard constraints:** one accent hue only; no italic/skewed body paragraphs; the angled-cut motif never touches text, only containers; motion stays subtle and respects `prefers-reduced-motion`; mobile-first responsive; fast load and accessible by default.
- **Definition of done for the whole project:** all 6 sections built and populated with real content from `/data/*.json`, Lighthouse Performance/Accessibility/Best Practices/SEO all ≥ 90, deployed to a live production URL, CV downloads and all outbound links work.

---

## 1. Executive Summary

This project is a personal marketing tool, not a general website — its only job is to get a busy recruiter from "landed on the page" to "downloaded the CV / clicked a project link" in under a minute. Everything in this document is in service of that one job.

The site is a single scrolling page (no routing, no multi-page navigation) covering six sections — Navbar, Hero, About, Tech Stack, Portfolio, Contact/Footer — styled with a restrained, high-contrast visual language borrowed from Persona 5's UI (bold typography, one strong accent color, angled cut corners) but deliberately dialed back so it reads as *confident and professional* rather than *game-like*. Content (profile info, skills, and projects) is stored in flat JSON files with no backend, so the owner can update it by editing a file and redeploying — no CMS login, no database, no server to maintain.

---

## 2. Goals, Success Metrics & Non-Goals

### 2.1 Primary goals
1. Drive **CV/resume downloads**.
2. Drive **outbound clicks** to project GitHub repos and live demos.
3. Let a recruiter understand who this person is and what they do within the first 5–10 seconds on the Hero section, without scrolling.

### 2.2 Secondary goals
- Rank for the owner's own name in search engines (so a recruiter googling the candidate finds this page first).
- Look credible and technically competent to a peer engineer or engineering manager doing a technical screen of the candidate's portfolio.
- Be trivially easy for the owner to update when they ship a new project (edit JSON, redeploy — no rebuild of components).

### 2.3 Success metrics (KPIs)
| Metric | Target |
|---|---|
| CV download click-through | Track via analytics event; primary conversion metric |
| Outbound clicks (GitHub / Live Demo / LinkedIn) | Track per link |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | 100 |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Mobile usability | No horizontal scroll, no tap targets < 44px, at any breakpoint from 320px up |

### 2.4 Non-goals (explicitly out of scope for v1)
- No blog / articles section.
- No CMS or admin dashboard.
- No user authentication or backend API.
- No multi-page routing (everything is one page).
- No e-commerce or payment functionality.
- No dark/light theme *toggle* (the theme is fixed by design, see §6).
- No AI chatbot or "assistant" widget on the site — explicitly excluded per the "no futuristic/AI elements" constraint in the original brief.

These can be revisited in a v2 backlog but should not be built now — the point of a one-page recruiter-facing site is that it stays lean.

---

## 3. Target Audience & Personas

### Persona A — HR / Non-technical Recruiter
Scans quickly, often on mobile, often arriving from a LinkedIn link. Cares about: professionalism, clarity, "can I quickly tell what this person does and get their CV." Will bounce fast if the page feels cluttered, slow, or hard to parse. **Design implication:** the Hero and About sections must work perfectly with zero technical knowledge required, and the CV download must be reachable within one scroll.

### Persona B — Technical Interviewer / Engineering Manager
Arrives later in the funnel, spends more time, cares about code quality signals: live GitHub links, tech stack depth, whether the "problem → solution" framing on each project shows real engineering judgment rather than tutorial-following. **Design implication:** the Portfolio section needs substance (not just screenshots) and every project needs a working GitHub/demo link.

### Persona C — Freelance / Startup Client
Wants to know if this person can be trusted with real (possibly ambiguous) work. Cares about breadth of stack and ease of contact. **Design implication:** the Contact section needs a low-friction path (mailto / direct email, not just a "connect on LinkedIn" ask).

---

## 4. Information Architecture

### 4.1 Site map
Single page, six anchored sections, no sub-pages in v1:

```
/  (index)
 ├─ #hero
 ├─ #about
 ├─ #skills
 ├─ #portfolio
 └─ #contact
```

### 4.2 Navigation behavior
- Sticky navbar, visible at all scroll positions, subtle shadow/backdrop-blur appears once scrolled past the Hero.
- Scroll-spy: the nav link for the section currently in the viewport gets an active-state indicator (accent-colored angled underline, not a full color-fill — keep it quiet).
- Clicking a nav link smooth-scrolls to that section's anchor (respect `prefers-reduced-motion`: jump instantly instead of animating scroll if set).
- A persistent "Download CV" button lives in the navbar itself (not only in the Hero), since a recruiter may reach that decision at any scroll depth.
- Mobile: nav collapses into a hamburger menu; the CV button stays visible outside the collapsed menu (don't bury the primary CTA one tap deeper than necessary).

---

## 5. Section-by-Section Specification

Each section below lists: purpose, exact content fields (so the agent knows precisely what data to expect/render), layout behavior, and acceptance criteria.

### 5.1 Navbar
- **Content fields:** `profile.name` (or a short logo mark), nav links (`Home / About / Skills / Work / Contact`), CV download button.
- **Behavior:** sticky, scroll-spy active state, collapses to hamburger < 768px.
- **Acceptance criteria:** stays usable and legible over both the dark Hero and the light body sections (i.e., text/icon color must adapt, not just sit on one fixed background assumption).

### 5.2 Hero Section
- **Content fields:** eyebrow tag text (e.g. `AVAILABLE FOR HIRE` or current role tag), `profile.name`, `profile.role`, `profile.tagline` (one sentence), two CTAs (`Download CV` → `profile.cvFile`, `View Portfolio` → scrolls to `#portfolio`), social icon row (`profile.socials`).
- **Layout:** near-full viewport height, dark surface (see §6.1), content vertically centered-left, scroll-down affordance at the bottom.

```text
┌──────────────────────────────────────────────────────────┐
│  [Name/Logo]      Home  About  Skills  Work  Contact [CV]│  ← sticky navbar
├──────────────────────────────────────────────────────────┤
│                                                             │
│   ⟨ AVAILABLE FOR HIRE ⟩   ← small angled eyebrow tag       │
│                                                             │
│   FIRST LAST NAME.         ← large bold display type        │
│                                                             │
│   Full-Stack Developer building fast, reliable              │
│   web products end to end.                                  │
│                                                             │
│   [ Download CV ]   [ View Portfolio ]  ← angled buttons     │
│                                                             │
│   ⌗ GitHub   ⌗ LinkedIn   ⌗ Email                           │
│                                                             │
│                                                    ↓ scroll  │
└──────────────────────────────────────────────────────────┘
```

- **Acceptance criteria:** both CTAs are visible without scrolling on a 1366×768 desktop viewport and on a 375×667 mobile viewport; no layout shift while the display font loads; scroll-down affordance is subtle (no bounce-loop animation longer than a couple of cycles).

### 5.3 About Me
- **Content fields:** `profile.aboutParagraphs` (2–3 short paragraphs, not one long block), `profile.stats` (2–4 short stat/label pairs), optional `profile.photo`.
- **Layout:** two-column on desktop (photo/frame left or right, text right/left), single column stacked on mobile. Stats render as small bordered chips/cards under the paragraphs, not as a giant number-hero (that's reserved for nothing here — keep it modest and supporting, not the focal point).
- **Acceptance criteria:** no paragraph exceeds ~4 lines at desktop width; generous vertical whitespace between this section and its neighbors (see spacing scale, §6.3).

### 5.4 Tech Stack & Skills
- **Content fields:** `skills.categories[]`, each with `name` (e.g. "Languages", "Frameworks & Libraries", "Tools & DevOps", "Databases") and `items[]` (`name` + `icon` key).
- **Layout:** responsive icon+label grid, grouped by category with a small category label above each group. No progress bars or percentage claims ("87% proficient") — these read as noise and are hard to justify credibly; a clean tag/chip grid is both easier to scan and more honest.
- **Acceptance criteria:** grid never produces orphaned single items on their own row in an awkward way at common breakpoints; icons have visible labels (icon-only is not acceptable — not every recruiter recognizes every logo).

### 5.5 Portfolio Gallery (core section)
- **Content fields per project** — see the full schema in §7.4. Each card shows: `title`, `thumbnail`, `shortDescription` (problem → solution, 1–2 sentences), `techStack[]`, and conditionally-rendered `githubUrl` / `liveUrl` link buttons (only render a link button if that URL exists — don't show a dead/disabled button).
- **Layout:** responsive grid — 3 columns desktop (≥1280px), 2 columns tablet (≥768px), 1 column mobile. `featured: true` projects may span a larger card (2-column width) at desktop to visually prioritize the owner's best work.

```text
┌──────────────────────────────┐
│                                │  ← thumbnail, 16:9
│        [ screenshot ]         │
│                             ⟋ │  ← single diagonal corner cut
├──────────────────────────────┤
│ PROJECT TITLE                 │
│ Short problem → solution       │
│ description, max 2 lines.      │
│                                │
│ [Vue] [Node] [PostgreSQL]      │  ← tech tags, mono utility font
│                                │
│  ↗ GitHub        ↗ Live Demo   │
└──────────────────────────────┘
```

- **MVP vs. Phase 2:** in v1, the card itself is the full detail — clicking the card's links opens GitHub/the live demo directly in a new tab. A full case-study detail view (modal or dedicated route with "Role / Challenge / Result" breakdown) is a good Phase 2 enhancement but is **not required for launch** — flagged as an open decision in §11.
- **Acceptance criteria:** every card renders correctly with only the required fields present (i.e., a project with no `liveUrl` still looks complete, it just doesn't show that button); images lazy-load except any above-the-fold on initial view; broken/missing thumbnail falls back to a solid accent-colored placeholder with the project initials, never a broken-image icon.

### 5.6 Contact / Footer
- **Content fields:** short CTA heading (e.g. "Let's build something together"), `profile.email` (mailto button), `profile.socials.github`, `profile.socials.linkedin`, optional repeat CV download, copyright line, back-to-top control.
- **Acceptance criteria:** the email button works with a single click/tap (`mailto:` link) with no form to fill out required for the primary contact path — a contact form is optional and additive, never a replacement for the direct email link.

---

## 6. Design System

*The values below are recommended defaults chosen to remove ambiguity for implementation — swap the accent hue or fonts if you like, but keep the system internally consistent once you pick.*

### 6.1 Color palette

| Token | Hex | Usage |
|---|---|---|
| `Ink Black` | `#15151A` | Primary text on light sections |
| `Deep Ink` | `#0B0B0E` | Hero section's dark surface — a distinct "stage" from the rest of the page |
| `Paper White` | `#FAFAF8` | Primary background for About / Skills / Portfolio / Contact — slightly warm off-white so large fields don't feel sterile |
| `Signal Red` | `#E8384F` | The **one** bold accent — CTAs, active nav state, corner-cut accents, link hovers. Alternates per the original brief: `Circuit Blue #2F6FED` or `Warning Gold #FFC93C` — pick one, apply the same usage rules |
| `Slate` | `#6B6C72` | Secondary/muted text — dates, captions, supporting copy |
| `Hairline` | `#E5E4E0` | Borders, dividers, card outlines on light sections |

**Rule:** exactly one accent hue is active anywhere in the UI at once. Do not introduce a second "supporting" color (e.g. a soft green for "success") — use tint/shade of the same accent or plain ink/slate instead.

### 6.2 Typography

Three type roles, each with a specific job — not picked arbitrarily but tied to what the content actually needs:

| Role | Typeface | Weight(s) | Used for |
|---|---|---|---|
| Display | **Space Grotesk** | 600 / 700 | Name, section headings only. Its geometric character echoes the angled-cut motif in §6.4, so the type and the shapes feel like one coherent decision rather than two unrelated choices. |
| Body | **Inter** | 400 / 500 | Paragraphs, nav links, buttons. Calm and highly legible — it should disappear so the recruiter reads content, not typography. |
| Utility / Mono | **JetBrains Mono** | 500 | Tech-stack tag chips, project year/role metadata, the Hero's eyebrow tag. A small monospace touch that quietly signals "built by a programmer" without being a gimmick — used sparingly, never for body paragraphs. |

**Type scale** (16px root):

| Element | Size | Weight |
|---|---|---|
| H1 (Hero name) | 3rem–4rem (48–64px) | 700 |
| H2 (section titles) | 2.25rem (36px) | 700 |
| H3 (card/subhead) | 1.5rem (24px) | 600 |
| Body | 1rem (16px), line-height 1.6 | 400 |
| Small / labels | 0.875rem (14px), uppercase, letter-spacing 0.05em | 500 |

**Hard rule carried over from the original brief:** all body paragraph text stays upright and horizontal — no italics, no skew. Angled/diagonal treatment (§6.4) is reserved for containers and shapes, and must never be applied to the text itself.

### 6.3 Spacing & layout grid
4px base unit: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`. Section vertical padding should sit at the upper end of this scale (64–128px) — the brief's "generous whitespace so HRD doesn't feel intimidated" requirement is a direct functional spec, not just a nice-to-have. Content max-width: 1200–1280px, centered, with 24px (mobile) to 64px (desktop) side gutters.

### 6.4 The signature motif: angled corner cuts

This is the **one** deliberately bold, memorable element the design allows itself — everything else stays quiet so this reads as an intentional signature rather than visual noise. Applied consistently, via a shared recipe, to buttons, cards, and tags only:

```css
/* Primary button — true parallelogram, matches the brief's
   "angled edges or parallelogram" request directly */
.btn-primary {
  clip-path: polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
}

/* Project card / image frame — single cut corner, quieter than
   the button treatment so cards don't compete with CTAs */
.card-cut-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%);
}

/* Small tags / eyebrow labels — subtle cut on both short edges */
.tag-angled {
  clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
}
```

**Rules:** the cut size is a token (16px on buttons/tags, 24px on larger cards) — keep it consistent across the whole site rather than eyeballing it per component. Never mix multiple different cut angles in the same viewport. Because `clip-path` removes any `box-shadow` on the clipped area, fake elevation with a same-shaped pseudo-element behind the component, offset a few pixels, filled with the accent color — this also doubles as a nice optional flourish on hover. If using Tailwind, define this once as a reusable utility (`@layer components` or a small plugin) rather than repeating the arbitrary-value clip-path string on every element.

### 6.5 Components
- **Buttons:** primary = solid `Signal Red` fill, `Paper White` text, parallelogram cut, bold uppercase label, subtle lift + shadow on hover (150ms). Secondary = outline only (1.5px `Ink Black` or `Signal Red` border), same shape, transparent fill.
- **Cards:** `Paper White` surface, `Hairline` border or soft shadow, single cut corner per §6.4.
- **Tags/chips:** `Hairline` background, `Slate` text in the mono utility face, small angled cut.
- **Icons:** simple line icons, consistent stroke width, no filled/glyph-style mixing.

### 6.6 Motion & interaction guidelines
Allowed: fade + slight upward translate (16px → 0) on scroll-reveal, 300–400ms ease-out, children staggered 60–80ms; hover states with a max 1.02–1.05 scale and a 150ms transition. **Explicitly forbidden**, per the brief's "no dizzying animation" and "no futuristic/AI" constraints: parallax/scroll-jacking, auto-playing carousels, particle or animated circuit-board backgrounds, glow/neon/holographic effects, cursor-follow effects, and any page-transition wipe between sections (there are no page transitions — it's one page). All motion must respect `prefers-reduced-motion: reduce` by disabling non-essential animation.

### 6.7 Accessibility requirements
WCAG AA contrast minimum (4.5:1 body text, 3:1 large text — verify `Signal Red` on both `Paper White` and `Deep Ink` meets this before finalizing the accent). All interactive elements keyboard-reachable with a visible focus ring (accent-colored outline, not a removed default). Meaningful `alt` text on every project thumbnail; decorative shapes marked `aria-hidden`. Semantic landmarks (`nav`, `main`, `section`, `footer`) and a skip-to-content link.

### 6.8 Explicitly avoid (consolidated checklist)
- [ ] More than one accent hue anywhere in the UI
- [ ] Italic or skewed body paragraph text
- [ ] Angled/cut treatment applied to text itself rather than containers
- [ ] Parallax, scroll-jacking, or auto-playing carousels
- [ ] Neon/glow/holographic/circuit-board styling or robot/AI iconography
- [ ] More than 3 type families (2 + 1 utility mono, as specified)
- [ ] Cramped sections with insufficient whitespace
- [ ] Any CMS, database, backend API, or user auth

---

## 7. Technical Architecture

### 7.1 Recommended stack & rationale
- **Framework:** **Nuxt 3** (Vue 3, Vite-powered) in static-site-generation mode (`nuxi generate`). Recommended over plain Vue because pre-rendered HTML means recruiters' link previews and search crawlers see full content immediately — meaningful for a personal-brand site people will find by searching your name — and Nuxt's `useSeoMeta`/`useHead` composables make the Open Graph/meta requirements in §7.5 trivial. If SEO genuinely doesn't matter for your use case, plain Vue 3 + Vite is a lighter alternative — but Nuxt is the default.
- **Styling:** Tailwind CSS via `@nuxtjs/tailwindcss`, extended with the design tokens from §6 (colors, font families, spacing) in `tailwind.config.ts`. The clip-path motif is added as a small custom utility/plugin rather than repeated inline.
- **Icons:** `lucide-vue-next` for UI icons (social links, arrows), a tech-logo icon set (e.g. Simple Icons via `unplugin-icons`) for the Tech Stack section.
- **Fonts:** self-hosted or via `@nuxtjs/google-fonts`, `font-display: swap`, preload only the weights actually used (see §6.2 — that's 2/3 weights per family, not the full family).

### 7.2 Project folder structure

```
portfolio-website/
├── assets/
│   ├── css/
│   │   └── tokens.css          # CSS custom properties for §6 tokens
│   └── images/
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue
│   │   └── AppFooter.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── SkillsSection.vue
│   │   ├── PortfolioSection.vue
│   │   └── ContactSection.vue
│   └── ui/
│       ├── BaseButton.vue      # variant prop: primary | secondary
│       ├── SectionHeading.vue
│       ├── ProjectCard.vue
│       ├── SkillBadge.vue
│       └── ScrollToTopButton.vue
├── composables/
│   └── useScrollSpy.ts
├── data/
│   ├── profile.json
│   ├── projects.json
│   └── skills.json
├── public/
│   ├── cv/
│   │   └── firstname-lastname-cv.pdf
│   ├── images/projects/
│   └── favicon.ico
├── pages/
│   └── index.vue               # assembles all sections; only route in the app
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

### 7.3 Component inventory
| Component | Responsibility |
|---|---|
| `AppNavbar` | Sticky nav, scroll-spy active state, mobile hamburger, persistent CV button |
| `HeroSection` | Renders `profile.json` hero fields per §5.2 |
| `AboutSection` | Renders `profile.aboutParagraphs` + `profile.stats` |
| `SkillsSection` | Renders `skills.json` grouped grid |
| `PortfolioSection` | Maps `projects.json` → `ProjectCard` grid |
| `ProjectCard` | Single project card per §5.5 anatomy; conditionally renders link buttons |
| `ContactSection` / `AppFooter` | Renders contact CTA + social links |
| `BaseButton` | Shared button with `primary`/`secondary` variant, applies §6.4 clip-path |
| `SectionHeading` | Reusable heading with the accent underline/tag treatment |
| `ScrollToTopButton` | Appears after scrolling past the Hero |

### 7.4 Data schema
No CMS, no database — content lives entirely in these three JSON files, matching the original brief's requirement that the owner update content by editing a file and redeploying.

**`data/profile.json`**
```json
{
  "name": "Full Name",
  "role": "Full-Stack Software Engineer",
  "tagline": "Building fast, reliable web products end to end.",
  "location": "City, Country",
  "email": "you@example.com",
  "cvFile": "/cv/firstname-lastname-cv.pdf",
  "socials": {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  },
  "aboutParagraphs": [
    "Short paragraph one.",
    "Short paragraph two."
  ],
  "stats": [
    { "label": "Years of Experience", "value": "3+" },
    { "label": "Projects Shipped", "value": "12" },
    { "label": "Technologies", "value": "15+" }
  ]
}
```

**`data/projects.json`** — TypeScript shape for reference, full sample in Appendix A:
```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;        // path under /public/images/projects
  shortDescription: string; // 1-2 sentences, problem -> solution
  problem: string;          // longer version, for a future detail view
  solution: string;
  techStack: string[];
  githubUrl?: string;       // omit key entirely if none — don't use ""
  liveUrl?: string;
  featured: boolean;
  order: number;
  year: number;
  role: string;
}
```

**`data/skills.json`**
```json
{
  "categories": [
    {
      "name": "Languages",
      "items": [
        { "name": "JavaScript", "icon": "javascript" },
        { "name": "TypeScript", "icon": "typescript" }
      ]
    },
    {
      "name": "Frameworks & Libraries",
      "items": [
        { "name": "Vue.js", "icon": "vuedotjs" },
        { "name": "Nuxt", "icon": "nuxtdotjs" },
        { "name": "Tailwind CSS", "icon": "tailwindcss" }
      ]
    }
  ]
}
```

### 7.5 SEO requirements
- Per-page `useSeoMeta`: title pattern `"{Name} — {Role} Portfolio"`, description ~150–160 characters summarizing the value proposition.
- Open Graph image: 1200×630px static image (a simple designed card with name/role/accent motif works well); `og:type=website`; `twitter:card=summary_large_image`.
- `Person` JSON-LD structured data: `name`, `jobTitle`, `url`, `sameAs` (GitHub/LinkedIn URLs).
- `sitemap.xml` and `robots.txt` (simple even for a one-pager — still good practice).
- Canonical URL tag.

### 7.6 Performance budget
Lighthouse targets per §2.3. Images served as WebP/AVIF with responsive `srcset`; everything below the fold uses `loading="lazy"`, the Hero's own imagery (if any) loads eager/high-priority. Max 2 font families loaded (+1 mono), subset where possible. Tech-stack icons imported individually, not as a full icon-set bundle.

### 7.7 Deployment
Vercel is the default (auto-detects Nuxt, zero-config). Build command `nuxi generate` / `npm run generate`, output directory `.output/public`. Connect the GitHub repo for auto-deploy on push to `main`. HTTPS and preview deployments are automatic on Vercel; custom domain is optional and can be attached later without changing the build.

---

## 8. Content Inventory Checklist

*What the site owner needs to prepare before Phase 4 (Data Integration) can be completed — give this list to the human, not just the agent.*

- [ ] Professional headshot photo (min. 800×800px, good lighting) — optional but recommended for the About section
- [ ] Updated CV/résumé as a PDF, ATS-friendly formatting, under 2MB
- [ ] Full name and target role/title
- [ ] One-sentence value proposition for the Hero subheadline
- [ ] 2–3 short About Me paragraphs (skills focus, tech focus, working philosophy)
- [ ] 2–4 short stats for the About section (years of experience, projects shipped, etc.)
- [ ] Complete tech stack list, grouped by category (Languages / Frameworks / Tools / Databases)
- [ ] Minimum 4–6 portfolio projects, each with:
  - [ ] Title
  - [ ] Screenshot or mockup image (1600×900px recommended, 16:9)
  - [ ] 1–2 sentence problem → solution description
  - [ ] Tech stack used
  - [ ] GitHub repo link (public) and/or live demo URL
- [ ] Social links: GitHub, LinkedIn, email (and any others to include)
- [ ] Domain name decision, if a custom domain is wanted

---

## 9. Non-Functional Requirements
- **Browser support:** last 2 versions of Chrome, Firefox, Safari, Edge, plus mobile Safari and mobile Chrome. No IE11 support required.
- **Device support:** fully responsive from 320px width up; no horizontal scrolling at any breakpoint.
- **Performance/accessibility:** per §2.3 and §6.7.
- **Maintainability:** adding a new project must require editing only `projects.json` and adding one image — zero component code changes for routine content updates.

---

## 10. Development Roadmap

Each phase carries forward the original 5-phase plan, expanded with a concrete Definition of Done (DoD).

### Phase 1 — Design & Wireframing
Finalize the color/type tokens from §6, low-fidelity wireframes for all six sections at mobile + desktop breakpoints, and a small prototype validating the clip-path motif renders correctly across target browsers.
**DoD:** all sections wireframed at 2 breakpoints; design tokens documented in one place (`tokens.css` or `tailwind.config.ts`); clip-path prototype confirmed working in Chrome, Firefox, and Safari.

### Phase 2 — Project Setup
Initialize the Nuxt 3 project, install and configure Tailwind with the design tokens, set up the folder structure from §7.2, build `BaseButton` and `SectionHeading` in isolation.
**DoD:** `npm run dev` runs with no console errors; both button variants and the heading component render correctly on a temporary test page.

### Phase 3 — Core Page Assembly
Build `AppNavbar` (with scroll-spy), `HeroSection`, `AboutSection`, `SkillsSection` with placeholder content — structure and layout only, no real data yet.
**DoD:** one-page scroll works smoothly; nav correctly highlights the active section; layout holds at 375px, 768px, and 1440px viewports with no overlap or overflow.

### Phase 4 — Data Integration
Author real `profile.json`, `projects.json`, `skills.json` from the Content Inventory Checklist (§8); wire every section to its data source; place the real CV PDF; connect the CV download and all outbound links.
**DoD:** zero hardcoded project or skill data remains in any component — everything renders from `/data`; all external links open in a new tab with `rel="noopener"`; CV downloads correctly.

### Phase 5 — Polish, QA & Deployment
Cross-browser check, full mobile responsiveness pass, Lighthouse audit and fixes, accessibility pass (keyboard nav, alt text, contrast per §6.7), meta tags and OG image per §7.5, deploy to Vercel, connect a custom domain if applicable, final smoke test on the live URL.
**DoD:** Lighthouse scores meet the §2.3 targets; site is live at a production URL; every CTA and link works correctly in production, not just locally.

---

## 11. Assumptions, Open Questions & Risks

### Open questions (need an answer before or during Phase 1)
- Final accent color: red, blue, or gold? (Default assumption: `Signal Red #E8384F`.)
- Is a project detail view (modal or dedicated page) needed at launch, or is the card-only MVP sufficient? (Default assumption: card-only for v1, detail view is Phase 2 backlog.)
- Is a bilingual ID/EN toggle needed, or is a single language sufficient? (Default assumption: single language, matching whichever language the owner's CV is written in.)
- Is any analytics tool wanted (e.g. Plausible, GA4) to actually measure the KPIs in §2.3? (Default assumption: none in v1 — flag this explicitly, since without it the success metrics can't actually be measured.)
- Filterable portfolio categories (Web / Mobile / API, etc.) — nice-to-have, not required for the 4–6 project MVP scope.

### Risks & mitigations
| Risk | Mitigation |
|---|---|
| Over-designing undermines the "clean, non-intimidating" goal | Strict motion/color/geometry rules in §6, enforced via the checklist in §6.8 |
| Content bottleneck — owner doesn't have polished screenshots/copy ready | Content Inventory Checklist (§8) surfaced early, before Phase 4 starts |
| Being a JS-rendered SPA hurts SEO/link-preview quality | Mitigated by choosing Nuxt in SSG mode rather than a client-only SPA |
| Recruiter never sees analytics/conversion data | Flagged as an open question above — decide on an analytics tool during Phase 1 if KPI tracking matters |

---

## 12. Appendix

### A. Sample `projects.json`
```json
[
  {
    "id": "proj-001",
    "title": "TaskFlow — Team Task Manager",
    "slug": "taskflow",
    "thumbnail": "/images/projects/taskflow-cover.webp",
    "shortDescription": "A Kanban-style task manager built to replace a team's chaotic spreadsheet workflow with real-time, drag-and-drop boards.",
    "problem": "A 6-person team was tracking sprint work in a shared spreadsheet, causing merge conflicts and stale status updates.",
    "solution": "Built a real-time Kanban board with WebSocket sync, so status changes appear instantly for every team member.",
    "techStack": ["Vue.js", "Node.js", "PostgreSQL", "WebSocket"],
    "githubUrl": "https://github.com/username/taskflow",
    "liveUrl": "https://taskflow-demo.vercel.app",
    "featured": true,
    "order": 1,
    "year": 2025,
    "role": "Full-Stack Developer"
  },
  {
    "id": "proj-002",
    "title": "Receipt Scanner API",
    "slug": "receipt-scanner-api",
    "thumbnail": "/images/projects/receipt-scanner-cover.webp",
    "shortDescription": "An OCR-backed API that turns photographed receipts into structured expense data for a budgeting app.",
    "problem": "Manual receipt entry was the top user complaint in a personal-finance app's reviews.",
    "solution": "Built a REST API using OCR plus a rules-based parser to extract merchant, date, and line-item totals from receipt photos.",
    "techStack": ["Python", "FastAPI", "Tesseract OCR", "Docker"],
    "githubUrl": "https://github.com/username/receipt-scanner-api",
    "featured": false,
    "order": 2,
    "year": 2024,
    "role": "Backend Developer"
  }
]
```

### B. Glossary
- **SSG (Static Site Generation):** pages are pre-built into plain HTML at build time, rather than rendered per-request — faster load and better SEO for content that doesn't change per-visitor.
- **LCP / CLS:** Core Web Vitals measuring load speed (Largest Contentful Paint) and visual stability (Cumulative Layout Shift) — both are Google ranking/UX signals.
- **`clip-path`:** a CSS property that crops an element to a custom polygon shape, used here to create the angled-cut motif in §6.4.
- **Scroll-spy:** a nav pattern where the link corresponding to the section currently in view is automatically highlighted.
- **JSON-LD:** a structured-data format search engines use to understand page content (used here for the `Person` schema in §7.5).