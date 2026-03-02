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
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Truck className="w-10 h-10 text-[#16604b]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#1a365d] mb-6 tracking-tight">Become a Partner</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Join Aqualia's fast-growing distribution network. Build a profitable business providing your community with premium, pure table water.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-12">
                        <h2 className="text-3xl font-black text-[#1a365d] mb-8 text-center">Why Partner With Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Guaranteed product supply from state-of-the-art facilities",
                                "Wholesale pricing with up to 15% volume discounts",
                                "Free marketing materials and starter packs",
                                "Dedicated logistics and territory support",
                                "Easy-to-use digital dashboard for orders and tracking",
                                "Flexible entry minimums (Start making revenue with ₦10,000)"
                            ].map((benefit, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-green-700" />
                                    </div>
                                    <p className="text-lg text-slate-700 font-medium">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <Link to="/distributor/register">
                            <Button className="bg-[#16604b] hover:bg-[#12503e] text-white font-black px-12 h-16 text-lg rounded-full shadow-lg uppercase tracking-wider transition-all hover:scale-105">
                                Register as Distributor Now <ArrowRight className="ml-3 w-6 h-6" />
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
