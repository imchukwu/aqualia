import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const promos = [
    {
        text: "Free delivery on orders over ₦10,000",
        link: "/products",
        action: "Shop Now"
    },
    {
        text: "New: Aqualia Premium Dispenser Bottles now available!",
        link: "/products",
        action: "Explore"
    },
    {
        text: "Get 10% off your first subscription!",
        link: "/auth",
        action: "Sign Up"
    }
];

const PromoBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % promos.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="gradient-ocean text-white relative overflow-hidden py-2 px-4 shadow-sm z-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-white/10 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] animate-slide-in-right z-0" style={{ animationDuration: '20s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }} />

            <div className="container mx-auto relative z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 md:gap-4 overflow-hidden h-6 md:h-7 w-full max-w-2xl relative">
                    {promos.map((promo, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full flex items-center justify-center gap-2 transition-all duration-500 ease-in-out ${index === currentIndex
                                    ? 'opacity-100 transform translate-y-0'
                                    : 'opacity-0 transform translate-y-4' // or -translate-y-4 depending on direction
                                }`}
                        >
                            <Sparkles className="w-4 h-4 text-accent hidden md:block" />
                            <span className="text-xs md:text-sm font-medium tracking-wide truncate">
                                {promo.text}
                            </span>
                            <Link to={promo.link} className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-accent hover:text-white transition-colors ml-1 whitespace-nowrap">
                                {promo.action}
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoBanner;
