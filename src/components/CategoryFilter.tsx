import type { WidgetCategory } from '../types';
import { useWidgetStore } from '../store/widgets';

const categories: { id: WidgetCategory | null; label: string }[] = [
  { id: null, label: 'All' },
  { id: 'charts', label: 'Charts' },
  { id: 'forms', label: 'Forms' },
  { id: 'tables', label: 'Tables' },
  { id: 'media', label: 'Media' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
];

export default function CategoryFilter() {
  const { activeCategory, setCategory } = useWidgetStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map(({ id, label }) => (
        <button
          key={label}
          onClick={() => setCategory(id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === id
              ? 'btn-primary'
              : 'bg-surface-2 text-text-muted hover:bg-border'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}