# PORTFOLIO – PROJECT CONTEXT & DESIGN SYSTEM

## PROJECT OVERVIEW

This project is a **personal developer portfolio** built with modern React and Vite. It showcases my skills, experience, and projects through a visually immersive, dark-neon interface with smooth interactions and responsive layouts.

The portfolio is designed as a **Single Page Application** with routed sections such as About, Projects, Resume, and Contact. The focus is on clean UI, strong visual identity, and modern front-end best practices rather than backend complexity.

This is my **first major React.js project**, marking my transition from static HTML/CSS and WordPress into component-driven, modern JavaScript development.

---

## DESIGN LANGUAGE & VISUAL IDENTITY

### Core Aesthetic
- Dark mode only
- Neon green cyber-inspired theme
- Glassmorphism cards with blur and transparency
- Rounded corners and soft glow shadows
- Subtle hover animations and micro-interactions

### Colors
- Primary Neon Green: `#00ff5e`
- Deep Background Green: `#053a00`
- Card Background: `#0f0f0f85` to `#0f0f0fb7`
- Borders: `rgba(0, 255, 94, 0.4–0.6)`
- Shadows: neon green glow variants

### Typography
Custom fonts loaded via `@font-face`:
- Poppins (full weight range)
- Roboto & Roboto Slab
- Lilita One
- Merienda

Typography usage:
- Headings: Merienda, Roboto Slab
- Body text: Poppins
- Emphasis through weight and color, not clutter

---

## TECH STACK

### Core
- **React 19**
- **Vite**
- **React Router v7**
- **Tailwind CSS v4**

### UI & Animation
- **Swiper.js** (project carousel)
- **Motion** (animations)
- Custom hover & transition effects via Tailwind + CSS

### Forms & Utilities
- **React Hook Form**
- **EmailJS** (contact form email handling)

### Tooling
- ESLint
- TypeScript (dependency-ready)
- Babel React Compiler

---

## APPLICATION ARCHITECTURE

- Single Page Application (SPA)
- Route-based rendering using `<Outlet />`
- Layout-driven structure:
  - Global animated background
  - Header and Mobile Header
  - Personal info sidebar
  - Routed content area
  - Footer
- Component-first architecture
- Alias-based imports (`@/components/...`)

---

## MAIN SECTIONS

### About
- Personal introduction
- Skill focus and learning journey
- Service-style cards:
  - Web Development
  - Discord Bot Development
  - Image Editing
  - Gaming (personal interest)

### Projects
- Portfolio overview
- Swiper-based project slider
- Visual-first project presentation

### Resume
- Education timeline
- Experience cards
- Skill progress indicators
- Knowledge tags:
  - HTML, CSS, JavaScript
  - React.js, Tailwind CSS
  - Discord.js, WordPress, PHP

### Contact
- Hire-focused messaging
- Fully validated contact form
- Email delivery via EmailJS
- Real-time success and error feedback

---

## STYLING RULES

- Tailwind CSS for **all layout and styling**
- No inline styles
- No external CSS frameworks
- Custom CSS limited to:
  - Fonts
  - Scrollbars
  - Special hover effects
  - Non-standard shapes and animations

---

## COMPONENT GUIDELINES

- Functional React components only
- Clean, readable JSX
- Reusable UI components
- Mobile-first responsive design
- Minimal comments, only where logic needs clarity

---

## PROJECT GOALS

- Demonstrate modern React fundamentals
- Showcase strong UI/UX sensibility
- Build confidence with component-based architecture
- Serve as a foundation for future Next.js migration
- Present skills professionally to recruiters and clients

---

## FUTURE IMPROVEMENTS

- Dynamic project data source
- Optional dark/light theme toggle
- Accessibility improvements
- Performance optimizations
- Planned migration path to Next.js
