import { useWidgetStore } from '../store/widgets';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart } = useWidgetStore();
  const navigate = useNavigate();
  const total = cart.reduce((sum, w) => sum + w.price, 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <ShoppingCart size={48} className="mx-auto text-gray-300" />
          <p className="text-gray-500">Your cart is empty.</p>
          <button onClick={() => navigate('/catalog')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Browse Catalog
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">{w.name[0]}</div>
                  <div>
                    <h3 className="font-semibold">{w.name}</h3>
                    <p className="text-sm text-gray-500">{w.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-blue-600">${w.price}</span>
                  <button onClick={() => removeFromCart(w.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-2xl text-blue-600">${total}</span>
          </div>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Checkout with Stripe
          </button>
        </>
      )}
    </div>
  );
}
