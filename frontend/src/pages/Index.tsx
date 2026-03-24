import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Droplets, Heart, Gift, Truck, MapPin, Check, BarChart3, TrendingUp, PieChart, Star, Sparkles } from 'lucide-react';
import productLineup from '@/assets/products/product-lineup.jpeg';
import CategoryCard from '@/components/CategoryCard';
import { useState, useEffect } from 'react';

const categories = [
  { id: 'Sachet Water', name: 'Sachet Water', description: 'Affordable, hygienic daily drinking water in convenient 50cl sachets.', icon: '💧', count: 1 },
  { id: 'Bottle Water', name: 'Bottle Water', description: '50cl | 75cl | 1.5L bottles — perfect for retail, events & hospitality.', icon: '🍾', count: 3 },
  { id: 'Dispenser Bottles', name: 'Dispenser Bottles', description: '20L dispenser jar — ideal for homes, offices & institutions.', icon: '🚰', count: 1 },
];

const promotionsList = [
  { id: 1, title: 'Buy 6, Get 1 Free', desc: 'On all 1.5L PET bottles purchased this weekend.', bg: 'bg-[#1a365d]' },
  { id: 2, title: 'Subscribe & Save 10%', desc: 'Set up weekly deliveries and lock in your discount.', bg: 'bg-[#155baf]' },
  { id: 3, title: 'Distributor Starter Pack', desc: 'Get branded materials free on your first bulk order.', bg: 'bg-[#1a365d]' }
];

const Index = () => {
  const [activePromo, setActivePromo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePromo((prev) => (prev + 1) % promotionsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 overflow-x-hidden bg-blue-50/30">
        <Hero />

        {/* --- SHORT SECTIONS --- */}

        {/* Products Section */}
        <section className="py-16 md:py-24 bg-white border-b border-blue-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <div className="text-[#155baf] font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> OUR PRODUCTS
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#1a365d] tracking-tight">Shop by Category</h2>
              </div>
              <Link to="/products">
                <Button className="bg-[#155baf] hover:bg-[#114b93] text-white font-bold px-6 h-12 shadow-sm rounded-full transition-all hover:scale-105">
                  View All Products <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotion Section */}
        <section id="promotions" className="py-16 md:py-24 bg-blue-50/50 border-b border-blue-100/50 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#1a365d] tracking-tight">Special Promotions</h2>
                <p className="text-slate-600 mt-2">Take advantage of our current offers.</p>
              </div>
              <Link to="/promotions">
                <Button variant="outline" className="border-[#155baf] text-[#155baf] hover:bg-[#155baf] hover:text-white font-bold px-6 h-10 shadow-sm rounded-full transition-all">
                  See All Promotions
                </Button>
              </Link>
            </div>

            <div className={`relative w-full rounded-3xl p-8 md:p-12 text-white shadow-xl flex items-center min-h-[250px] transition-all duration-700 ${promotionsList[activePromo].bg}`}>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Limited Time Offer</span>
                <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{promotionsList[activePromo].title}</h3>
                <p className="text-lg text-white/90 mb-6">{promotionsList[activePromo].desc}</p>
                <Link to="/promotions">
                  <Button className="bg-white text-black hover:bg-slate-100 font-black px-8 h-12 rounded-full uppercase tracking-wide">
                    Claim Offer
                  </Button>
                </Link>
              </div>
              {/* Decorative elements */}
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white rounded-full blur-[80px]"></div>
                <div className="absolute right-20 bottom-0 w-40 h-40 bg-black rounded-full blur-[60px]"></div>
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-2">
              {promotionsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePromo(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === activePromo ? 'w-8 bg-[#155baf]' : 'w-2 bg-slate-300'}`}
                  aria-label={`Go to promotion ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Distribution Section */}
        <section className="py-16 md:py-24 bg-white border-b border-blue-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-[#155baf]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a365d] mb-4 tracking-tight">Join Our Network</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Become a certified distributor and start your own lucrative business. Enjoy bulk discounts, marketing support, and a streamlined workflow that guarantees growth.
              </p>
              <Link to="/distributors">
                <Button className="bg-[#155baf] hover:bg-[#114b93] text-white font-bold px-8 h-12 rounded-full shadow-md uppercase tracking-wide transition-all hover:scale-105">
                  Become a Distributor <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Aqualia Section */}
        <section className="py-16 md:py-20 bg-[#155baf] text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Why Aqualia?</h2>
              <p className="text-white/80 text-lg">The standard every drop is held to.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: '🔬', text: 'Advanced multi-stage filtration' },
                { icon: '✅', text: 'NAFDAC & SON compliant' },
                { icon: '🍶', text: 'Bottles, sachet & dispenser sizes' },
                { icon: '💧', text: 'Consistent taste & purity' },
                { icon: '🔐', text: 'Anti-counterfeit QR protected' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3 bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors">
                  <span className="text-4xl">{item.icon}</span>
                  <p className="font-semibold text-sm leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / Used By Section */}
        <section className="py-14 md:py-20 bg-white border-b border-blue-50">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-[#155baf] font-bold tracking-wider uppercase text-sm mb-3">Trusted Across Nigeria</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1a365d] mb-10 tracking-tight">Used By</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Retailers', 'Offices', 'Schools', 'Event Planners', 'Distributors Nationwide'].map((group) => (
                <span key={group} className="inline-flex items-center gap-2 px-5 py-3 bg-blue-50 border border-blue-100 text-[#1a365d] font-bold rounded-full text-sm shadow-sm">
                  <span className="w-2 h-2 bg-[#155baf] rounded-full"></span>
                  {group}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Health Impact Section */}
        <section id="health-impact" className="py-16 md:py-24 bg-white border-t border-b border-blue-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Image/Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-[#155baf]/20 group-hover:bg-[#155baf]/10 transition-colors z-10" />
                <img src={productLineup} alt="Healthy Hydration" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white max-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">100%</div>
                    <p className="text-sm font-black text-slate-800 leading-tight">Pure & Safe</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-[#155baf]" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#1a365d] mb-6 tracking-tight leading-tight">
                  Vitality in Every Drop
                </h2>
                <div className="space-y-4 text-lg text-slate-600 mb-8 leading-relaxed">
                  <p>
                    Hydration is the core of a healthy lifestyle. Aqualia table water goes through rigorous purification processes to ensure every drop boosts your vitality and well-being.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#155baf] shrink-0 mt-0.5" />
                      <span><strong>Optimized pH Levels:</strong> Balanced for perfect absorption.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#155baf] shrink-0 mt-0.5" />
                      <span><strong>Rigorous Filtration:</strong> Multi-stage reverse osmosis process.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-[#155baf] shrink-0 mt-0.5" />
                      <span><strong>Essential Minerals:</strong> Fortified for your daily health needs.</span>
                    </li>
                  </ul>
                </div>
                <Link to="/health-impact">
                  <Button className="bg-[#155baf] hover:bg-[#114b93] text-white font-bold px-8 h-12 rounded-full shadow-md uppercase tracking-wide transition-all hover:scale-105">
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-slate-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a365d] mb-4 tracking-tight">Get in Touch</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Have questions or need assistance? Our dedicated support team is always ready to help you with your orders, partnerships, or general inquiries.
              </p>
              <Link to="/contact-us">
                <Button className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-8 h-12 rounded-full shadow-md uppercase tracking-wide transition-all hover:scale-105">
                  Contact Us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;
