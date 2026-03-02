import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Promotions = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-blue-50/30">
            <Header />
            <main className="flex-1 overflow-x-hidden pt-20 pb-24">
                <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Gift className="w-10 h-10 text-[#ffc629]" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#1a365d] mb-6 tracking-tight">Current Offers & Promotions</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Discover the best deals on Aqualia premium table water. Save more when you buy in bulk, subscribe, or become a partner.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl p-8 shadow-soft border border-yellow-100 hover:shadow-elevated transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-[40px] -z-10 translate-x-10 -translate-y-10"></div>
                            <h3 className="text-2xl font-black text-[#1a365d] mb-4">Buy 6, Get 1 Free</h3>
                            <p className="text-slate-600 mb-6">Purchase any 6 packs of 1.5L PET bottles or sachets and get one additional pack absolutely free. Offer valid for a limited time.</p>
                            <Link to="/products"><Button className="bg-[#ffc629] hover:bg-[#e6b225] text-[#1a365d] font-bold rounded-full">Shop Now <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                        </div>

                        <div className="bg-[#155baf] text-white rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-[40px] -z-10 translate-x-10 -translate-y-10"></div>
                            <h3 className="text-2xl font-black mb-4">Subscribe & Save 10%</h3>
                            <p className="text-white/90 mb-6">Set up a weekly or monthly delivery schedule and automatically lock in a 10% discount on all your orders forever.</p>
                            <Link to="/products"><Button className="bg-white text-[#155baf] hover:bg-slate-100 font-bold rounded-full">Subscribe <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default Promotions;
