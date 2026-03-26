# CLAUDE.md

## Commands

- `npm start` — dev server
- `npm run build` — production build
- `npm test` — run tests
- `npm run deploy` — build + deploy to GitHub Pages

## Key Info

- React 18 CRA app, no TypeScript
- Course data lives in `src/data.json`, scraped from OMSCentral via `src/scraper.js`
- Each specialization has its own `*Planner.js` component with course arrays
- State persisted to localStorage via helpers in `src/utils.js`
- ESLint config is `react-app` + `react-app/jest` (in package.json)
- No CI — deployment is manual via `npm run deploy` (gh-pages)
- Sentry error tracking configured in `src/index.js`

## Gotchas

- `data.json` is ~170KB/3800 lines — don't read the whole thing unnecessarily
- Course data is nested under `pageProps.courses[]`

## Design Direction

- Modern, clean tool aesthetic (Linear/Notion vibes)
- Audience: busy OMSCS grad students who want to plan fast
- Desktop-primary, responsive on tablet/mobile
- System font stack, no custom fonts
- Suggest a cohesive color palette — propose it before implementing
- Prefer subtle shadows, rounded corners, good whitespace

## UX Priorities

- Course picker is the core interaction — info sections above it should be collapsed by default
- Degree requirements should be accessible but not dominate the page
- Selection state must be visually obvious
- Progress toward degree completion should be visible without scrolling to the bottom
- Tables should be scannable — don't show every column by default