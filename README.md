# Mística Web Studio

A one-page corporate marketing website for **Mística Web Studio**, a web design and development studio based in Mexico City. The site presents the studio's brand and services, and captures leads through a fully functional contact form.

Built with React, Vite, and Tailwind CSS, it pairs a cinematic, animation-rich experience with a strong focus on accessibility and performance.

## Features

- **Animated intro curtain** — full-screen brand reveal on load that respects `prefers-reduced-motion`.
- **Cinematic video hero** — full-viewport background video with a static poster fallback.
- **Brand showcase** — "Quiénes somos" section with a GSAP parallax of the studio's "M" mark (desktop only).
- **Services grid** — five service cards with a scroll-triggered clip-path curtain effect.
- **Working contact form** — client-side validation, hCaptcha, honeypot anti-bot protection, and delivery through the Web3Forms API.
- **Bilingual (EN/ES)** — language switcher that persists the preference in `localStorage` and syncs SEO meta tags.
- **Smooth motion** — Framer Motion for UI transitions and GSAP + ScrollTrigger for scroll-driven animations.
- **Accessible by default** — skip-to-content link, `inert` during the intro, WCAG AA color palette, animated components disabled under reduced motion.
- **SEO ready** — Open Graph, Twitter cards, JSON-LD structured data, and multilingual meta tags.

## Tech stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev) 19 | UI framework |
| [Vite](https://vite.dev) 8 | Build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com) v4 | Utility-first styling (`@tailwindcss/vite`) |
| [Framer Motion](https://www.framer.com/motion/) | Component-level animations and transitions |
| [GSAP](https://gsap.com) + ScrollTrigger | Scroll-driven effects: parallax, reveals, logo drawing |
| [hCaptcha](https://www.hcaptcha.com) | Contact form bot protection |
| [Web3Forms](https://web3forms.com) | Contact form backend (serverless) |

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org) and npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the source with ESLint |

## Project structure

```
src/
├── assets/          # Images, video, and video poster
├── components/
│   ├── common/      # Sparkle, FadeUp, LanguageSwitch, DrawnMMark
│   ├── icons/       # SVG service icons
│   ├── layout/      # IntroCurtain, Header, Footer
│   └── sections/    # Hero, About, Services, ServiceCard, Contact
├── constants/       # Navigation, colors, and shared constants
├── context/         # Language context
├── hooks/           # Reduced motion, body scroll lock, reveal hooks
├── i18n/            # EN/ES translation dictionaries
├── lib/             # GSAP setup, parallax, and reveal utilities
├── App.jsx
├── index.css        # Tailwind entry + global styles
└── main.jsx
```

The site is a single page navigated through anchor links:

- `#inicio` — Hero
- `#quienes-somos` — About
- `#servicios` — Services
- `#contacto` — Contact

## Configuration

- The default language is **English**; Spanish is available through the header switcher. The preference persists under `mws-lang` in `localStorage`.
- The Web3Forms access key and hCaptcha site key live in `src/components/sections/Contact.jsx`. Replace them with production credentials as needed.
- Static assets (favicons, Open Graph image, `robots.txt`, `sitemap.xml`) are served from `public/`.