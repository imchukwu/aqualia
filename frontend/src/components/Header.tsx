import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Logo from './Logo';
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
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact' },
    { href: '/track-order', label: 'Track Order' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors relative py-2 ${isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                  }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-48 h-9"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>


            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {!user ? (
              <Link to="/auth" className="hidden md:block">
                <Button variant="default" size="sm" className="gradient-ocean text-primary-foreground shadow-soft hover:shadow-elevated transition-shadow">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            ) : (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
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
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="px-4">
                <Input type="search" placeholder="Search products..." className="w-full" />
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${isActive(link.href)
                        ? 'text-primary bg-secondary'
                        : 'text-muted-foreground hover:bg-secondary/50'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="px-4 pt-2 pb-4">
                {!user ? (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gradient-ocean text-primary-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <div className="px-3 py-3 mb-4 bg-secondary/50 rounded-lg">
                      <p className="font-medium text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {user.role === 'DISTRIBUTOR' && (
                      <Link to="/distributor/dashboard" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">Distributor Dashboard</Button>
                      </Link>
                    )}
                    {user.role === 'ADMIN' && (
                      <Link to="/admin/dashboard" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">Admin Dashboard</Button>
                      </Link>
                    )}
                    <Link to="/track-order" className="block w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">Order History</Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-2" onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}>
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
