import { useWidgetStore } from '../store/widgets';
import WidgetCard from '../components/WidgetCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Catalog() {
  const { widgets, activeCategory, search } = useWidgetStore();

  const filtered = widgets.filter((w) => {
    const matchCat = !activeCategory || w.category === activeCategory;
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Widget Catalog</h1>
      <CategoryFilter />
      <p className="text-gray-500">{filtered.length} widget{filtered.length !== 1 ? 's' : ''} found</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((w) => <WidgetCard key={w.id} widget={w} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No widgets match your search.</p>
        </div>
      )}
    </div>
  );
}
