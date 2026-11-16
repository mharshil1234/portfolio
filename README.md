# Portfolio

My personal portfolio website, built around a ninja theme with scroll-driven animations.

## Features

- **Sword-strike intro:** on the first visit, a ninja strikes a blazing sword into the ground, then stays in the hero. Click or press any key to skip. It plays once per session.
- **Smooth scrolling:** text reveals, parallax and section animations are tied to scroll.
- **About:** ink-framed photo with a stamped seal.
- **Skills:** a wooden training board where shurikens pin each skill tag as you scroll, plus a hanging scroll for each category.
- **Clubs:** banners that unfurl and sway.
- **Projects:** a pinned horizontal scroll of paper scrolls that unroll, marked Complete or Classified.
- **Contact:** a letter-style form that rolls up and gets a SENT seal once the message is sent. Emails go out through Resend.
- **Easter egg:** double-click anywhere to throw a shuriken.
- Responsive on phones, tablets and desktop, and respects reduced-motion settings.

## Tech Stack

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger
- Lenis
- Framer Motion
- Resend
- Vercel

## Running Locally

```bash
git clone https://github.com/mharshil1234/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open http://localhost:3000.

### Environment variables

The contact form needs a Resend API key. Create a `.env.local` file:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=where_messages_should_go@example.com
```

`CONTACT_EMAIL` is optional and falls back to my own address.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/            layout, page and global styles
  components/
    layout/       navbar and footer
    sections/     hero, about, skills, clubs, projects, contact
    ninja/        intro animation and the ninja SVG
    ui/           shared pieces: reveal text, seals, shurikens, toast
    providers/    smooth scrolling setup
  data/content.ts all the text, links, skills, projects and clubs
  lib/            GSAP setup, intro state and the send-email action
```

To change any text, links or projects, edit `src/data/content.ts`.
