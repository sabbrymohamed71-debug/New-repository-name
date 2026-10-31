import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Menu as MenuIcon, X, ShieldAlert } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#hero' },
    { name: 'أشهر الأطباق', href: '#popular' },
    { name: 'المنيو الكامل', href: '#menu' },
    { name: 'العروض المميزة', href: '#offers' },
    { name: 'معرض الصور', href: '#gallery' },
    { name: 'العنوان والآراء', href: '#info-reviews' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-amber-900/20 py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-stone-950/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Zone */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-stone-100 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-amber-400"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Phone quick call (Desktop) */}
            <a
              href="tel:01207744595"
              className="hidden sm:flex items-center gap-2 text-xs font-bold text-amber-200/90 bg-stone-900/80 px-3 py-2 rounded-lg border border-amber-500/20 hover:border-amber-400/40 transition-colors whitespace-nowrap shrink-0"
              title="اتصال مباشر بالمطعم"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono tabular-nums">01207744595</span>
            </a>

            {/* Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-stone-400 hover:text-amber-400 transition-colors rounded-lg bg-stone-900/60 border border-stone-800 hover:border-amber-500/30"
              title="لوحة تحكم الإدارة"
            >
              <ShieldAlert className="w-4 h-4" />
            </button>

            {/* Primary Order / Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-lg shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:from-amber-300 hover:to-amber-500 transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>اطلب أوردر الآن</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-xs px-2 py-0.5 rounded-full font-mono tabular-nums font-extrabold mr-1 shadow-inner">
                  {cartCount} | {cartTotal} ج.م
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg bg-stone-900/80 border border-stone-800"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-stone-900/95 border border-amber-900/30 rounded-xl shadow-2xl space-y-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-stone-200 hover:text-amber-400 hover:bg-stone-800/60 rounded-lg text-sm font-semibold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
              <a
                href="tel:01207744595"
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-amber-400 bg-stone-800 rounded-lg"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>01207744595</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="px-3 py-2 text-xs font-semibold text-stone-400 bg-stone-800 rounded-lg hover:text-white"
              >
                لوحة الإدارة
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
