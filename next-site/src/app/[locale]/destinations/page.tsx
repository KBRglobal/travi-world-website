import { query } from '@/lib/db';
import { MapPin, ArrowRight, Globe, Landmark } from 'lucide-react';
import type { Metadata } from 'next';

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
  description: 'Explore our curated collection of destinations worldwide with attractions, guides, and more.',
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
type Props = { params: Promise<{ locale: string }> };

export default async function DestinationsPage({ params }: Props) {
  const { locale } = await params;

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
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#573CD0] to-[#6443F4]">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5" />
        <div className="absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Globe className="h-4 w-4" />
            {destinations.length} Destinations Worldwide
          </div>
          <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Explore the World
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Curated travel guides with real attractions, insider tips, and everything you need for your next adventure.
          </p>
        </div>
      </section>

      {/* ── Grid ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => {
            const attractionCount = countMap.get(d.name) || 0;
            const gradFrom = d.mood_gradient_from || 'rgba(87,60,208,0.85)';
            const gradTo = d.mood_gradient_to || 'rgba(100,67,244,0.7)';

            return (
              <a
                key={d.id}
                href={`/${locale}/destinations/${d.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#573CD0]/10"
              >
                {/* Image / Gradient */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Attraction count badge */}
                  {attractionCount > 0 && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#573CD0] shadow backdrop-blur">
                      <Landmark className="h-3 w-3" />
                      {attractionCount} attractions
                    </div>
                  )}

                  {/* Name + Country over image */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-2xl font-bold leading-tight text-white drop-shadow-md">
                      {d.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                      <MapPin className="h-3.5 w-3.5" />
                      {d.country}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  {d.mood_tagline ? (
                    <p className="text-sm italic text-slate-500 line-clamp-1">
                      {d.mood_tagline}
                    </p>
                  ) : d.summary ? (
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {d.summary}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Discover {d.name}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#573CD0] transition-colors group-hover:text-[#6443F4]">
                    Explore {d.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
