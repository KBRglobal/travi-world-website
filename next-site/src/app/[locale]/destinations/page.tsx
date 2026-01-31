import { query } from '@/lib/db';
import { isRtl, type Locale } from '@/i18n/config';
import { MapPin, ArrowRight, Globe, Landmark } from 'lucide-react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Destination {
  id: string;
  name: string;
  country: string;
  slug: string;
  summary: string | null;
  card_image: string | null;
  card_image_alt: string | null;
  mood_tagline: string | null;
  mood_gradient_from: string | null;
  mood_gradient_to: string | null;
}

interface CityCount {
  city_name: string;
  count: string;
}

export const metadata: Metadata = {
  title: 'Destinations — Travi.world',
  description:
    'Explore our curated collection of destinations worldwide with attractions, guides, and more.',
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
type Props = { params: Promise<{ locale: string }> };

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

  // Fetch all active destinations
  const destinations = await query<Destination>(
    `SELECT id, name, country, slug, summary, card_image, card_image_alt,
            mood_tagline, mood_gradient_from, mood_gradient_to
     FROM destinations
     WHERE is_active = true AND id != 'test-city'
     ORDER BY name`,
  );

  // Fetch attraction counts per city
  const counts = await query<CityCount>(
    `SELECT city_name, count(*)::text as count
     FROM tiqets_attractions
     GROUP BY city_name`,
  );
  const countMap = new Map(counts.map((c) => [c.city_name, parseInt(c.count)]));

  return (
    <div className="min-h-screen bg-white">
      <Navbar dir={dir} />

      <main className="pt-16">
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0f0f0f]">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#6443F4]/10" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-[#573CD0]/10" />
          <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-[#6443F4]/5" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6443F4]/20 rounded-full mb-6">
              <Globe className="h-4 w-4 text-[#6443F4]" />
              <span className="text-sm font-medium text-[#6443F4]">
                {destinations.length} Destinations Worldwide
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Explore the <span className="text-gradient">World</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/60">
              Curated travel guides with real attractions, insider tips, and
              everything you need for your next adventure.
            </p>
          </div>
        </section>

        {/* ── Grid ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map((d) => {
              const attractionCount = countMap.get(d.name) || 0;
              const gradFrom = d.mood_gradient_from || 'rgba(87,60,208,0.85)';
              const gradTo = d.mood_gradient_to || 'rgba(100,67,244,0.7)';

              return (
                <a
                  key={d.id}
                  href={`/${locale}/destinations/${d.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#e5e5e5] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#573CD0]/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {d.card_image ? (
                      <img
                        src={d.card_image}
                        alt={d.card_image_alt || `${d.name}, ${d.country}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{
                          background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                        }}
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Attraction count badge */}
                    {attractionCount > 0 && (
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-[#6443F4] px-2.5 py-1 text-xs font-medium text-white shadow">
                        <Landmark className="h-3 w-3" />
                        {attractionCount} attractions
                      </div>
                    )}

                    {/* Name + Country over image */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MapPin className="h-3.5 w-3.5 text-white/70" />
                        <span className="text-white/70 text-xs">
                          {d.country}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-0.5">
                        {d.name}
                      </h3>
                      {d.mood_tagline && (
                        <p className="text-white/60 text-sm italic">
                          {d.mood_tagline}
                        </p>
                      )}

                      {/* Explore CTA */}
                      <div className="flex items-center gap-2 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-white text-sm font-medium">
                          Explore {d.name}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#6443F4] flex items-center justify-center">
                          <ArrowRight className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <Footer dir={dir} />
    </div>
  );
}
