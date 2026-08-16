import { useParams, useNavigate } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import WidgetPreview from '../components/WidgetPreview';
import ReviewCard from '../components/ReviewCard';
import { ShoppingCart, Download, Star, Heart } from 'lucide-react';

const mockReviews = [
  { id: '1', widgetId: '1', userId: 'u1', userName: 'Alex T.', rating: 5, comment: 'Best chart library I have ever used. Highly recommended!', createdAt: '2024-02-10' },
  { id: '2', widgetId: '1', userId: 'u2', userName: 'Maria S.', rating: 4, comment: 'Great components, a bit pricey but worth it.', createdAt: '2024-02-08' },
];

export default function WidgetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { widgets, cart, wishlist, addToCart, installWidget, toggleWishlist, isInWishlist } = useWidgetStore();
  const widget = widgets.find((w) => w.id === id);
  const inCart = cart.some((w) => w.id === id);
  const inWishlist = isInWishlist(id || '');

  if (!widget) return <div className="p-10 text-center text-text-muted">Widget not found</div>;

  const reviews = mockReviews.filter((r) => r.widgetId === id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WidgetPreview widget={widget} />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text">{widget.name}</h1>
          <p className="text-text-muted">{widget.description}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Star size={16} className="text-accent-warm fill-accent-warm" /> {widget.rating} ({widget.reviewCount} reviews)</span>
            <span className="text-text-muted">{widget.installs.toLocaleString()} installs</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-accent">${widget.price}</span>
            <button
              onClick={() => addToCart(widget)}
              disabled={inCart}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-btn font-semibold transition-colors ${
                inCart ? 'bg-surface-2 text-text-muted cursor-not-allowed' : 'btn-primary'
              }`}
            >
              <ShoppingCart size={18} />
              {inCart ? 'In Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => { installWidget(widget); navigate('/dashboard'); }} className="flex items-center gap-2 px-5 py-2.5 btn-ghost">
              <Download size={18} /> Install Free
            </button>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {widget.tags.map((tag) => <span key={tag} className="pill bg-surface-2 border border-border text-text-muted">{tag}</span>)}
            <button
              onClick={() => toggleWishlist(widget.id)}
              className={`pill flex items-center gap-1.5 transition-colors ${
                inWishlist ? 'badge-featured' : 'bg-surface-2 text-text-muted hover:bg-border'
              }`}
            >
              <Heart size={14} className={inWishlist ? 'fill-current' : ''} />
              {inWishlist ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      )}
    </div>
  );
}