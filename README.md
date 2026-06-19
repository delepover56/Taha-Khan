# Taha Khan Portfolio

A modern developer portfolio built with React, Vite, Tailwind CSS, Motion, Swiper, EmailJS, and custom ReactBits-inspired UI components.

The site keeps a dark green cyber-glassmorphism identity and presents profile information, featured work, resume details, and a secured contact form across a responsive two-column layout.

## Live Site

Production: [https://taha-khan.vercel.app/](https://taha-khan.vercel.app/)

## Features

- Responsive portfolio layout with preserved desktop sidebar identity
- About/Home page with flagship hero, focus cards, SpotlightCard surfaces, and MagicBento-style skills
- Projects page with Swiper carousel, filters, project metadata, lazy-loaded screenshots, and accessible CTAs
- Resume page with experience, education, skills, current learning, and resume download CTA
- Contact page with EmailJS integration and visual-only polished form presentation
- Real app preloader that waits for route, font, image, and icon readiness without fake timeouts
- Static display content extracted into `src/data`
- Reduced-motion-aware animations and accessible focus states

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- Motion
- React Router
- Swiper
- React Hook Form
- EmailJS
- MUI Icons
- Custom ReactBits-style components

## Project Structure

```txt
src/
  animations/          Motion presets shared across pages
  assets/              Local icons and visual assets
  components/          Layout, cards, carousel, preloader, and UI components
  components/reactbits Local ReactBits-style components and wrappers
  context/             App loading/data context
  data/                Static portfolio content
  pages/               Route pages: About, Resume, Projects, Contact
```

## Routes

```txt
/          About / Home
/resume    Resume
/projects  Projects
/contact   Contact
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your EmailJS values:

```bash
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

The contact page also supports runtime config fallback through `/emailjs-config.json` when configured for deployment.

### Development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Contact Form Security

The contact form includes safeguards around the EmailJS submission flow:

- React Hook Form validation
- Required field checks
- Email validation
- Honeypot field
- Minimum fill-time guard
- Cooldown protection
- Trim-before-send behavior
- Max length limits
- Basic injection-pattern blocking
- Unavailable fallback state
- Success and error messaging

## Content Editing

Most static display content lives in `src/data`:

- `aboutData.json`
- `resumeData.json`
- `projectsData.json`
- `contactData.json`
- `sideInfoBox.json`

Keep these files as plain JSON only. JSX, functions, icons, handlers, and validation logic should stay in React components.

## Deployment

This project is configured for Vercel deployment. Build output is generated with:

```bash
npm run build
```

## License

This portfolio is a personal project for M. Taha Khan.
