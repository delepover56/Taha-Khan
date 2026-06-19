# MASTER SPEC: ReactBits Portfolio Redesign

I stopped implementation because I want a crystal-clear implementation spec first.

Do NOT implement anything yet.

Your task now is to produce a complete implementation blueprint based on this spec.

## Project

Local clone of my React + Vite portfolio.

### Current live reference

- https://taha-khan.vercel.app/

### ReactBits docs

- https://reactbits.dev/get-started/installation
- https://reactbits.dev/get-started/index

### Tech stack

- React 19
- Vite
- React Router
- Tailwind CSS v4
- motion already installed
- Swiper already installed
- EmailJS contact form already secured

## Main Goal

Completely redesign and revamp the portfolio using selected ReactBits components while keeping my current dark green cyber/glassmorphism identity.

Do not create a random new design.

Do not turn it into a colorful template.

Do not make it visually noisy.

---

# ABSOLUTE RULES

1. Do not implement anything until I approve the blueprint.

2. Do not change routes:

```txt
/
/resume
/projects
/contact
```

3. Do not remove existing content meaning.

You may improve:

- layout
- hierarchy
- wording placement
- presentation

But do not delete important information.

4. Keep the dark green cyber/glassmorphism palette.

Use existing colors as the base:

- black/dark green background
- neon green primary accent
- muted green text
- glass cards
- subtle borders
- soft green glow

5. Do not introduce:

- blue
- purple
- pink
- orange
- rainbow palettes
- generic SaaS color schemes

6. Preserve the secured Contact form logic exactly.

Do not rewrite or simplify:

- EmailJS config loading
- env/runtime config fallback
- honeypot
- minimum fill-time guard
- cooldown
- validation
- trim-before-send
- max lengths
- anti-injection checks
- unavailable fallback
- success/error handling

7. Visual wrappers around Contact are allowed.

Functional form logic changes are not allowed unless there is a bug, and even then ask first.

8. Keep Swiper for Projects.

Do not replace Swiper with:

- ChromaGrid
- Masonry
- another gallery system

during the first redesign.

9. GSAP is allowed only for MagicBento in the Skills section.

Do not use GSAP for:

- hero text
- route transitions
- project cards
- contact form
- resume animations

10. Use existing motion library for simple animation/reveals.

11. Do not add:

- OGL
- Three.js
- WebGL backgrounds
- shader backgrounds
- particle-heavy effects
- Lenis
- cursor followers
- SplashCursor
- Hyperspeed
- FaultyTerminal
- glitch-heavy effects
- full-page cinematic transitions

12. Accessibility must be preserved:

- keyboard navigation
- visible focus states
- semantic buttons and links
- readable contrast
- form labels/accessibility
- aria states where needed
- reduced motion support

13. Mobile must be first-class:

- no broken sticky sidebar
- no text clipping
- no horizontal overflow
- no hover-only interaction required
- cards stack cleanly
- forms remain easy to use

14. Performance:

- do not add unnecessary dependencies
- lazy-load heavy components where reasonable
- avoid animation overload
- keep build clean
- no massive background effects

---

# APP STRUCTURE REQUIREMENTS

Keep the app architecture understandable.

Suggested structure:

```txt
src/
├── components/
│   ├── layout/
│   ├── reactbits/
│   ├── skeletons/
│   └── ui/
├── pages/
├── data/
├── hooks/
└── context/
```

Do not over-engineer.

Do not add state managers.

Do not add unnecessary abstraction.

---

# REACTBITS COMPONENT SELECTION

Use or prepare these components only.

## Approved Tier A

- ProfileCard
- SpotlightCard
- MagicBento
- BlurText
- GradientText
- LogoLoop
- StarBorder

## Optional Tier B

- ShinyText
- AnimatedList
- CountUp

## Avoid

- Aurora
- SoftAurora
- Particles
- Threads
- Iridescence
- GridDistortion
- Silk
- Beams
- Hyperspeed
- SplashCursor
- FaultyTerminal
- LetterGlitch
- FlyingPosters
- ChromaGrid
- Masonry

ChromaGrid/Masonry may be discussed only as future alternatives.

Do not implement them now.

---

# PAGE-BY-PAGE DESIGN SPEC

## HOME PAGE (/)

### Purpose

Show:

- who I am
- what I build
- what tech I use
- where to go next

### Required sections

1. Hero
2. About / Focus
3. Skills
4. CTA (if useful)

### Hero

Use:

- BlurText
- GradientText
- StarBorder

Requirements:

- BlurText for headline
- GradientText for name or role
- One primary CTA only
- Reduced-motion users see static text

CTA options:

- View Projects
- Download Resume

### About / Focus Cards

Use SpotlightCard.

Cards should represent:

- React/Tailwind UI
- WordPress/Shopify experience
- Responsive design
- Performance & clean code

### Skills

Use MagicBento.

Only approved GSAP usage.

Groups:

- Frontend
- Styling/UI
- CMS/E-commerce
- Tools
- Currently Learning

Requirements:

- Mobile becomes stacked cards
- Reduced-motion fallback required

---

# SIDEBAR / MYINFO

### Purpose

Persistent identity and quick contact.

Use ProfileCard.

### Must keep

- Avatar
- Name
- Role
- Availability
- Short intro
- Location
- Email
- Phone
- Social links
- Download resume button

### Improve

- spacing
- hierarchy
- social buttons
- status badge
- contact rows

### Desktop

- Sidebar may remain left column
- Avoid excessive sticky behavior

### Mobile

- Compact top card
- No oversized sidebar

---

# PROJECTS PAGE (/projects)

### Purpose

Show real work clearly.

Keep Swiper.

### Add

- Better intro section
- Filters:
  - All
  - React
  - WordPress
  - Shopify
  - Frontend
- SpotlightCard wrappers
- Better metadata

Metadata:

- title
- short description
- tech stack chips
- live link
- GitHub link (if available)
- screenshot with alt text

### Animations

- subtle spotlight effect
- optional image hover zoom
- no hover-only requirements
- no autoplay if UX suffers

### Accessibility

- aria-pressed on filters
- descriptive links
- usable Swiper controls

---

# RESUME PAGE (/resume)

### Purpose

Show:

- experience
- education
- skills
- resume download

### Sections

1. Summary
2. Experience
3. Education
4. Skills/Tools
5. Certifications or Learning
6. Resume CTA

### Use

- AnimatedList or motion reveals
- LogoLoop
- CountUp (only if useful)
- StarBorder for resume CTA

### Do not use GSAP

### Timeline

- readable vertical timeline
- desktop may be two-column
- mobile must be one-column

### Certifications

If real certificates exist:

- show cards

Otherwise:

- create "Currently Learning"

Never invent fake certificates.

---

# CONTACT PAGE (/contact)

### Purpose

Make it easy to contact me.

Preserve form logic exactly.

### Allowed visual changes

- SpotlightCard wrappers
- GradientText heading
- StarBorder submit button (only if states remain correct)

### Do not

- change validation
- change EmailJS logic
- remove honeypot
- remove cooldown
- remove min-fill timing
- break React Hook Form
- wrap inputs in ways that break refs/events

### Layout

- contact intro
- availability
- quick links
- secure form

### Mobile

- fields stack properly
- errors remain visible
- submit remains accessible

---

# SKELETON LOADING SYSTEM

Replace full-screen preloader.

Use skeleton loading.

## Required components

- BaseSkeleton
- SkeletonText
- SkeletonAvatar
- SkeletonCard
- ProfileSkeleton
- HomeSkeleton
- ProjectsSkeleton
- ProjectCardSkeleton
- ResumeSkeleton
- ContactSkeleton
- FormSkeleton

### Behavior

- App shell loads immediately
- Sidebar/background remain visible
- Route fallback shows page-specific skeleton
- Match dark green glass theme
- Respect reduced motion
- No blocking preloader

Use Tailwind/CSS.

Do not use an external skeleton package.

---

# BACKGROUND

Keep current background.

Optional:

- subtle Noise effect

Do not add:

- particles
- WebGL
- OGL
- Three.js
- shader backgrounds
- cursor trails
- hyperspeed effects

---

# IMPLEMENTATION PHASES

## PHASE 1 — Foundation + Skeletons

- ReactBits wrapper structure
- Skeleton system
- Route-aware skeleton fallbacks
- Remove full-screen preloader
- No visual redesign yet

Run:

```bash
npm run lint
npm run build
```

Stop and report.

---

## PHASE 2 — Sidebar + Hero

- ProfileCard
- BlurText
- GradientText
- One StarBorder CTA

Run lint/build.

Stop and report.

---

## PHASE 3 — Home About + Skills

- SpotlightCard
- MagicBento
- Install GSAP only if required
- GSAP isolated to MagicBento
- Reduced-motion fallback

Run lint/build.

Stop and report.

---

## PHASE 4 — Projects

- Keep Swiper
- Add filters
- SpotlightCard wrappers
- Improve metadata
- Accessible links

Do not use:

- ChromaGrid
- Masonry

Run lint/build.

Stop and report.

---

## PHASE 5 — Resume

- Improve timeline
- Add LogoLoop
- Learning/certifications section
- motion only

Run lint/build.

Stop and report.

---

## PHASE 6 — Contact Visual Polish

- Visual improvements only
- Preserve form logic
- SpotlightCard wrappers
- Optional StarBorder submit

Run lint/build.

Stop and report.

---

## PHASE 7 — Final QA

Check:

- routes
- mobile responsiveness
- keyboard navigation
- reduced motion
- console errors
- contact form
- build

Provide final summary.

---

# REPORT FORMAT AFTER EACH PHASE

Report:

1. Phase completed
2. Files changed
3. Components added
4. Dependencies added
5. Visual changes
6. What was intentionally not changed
7. Contact form impact
8. Accessibility notes
9. Performance notes
10. npm run lint result
11. npm run build result
12. Risks / follow-up checks

---

# CURRENT TASK

Do not implement.

First produce a final implementation blueprint.

The blueprint must include:

- exact file structure to create/change
- exact ReactBits components to use
- exact phase order
- dependencies needed
- what will not be touched
- risks
- acceptance criteria

Wait for my approval before implementation.