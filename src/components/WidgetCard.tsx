import { Link } from 'react-router-dom';
import type { Widget } from '../types';
import { Star, Download, ShoppingCart, Heart } from 'lucide-react';
import { useWidgetStore } from '../store/widgets';

interface Props { widget: Widget; }

export default function WidgetCard({ widget }: Props) {
  const { addToCart, cart, toggleWishlist, isInWishlist } = useWidgetStore();
  const inCart = cart.some((w) => w.id === widget.id);
  const inWishlist = isInWishlist(widget.id);

  return (
    <div className="card bg-surface border-border overflow-hidden hover:shadow-lift transition-shadow flex flex-col">
      <div className="h-36 bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-2xl">{widget.name[0]}</span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight text-text">{widget.name}</h3>
          <span className="text-accent font-bold text-sm whitespace-nowrap">${widget.price}</span>
        </div>
        <p className="text-sm text-text-muted flex-1 line-clamp-2">{widget.description}</p>
        <div className="flex items-center gap-3 mt-3 text-sm text-text-muted">
          <span className="flex items-center gap-1"><Star size={13} className="text-accent-warm fill-accent-warm" /> {widget.rating}</span>
          <span className="flex items-center gap-1"><Download size={13} /> {widget.installs.toLocaleString()}</span>
          <span className="pill bg-surface-2 border border-border text-text-muted">{widget.category}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <Link to={`/widget/${widget.id}`} className="flex-1 text-center px-3 py-2 btn-primary">
            View
          </Link>
          <button
            onClick={() => toggleWishlist(widget.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-btn text-sm font-medium transition-colors ${
              inWishlist ? 'bg-accent-warm/20 text-accent-warm hover:bg-accent-warm/30' : 'bg-surface-2 text-text-muted hover:bg-border'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={14} className={inWishlist ? 'fill-current' : ''} />
          </button>
          <button
            onClick={() => addToCart(widget)}
            disabled={inCart}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-btn text-sm font-medium transition-colors ${
              inCart ? 'bg-surface-2 text-text-muted cursor-not-allowed' : 'btn-primary'
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