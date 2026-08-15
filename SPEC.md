# WidgeX — Widget Marketplace Specification

## 1. Concept & Vision

WidgeX is a modern React-based widget marketplace where developers discover, preview, and install UI widgets for their applications. The platform feels like a curated design studio — clean, fast, and developer-friendly. Every interaction is deliberate: browsing feels like exploring a gallery, installing feels like adding to a collection, and the dashboard feels like a personal workshop.

**Personality**: Confident, minimal, polished. Not a cluttered app store — a focused widget gallery.

---

## 2. Design Language

### Aesthetic Direction
Industrial-minimal with warm accent pops. Think Stripe's developer docs meets Dribbble's curation sensibility. Dark mode by default with crisp typography and generous whitespace.

### Color Palette
```
--color-bg:          #0f1117   (deep ink — primary background)
--color-surface:     #1a1d27   (elevated cards/panels)
--color-surface-2:   #242836   (secondary surfaces, inputs)
--color-border:      #2e3347   (subtle borders)
--color-text:        #e8eaf0   (primary text)
--color-text-muted:  #8b90a5   (secondary/muted text)
--color-accent:      #6366f1   (indigo — primary CTA, active states)
--color-accent-warm: #f59e0b   (amber — ratings, featured badges)
--color-success:     #10b981   (emerald — install success)
--color-danger:      #ef4444   (red — remove, error)
```

### Typography
- **Headings**: Inter (700/600) — geometric, modern, highly legible
- **Body**: Inter (400/500) — same family for cohesion
- **Code/Technical**: JetBrains Mono — widget config code snippets
- **Scale**: 12 / 14 / 16 / 20 / 24 / 32 / 48px

### Spatial System
- Base unit: 4px
- Component padding: 12px / 16px / 24px
- Section spacing: 48px / 64px / 96px
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)

### Motion Philosophy
- **Micro-interactions**: 150ms ease-out for hover states (scale, shadow lift)
- **Page transitions**: 200ms fade for route changes
- **Modals/drawers**: 250ms slide + fade
- **Stagger**: 50ms between list items on mount
- All motion respects `prefers-reduced-motion`

### Visual Assets
- **Icons**: Lucide React (consistent 24px stroke icons)
- **Widget previews**: Live iframe embed with sandbox isolation
- **Badges**: Pill-shaped with subtle glow on featured items

---

## 3. Layout & Structure

### Application Shell
```
┌─────────────────────────────────────────────────────┐
│  NAVBAR (sticky, 64px, blur backdrop)               │
│  Logo | Nav Links | Search | Cart | Profile         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  <ROUTER OUTLET>                                    │
│  Full-height content area, scrollable               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Pages

| Route | Purpose | Layout |
|---|---|---|
| `/` | Hero + Featured + Categories | Full-width hero → 3-col featured grid → category bands |
| `/catalog` | All widgets, filterable | Sidebar filters + responsive card grid |
| `/widget/:id` | Widget detail + reviews | Split: preview left (60%) + info right (40%) |
| `/cart` | Checkout / install queue | Centered list, summary panel |
| `/dashboard` | Installed widgets | Card grid of user's installed widgets |

### Responsive Strategy
- **Desktop** (≥1024px): Full sidebar + multi-column grids
- **Tablet** (768–1023px): Collapsible filter drawer, 2-col grids
- **Mobile** (<768px): Bottom nav, single-col, stacked layouts

---

## 4. Features & Interactions

### Core Features

#### Widget Catalog
- Grid display of all widgets with thumbnail, name, author, rating, price/install count
- Real-time search by name, author, or tag
- Category filter (single-select, resets on change)
- Sort by: Featured, Most Popular, Newest, Top Rated
- Infinite scroll or "Load More" pagination

#### Widget Detail
- Large live preview (iframe sandbox)
- Widget metadata: name, author, version, license, last updated
- Description (markdown rendered)
- Configuration panel: editable JSON/YAML config
- Reviews section: star breakdown + individual review cards
- "Add to Cart" / "Install Now" CTA

#### Cart & Checkout
- Add/remove widgets to cart
- Quantity always 1 (license per widget)
- Summary: total widgets, total price
- "Complete Installation" triggers download/generates embed code

#### User Dashboard
- Grid of installed widgets
- Per-widget: name, install date, config, remove button
- Quick-copy embed code
- Filter/search within installed widgets

### Interaction Details

| Element | Hover | Active | Disabled |
|---|---|---|---|
| WidgetCard | Lift shadow + scale(1.02) | scale(0.98) | opacity 50%, no pointer |
| Button (primary) | brightness 110% + shadow | scale(0.97) | opacity 50%, cursor not-allowed |
| Button (ghost) | bg surface-2 | scale(0.97) | opacity 50% |
| CategoryPill | bg accent/20 | bg accent | opacity 50% |
| Star | color amber | — | color muted |

### Edge Cases
- **Empty catalog**: Illustrated empty state with "No widgets match your filters"
- **Empty cart**: "Your cart is empty — discover widgets" CTA
- **Empty dashboard**: "Install your first widget" + link to catalog
- **Search no results**: "No results for 'query'" + suggested categories
- **Widget load failure**: Skeleton → error state with retry button
- **Review form**: Textarea with 500-char limit, star selector, submit validation

---

## 5. Component Inventory

### Navbar
- Logo (WidgeX wordmark, links to `/`)
- Nav links: Catalog, Dashboard
- Search bar (expands on focus, submits on Enter)
- Cart icon with badge count
- User avatar placeholder
- States: default, scrolled (adds shadow + blur), mobile (hamburger menu)

### WidgetCard
- Thumbnail (16:9 aspect ratio, lazy loaded)
- Featured badge (pill, amber glow)
- Widget name (truncated to 1 line)
- Author name (muted)
- Star rating (1–5, half-star display)
- Install count
- Price or "Free" tag
- Hover: full card is clickable, lifts

### CategoryFilter
- Horizontal scrollable pill list
- "All" pill selected by default
- Single-select behavior
- Active: accent bg + text white
- Inactive: surface-2 bg + muted text

### WidgetPreview
- Sandboxed iframe (srcdoc or src)
- Toolbar: refresh, fullscreen, device frame toggle (desktop/tablet/mobile)
- Loading skeleton while iframe loads
- Error state if widget fails to render

### ReviewCard
- User avatar (initials fallback)
- Star rating display
- Review text (max 3 lines collapsed, expandable)
- Date posted (relative: "2 weeks ago")
- Verified badge if user installed the widget

---

## 6. Technical Approach

### Stack
- **Runtime**: React 18 + TypeScript (strict mode)
- **Build**: Vite 5 with `@vitejs/plugin-react`
- **Styling**: TailwindCSS 3 + PostCSS + Autoprefixer
- **State**: Zustand (global: widgets, cart, filters)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Sass**: For any complex CSS (e.g., animations, keyframes)

### Graphify Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                        WidgeX Architecture                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     BROWSER / CLIENT                     │   │
│  │                                                           │   │
│  │  ┌─────────────┐   ┌─────────────────────────────────┐   │   │
│  │  │  Navbar     │   │        Router (React Router)    │   │   │
│  │  │  (layout)   │   │                                  │   │   │
│  │  └─────────────┘   │  ┌────────────────────────────┐ │   │   │
│  │                    │  │ / → HomePage               │ │   │   │
│  │  ┌─────────────┐   │  │ /catalog → CatalogPage      │ │   │   │
│  │  │  Cart Badge │   │  │ /widget/:id → DetailPage   │ │   │   │
│  │  │  (global)   │   │  │ /cart → CartPage           │ │   │   │
│  │  └─────────────┘   │  │ /dashboard → DashboardPage  │ │   │   │
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
│  └────────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

                        Data Flow
                        ─────────

  ┌──────────┐     ┌───────────┐     ┌──────────────┐
  │ Mock Data│────▶│  Zustand  │────▶│ React Views  │
  │ (types)  │     │   Store   │     │ (Components)  │
  └──────────┘     └───────────┘     └──────────────┘
                          │
                          ▼
                   ┌───────────┐
                   │LocalStorage│ (cart persistence)
                   └───────────┘
```

### Data Models

```typescript
// See src/types.ts for full interface definitions

Widget {
  id: string
  name: string
  author: string
  authorAvatar: string
  description: string
  longDescription: string
  category: WidgetCategory
  tags: string[]
  price: number          // 0 = free
  rating: number         // 1.0–5.0
  reviewCount: number
  installCount: number
  thumbnail: string       // URL
  previewUrl: string      // URL for iframe
  version: string
  license: string
  lastUpdated: string     // ISO date
  featured: boolean
  configSchema: object    // JSON schema for widget config
}

Review {
  id: string
  widgetId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number         // 1–5
  text: string
  date: string           // ISO date
  verified: boolean
}

UserWidget {
  id: string
  widgetId: string
  installedAt: string    // ISO date
  config: object         // user's customized config
}
```

### State Shape (Zustand)

```typescript
interface WidgetStore {
  // Data
  widgets: Widget[]
  reviews: Record<string, Review[]>
  userWidgets: UserWidget[]
  
  // Cart
  cart: string[]          // widget IDs
  
  // Filters
  activeCategory: WidgetCategory | 'all'
  sortBy: 'featured' | 'popular' | 'newest' | 'rating'
  searchQuery: string
  
  // Actions
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  installWidget: (id: string, config?: object) => void
  removeWidget: (id: string) => void
  setCategory: (cat: WidgetCategory | 'all') => void
  setSort: (sort: SortOption) => void
  setSearch: (q: string) => void
}
```

### File Structure
```
widgex/
├── SPEC.md
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── vercel.json
├── fly.toml
├── railway.json
├── render.yaml
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    ├── index.css
    ├── store/
    │   └── widgets.ts
    ├── components/
    │   ├── Navbar.tsx
    │   ├── WidgetCard.tsx
    │   ├── CategoryFilter.tsx
    │   ├── WidgetPreview.tsx
    │   └── ReviewCard.tsx
    └── pages/
        ├── Home.tsx
        ├── Catalog.tsx
        ├── WidgetDetail.tsx
        ├── Cart.tsx
        └── Dashboard.tsx
```
