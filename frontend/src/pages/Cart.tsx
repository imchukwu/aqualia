import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartContent from '@/components/CartContent';

const Cart = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              Review your items before checkout
            </p>
          </div>

          <CartContent />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
