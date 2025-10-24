# Plan-Like-A-BOSS

A focused, production-ready course planner tailored for SMU students. Build and visualize weekly schedules, detect time conflicts, share or export calendars, and import preloaded course data.

Highlights

- Preloaded SCIS course data with section timings
- Visual weekly calendar with conflict detection
- Multiple schedule drafts, shareable links, PNG/.ics export
- Command palette (Cmd/Ctrl+K) and theme toggle

Quick start

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

3. Build for production

   npm run build

Tech stack

- React + Vite
- TypeScript
- Tailwind CSS
- Zustand (state), Framer Motion (animations), date-fns, xlsx

Project layout (key folders)

- `src/` — app source (components, store, utils, data)
- `scripts/` — Excel parsers (generate `src/data/scis-courses.ts`)
- `public/`, `index.html`, `package.json`, `vite.config.ts`

Updating course data

Run:

   node scripts/parseAllExcel.js

This regenerates `src/data/scis-courses.ts` from the included Excel files.

Contributing & support

- Open an issue or PR on GitHub. Small, focused contributions welcome.

License

- MIT

Made for SMU — plan your semester like a BOSS.
