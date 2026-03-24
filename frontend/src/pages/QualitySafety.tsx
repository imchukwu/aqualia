import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShieldCheck, Droplets } from 'lucide-react';

const steps = [
    { number: '01', label: 'Source Water Selection', desc: 'We carefully select and assess water sources to ensure a safe starting point for purification.' },
    { number: '02', label: 'Sand Filtration', desc: 'Large particles and sediments are removed through multi-bed sand filtration layers.' },
    { number: '03', label: 'Carbon Filtration', desc: 'Activated carbon absorbs chlorine, organic compounds, and unwanted odours.' },
    { number: '04', label: 'Reverse Osmosis', desc: 'High-pressure membranes remove dissolved salts, heavy metals, and microscopic impurities.' },
    { number: '05', label: 'UV Sterilization', desc: 'Ultraviolet light eliminates bacteria, viruses, and pathogens without any chemicals.' },
    { number: '06', label: 'Ozone Treatment', desc: 'Ozone provides a powerful final disinfection stage that ensures total microbial safety.' },
    { number: '07', label: 'Automated Bottling', desc: 'Sealed in a hygienic, automated facility — zero human contact from fill to cap.' },
];

const QualitySafety = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 overflow-x-hidden">

                {/* Hero */}
                <section className="py-16 md:py-24 bg-blue-50 border-b border-blue-100">
                    <div className="container mx-auto px-4 lg:px-8 text-center">
                        <div className="w-20 h-20 bg-[#155baf] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#1a365d] mb-6 tracking-tight">Quality & Safety</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Every drop of Aqualia water passes through a rigorous 7-stage purification process. NAFDAC & SON compliant — every batch tested and sealed before distribution.
                        </p>
                    </div>
                </section>

                {/* Process Steps */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                        <div className="text-center mb-12">
                            <p className="text-[#155baf] font-bold tracking-wider uppercase text-sm mb-2">Our Water Process</p>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a365d] tracking-tight">From Source to Seal</h2>
                        </div>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-8 md:left-10 top-0 bottom-0 w-0.5 bg-blue-100 hidden sm:block" />
                            <div className="space-y-8">
                                {steps.map((step, i) => (
                                    <div key={i} className="flex gap-6 items-start relative">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#155baf] text-white flex flex-col items-center justify-center shrink-0 shadow-lg shadow-blue-400/20 z-10">
                                            <span className="text-[10px] font-bold opacity-70 leading-none">STEP</span>
                                            <span className="text-xl md:text-2xl font-black leading-none">{step.number}</span>
                                        </div>
                                        <div className="bg-blue-50 rounded-2xl p-5 md:p-6 flex-1 border border-blue-100">
                                            <h3 className="text-lg md:text-xl font-black text-[#1a365d] mb-1">{step.label}</h3>
                                            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Final note */}
                        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 bg-[#1a365d] rounded-2xl p-6 md:p-8 text-white">
                            <Droplets className="w-12 h-12 shrink-0 text-blue-300" />
                            <p className="text-lg font-semibold leading-snug">
                                <strong className="text-white">Every batch is tested and sealed before distribution.</strong> Our in-house lab and third-party NAFDAC verification ensure zero compromise on safety.
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default QualitySafety;
