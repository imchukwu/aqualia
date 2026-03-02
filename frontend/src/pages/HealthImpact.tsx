import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Shield, Activity, Droplets } from 'lucide-react';

const HealthImpact = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white">
            <Header />
            <main className="flex-1 overflow-x-hidden pt-20 pb-24">
                <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-[#155baf]" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#1a365d] mb-6 tracking-tight">Health & Wellness</h1>
                        <p className="text-xl text-slate-600">
                            Hydration is the foundation of human health. See why Aqualia's rigorous purification makes it the best choice for you and your family.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-blue-50 p-8 rounded-3xl text-center">
                            <Shield className="w-12 h-12 text-[#155baf] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1a365d] mb-4">100% Contaminant Free</h3>
                            <p className="text-slate-600">Our multi-stage reverse osmosis filtration removes heavy metals, bacteria, and impurities.</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-3xl text-center">
                            <Activity className="w-12 h-12 text-[#155baf] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1a365d] mb-4">Balanced pH Level</h3>
                            <p className="text-slate-600">Perfectly balanced pH helps maintain your body's natural state and improves nutrient absorption.</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-3xl text-center">
                            <Droplets className="w-12 h-12 text-[#155baf] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1a365d] mb-4">Essential Minerals</h3>
                            <p className="text-slate-600">Fortified with the exact trace minerals your body needs to stay energized throughout the day.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HealthImpact;
