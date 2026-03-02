import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Globe, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
import PromoBanner from './PromoBanner';
import { useCart } from '@/store/cartStore';
import useAuthStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/promotions', label: 'Promotions' },
    { href: '/distributors', label: 'Distributors' },
    { href: '/health-impact', label: 'Health Impact' },
    { href: '/contact-us', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white flex flex-col font-sans w-full shadow-sm">
        <PromoBanner />
        {/* Top Info Bar */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-2 md:py-3 gap-3 md:gap-0">
            {/* Logo area */}
            <div className="flex items-center shrink-0">
              <Logo />
            </div>

            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-blue-900 ml-auto">

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>info@aqualiawaters.com</span>
                </div>
                <div className="flex items-center gap-4 border-l border-blue-200 pl-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>98088733881</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>99077389469</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="bg-[#155baf] text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-14 md:h-12">
              {/* Spacer matching Logo width for absolute centering if wanted, else just layout normally. */}

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium hover:text-yellow-400 transition-colors py-3 relative tracking-wide ${isActive(link.href) ? 'text-yellow-400' : 'text-white/90'}`}
                  >
                    {link.label}
                    {link.label === 'Health Impact' && <span className="w-1 h-1 rounded-full bg-white absolute top-1/2 -right-3 transform -translate-y-1/2" />}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0 border-l border-white/20 pl-4">
                {/* Search */}
                <div className="hidden md:flex items-center">
                  {isSearchOpen ? (
                    <div className="flex items-center gap-2 animate-fade-in">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-48 h-8 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-yellow-400"
                        autoFocus
                        onBlur={() => setIsSearchOpen(false)}
                      />
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="text-white hover:text-yellow-400 hover:bg-white/10"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Cart */}
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="relative text-white hover:text-yellow-400 hover:bg-white/10">
                    <ShoppingCart className="w-4 h-4" />
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-yellow-400 text-[#155baf] font-bold border-none">
                        {totalItems}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Auth */}
                {!user ? (
                  <Link to="/auth" className="hidden md:block">
                    <Button variant="ghost" size="sm" className="text-white hover:text-yellow-400 hover:bg-white/10 font-semibold gap-2">
                      <User className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:text-yellow-400 hover:bg-white/10">
                          <User className="w-4 h-4" />
                          <span className="max-w-[100px] truncate">{user.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 mt-2">
                        <DropdownMenuLabel>My Account ({user.role})</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {user.role === 'DISTRIBUTOR' && (
                          <DropdownMenuItem asChild>
                            <Link to="/distributor/dashboard">Distributor Dashboard</Link>
                          </DropdownMenuItem>
                        )}
                        {user.role === 'ADMIN' && (
                          <DropdownMenuItem asChild>
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link to="/track-order">Order History</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-white/10"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#155baf] border-t border-white/10 py-4 animate-fade-in absolute top-full w-full">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="px-4">
                <Input type="search" placeholder="Search products..." className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${isActive(link.href)
                      ? 'text-yellow-400 bg-white/5'
                      : 'text-white/90 hover:bg-white/10'
                      }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="px-4 pt-2 pb-4">
                {!user ? (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-yellow-400 text-blue-900 hover:bg-yellow-500">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <div className="px-3 py-3 mb-4 bg-white/5 rounded-lg">
                      <p className="font-medium text-sm text-white">{user.name}</p>
                      <p className="text-xs text-white/70">{user.email}</p>
                    </div>
                    {user.role === 'DISTRIBUTOR' && (
                      <Link to="/distributor/dashboard" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10">Distributor Dashboard</Button>
                      </Link>
                    )}
                    {user.role === 'ADMIN' && (
                      <Link to="/admin/dashboard" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10">Admin Dashboard</Button>
                      </Link>
                    )}
                    <Link to="/track-order" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start text-white border-white/20 hover:bg-white/10">Order History</Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-white/10 mt-2" onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}>
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

