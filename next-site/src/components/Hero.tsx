'use client';

import {
  Globe,
  MapPin,
  Search,
  Play,
  Plane,
  Hotel,
  Package,
  SlidersHorizontal,
  Star,
  Shield,
  Award,
  Users,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Filter pills                                                       */
/* ------------------------------------------------------------------ */
const filters = [
  { label: 'Flights', icon: Plane },
  { label: 'Hotels', icon: Hotel },
  { label: 'Pkg', icon: Package },
  { label: 'Select', icon: SlidersHorizontal },
] as const;

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */
const stats = [
  { value: '17+', label: 'Countries', icon: Globe },
  { value: '500+', label: 'Guides', icon: BookOpen },
  { value: '10K+', label: 'Reviews', icon: MessageSquare },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Hero({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#573CD0]/[0.03] to-[#6443F4]/[0.06]"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 end-0 h-96 w-96 rounded-full bg-[#573CD0]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 start-0 h-72 w-72 rounded-full bg-[#6443F4]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* ---- Badge ---- */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#573CD0]/20 bg-[#573CD0]/5 px-4 py-1.5 text-sm font-medium text-[#573CD0]">
            <Globe className="h-4 w-4" />
            Explore the World
          </div>

          {/* ---- Heading ---- */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Discover Your{' '}
            <span className="bg-gradient-to-r from-[#573CD0] to-[#6443F4] bg-clip-text text-transparent">
              Next Adventure
            </span>
          </h1>

          {/* ---- Subtitle ---- */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Expert travel guides, honest reviews, and insider tips to help you plan unforgettable
            journeys across 17&nbsp;countries and counting.
          </p>

          {/* ---- Search bar ---- */}
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg shadow-[#573CD0]/5 transition-shadow focus-within:shadow-[#573CD0]/10 sm:p-2.5">
            <div className="flex flex-1 items-center gap-2 ps-3">
              <MapPin className="h-5 w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none sm:text-base"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#573CD0] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#573CD0]/25 transition-all hover:bg-[#6443F4] hover:shadow-lg active:scale-[0.98] sm:px-6 sm:py-3">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* ---- Filter pills ---- */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-all hover:border-[#573CD0]/30 hover:bg-[#573CD0]/5 hover:text-[#573CD0] sm:text-sm"
              >
                <f.icon className="h-3.5 w-3.5" />
                {f.label}
              </button>
            ))}
          </div>

          {/* ---- CTA row ---- */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-xl bg-[#573CD0] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#573CD0]/25 transition-all hover:bg-[#6443F4] hover:shadow-xl active:scale-[0.98]"
            >
              Start Exploring
            </a>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#573CD0]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#573CD0]/10 text-[#573CD0]">
                <Play className="h-4 w-4" />
              </span>
              Watch Demo
            </button>
          </div>

          {/* ---- Stats ---- */}
          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-6 sm:max-w-lg">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#573CD0]/10 text-[#573CD0]">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{s.value}</p>
                <p className="text-xs text-gray-500 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* ---- Trust badges ---- */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 sm:gap-6 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-700">4.8</span> Rating
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              Trusted Reviews
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="inline-flex items-center gap-1.5">
              <Award className="h-4 w-4 text-[#573CD0]" />
              Award Winning
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-500" />
              10K+ Travelers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
