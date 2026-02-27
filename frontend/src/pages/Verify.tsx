import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductVerifier from '@/components/ProductVerifier';

const Verify = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12 gradient-water bubble-pattern">
        <div className="container mx-auto">
          <ProductVerifier />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Verify;
