# Piyush Panbude — Portfolio
`npm install` then `npm run dev`. Build: `npm run build`. Deploy on Vercel (Vite preset).

## Structure
- `src/data/` — `projects.ts` (the five projects) and `profile.ts` (stats, technologies, experience, education, languages, contact, profile links)
- `src/components/` — Nav, Hero, ProjectStage, Frame, CaseStudy, Words, VisitButton, Social, Footer
- `src/sections/` — Work, About, Technologies, Contact
- `src/lib/scroll.ts` + `src/hooks/useScrollEngine.ts` — smoothed scroll progress (`--p`) for every `[data-sp]` element
- `src/styles/` — one CSS file per concern (tokens, base, glass, nav, hero, work, about, contact, case, motion, responsive)

## Effects
- Hero lines slide up from a mask; the hero shrinks and fades as you leave it
- Pinned project stages with eased, inertia-smoothed scroll progress (`src/lib/scroll.ts`)
- Device tilt and a soft sheen on project previews (mouse/trackpad), magnetic primary buttons, click a preview to open its case study
- Glass project switcher (01–05) that appears while you are inside Selected Work
- Eased anchor scrolling (`useAnchorScroll`), top progress line, count-up stats, scroll-linked "Currently exploring" row
- Theme switch expands as a circle from the toggle (View Transitions API, with a colour-fade fallback)
- Case studies have previous/next navigation (also the arrow keys); contact has copy-email and Mumbai local time
- All of it respects `prefers-reduced-motion`

## Notes
- One typeface everywhere: change `--font` in `src/styles/tokens.css`.
- **Profile links:** `social.github` and `social.linkedin` are set in `src/data/profile.ts` (github.com/naadme, linkedin.com/in/piyush-panbude). An icon shows only when its URL is set.
- **Images:** previews load from https://piyush-panbude.vercel.app/projects/. Keep that site live, or copy the files into `public/projects/` and update `src/data/projects.ts`.
- Reduced-motion users get the final state with no pinning.
