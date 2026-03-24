import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Distributors = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Header />
            <main className="flex-1 overflow-x-hidden pt-20 pb-24">
                <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Truck className="w-10 h-10 text-[#155baf]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#1a365d] mb-6 tracking-tight">Become an Aqualia Distributor</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            We are actively appointing distributors across Nigeria. Join our fast-growing network and build a profitable business providing your community with premium, pure table water.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8">
                        <h2 className="text-3xl font-black text-[#1a365d] mb-8 text-center">Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Competitive margins on all products",
                                "Territory protection for your area",
                                "Strong brand support & free marketing materials",
                                "Fast-moving consumer product — guaranteed demand",
                                "Factory-direct pricing for maximum profitability",
                            ].map((benefit, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-[#155baf]" />
                                    </div>
                                    <p className="text-lg text-slate-700 font-medium">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="bg-[#f0f5ff] rounded-3xl p-8 md:p-12 mb-10">
                        <h2 className="text-2xl font-black text-[#1a365d] mb-6 text-center">Requirements</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            {[
                                { emoji: '📦', label: 'Minimum order quantity' },
                                { emoji: '🏠', label: 'Adequate storage space' },
                                { emoji: '🤝', label: 'Commitment to brand integrity' },
                            ].map((req, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2 bg-white rounded-2xl p-6 shadow-sm flex-1">
                                    <span className="text-3xl">{req.emoji}</span>
                                    <p className="font-semibold text-[#1a365d]">{req.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="text-center">
                        <Link to="/distributor/register">
                            <Button className="bg-[#155baf] hover:bg-[#114b93] text-white font-black px-12 h-16 text-lg rounded-full shadow-lg uppercase tracking-wider transition-all hover:scale-105">
                                Apply Now <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Distributors;
