import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import { MapPin, Star, ArrowRight, Landmark, ChevronLeft } from 'lucide-react';
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
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image: string | null;
  card_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  mood_tagline: string | null;
  mood_primary_color: string | null;
  mood_gradient_from: string | null;
  mood_gradient_to: string | null;
}

interface Attraction {
  id: string;
  slug: string;
  title: string;
  city_name: string;
  tiqets_images: { large: string; medium: string; alt_text: string }[] | null;
  tiqets_rating: string | null;
  tiqets_review_count: number | null;
  price_usd: string | null;
  primary_category: string | null;
  venue_name: string | null;
  ai_content: Record<string, unknown> | null;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await query<Destination>(
    'SELECT meta_title, meta_description, name, country FROM destinations WHERE id = $1',
    [slug],
  );
  if (!rows.length) return {};
  const d = rows[0];
  return {
    title: d.meta_title || `${d.name}, ${d.country} — Travi.world`,
    description: d.meta_description || `Travel guide for ${d.name}, ${d.country}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function DestinationPage({ params }: Props) {
  const { locale, slug } = await params;

  // Fetch destination by id (id matches URL slug e.g. "rome")
  const destinations = await query<Destination>(
    'SELECT * FROM destinations WHERE id = $1 AND is_active = true',
    [slug],
  );
  if (!destinations.length) notFound();
  const dest = destinations[0];

  // Fetch attractions for this city
  const attractions = await query<Attraction>(
    `SELECT id, slug, title, city_name, tiqets_images, tiqets_rating,
            tiqets_review_count, price_usd, primary_category, venue_name, ai_content
     FROM tiqets_attractions
     WHERE city_name = $1
     ORDER BY tiqets_review_count DESC NULLS LAST, title
     LIMIT 60`,
    [dest.name],
  );

  const gradFrom = dest.mood_gradient_from || 'rgba(87, 60, 208, 0.85)';
  const gradTo = dest.mood_gradient_to || 'rgba(100, 67, 244, 0.7)';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
          }}
        />
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <a
            href={`/${locale}/destinations`}
            className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
            All Destinations
          </a>

          <div className="flex items-center gap-3 text-white/70">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">{dest.country}</span>
          </div>

          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {dest.name}
          </h1>

          {dest.mood_tagline && (
            <p className="mt-4 text-xl font-medium text-white/80 italic">
              {dest.mood_tagline}
            </p>
          )}

          {dest.summary && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
              {dest.summary}
            </p>
          )}

          {dest.hero_subtitle && (
            <p className="mt-3 max-w-3xl text-base text-white/60">
              {dest.hero_subtitle}
            </p>
          )}

          <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Landmark className="h-4 w-4" />
              {attractions.length} attraction{attractions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* ── Attractions Grid ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Things to Do in {dest.name}
        </h2>
        <p className="mb-10 text-base text-slate-500">
          {attractions.length} experiences and attractions to explore
        </p>

        {attractions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <Landmark className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-medium text-slate-500">
              Attractions coming soon for {dest.name}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((a) => {
              const img =
                a.tiqets_images?.[0]?.large || a.tiqets_images?.[0]?.medium;
              const rating = a.tiqets_rating
                ? parseFloat(a.tiqets_rating)
                : null;
              const hasContent = !!a.ai_content?.introduction;

              return (
                <a
                  key={a.id}
                  href={`/${locale}/attractions/${a.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#573CD0]/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#573CD0]/20 to-[#6443F4]/20">
                    {img && (
                      <img
                        src={img}
                        alt={a.tiqets_images?.[0]?.alt_text || a.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Price badge */}
                    {a.price_usd && (
                      <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#573CD0] shadow backdrop-blur">
                        From ${a.price_usd}
                      </div>
                    )}

                    {/* Category badge */}
                    {a.primary_category && (
                      <div className="absolute right-3 top-3 rounded-lg bg-[#573CD0]/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                        {a.primary_category}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 group-hover:text-[#573CD0] transition-colors">
                        {a.title}
                      </h3>
                      {a.venue_name && (
                        <p className="mt-1 text-xs text-slate-400 truncate">
                          {a.venue_name}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        {rating !== null && (
                          <>
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-slate-600">
                              {rating.toFixed(1)}
                              {a.tiqets_review_count != null &&
                                ` (${a.tiqets_review_count.toLocaleString()})`}
                            </span>
                          </>
                        )}
                        {!hasContent && (
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-400">
                            Preview
                          </span>
                        )}
                      </div>

                      {/* Arrow */}
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#573CD0] transition-colors group-hover:text-[#6443F4]">
                        Explore
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
