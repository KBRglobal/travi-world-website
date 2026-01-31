import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import {
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  Lightbulb,
  Sparkles,
  Map,
  Eye,
  Heart,
  Bus,
  Accessibility,
  Smartphone,
  Ticket,
  XCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Attraction {
  id: string;
  slug: string;
  title: string;
  h1_title: string | null;
  city_name: string;
  venue_name: string | null;
  venue_address: string | null;
  duration: string | null;
  tiqets_images: { large: string; extra_large: string; alt_text: string }[] | null;
  tiqets_rating: string | null;
  tiqets_review_count: number | null;
  price_usd: string | null;
  prediscount_price_usd: string | null;
  discount_percentage: number | null;
  primary_category: string | null;
  wheelchair_access: boolean | null;
  smartphone_ticket: boolean | null;
  instant_ticket_delivery: boolean | null;
  cancellation_policy: string | null;
  tiqets_highlights: string[] | null;
  tiqets_whats_included: string | null;
  tiqets_whats_excluded: string | null;
  product_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  ai_content: {
    introduction?: string;
    whyVisit?: string;
    whatToExpect?: { icon: string; title: string; description: string }[];
    howToGetThere?: { transport: unknown[]; description: string };
    visitorTips?: { icon: string; title: string; description: string }[];
    proTip?: string;
    answerCapsule?: string;
  } | null;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await query<Attraction>(
    'SELECT meta_title, meta_description, title, city_name FROM tiqets_attractions WHERE slug = $1',
    [slug],
  );
  if (!rows.length) return {};
  const a = rows[0];
  return {
    title: a.meta_title || `${a.title} — ${a.city_name} | Travi.world`,
    description: a.meta_description || `Discover ${a.title} in ${a.city_name}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Section helpers                                                    */
/* ------------------------------------------------------------------ */
function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#573CD0]/10">
        <Icon className="h-5 w-5 text-[#573CD0]" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

function ContentSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function AttractionPage({ params }: Props) {
  const { locale, slug } = await params;

  const rows = await query<Attraction>(
    'SELECT * FROM tiqets_attractions WHERE slug = $1',
    [slug],
  );
  if (!rows.length) notFound();
  const attr = rows[0];
  const ai = attr.ai_content;
  const heroImg =
    attr.tiqets_images?.[0]?.extra_large || attr.tiqets_images?.[0]?.large;
  const rating = attr.tiqets_rating ? parseFloat(attr.tiqets_rating) : null;

  // Find destination slug for breadcrumb
  const destRows = await query<{ id: string }>(
    'SELECT id FROM destinations WHERE name = $1 LIMIT 1',
    [attr.city_name],
  );
  const destSlug = destRows[0]?.id;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        {heroImg && (
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt={attr.tiqets_images?.[0]?.alt_text || attr.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30" />
          </div>
        )}
        {!heroImg && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#573CD0] to-[#6443F4]" />
        )}

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <a
              href={`/${locale}/destinations`}
              className="transition hover:text-white"
            >
              Destinations
            </a>
            <span>/</span>
            {destSlug ? (
              <a
                href={`/${locale}/destinations/${destSlug}`}
                className="transition hover:text-white"
              >
                {attr.city_name}
              </a>
            ) : (
              <span>{attr.city_name}</span>
            )}
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px]">
              {attr.title}
            </span>
          </nav>

          {/* Category + Location */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {attr.primary_category && (
              <span className="rounded-full bg-[#573CD0]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {attr.primary_category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="h-4 w-4" />
              {attr.city_name}
              {attr.venue_name && ` · ${attr.venue_name}`}
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {attr.h1_title || attr.title}
          </h1>

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/70">
            {rating !== null && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-white">
                  {rating.toFixed(1)}
                </span>
                {attr.tiqets_review_count != null && (
                  <span>({attr.tiqets_review_count.toLocaleString()} reviews)</span>
                )}
              </span>
            )}
            {attr.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {attr.duration}
              </span>
            )}
            {attr.price_usd && (
              <span className="flex items-center gap-1.5">
                <Ticket className="h-4 w-4" />
                <span className="font-medium text-white">
                  From ${attr.price_usd}
                </span>
                {attr.prediscount_price_usd && (
                  <span className="line-through text-white/50">
                    ${attr.prediscount_price_usd}
                  </span>
                )}
                {attr.discount_percentage != null && attr.discount_percentage > 0 && (
                  <span className="rounded bg-green-500/80 px-1.5 py-0.5 text-xs font-bold text-white">
                    -{attr.discount_percentage}%
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Quick badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {attr.wheelchair_access && (
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <Accessibility className="h-3.5 w-3.5" /> Wheelchair Access
              </span>
            )}
            {attr.smartphone_ticket && (
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <Smartphone className="h-3.5 w-3.5" /> Mobile Ticket
              </span>
            )}
            {attr.instant_ticket_delivery && (
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <Ticket className="h-3.5 w-3.5" /> Instant Delivery
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main column */}
          <div className="space-y-8">
            {/* Introduction */}
            {ai?.introduction && (
              <ContentSection>
                <SectionHeading icon={Sparkles} title="Overview" />
                <p className="text-base leading-relaxed text-slate-600">
                  {ai.introduction}
                </p>
              </ContentSection>
            )}

            {/* Why Visit */}
            {ai?.whyVisit && (
              <ContentSection>
                <SectionHeading icon={Heart} title="Why Visit" />
                <p className="text-base leading-relaxed text-slate-600">
                  {ai.whyVisit}
                </p>
              </ContentSection>
            )}

            {/* What to Expect */}
            {ai?.whatToExpect && ai.whatToExpect.length > 0 && (
              <ContentSection>
                <SectionHeading icon={Eye} title="What to Expect" />
                <div className="space-y-4">
                  {ai.whatToExpect.map((item, i) => (
                    <div key={i}>
                      {item.title && (
                        <h3 className="mb-2 text-lg font-semibold text-slate-800">
                          {item.title}
                        </h3>
                      )}
                      <p className="text-base leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentSection>
            )}

            {/* How to Get There */}
            {ai?.howToGetThere?.description && (
              <ContentSection>
                <SectionHeading icon={Bus} title="How to Get There" />
                <div className="whitespace-pre-line text-base leading-relaxed text-slate-600">
                  {ai.howToGetThere.description}
                </div>
              </ContentSection>
            )}

            {/* Visitor Tips */}
            {ai?.visitorTips && ai.visitorTips.length > 0 && (
              <ContentSection>
                <SectionHeading icon={Lightbulb} title="Visitor Tips" />
                <div className="space-y-4">
                  {ai.visitorTips.map((tip, i) => (
                    <div key={i}>
                      {tip.title && (
                        <h3 className="mb-2 text-lg font-semibold text-slate-800">
                          {tip.title}
                        </h3>
                      )}
                      <p className="text-base leading-relaxed text-slate-600">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentSection>
            )}

            {/* Pro Tip */}
            {ai?.proTip && (
              <div className="rounded-2xl border border-[#573CD0]/20 bg-[#573CD0]/5 p-6 sm:p-8">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#573CD0]" />
                  <span className="text-lg font-bold text-[#573CD0]">
                    Pro Tip
                  </span>
                </div>
                <p className="text-base leading-relaxed text-slate-700">
                  {ai.proTip}
                </p>
              </div>
            )}
          </div>

          {/* ── Sidebar ───────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Booking CTA */}
            {attr.product_url && (
              <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 text-center">
                  {attr.price_usd ? (
                    <>
                      <p className="text-sm text-slate-500">From</p>
                      <p className="text-4xl font-extrabold text-[#573CD0]">
                        ${attr.price_usd}
                      </p>
                      {attr.prediscount_price_usd && (
                        <p className="mt-1 text-sm text-slate-400 line-through">
                          ${attr.prediscount_price_usd}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-slate-700">
                      Check Availability
                    </p>
                  )}
                </div>
                <a
                  href={attr.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl bg-[#573CD0] py-3.5 text-center text-base font-semibold text-white shadow-lg shadow-[#573CD0]/25 transition-all hover:bg-[#6443F4] hover:shadow-xl"
                >
                  Book Now
                </a>
                <p className="mt-3 text-center text-xs text-slate-400">
                  Powered by Tiqets · Free cancellation available
                </p>
              </div>
            )}

            {/* Highlights */}
            {attr.tiqets_highlights &&
              Array.isArray(attr.tiqets_highlights) &&
              attr.tiqets_highlights.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold text-slate-900">
                    Highlights
                  </h3>
                  <ul className="space-y-2.5">
                    {attr.tiqets_highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#573CD0]" />
                        <span>{typeof h === 'string' ? h : String(h)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* What's Included */}
            {attr.tiqets_whats_included && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  What&apos;s Included
                </h3>
                <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                  {attr.tiqets_whats_included}
                </div>
              </div>
            )}

            {/* What's Excluded */}
            {attr.tiqets_whats_excluded && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <XCircle className="h-4 w-4 text-slate-400" />
                  Not Included
                </h3>
                <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                  {attr.tiqets_whats_excluded}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {attr.cancellation_policy && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  Cancellation Policy
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {attr.cancellation_policy}
                </p>
              </div>
            )}

            {/* Location */}
            {attr.venue_address && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Map className="h-4 w-4 text-[#573CD0]" />
                  Location
                </h3>
                <p className="text-sm text-slate-600">{attr.venue_address}</p>
              </div>
            )}
          </aside>
        </div>

        {/* ── Image Gallery ────────────────────────────────────────── */}
        {attr.tiqets_images && attr.tiqets_images.length > 1 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">Photos</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {attr.tiqets_images.slice(1, 9).map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <img
                    src={img.large || img.extra_large}
                    alt={img.alt_text || `${attr.title} photo ${i + 2}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12">
          {destSlug ? (
            <a
              href={`/${locale}/destinations/${destSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#573CD0] transition hover:text-[#6443F4]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to {attr.city_name}
            </a>
          ) : (
            <a
              href={`/${locale}/destinations`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#573CD0] transition hover:text-[#6443F4]"
            >
              <ChevronLeft className="h-4 w-4" />
              All Destinations
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
