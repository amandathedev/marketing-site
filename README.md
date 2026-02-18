# Cattlytx Marketing Site

Marketing site for **Cattlytx**, built with Vite + React + TypeScript and a dark, token-based theme.

## Development

```bash
npm install
npm run dev
```

Open the URL printed in your terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Prerendering (static HTML)

This project uses `@prerenderer/rollup-plugin` during build to prerender routes.

You can disable prerendering for environments where headless Chromium is unavailable.

- **Disable prerender**:

```bash
DISABLE_PRERENDER=true npm run build
```

- **Vercel**: prerender is automatically disabled when `VERCEL=1`.

## Editing site content

Most page copy and section layout lives in:

- `src/App.tsx`

Theme tokens live in:

- `src/index.css`

## Screenshots / marketing assets

Assets are served from `public/` and referenced by absolute paths (e.g. `/screenshots/...`).

- **Dashboard screenshot**
  - Desktop/tablet: `public/screenshots/dashboard.webp`
  - Mobile: `public/screenshots/mobile_dashboard.png`

- **Pens screenshot**
  - Desktop/tablet: `public/screenshots/pens_screenshot.webp`
  - Mobile: `public/screenshots/pens_mobile.png`

## Team headshots + LinkedIn links

Team tiles link to LinkedIn and optionally render headshots when configured in `src/App.tsx`.

Headshots currently live at:

- `public/team/andrew_headshot.webp`
- `public/team/jeff_headshot.webp`
- `public/team/garrett_headshot.webp`
- `public/team/amanda_headshot.webp`

## Project scripts

- `npm run dev`: start dev server
- `npm run build`: typecheck + production build
- `npm run preview`: preview production build locally

## Tech

- Vite + React + TypeScript
- Tailwind CSS (via `@import 'tailwindcss'` in `src/index.css`)
