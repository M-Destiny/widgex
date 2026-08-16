import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Widget, UserWidget, Review } from '../types';

interface WidgetState {
  widgets: Widget[];
  cart: Widget[];
  installed: UserWidget[];
  wishlist: string[];
  activeCategory: string | null;
  search: string;
  addToCart: (widget: Widget) => void;
  removeFromCart: (id: string) => void;
  installWidget: (widget: Widget) => void;
  toggleWishlist: (widgetId: string) => void;
  isInWishlist: (widgetId: string) => boolean;
  setCategory: (cat: string | null) => void;
  setSearch: (s: string) => void;
  clearCart: () => void;
}

const mockWidgets: Widget[] = [
  { id: '1', name: 'ProChart', description: 'Beautiful interactive charts with 10+ chart types', category: 'charts', price: 29, rating: 4.8, reviewCount: 124, author: 'DataVizCo', thumbnail: '', tags: ['chart', 'd3', 'recharts'], installs: 4200 },
  { id: '2', name: 'SmartForm', description: 'Drag-and-drop form builder with 20+ field types', category: 'forms', price: 39, rating: 4.6, reviewCount: 89, author: 'FormLabs', thumbnail: '', tags: ['form', 'builder', 'react-hook-form'], installs: 3100 },
  { id: '3', name: 'DataGrid Pro', description: 'High-performance data table with sorting, filtering, export', category: 'tables', price: 49, rating: 4.9, reviewCount: 201, author: 'GridMaster', thumbnail: '', tags: ['table', 'grid', 'virtual'], installs: 5800 },
  { id: '4', name: 'MediaCarousel', description: 'Touch-friendly image/video carousel with 50+ transitions', category: 'media', price: 19, rating: 4.7, reviewCount: 67, author: 'MediaCraft', thumbnail: '', tags: ['carousel', 'slider', 'media'], installs: 2900 },
  { id: '5', name: 'NavPro', description: 'Advanced navigation component library — mega menus, sidebars, tabs', category: 'navigation', price: 24, rating: 4.5, reviewCount: 55, author: 'Navify', thumbnail: '', tags: ['navigation', 'menu', 'sidebar'], installs: 2100 },
  { id: '6', name: 'ToastKit', description: 'Notification toast system with queue, progress, action buttons', category: 'feedback', price: 14, rating: 4.8, reviewCount: 143, author: 'NotifyHub', thumbnail: '', tags: ['toast', 'notification', 'alert'], installs: 7300 },
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