import { Link } from 'react-router-dom';
import type { Widget } from '../types';
import { Star, Download, ShoppingCart } from 'lucide-react';
import { useWidgetStore } from '../store/widgets';

interface Props { widget: Widget; }

export default function WidgetCard({ widget }: Props) {
  const { addToCart, cart } = useWidgetStore();
  const inCart = cart.some((w) => w.id === widget.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="h-36 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-2xl">{widget.name[0]}</span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight">{widget.name}</h3>
          <span className="text-blue-600 font-bold text-sm whitespace-nowrap">${widget.price}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex-1 line-clamp-2">{widget.description}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Star size={13} className="text-yellow-500 fill-yellow-500" /> {widget.rating}</span>
          <span className="flex items-center gap-1"><Download size={13} /> {widget.installs.toLocaleString()}</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">{widget.category}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <Link to={`/widget/${widget.id}`} className="flex-1 text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            View
          </Link>
          <button
            onClick={() => addToCart(widget)}
            disabled={inCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              inCart ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ShoppingCart size={14} />
            {inCart ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
