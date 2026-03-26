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
