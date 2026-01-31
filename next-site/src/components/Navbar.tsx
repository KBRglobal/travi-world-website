'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Globe,
  MapPin,
  Hotel,
  Landmark,
  UtensilsCrossed,
  BookOpen,
  Newspaper,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Language data – 17 languages with flag emoji                      */
/* ------------------------------------------------------------------ */
const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { code: 'zh', flag: '🇨🇳', name: '中文' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'ur', flag: '🇵🇰', name: 'اردو' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fa', flag: '🇮🇷', name: 'فارسی' },
  { code: 'bn', flag: '🇧🇩', name: 'বাংলা' },
  { code: 'fil', flag: '🇵🇭', name: 'Filipino' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
  { code: 'ko', flag: '🇰🇷', name: '한국어' },
  { code: 'he', flag: '🇮🇱', name: 'עברית' },
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski' },
  { code: 'th', flag: '🇹🇭', name: 'ไทย' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { code: 'ms', flag: '🇲🇾', name: 'Bahasa Melayu' },
  { code: 'el', flag: '🇬🇷', name: 'Ελληνικά' },
  { code: 'cs', flag: '🇨🇿', name: 'Čeština' },
  { code: 'sv', flag: '🇸🇪', name: 'Svenska' },
  { code: 'no', flag: '🇳🇴', name: 'Norsk' },
  { code: 'da', flag: '🇩🇰', name: 'Dansk' },
  { code: 'uk', flag: '🇺🇦', name: 'Українська' },
] as const;

/* ------------------------------------------------------------------ */
/*  Nav links                                                          */
/* ------------------------------------------------------------------ */
const navLinks = [
  { label: 'Destinations', href: '/destinations', icon: MapPin },
  { label: 'Hotels', href: '/hotels', icon: Hotel },
  { label: 'Attractions', href: '/attractions', icon: Landmark },
  { label: 'Dining', href: '/dining', icon: UtensilsCrossed },
  { label: 'Guides', href: '/guides', icon: BookOpen },
  { label: 'News', href: '/news', icon: Newspaper },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Navbar({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<(typeof languages)[number]>(languages[0]);
  const langRef = useRef<HTMLDivElement>(null);

  /* close language dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav
      dir={dir}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ---------- Logo ---------- */}
        <a href="/" className="flex items-center gap-2 select-none">
          <Globe className="h-7 w-7 text-[#573CD0]" strokeWidth={2.2} />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#573CD0]">TRAV</span>
            <span className="text-[#6443F4]">I</span>
          </span>
        </a>

        {/* ---------- Desktop links ---------- */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#573CD0]/5 hover:text-[#573CD0]"
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ---------- Right section ---------- */}
        <div className="flex items-center gap-2">
          {/* Search icon */}
          <button
            aria-label="Search"
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#573CD0]"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Language selector (desktop) */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-[#573CD0]/30 hover:text-[#573CD0]"
            >
              <span>{selectedLang.flag}</span>
              <span className="hidden md:inline">{selectedLang.name}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {langOpen && (
              <div className="absolute end-0 top-full mt-2 w-52 rounded-xl border border-gray-100 bg-white py-2 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 z-50">
                <div className="max-h-72 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-[#573CD0]/5 ${
                        selectedLang.code === lang.code
                          ? 'bg-[#573CD0]/5 font-semibold text-[#573CD0]'
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#573CD0] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ---------- Mobile slide-out ---------- */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed inset-y-0 ${
          dir === 'rtl' ? 'left-0' : 'right-0'
        } z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? 'translate-x-0'
            : dir === 'rtl'
              ? '-translate-x-full'
              : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <span className="text-lg font-bold text-[#573CD0]">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="space-y-1 px-3 py-4">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#573CD0]/5 hover:text-[#573CD0]"
              >
                <l.icon className="h-5 w-5" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language list (mobile) */}
        <div className="border-t border-gray-100 px-3 py-4">
          <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Language
          </p>
          <div className="max-h-48 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang);
                  setMobileOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2 text-sm transition-colors hover:bg-[#573CD0]/5 ${
                  selectedLang.code === lang.code
                    ? 'font-semibold text-[#573CD0]'
                    : 'text-gray-600'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
