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
│  │                    │  └────────────────────────────┘ │   │   │
│  │                    └─────────────────────────────────┘   │   │
│  │                                                           │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │              Zustand Global Store                  │   │   │
│  │  │                                                  │   │   │
│  │  │  ┌───────────┐  ┌───────────┐  ┌─────────────┐  │   │   │
│  │  │  │ widgets[] │  │ cart[]    │  │ filters     │  │   │   │
│  │  │  │ all catalog│  │ item ids  │  │ category   │  │   │   │
│  │  │  │ featured  │  │ totalPrice│  │ sort       │  │   │   │
│  │  │  │ reviews   │  │ count     │  │ search     │  │   │   │
│  │  │  └───────────┘  └───────────┘  └─────────────┘  │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite 5 (`@vitejs/plugin-react`) |
| Styling | TailwindCSS 3 + PostCSS + Autoprefixer |
| State | Zustand (global store) |
| Routing | React Router DOM v6 |
| Icons | Lucide React |
| Sass | For complex animations/keyframes |

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
```

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Hero, featured widgets, categories |
| `/catalog` | `src/pages/Catalog.tsx` | Full catalog with filters |
| `/widget/:id` | `src/pages/WidgetDetail.tsx` | Widget detail + reviews |
| `/cart` | `src/pages/Cart.tsx` | Installation cart |
| `/dashboard` | `src/pages/Dashboard.tsx` | Installed widgets |

## State Management

Zustand store at `src/store/widgets.ts` manages:

- **`widgets[]`** — All catalog widgets
- **`cart[]`** — Widget IDs in cart (persisted to localStorage)
- **`userWidgets[]`** — Installed widgets
- **`activeCategory`** — Current filter
- **`sortBy`** — Sort order (`featured | popular | newest | rating`)
- **`searchQuery`** — Search string

## Deployment

Supports multiple platforms out of the box:

| Platform | Config File |
|---|---|
| Vercel | `vercel.json` |
| Fly.io | `fly.toml` |
| Railway | `railway.json` |
| Render | `render.yaml` |

Each config assumes the build output is in `dist/` and serves the Vite single-page app.

## Scripts

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # TypeScript compile + Vite build → dist/
npm run preview      # Preview the production build
npm run lint         # TypeScript type-check
```

## License

MIT © M-Destiny
