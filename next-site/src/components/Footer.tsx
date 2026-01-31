'use client';

import {
  Globe,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const socials = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
] as const;

const exploreLinks = [
  'Destinations',
  'Hotels',
  'Attractions',
  'Dining',
  'Guides',
  'News',
] as const;

const companyLinks = ['About Us', 'Careers', 'Press', 'Blog', 'Contact'] as const;

const legalLinks = ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'GDPR', 'Sitemap'] as const;

const popularDestinations = [
  'Dubai',
  'Paris',
  'London',
  'Tokyo',
  'New York',
  'Istanbul',
  'Barcelona',
  'Bangkok',
  'Rome',
  'Bali',
  'Singapore',
  'Marrakech',
] as const;

const affiliatePartners = [
  'Booking.com',
  'Expedia',
  'TripAdvisor',
  'Airbnb',
  'Skyscanner',
  'GetYourGuide',
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Footer({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const year = new Date().getFullYear();

  return (
    <footer dir={dir} className="bg-gray-950 text-gray-300">
      {/* ---- Main grid ---- */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* ---- Brand column ---- */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <a href="/" className="inline-flex items-center gap-2">
              <Globe className="h-7 w-7 text-[#6443F4]" strokeWidth={2.2} />
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-white">TRAV</span>
                <span className="text-[#6443F4]">I</span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Your trusted companion for discovering the world's most incredible destinations.
              Expert guides, honest reviews, and insider tips.
            </p>

            {/* Address */}
            <div className="mt-6 space-y-2 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6443F4]" />
                Suite 4.012, EuroWorks, Shivane
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#6443F4]" />
                <a
                  href="mailto:info@travi.world"
                  className="transition-colors hover:text-white"
                >
                  info@travi.world
                </a>
              </p>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-all hover:bg-[#573CD0] hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ---- Link columns ---- */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {/* Explore */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Explore
              </h4>
              <ul className="space-y-2.5">
                {exploreLinks.map((l) => (
                  <li key={l}>
                    <a
                      href={`/${l.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l}>
                    <a
                      href={`/${l.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l}>
                    <a
                      href={`/${l.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---- Popular Destinations ---- */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Popular Destinations
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map((d) => (
              <a
                key={d}
                href={`/destinations/${d.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition-all hover:border-[#573CD0]/40 hover:bg-[#573CD0]/10 hover:text-white"
              >
                {d}
              </a>
            ))}
          </div>
        </div>

        {/* ---- Affiliate Partners ---- */}
        <div className="mt-10 border-t border-white/10 pt-10">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Our Affiliate Partners
          </h4>
          <div className="flex flex-wrap items-center gap-6">
            {affiliatePartners.map((p) => (
              <span
                key={p}
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Copyright bar ---- */}
      <div className="border-t border-white/10 bg-gray-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {year} TRAVI. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/terms-of-service" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/cookie-policy" className="transition-colors hover:text-white">
              Cookies
            </a>
            <button className="transition-colors hover:text-white">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
