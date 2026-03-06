# Zara Phone Catalog

A phone catalog web app built as a technical challenge for Zara / Inditex.

**Live demo:** https://zara-phone-catalog.vercel.app/

---

## Features

- Browse a catalog of 20 phones
- Real-time search by name or brand (filtered via API, debounced 300ms)
- Phone detail page with color and storage selectors
- Price updates dynamically based on selected storage
- Persistent shopping cart (localStorage)
- Fully responsive — desktop, tablet (834px), and mobile (393px)

---

## Tech stack

- **React 19** + React Router v7 — SPA with client-side routing
- **Vite 7** — dev server and production builds
- **React Context API + useReducer** — cart state management
- **Plain CSS** with custom properties (CSS variables) — no CSS-in-JS or preprocessors
- **Vitest + React Testing Library** — unit and integration tests
- **ESLint + Prettier** — linting and formatting
- **Vercel** — deployment with tests enforced before every build

---

## Project structure

```
src/
  api/          # API calls — base URL, API key, getPhones(), getPhone()
  context/      # CartContext — useReducer + localStorage persistence
  components/   # Reusable UI components
    Navbar/
    PhoneCard/
    SearchBar/
    ColorSelector/
    StorageSelector/
    SpecsTable/
    CartItem/
  pages/        # Route-level views
    PhoneList/
    PhoneDetail/
    Cart/
  hooks/        # usePhones, usePhone, useDebounce
  styles/       # Global CSS and design tokens
  test/         # Vitest setup
```

---

## Architecture

The app is a **single-page application** with three routes:

| Route | View |
|---|---|
| `/` | Phone list with search |
| `/phone/:id` | Phone detail with selectors |
| `/cart` | Shopping cart |

**State management** uses React Context API with `useReducer` for the cart. There is no global state for the phone data — each view fetches its own data via custom hooks (`usePhones`, `usePhone`), keeping data fetching co-located with the component that needs it.

**Search** is debounced (300ms via `useDebounce`) and delegates filtering to the API via a `?search=` query parameter, rather than filtering client-side.

**Cart persistence** is handled by syncing the cart state to `localStorage` on every change via a `useEffect`, and rehydrating from `localStorage` as the `useReducer` initial state.

---

## Testing

37 unit and integration tests cover all components, hooks, and the cart context. Tests are written with **Vitest** and **React Testing Library**, following a red-green cycle — the failing test is written first, then the implementation.

Key areas covered:

- Cart operations: add, remove, deduplication, localStorage persistence
- Component rendering and user interactions (search, color/storage selection)
- Navigation bug: selecting a color then navigating to a similar product correctly resets state

E2E tests (Playwright/Cypress) were considered but not added — the unit and integration coverage is sufficient for this scope, and tests run automatically before every production deploy.

```bash
npm test          # watch mode
npm run test:run  # single run (used in CI/deploy)
```

---

## Running locally

**Requirements:** Node >= 18

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Production build
npm run build
```

---

## Deployment

Deployed on **Vercel**. The `vercel.json` config does two things:

1. Runs tests before every build — a failing test blocks the deploy
2. Rewrites all routes to `/index.html` so React Router handles navigation client-side

```json
{
  "buildCommand": "npm run test:run && npm run build",
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## Git workflow

Each feature was developed on its own branch and merged into `main`:

| Branch | Description |
|---|---|
| `chore/scaffolding` | Project setup, folder structure, tooling |
| `feature/phone-list` | List view, search, Navbar |
| `feature/phone-detail` | Detail view, selectors, cart integration |
| `feature/deploy` | Vercel deployment config |
| `feature/testing` | Unit and integration tests |
| `feature/cart` | Cart view |
| `feature/styling` | Figma-based styles for all views |
| `feature/responsive` | Mobile and tablet responsive breakpoints |
