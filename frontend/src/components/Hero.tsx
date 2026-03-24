import { CheckCircle, Users, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import productLineup from '@/assets/products/product-lineup.jpeg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-blue-50 flex flex-col justify-center pt-10 pb-16 min-h-[85vh]">
      {/* Background with waterfall/water aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-blue-50/30 z-0" />
      {/* Fallback wrapper over gradients for visual depth */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-400/20 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-[#155baf]/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col justify-center h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8 pb-12">
          {/* Content */}
          <div className="space-y-6 max-w-2xl relative z-20">
            {/* Logo Text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#155baf] tracking-tighter drop-shadow-sm animate-fade-in-up" style={{ fontFamily: 'sans-serif' }}>
              AQUALIA
            </h1>

            <div className="space-y-3 animate-fade-in-up delay-100">
              <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold text-[#1a365d] leading-[1.1] tracking-tight">
                Pure Water. Trusted Quality. Everywhere.
                <br />
                {/* <span className="text-[#1a365d] font-semibold text-2xl md:text-[34px] leading-tight mt-1 block tracking-normal">- Every Drop Counts</span> */}
              </h2>
              <p className="text-base md:text-lg text-slate-700 font-medium max-w-md mt-4 leading-snug">
                Aqualia Table Water is hygienically processed, NAFDAC-approved drinking water designed for homes, offices, events, and distributors across Nigeria.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-up delay-200">
              <Link to="/distributors">
                <Button size="lg" className="w-full sm:w-auto h-[3.25rem] px-8 text-sm bg-[#155baf] hover:bg-[#114b93] text-white font-black uppercase tracking-widest rounded-md shadow-lg shadow-[#155baf]/30 hover:scale-105 transition-all duration-300">
                 Become a Distributor
                </Button>
              </Link>
              <Link to="/distributor/register">
                <Button size="lg" className="w-full sm:w-auto h-[3.25rem] px-8 text-sm bg-[#e53e3e] hover:bg-[#c53030] text-white font-bold uppercase tracking-widest rounded-md shadow-lg shadow-[#e53e3e]/30 hover:scale-105 transition-all duration-300">
                  Order Water
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-up delay-300 lg:ml-auto w-full">
            <div className="relative z-20">
              <img
                src={productLineup}
                alt="Aqualia Water Products and Family"
                className="relative w-full h-auto object-cover object-center transform lg:scale-110 drop-shadow-2xl mix-blend-multiply"
                style={{ mixBlendMode: 'normal' }}
              />
            </div>
            {/* Decorative water splash effect behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-300/30 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] mt-auto border border-blue-50 px-6 py-5 md:px-10 md:py-6 animate-fade-in-up delay-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 divide-y md:divide-y-0 md:divide-x divide-blue-100/80">

            {/* Badge 1 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-start w-full pt-4 md:pt-0">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Droplets className="w-6 h-6 text-[#155baf]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl md:text-2xl font-black text-[#1a365d] leading-none mb-1">1000+ <span className="text-[10px] md:text-xs">LITRES</span></span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] leading-none">Delivered Today</span>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-4 flex-1 justify-center w-full pt-5 md:pt-0 pl-0 md:pl-8">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#155baf]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl md:text-2xl font-black text-[#1a365d] leading-none mb-1">500+ <span className="text-[10px] md:text-xs">HAPPY</span></span>
                <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] leading-none">Customers</span>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-4 flex-1 justify-center md:justify-end w-full pt-5 md:pt-0 pl-0 md:pl-8">
              <div className="w-12 h-12 rounded-full bg-[#155baf] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl md:text-2xl font-black text-[#1a365d] leading-none mb-1">100%</span>
                <span className="text-[10px] md:text-[11px] font-bold text-[#155baf] uppercase tracking-[0.15em] leading-none">Quality Tested</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
