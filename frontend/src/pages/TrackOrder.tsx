import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, Clock, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const { user } = useAuthStore();

  // Setup searchable order logic for public tracking later
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data.data || []);
      } catch (error) {
        toast.error('Failed to load past orders');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

    setIsSearching(true);
    try {
      // If signed in and searching your own list
      const localOrder = orders.find(o => o.id.toString() === searchId);
      if (localOrder) {
        setSearchResult(localOrder);
      } else {
        toast.error('Order not found in your history');
        setSearchResult(null);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PROCESSING':
      case 'CONFIRMED': return <Clock className="w-6 h-6" />;
      case 'SHIPPED': return <Package className="w-6 h-6" />;
      case 'IN_TRANSIT': return <Truck className="w-6 h-6" />;
      case 'DELIVERED': return <CheckCircle className="w-6 h-6" />;
      default: return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'text-green-600 bg-green-100';
      case 'SHIPPED':
      case 'IN_TRANSIT': return 'text-primary bg-primary/10';
      case 'CANCELLED': return 'text-red-600 bg-red-100';
      default: return 'text-amber-600 bg-amber-100'; // pending/processing
    }
  };

  const displayOrder = searchResult || orders.find(o => o.id === selectedOrderId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Orders
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Track the status of your recent Aqualia orders.
            </p>
          </div>

          {!user ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-card shadow-soft max-w-xl mx-auto">
              <h2 className="text-xl font-bold mb-4">You are not logged in</h2>
              <p className="text-muted-foreground mb-6">Please log in to view your order history.</p>
              <Link to="/auth">
                <Button className="gradient-ocean text-primary-foreground">Log In</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

              {/* Order History Sidebar */}
              <div className="md:col-span-1 space-y-4">
                <h3 className="text-lg font-bold mb-4">Order History</h3>
                <div className="space-y-3">
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No orders found.</p>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => { setSelectedOrderId(order.id); setSearchResult(null); }}
                        className={`p-4 rounded-xl cursor-pointer transition-colors border ${selectedOrderId === order.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/50'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold">#{order.id}</span>
                          <span className="text-sm font-medium text-foreground">₦{order.total_amount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</span>
                          <span className={`px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Order Details View */}
              <div className="md:col-span-2">
                {displayOrder ? (
                  <div className="animate-fade-in space-y-6">
                    <div className="p-6 rounded-2xl bg-card shadow-soft">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">
                            Order #{displayOrder.id}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(displayOrder.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium ${getStatusColor(displayOrder.status)}`}>
                          {getStatusIcon(displayOrder.status)}
                          <span className="capitalize">{displayOrder.status.toLowerCase()}</span>
                        </div>
                      </div>

                      <div className="border-t border-border pt-4">
                        <h3 className="font-medium text-foreground mb-3">Items Ordered</h3>
                        <ul className="space-y-3">
                          {displayOrder.items?.map((item: any, index: number) => (
                            <li key={index} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <Package className="w-4 h-4 text-primary" />
                                <span>{item.product?.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                              </div>
                              <span className="font-medium">₦{(item.price_applied * item.quantity).toLocaleString()}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm">
                          <span className="text-muted-foreground">Delivery Fee</span>
                          <span className="font-medium">₦{displayOrder.delivery_fee?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-base font-bold">
                          <span>Total</span>
                          <span className="text-primary">₦{displayOrder.total_amount?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-card shadow-soft">
                      <h3 className="font-bold text-foreground mb-4">Payment Information</h3>
                      <p className="text-sm text-muted-foreground mb-2">Method: {displayOrder.payment_method}</p>
                      <p className="text-sm text-muted-foreground">Status: <span className="font-medium">{displayOrder.payment_status}</span></p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-12 rounded-2xl bg-card border border-dashed border-border text-center text-muted-foreground">
                    <Package className="w-12 h-12 mb-4 opacity-50" />
                    <p>Select an order from the history to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
