# WidgeX — Widget Marketplace

> A modern React widget marketplace for discovering, previewing, and installing UI components.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        WidgeX Architecture                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     BROWSER / CLIENT                      │   │
│  │                                                           │   │
│  │  ┌─────────────┐   ┌─────────────────────────────────┐   │   │
│  │  │  Navbar     │   │        Router (React Router)    │   │   │
│  │  │  (layout)   │   │                                 │   │   │
│  │  └─────────────┘   │  ┌────────────────────────────┐ │   │   │
│  │                    │  │ / → HomePage               │ │   │   │
│  │  ┌─────────────┐   │  │ /catalog → CatalogPage     │ │   │   │
│  │  │  Cart Badge │   │  │ /widget/:id → DetailPage   │ │   │   │
│  │  │  (global)   │   │  │ /cart → CartPage           │ │   │   │
│  │  └─────────────┘   │  │ /dashboard → DashboardPage │ │   │   │
│  │                    │  │ /wishlist → WishlistPage   │ │   │   │
│  │                    │  └────────────────────────────┘ │   │   │
│  │                    └─────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              Zustand Global Store                 │   │   │
│  │  │                                                  │   │   │
│  │  │  ┌───────────┐  ┌───────────┐  ┌─────────────┐  │   │   │
│  │  │  │ widgets[] │  │ cart[]    │  │ filters     │  │   │   │
│  │  │  │ all catalog│  │ item ids  │  │ category   │  │   │   │
│  │  │  │ featured  │  │ totalPrice│  │ sort       │  │   │   │
│  │  │  │ reviews   │  │ count     │  │ search     │  │   │   │
│  │  │  └───────────┘  └───────────┘  └─────────────┘  │   │   │
│  │  │  ┌───────────┐  ┌───────────┐  ┌─────────────┐  │   │   │
│  │  │  │ installed │  │ wishlist  │  │ actions     │  │   │   │
│  │  │  │ widgets[] │  │ ids[]     │  │ persist ✓  │  │   │   │
│  │  │  └───────────┘  └───────────┘  └─────────────┘  │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐   │   │
│  │  │HomePage   │ │CatalogPage│ │DetailPage │ │CartPage   │   │   │
│  │  │           │ │           │ │           │ │           │   │   │
│  │  │┌─────────┐│ │┌─────────┐│ │┌─────────┐│ │┌─────────┐│   │   │
│  │  ││Hero     ││ ││Category ││ ││WidgetPre││ ││CartList ││   │   │
│  │  │└─────────┘│ ││Filter   ││ ││view     ││ ││         ││   │   │
│  │  │┌─────────┐│ ││┌───────┐│ ││┌───────┐│ ││└─────────┘│   │   │
│  │  ││Featured ││ │││Widget ││ │││Review ││ ││┌─────────┐│   │   │
│  │  ││Widgets  ││ │││Card   ││ │││Card   ││ │││Summary  ││   │   │
│  │  ││Grid     ││ │││Grid   ││ │││       ││ │││Panel    ││   │   │
│  │  │└─────────┘│ ││└───────┘│ ││└───────┘│ ││└─────────┘│   │   │
│  │  │┌─────────┐│ │└─────────┘│ │┌───────┐│ │└───────────┘   │   │
│  │  ││Category ││ │            │ ││Widget ││ │                │   │
│  │  ││Bands    ││ │            │ ││Config ││ │                │   │
│  │  │└─────────┘│ │            │ ││Panel  ││ │                │   │
│  │  └───────────┘ │            │ │└───────┘│ │                │   │
│  │                │            │ └─────────┘ │                │   │
│  │                │            └─────────────┘                │   │
│  │                └─────────────────────────────────           │   │
│  │                               ┌───────────┐                │   │
│  │                               │WishlistPg │                │   │
│  │                               │           │                │   │
│  │                               │┌─────────┐│                │   │
│  │                               ││Wishlist ││                │   │
│  │                               ││Grid     ││                │   │
│  │                               │└─────────┘│                │   │
│  │                               └───────────┘                │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 (`@vitejs/plugin-react`) |
| Styling | TailwindCSS 3 + PostCSS + Autoprefixer |
| State | Zustand (global store with localStorage persistence) |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Sass | For complex animations/keyframes |

## Features

- **Widget Catalog** — Filterable, searchable grid with category pills
- **Widget Detail** — Live preview, reviews, add to cart / wishlist
- **Cart & Checkout** — Multi-step Stripe-style checkout flow
- **Wishlist** — Save widgets for later with persistent storage
- **Dashboard** — Manage installed widgets
- **Dark mode by default** — Industrial-minimal design with warm accent pops
- **localStorage persistence** — Cart, wishlist, and installed widgets survive refresh
- **Responsive** — Mobile-first, works on all screen sizes
- **Accessible** — Semantic HTML, focus states, prefers-reduced-motion support

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Hero, featured widgets, categories |
| `/catalog` | `src/pages/Catalog.tsx` | Full catalog with filters |
| `/widget/:id` | `src/pages/WidgetDetail.tsx` | Widget detail + reviews + wishlist |
| `/cart` | `src/pages/Cart.tsx` | Installation cart with Stripe-style checkout |
| `/dashboard` | `src/pages/Dashboard.tsx` | Installed widgets |
| `/wishlist` | `src/pages/Wishlist.tsx` | Saved widgets |

## State Management

Zustand store at `src/store/widgets.ts` manages:

- **`widgets[]`** — All catalog widgets (mock data)
- **`cart[]`** — Widgets in cart (persisted to localStorage)
- **`installed[]`** — Installed widgets with config (persisted)
- **`wishlist[]`** — Wishlist widget IDs (persisted)
- **`activeCategory`** — Current category filter
- **`search`** — Search query string

All user data (cart, installed, wishlist) automatically persists to localStorage via Zustand's `persist` middleware.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/M-Destiny/widgex.git
cd widgex

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check (lint)
npm run lint
```

## Deployment

Supports multiple platforms out of the box:

| Platform | Config File |
|---|---|
| Vercel | `vercel.json` |
| Fly.io | `fly.toml` |
| Railway | `railway.json` |
| Render | `render.yaml` |

All deployments use a multi-stage Docker build (`Dockerfile`) serving the production build via nginx with SPA fallback, static asset caching, and security headers.

## Scripts

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript compile + Vite build → dist/
npm run preview      # Preview the production build
npm run lint         # TypeScript type-check
```

## Design System

### Color Palette
- **Background**: `#0f1117` (deep ink)
- **Surface**: `#1a1d27` (cards/panels)
- **Surface-2**: `#242836` (inputs, secondary)
- **Border**: `#2e3347`
- **Text**: `#e8eaf0`
- **Text-muted**: `#8b90a5`
- **Accent**: `#6366f1` (indigo — primary CTA)
- **Accent-warm**: `#f59e0b` (amber — ratings, featured)
- **Success**: `#10b981`
- **Danger**: `#ef4444`

### Typography
- **Headings/Body**: Inter (400–700)
- **Code**: JetBrains Mono
- **Scale**: 12 / 14 / 16 / 20 / 24 / 32 / 48px

### Motion
- Micro-interactions: 150ms ease-out
- Page transitions: 200ms fade
- Modals/drawers: 250ms slide + fade
- Respects `prefers-reduced-motion`

## License

MIT © M-Destiny