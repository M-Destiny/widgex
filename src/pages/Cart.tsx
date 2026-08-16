import { useWidgetStore } from '../store/widgets';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, CreditCard, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, clearCart, installWidget } = useWidgetStore();
  const navigate = useNavigate();
  const [checkoutStage, setCheckoutStage] = useState<'cart' | 'payment' | 'success'>('cart');
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, w) => sum + w.price, 0);

  const handleCheckout = async () => {
    setCheckoutStage('payment');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    cart.forEach((w) => installWidget(w));
    clearCart();
    setLoading(false);
    setCheckoutStage('success');
  };

  if (checkoutStage === 'payment') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-3xl font-bold text-text">Checkout</h1>
        <div className="card border-border p-6 space-y-4">
          <h3 className="font-semibold text-text">Payment Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-text-muted mb-1">Card Number</label>
              <input type="text" placeholder="4242 4242 4242 4242" className="input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text-muted mb-1">Expiry</label>
                <input type="text" placeholder="MM/YY" className="input" />
              </div>
              <div>
                <label className="block text-sm text-text-muted mb-1">CVC</label>
                <input type="text" placeholder="123" className="input" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Name on Card</label>
              <input type="text" placeholder="John Doe" className="input" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-btn">
            <span className="font-bold text-lg text-text">Total</span>
            <span className="font-bold text-2xl text-accent">${total}</span>
          </div>
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-3 btn-primary flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
            {loading ? 'Processing...' : `Pay $${total}`}
          </button>
          <button
            onClick={() => setCheckoutStage('cart')}
            className="w-full py-2 btn-ghost"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  if (checkoutStage === 'success') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        <div className="text-center py-16 space-y-4">
          <CheckCircle size={64} className="mx-auto text-success" />
          <h2 className="text-3xl font-bold text-text">Purchase Successful!</h2>
          <p className="text-text-muted">Widgets have been added to your dashboard.</p>
          <button
            onClick={() => {
              setCheckoutStage('cart');
              navigate('/dashboard');
            }}
            className="px-6 py-3 btn-primary inline-flex items-center gap-2"
          >
            Go to Dashboard <CheckCircle size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-text flex items-center gap-2">
        <ShoppingCart size={28} className="text-accent" />
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <ShoppingCart size={48} className="mx-auto text-text-muted" />
          <p className="text-text-muted">Your cart is empty.</p>
          <button onClick={() => navigate('/catalog')} className="px-6 py-2 btn-primary inline-flex items-center gap-1">
            Browse Catalog <ShoppingCart size={16} />
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((w) => (
              <div key={w.id} className="flex items-center justify-between p-4 card border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">{w.name[0]}</div>
                  <div>
                    <h3 className="font-semibold text-text">{w.name}</h3>
                    <p className="text-sm text-text-muted">{w.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-accent">${w.price}</span>
                  <button onClick={() => removeFromCart(w.id)} className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 card border-border">
            <span className="font-bold text-lg text-text">Total</span>
            <span className="font-bold text-2xl text-accent">${total}</span>
          </div>
          <button onClick={handleCheckout} className="w-full py-3 btn-primary flex items-center justify-center gap-2">
            <CreditCard size={18} /> Checkout with Stripe
          </button>
        </>
      )}
    </div>
  );
}