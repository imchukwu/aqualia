import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart, CartItem } from '@/store/cartStore';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import api from '@/lib/api';
import { usePaystackPayment } from 'react-paystack';

const CartItemCard = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl shadow-soft">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
        {item.size && (
          <p className="text-sm text-muted-foreground">{item.size}</p>
        )}
        <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 rounded-md hover:bg-muted flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-destructive hover:text-destructive/80 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="text-right hidden sm:block">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="font-bold text-foreground">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

const CartContent = () => {
  const { items, getTotalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const delivery = 500;
  const total = subtotal + delivery;

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const config = {
    reference: (new Date()).getTime().toString(),
    email: user?.email || 'customer@aqualia.com',
    amount: total * 100, // Paystack expects amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any, orderId: number) => {
    try {
      await api.post('/orders/verify-payment', {
        order_id: orderId,
        reference: reference.reference
      });
      toast.success('Payment successful and order verified!');
      clearCart();
      navigate('/track-order');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Payment verification failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const onClose = () => {
    toast.error('Payment cancelled');
    setIsCheckingOut(false);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please log in to checkout');
      navigate('/auth');
      return;
    }

    setIsCheckingOut(true);
    try {
      const orderPayload = {
        items: items.map(item => ({
          product_id: Number(item.id),
          quantity: item.quantity
        })),
        delivery_address_id: 1, // Mocked for now
        payment_method: 'CARD'
      };

      const response = await api.post('/orders', orderPayload);
      const orderId = response.data.order.id;

      // Trigger Paystack payment window
      initializePayment({
        onSuccess: (ref) => onSuccess(ref, orderId),
        onClose
      });

    } catch (error: any) {
      console.error('Checkout Error:', error);

      // Extract exact message if it's an Axios network error or Paystack synchronous error
      let errorMessage = 'Failed to initialize checkout';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message; // Captures "Network Error" or "Paystack public key is required"
      }
      toast.error(`Checkout Error: ${errorMessage}`);
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to get started!
        </p>
        <Link to="/products">
          <Button className="gradient-ocean text-primary-foreground">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            Cart Items ({items.length})
          </h2>
          <button
            onClick={clearCart}
            className="text-sm text-destructive hover:underline"
          >
            Clear All
          </button>
        </div>
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium">{formatPrice(delivery)}</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full gradient-ocean text-primary-foreground shadow-soft mb-3"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
          <Link to="/products" className="block">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
