import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#0f2e5a] text-white">
      <div className="container mx-auto py-12 md:py-16 px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Home</Link></li>
              <li><Link to="/products" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Products</Link></li>
              <li><Link to="/#promotions" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Promotions</Link></li>
              <li><Link to="/quality-safety" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Quality & Safety</Link></li>
              <li><Link to="/contact-us" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Contact Us</Link></li>
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 tracking-wide">Our Products</h4>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Bottled Water</Link></li>
              <li><Link to="/products" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Dispenser Water</Link></li>
              <li><Link to="/products" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Sachet Packs</Link></li>
              <li><Link to="/products" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Accessories</Link></li>
            </ul>
          </div>

          {/* Become Distributor */}
          <div>
            <h4 className="font-bold text-lg text-white mb-6 tracking-wide">Become Distributor.</h4>
            <ul className="space-y-4">
              <li><Link to="/distributor/register" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Start Local Business</Link></li>
              <li><Link to="/distributor/register" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">High Commissions</Link></li>
              <li><Link to="/distributor/register" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Marketing Support</Link></li>
              <li><Link to="/distributor/register" className="text-[13px] text-white/80 hover:text-blue-300 font-medium tracking-wider flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-blue-300 before:rounded-full before:mr-2 before:opacity-0 hover:before:opacity-100 transition-all">Training Programs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:pl-8 lg:border-l lg:border-white/10">
            <h4 className="font-bold text-lg text-white mb-6 tracking-wide opacity-0 hidden lg:block">Contact Info</h4>
            <ul className="space-y-5">
              <li className="flex items-center gap-4">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] text-white font-medium tracking-wider">69060573481</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] text-white font-medium tracking-wider">+234 000 456 789</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] text-white font-medium tracking-wider">info@aqualiawaters.com</span>
              </li>
              <li className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/50 tracking-wider uppercase font-bold">
              © 2026 Aqualia Table Water. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wider uppercase font-bold">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[11px] text-white/50 hover:text-white transition-colors tracking-wider uppercase font-bold">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
