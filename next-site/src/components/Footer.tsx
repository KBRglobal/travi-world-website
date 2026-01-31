'use client';

import { Link } from '@/i18n/navigation';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const footerLinks = {
  explore: {
    title: 'Explore',
    links: [
      { name: 'Destinations', href: '/destinations' },
      { name: 'Hotels', href: '/category/hotels' },
      { name: 'Attractions', href: '/category/attractions' },
      { name: 'Dining', href: '/category/dining' },
      { name: 'Travel Guides', href: '/guides' },
      { name: 'News', href: '/news' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  },
};

const destinations = [
  'Abu Dhabi', 'Dubai', 'Ras Al Khaimah',
  'London', 'Paris', 'Amsterdam', 'Barcelona', 'Rome', 'Istanbul',
  'New York', 'Las Vegas', 'Los Angeles', 'Miami',
  'Tokyo', 'Hong Kong', 'Singapore', 'Bangkok',
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/travi.world', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/travi.world', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/traviworld', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@traviworld', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com/company/travi-world', label: 'LinkedIn' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Footer({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  return (
    <footer dir={dir} className="bg-[#0C0C0C] pt-16 lg:pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ── Top Section ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logos/Logotype_Primary.svg"
                alt="TRAVI"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML =
                    '<span class="text-2xl font-extrabold"><span class="text-white">TRAV</span><span class="text-[#6443F4]">I</span></span>';
                }}
              />
            </Link>

            <p className="text-white/50 text-sm mb-5 max-w-xs leading-relaxed">
              Discover 17+ destinations with expert travel guides, hotel
              reviews, and insider tips in 30 languages.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#573CD0] shrink-0" />
                <span>Suite 4.3.02, Eurotowers, Gibraltar</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-[#573CD0] shrink-0" />
                <a
                  href="mailto:info@travi.world"
                  className="hover:text-white transition-colors"
                >
                  info@travi.world
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#6443F4] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-medium mb-4 text-sm">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Popular Destinations ───────────────────────────────────── */}
        <div className="py-8 border-t border-white/10">
          <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">
            Popular Destinations
          </h4>
          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <Link
                key={dest}
                href={`/destinations/${dest.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-3 py-1.5 bg-white/5 rounded-full text-white/50 text-xs hover:bg-[#6443F4]/20 hover:text-white transition-colors"
              >
                {dest}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Partner Logos ──────────────────────────────────────────── */}
        <div className="py-6 border-t border-white/10">
          <p className="text-white/40 text-xs mb-4">
            Our Affiliate Partners
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {[
              'Booking.com',
              'GetYourGuide',
              'TripAdvisor',
              'Tiqets',
              'Travelpayouts',
            ].map((partner) => (
              <span key={partner} className="text-white/30 text-sm">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-start">
              <p className="text-white/30 text-sm">
                © 2026 TRAVI World. All rights reserved.
              </p>
              <p className="text-white/20 text-xs mt-1">
                Operated by KBR Global Creative Consulting Ltd, Gibraltar
                (Company No. 125571)
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-white/30 hover:text-white text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-white/30 hover:text-white text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-white/30 hover:text-white text-sm transition-colors"
              >
                Cookies
              </Link>
              <button className="text-white/30 hover:text-white text-sm transition-colors">
                Cookie Settings
              </button>
            </div>
          </div>

          {/* AI Disclaimer */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-white/20 text-xs text-center max-w-3xl mx-auto">
              Content on TRAVI World is AI-generated and may contain
              inaccuracies. Please verify all information independently before
              making travel decisions. We are not a travel agency and do not
              process bookings directly.{' '}
              <Link
                href="/affiliate-disclosure"
                className="text-[#6443F4] hover:underline"
              >
                Learn more about our affiliate relationships
                <ExternalLink className="w-3 h-3 inline ltr:ml-0.5 rtl:mr-0.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
