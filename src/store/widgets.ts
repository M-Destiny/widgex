import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Widget, UserWidget, Review } from '../types';

type SortOption = 'featured' | 'popular' | 'newest' | 'rating' | 'price-asc' | 'price-desc';

interface WidgetState {
  widgets: Widget[];
  cart: Widget[];
  installed: UserWidget[];
  wishlist: string[];
  activeCategory: string | null;
  search: string;
  sortBy: SortOption;
  addToCart: (widget: Widget) => void;
  removeFromCart: (id: string) => void;
  installWidget: (widget: Widget) => void;
  toggleWishlist: (widgetId: string) => void;
  isInWishlist: (widgetId: string) => boolean;
  setCategory: (cat: string | null) => void;
  setSearch: (s: string) => void;
  setSort: (sort: SortOption) => void;
  clearCart: () => void;
}

const mockWidgets: Widget[] = [
  { id: '1', name: 'ProChart', description: 'Beautiful interactive charts with 10+ chart types', category: 'charts', price: 29, rating: 4.8, reviewCount: 124, author: 'DataVizCo', thumbnail: '', tags: ['chart', 'd3', 'recharts'], installs: 4200, featured: true, version: '2.1.0', license: 'MIT', lastUpdated: '2024-02-10', configSchema: { theme: { type: 'string', enum: ['light', 'dark', 'auto'], default: 'auto' }, animate: { type: 'boolean', default: true } } },
  { id: '2', name: 'SmartForm', description: 'Drag-and-drop form builder with 20+ field types', category: 'forms', price: 39, rating: 4.6, reviewCount: 89, author: 'FormLabs', thumbnail: '', tags: ['form', 'builder', 'react-hook-form'], installs: 3100, featured: true, version: '1.5.0', license: 'MIT', lastUpdated: '2024-01-28', configSchema: { validationMode: { type: 'string', enum: ['onChange', 'onBlur', 'onSubmit'], default: 'onChange' }, showLabels: { type: 'boolean', default: true } } },
  { id: '3', name: 'DataGrid Pro', description: 'High-performance data table with sorting, filtering, export', category: 'tables', price: 49, rating: 4.9, reviewCount: 201, author: 'GridMaster', thumbnail: '', tags: ['table', 'grid', 'virtual'], installs: 5800, featured: true, version: '3.0.0', license: 'Apache-2.0', lastUpdated: '2024-03-05', configSchema: { pageSize: { type: 'number', default: 25 }, virtualScroll: { type: 'boolean', default: true } } },
  { id: '4', name: 'MediaCarousel', description: 'Touch-friendly image/video carousel with 50+ transitions', category: 'media', price: 19, rating: 4.7, reviewCount: 67, author: 'MediaCraft', thumbnail: '', tags: ['carousel', 'slider', 'media'], installs: 2900, featured: false, version: '2.0.1', license: 'MIT', lastUpdated: '2023-12-15', configSchema: { autoplay: { type: 'boolean', default: true }, interval: { type: 'number', default: 5000 } } },
  { id: '5', name: 'NavPro', description: 'Advanced navigation component library — mega menus, sidebars, tabs', category: 'navigation', price: 24, rating: 4.5, reviewCount: 55, author: 'Navify', thumbnail: '', tags: ['navigation', 'menu', 'sidebar'], installs: 2100, featured: false, version: '1.2.0', license: 'MIT', lastUpdated: '2024-01-10', configSchema: { collapseOnMobile: { type: 'boolean', default: true }, animation: { type: 'string', enum: ['slide', 'fade', 'none'], default: 'slide' } } },
  { id: '6', name: 'ToastKit', description: 'Notification toast system with queue, progress, action buttons', category: 'feedback', price: 14, rating: 4.8, reviewCount: 143, author: 'NotifyHub', thumbnail: '', tags: ['toast', 'notification', 'alert'], installs: 7300, featured: true, version: '1.0.0', license: 'MIT', lastUpdated: '2024-02-20', configSchema: { position: { type: 'string', enum: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'], default: 'top-right' }, maxVisible: { type: 'number', default: 5 } } },
];

const _mockReviews: Review[] = [
  { id: '1', widgetId: '1', userId: 'u1', userName: 'Alex T.', rating: 5, comment: 'Best chart library I have ever used. Highly recommended!', createdAt: '2024-02-10' },
  { id: '2', widgetId: '1', userId: 'u2', userName: 'Maria S.', rating: 4, comment: 'Great components, a bit pricey but worth it.', createdAt: '2024-02-08' },
];

export const useWidgetStore = create<WidgetState>()(
  persist(
    (set, get) => ({
      widgets: mockWidgets,
      cart: [],
      installed: [],
      wishlist: [],
      activeCategory: null,
      search: '',
      sortBy: 'featured',
      addToCart: (widget) => set((s) => ({ cart: [...s.cart.filter((w) => w.id !== widget.id), widget] })),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((w) => w.id !== id) })),
      installWidget: (widget) => set((s) => ({
        installed: [...s.installed.filter((w) => w.widgetId !== widget.id), { widgetId: widget.id, installedAt: new Date().toISOString(), config: {} }],
        cart: s.cart.filter((w) => w.id !== widget.id),
      })),
      toggleWishlist: (widgetId) => set((s) => ({
        wishlist: s.wishlist.includes(widgetId)
          ? s.wishlist.filter((id) => id !== widgetId)
          : [...s.wishlist, widgetId],
      })),
      isInWishlist: (widgetId) => get().wishlist.includes(widgetId),
      setCategory: (cat) => set({ activeCategory: cat }),
      setSearch: (s) => set({ search: s }),
      setSort: (sort) => set({ sortBy: sort }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'widgex-storage',
      partialize: (state) => ({
        cart: state.cart,
        installed: state.installed,
        wishlist: state.wishlist,
      }),
    }
  )
);