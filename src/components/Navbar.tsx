import { Link, useNavigate } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import { ShoppingCart, LayoutDashboard, Search, Package, Heart } from 'lucide-react';

export default function Navbar() {
  const { cart, wishlist, search, setSearch } = useWidgetStore();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border z-50 px-6 flex items-center gap-4">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-accent">
        <Package size={22} />
        <span>WidgeX</span>
      </Link>
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/catalog')}
          placeholder="Search widgets..."
          className="w-full pl-9 pr-4 py-2 text-sm input"
        />
      </div>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link to="/catalog" className="text-text-muted hover:text-accent transition-colors">Catalog</Link>
        <Link to="/dashboard" className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors">
          <LayoutDashboard size={16} /> Dashboard
        </Link>
        <Link to="/wishlist" className="flex items-center gap-1.5 text-text-muted hover:text-accent-warm transition-colors relative">
          <Heart size={16} />
          Wishlist
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-accent-warm text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="relative flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors">
          <ShoppingCart size={16} />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </nav>
  );
}