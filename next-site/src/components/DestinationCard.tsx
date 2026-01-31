'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import {
  Star,
  ArrowRight,
  MapPin,
  Heart,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface DestinationCardProps {
  /** Destination name */
  name: string;
  /** Country name */
  country: string;
  /** Image URL or path */
  image: string;
  /** Average rating 0-5 */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Whether this destination is trending */
  trending?: boolean;
  /** Short tagline or description */
  tagline?: string;
  /** Link href */
  href?: string;
  /** RTL support */
  dir?: 'ltr' | 'rtl';
}

/* ------------------------------------------------------------------ */
/*  Animation variant                                                  */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function DestinationCard({
  name,
  country,
  image,
  rating,
  reviewCount,
  trending = false,
  tagline,
  href,
  dir = 'ltr',
}: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const Wrapper = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <motion.div
      variants={fadeInUp}
      dir={dir}
      className="group relative rounded-2xl overflow-hidden bg-white border border-[#e5e5e5] cursor-pointer"
      whileHover={{
        y: -8,
        boxShadow: '0 20px 40px -12px rgba(100, 67, 244, 0.15)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* @ts-expect-error – conditional wrapper */}
      <Wrapper {...wrapperProps} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={image}
            alt={`${name}, ${country}`}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
              isHovered
                ? 'from-black/80 via-black/30'
                : 'from-black/60 via-transparent'
            } to-transparent`}
          />

          {/* Trending badge */}
          {trending && (
            <div className="absolute top-4 start-4 flex items-center gap-1.5 px-2.5 py-1 bg-[#6443F4] rounded-lg">
              <TrendingUp className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-medium">Trending</span>
            </div>
          )}

          {/* Like button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`absolute top-4 end-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isLiked
                ? 'bg-[#6443F4] text-white'
                : 'bg-white/80 text-[#525252] hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
          </motion.button>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {/* Rating (appears on hover) */}
            {rating != null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                }}
                className="flex items-center gap-2 mb-2"
              >
                <div className="flex items-center gap-1 bg-white/90 px-2 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-[#6443F4] text-[#6443F4]" />
                  <span className="text-[#0f0f0f] text-sm font-medium">
                    {rating}
                  </span>
                </div>
                {reviewCount != null && (
                  <span className="text-white/70 text-xs">
                    ({reviewCount.toLocaleString()})
                  </span>
                )}
              </motion.div>
            )}

            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70 text-xs">{country}</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-0.5">
              {name}
            </h3>
            {tagline && (
              <p className="text-white/60 text-sm">{tagline}</p>
            )}

            {/* Explore CTA (appears on hover) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              className="flex items-center gap-2 mt-3"
            >
              <span className="text-white text-sm font-medium">Explore</span>
              <div className="w-6 h-6 rounded-full bg-[#6443F4] flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </Wrapper>
    </motion.div>
  );
}
