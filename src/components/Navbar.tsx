import { Link, useNavigate } from 'react-router-dom';
import { useWidgetStore } from '../store/widgets';
import { ShoppingCart, LayoutDashboard, Search, Package } from 'lucide-react';

export default function Navbar() {
  const { cart, search, setSearch } = useWidgetStore();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 px-6 flex items-center gap-4">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
        <Package size={22} />
        <span>WidgeX</span>
      </Link>
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/catalog')}
          placeholder="Search widgets..."
          className="w-full pl-9 pr-4 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link to="/catalog" className="hover:text-blue-600">Catalog</Link>
        <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-blue-600">
          <LayoutDashboard size={16} /> Dashboard
        </Link>
        <Link to="/cart" className="relative flex items-center gap-1.5 hover:text-blue-600">
          <ShoppingCart size={16} />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>
    </nav>
  );
}
