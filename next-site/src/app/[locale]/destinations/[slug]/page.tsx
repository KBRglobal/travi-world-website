// Destination Detail Page — converted from Kimi's premium design
// Server component fetches data, passes to client for animations
import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import type { Metadata } from 'next';
import DestinationDetailClient from './DestinationDetailClient';

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
  title: string;
  slug: string;
  city_name: string;
  ai_content: Record<string, unknown> | null;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await query<Destination>(
    'SELECT meta_title, meta_description, name, country FROM destinations WHERE slug = $1 OR id = $1',
    [slug],
  );
  if (!rows.length) return {};
  const d = rows[0];
  return {
    title: d.meta_title || `${d.name}, ${d.country} — Travel Guide | Travi.world`,
    description: d.meta_description || `Plan your perfect trip to ${d.name}, ${d.country}. Top attractions, hotels, restaurants, and insider tips.`,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function DestinationPage({ params }: Props) {
  const { locale, slug } = await params;

  const destinations = await query<Destination>(
    'SELECT * FROM destinations WHERE (slug = $1 OR id = $1) AND is_active = true',
    [slug],
  );
  if (!destinations.length) notFound();
  const dest = destinations[0];

  const attractions = await query<Attraction>(
    `SELECT title, slug, city_name, ai_content
     FROM tiqets_attractions
     WHERE LOWER(city_name) = LOWER($1)
     LIMIT 20`,
    [dest.name],
  );

  return (
    <DestinationDetailClient
      destination={dest}
      attractions={attractions}
      locale={locale}
    />
  );
}
