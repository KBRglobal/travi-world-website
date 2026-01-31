'use client';

import { Star, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface DestinationCardProps {
  /** URL or path to the destination image */
  image: string;
  /** Destination name, e.g. "Santorini" */
  name: string;
  /** Country name, e.g. "Greece" */
  country: string;
  /** Average rating 0-5 */
  rating: number;
  /** Total review count */
  reviewCount: number;
  /** Starting price (display string), e.g. "$120" */
  priceFrom: string;
  /** Optional link target */
  href?: string;
  /** RTL support */
  dir?: 'ltr' | 'rtl';
}

/* ------------------------------------------------------------------ */
/*  Star row helper                                                    */
/* ------------------------------------------------------------------ */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function DestinationCard({
  image,
  name,
  country,
  rating,
  reviewCount,
  priceFrom,
  href = '#',
  dir = 'ltr',
}: DestinationCardProps) {
  return (
    <a
      href={href}
      dir={dir}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#573CD0]/10"
    >
      {/* ---- Image ---- */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={`${name}, ${country}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Price tag */}
        <div className="absolute start-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#573CD0] shadow backdrop-blur">
          From {priceFrom}
        </div>

        {/* Name + country (over image) */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-lg font-bold leading-tight text-white drop-shadow-md">{name}</h3>
          <p className="mt-0.5 text-sm text-white/80">{country}</p>
        </div>
      </div>

      {/* ---- Details ---- */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-xs font-medium text-gray-500">
            {rating.toFixed(1)} ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#573CD0] transition-colors group-hover:text-[#6443F4]">
          Explore
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </a>
  );
}
