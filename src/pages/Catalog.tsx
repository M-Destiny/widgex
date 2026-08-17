import { useWidgetStore } from '../store/widgets';
import WidgetCard from '../components/WidgetCard';
import CategoryFilter from '../components/CategoryFilter';
import { ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
] as const;

export default function Catalog() {
  const { widgets, activeCategory, search, sortBy, setSort } = useWidgetStore();

  const filtered = widgets
    .filter((w) => {
      const matchCat = !activeCategory || w.category === activeCategory;
      const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.installs - a.installs;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'featured':
        default:
          return (b.featured === a.featured ? 0 : b.featured ? 1 : -1) || b.installs - a.installs;
      }
    });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-text">Widget Catalog</h1>
        <select
          value={sortBy}
          onChange={(e) => setSort(e.target.value as typeof sortBy)}
          className="input w-auto px-8 pr-10 appearance-none bg-surface-2 border-border text-text"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b90a5\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center' }}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <CategoryFilter />
      <p className="text-text-muted">{filtered.length} widget{filtered.length !== 1 ? 's' : ''} found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((w) => <WidgetCard key={w.id} widget={w} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <p>No widgets match your search.</p>
        </div>
      )}
    </div>
  );
}