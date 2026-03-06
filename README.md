# Zara Phone Catalog

A phone catalog web app built as a technical challenge for Zara / Inditex.

**Live demo:** https://zara-phone-catalog.vercel.app/

---

## Features

- Browse a catalog of 20 phones
- Real-time search by name or brand (filtered via API)
- Phone detail page with color and storage selectors
- Price updates dynamically based on selected storage
- Persistent shopping cart (localStorage)
- Responsive layout

---

## Tech stack

- **React 19** with React Router for navigation
- **Vite** for dev and production builds
- **React Context API** for cart state management
- **Vitest + React Testing Library** for testing
- **ESLint + Prettier** for linting and formatting
- **Vercel** for deployment

---

## Project structure

```
src/
  api/          # fetch calls (API key handled here)
  context/      # CartContext with localStorage persistence
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
  hooks/        # Custom hooks (usePhones, usePhone, useDebounce)
  styles/       # Global CSS
  test/         # Test setup
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

## Git workflow

Each feature was developed on its own branch and merged into `main`:

| Branch | Description |
|---|---|
| `chore/scaffolding` | Project setup, folder structure, tooling |
| `feature/phone-list` | List view, search, Navbar |
| `feature/phone-detail` | Detail view, selectors, cart integration |
| `feature/deploy` | Vercel deployment config |
| `feature/testing` | Unit and integration tests |
| `feature/styling` | Final styles based on Figma designs |
| `feature/cart` | Cart view |
