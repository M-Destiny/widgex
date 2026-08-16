import { Link } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import { Heart, Package, Trash2, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, widgets, removeFromCart, addToCart, toggleWishlist } = useWidgetStore();

  const wishlistWidgets = widgets.filter((w) => wishlist.includes(w.id));

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Heart size={28} className="text-accent-warm" />
        My Wishlist
      </h1>
      {wishlistWidgets.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Heart size={48} className="mx-auto text-gray-600" />
          <p className="text-text-muted">Your wishlist is empty.</p>
          <Link to="/catalog" className="px-6 py-2 bg-accent text-white rounded-btn font-medium inline-block hover:bg-accent-hover transition-colors">
            Browse Catalog <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistWidgets.map((w) => (
            <div key={w.id} className="flex items-center justify-between p-4 bg-surface border border-border rounded-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">{w.name[0]}</div>
                <div>
                  <h3 className="font-semibold text-text">{w.name}</h3>
                  <p className="text-sm text-text-muted">{w.category} • ${w.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(w.id)}
                  className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
                <Link
                  to={`/widget/${w.id}`}
                  className="px-4 py-2 bg-surface-2 border border-border rounded-btn text-sm font-medium hover:bg-border transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(w)}
                  className="px-4 py-2 bg-accent text-white rounded-btn text-sm font-medium hover:bg-accent-hover transition-colors"
                >
                  <Package size={14} className="mr-1" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}