'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import {
  Globe,
  MapPin,
  BookOpen,
  Building2,
  Camera,
  Utensils,
  Search,
  Menu,
  X,
  ChevronDown,
  Newspaper,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeNames, isRtl, type Locale } from '@/i18n/config';

/* ------------------------------------------------------------------ */
/*  Nav links                                                          */
/* ------------------------------------------------------------------ */
const navLinks = [
  { name: 'Destinations', href: '/destinations' as const, icon: MapPin },
  { name: 'Hotels', href: '/category/hotels' as const, icon: Building2 },
  { name: 'Attractions', href: '/category/attractions' as const, icon: Camera },
  { name: 'Dining', href: '/category/dining' as const, icon: Utensils },
  { name: 'Guides', href: '/guides' as const, icon: BookOpen },
  { name: 'News', href: '/news' as const, icon: Newspaper },
];

/* ------------------------------------------------------------------ */
/*  Locale flags (all 30 from config)                                  */
/* ------------------------------------------------------------------ */
const localeFlags: Record<string, string> = {
  en: '🇬🇧', ar: '🇦🇪', hi: '🇮🇳', zh: '🇨🇳', ru: '🇷🇺', ur: '🇵🇰',
  fr: '🇫🇷', de: '🇩🇪', fa: '🇮🇷', bn: '🇧🇩', fil: '🇵🇭', es: '🇪🇸',
  tr: '🇹🇷', it: '🇮🇹', ja: '🇯🇵', ko: '🇰🇷', he: '🇮🇱',
  pt: '🇧🇷', nl: '🇳🇱', pl: '🇵🇱', th: '🇹🇭', vi: '🇻🇳',
  id: '🇮🇩', ms: '🇲🇾', el: '🇬🇷', cs: '🇨🇿', sv: '🇸🇪',
  no: '🇳🇴', da: '🇩🇰', uk: '🇺🇦',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Navbar({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  /* scroll detection */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* close menus on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);
  }, [pathname]);

  /* close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname || '/', { locale: newLocale as Locale });
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        dir={dir}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.img
                src="/logos/Logotype_Primary.svg"
                alt="TRAVI"
                className="h-8 w-auto"
                whileHover={{ scale: 1.02 }}
                onError={(e) => {
                  // Fallback if SVG logo not found
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML =
                    '<span class="text-2xl font-extrabold"><span class="text-[#573CD0]">TRAV</span><span class="text-[#6443F4]">I</span></span>';
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-[#573CD0] bg-[#573CD0]/10'
                        : 'text-gray-600 hover:text-[#573CD0] hover:bg-[#573CD0]/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:text-[#573CD0] hover:bg-[#573CD0]/5 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{localeFlags[locale] || '🌐'}</span>
                  <span className="text-xs text-gray-400">
                    {locale.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute end-0 top-full mt-2 w-64 max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase">
                        {locales.length} Languages
                      </div>
                      {locales.map((code) => (
                        <button
                          key={code}
                          onClick={() => switchLocale(code)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            locale === code
                              ? 'text-[#573CD0] bg-[#573CD0]/5'
                              : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{localeFlags[code] || '🌐'}</span>
                          <span className="flex-1 text-start">{localeNames[code]}</span>
                          <span className="text-xs text-gray-400">
                            {code.toUpperCase()}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/search">
                <button className="p-2 rounded-xl text-gray-600 hover:text-[#573CD0] hover:bg-[#573CD0]/5 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </Link>

              <Link href="/newsletter">
                <button className="bg-[#573CD0] hover:bg-[#4a32b3] text-white text-sm px-5 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-[#573CD0]/25">
                  Subscribe
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="bg-white border-t border-gray-200 shadow-xl mx-4 rounded-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
              <div className="p-4 space-y-1">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          active
                            ? 'text-[#573CD0] bg-[#573CD0]/10'
                            : 'text-gray-600 hover:text-[#573CD0] hover:bg-[#573CD0]/5'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="px-4 py-2 text-xs font-medium text-gray-400 uppercase">
                    {locales.length} Languages
                  </p>
                  <div className="grid grid-cols-6 gap-2 px-4 py-2">
                    {locales.map((code) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`p-2 rounded-lg text-center transition-colors ${
                          locale === code
                            ? 'bg-[#573CD0]/10 ring-2 ring-[#573CD0]'
                            : 'hover:bg-gray-100'
                        }`}
                        title={localeNames[code]}
                      >
                        <span className="text-lg">
                          {localeFlags[code] || '🌐'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/search" className="block">
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Search className="w-4 h-4" />
                      Search
                    </button>
                  </Link>
                  <Link href="/newsletter" className="block">
                    <button className="w-full px-4 py-3 rounded-xl bg-[#573CD0] text-white text-sm font-medium hover:bg-[#4a32b3] transition-colors">
                      Subscribe to Newsletter
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
