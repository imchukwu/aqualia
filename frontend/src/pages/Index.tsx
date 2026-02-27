import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Shield, Truck, Award } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: Droplets,
      title: 'Premium Quality',
      description: '100% pure, clean water processed with advanced filtration technology.',
    },
    {
      icon: Shield,
      title: 'NAFDAC Approved',
      description: 'Certified and approved by Nigerian health and safety authorities.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick delivery across all Nigerian states and LGAs.',
    },
    {
      icon: Award,
      title: 'Trusted Brand',
      description: 'Serving thousands of satisfied customers since establishment.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Shop by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our wide range of water products for every need
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Our best-selling water products
                </p>
              </div>
              <Link to="/products" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Link to="/products" className="block md:hidden mt-8">
              <Button className="w-full gradient-ocean text-primary-foreground">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Aqualia?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing you with the purest, safest water
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-card shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-ocean flex items-center justify-center shadow-soft">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 gradient-water bubble-pattern">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Hydrated with Aqualia
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Order now and get fresh, pure water delivered right to your doorstep.
              We deliver across all states in Nigeria.
            </p>
            <Link to="/products">
              <Button size="lg" className="gradient-ocean text-primary-foreground shadow-elevated hover:shadow-soft transition-all btn-ripple">
                Order Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
