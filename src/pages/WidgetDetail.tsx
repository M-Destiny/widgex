import { useParams, useNavigate } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import WidgetPreview from '../components/WidgetPreview';
import ReviewCard from '../components/ReviewCard';
import { ShoppingCart, Download, Star } from 'lucide-react';

const mockReviews = [
  { id: '1', widgetId: '1', userId: 'u1', userName: 'Alex T.', rating: 5, comment: 'Best chart library I have ever used. Highly recommended!', createdAt: '2024-02-10' },
  { id: '2', widgetId: '1', userId: 'u2', userName: 'Maria S.', rating: 4, comment: 'Great components, a bit pricey but worth it.', createdAt: '2024-02-08' },
];

export default function WidgetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { widgets, cart, addToCart, installWidget } = useWidgetStore();
  const widget = widgets.find((w) => w.id === id);
  const inCart = cart.some((w) => w.id === id);

  if (!widget) return <div className="p-10 text-center">Widget not found</div>;

  const reviews = mockReviews.filter((r) => r.widgetId === id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WidgetPreview widget={widget} />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{widget.name}</h1>
          <p className="text-gray-500">{widget.description}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-yellow-500" /> {widget.rating} ({widget.reviewCount} reviews)</span>
            <span className="text-gray-400">{widget.installs.toLocaleString()} installs</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-blue-600">${widget.price}</span>
            <button
              onClick={() => addToCart(widget)}
              disabled={inCart}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-colors ${
                inCart ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <ShoppingCart size={18} />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => { installWidget(widget); navigate('/dashboard'); }} className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download size={18} /> Install Free
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {widget.tags.map((tag) => <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">{tag}</span>)}
          </div>
        </div>
      </div>
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      )}
    </div>
  );
}
