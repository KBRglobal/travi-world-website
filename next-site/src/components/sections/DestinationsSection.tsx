'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const destinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    tagline: 'The City of Light',
    image: '/dest-paris.jpg',
    rating: 4.9,
    reviews: 2847,
    trending: true,
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    tagline: 'Tradition Meets Future',
    image: '/dest-tokyo.jpg',
    rating: 4.8,
    reviews: 3156,
    trending: true,
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'UAE',
    tagline: 'Luxury in the Desert',
    image: '/dest-dubai.jpg',
    rating: 4.7,
    reviews: 1923,
    trending: false,
  },
  {
    id: 4,
    name: 'New York',
    country: 'USA',
    tagline: 'The City That Never Sleeps',
    image: '/dest-newyork.jpg',
    rating: 4.8,
    reviews: 4521,
    trending: true,
  },
  {
    id: 5,
    name: 'Barcelona',
    country: 'Spain',
    tagline: 'Mediterranean Magic',
    image: '/dest-barcelona.jpg',
    rating: 4.7,
    reviews: 2134,
    trending: false,
  },
  {
    id: 6,
    name: 'Sydney',
    country: 'Australia',
    tagline: 'Harbor City Beauty',
    image: '/dest-sydney.jpg',
    rating: 4.8,
    reviews: 1876,
    trending: false,
  },
  {
    id: 7,
    name: 'Rome',
    country: 'Italy',
    tagline: 'Eternal City Charm',
    image: '/dest-rome.jpg',
    rating: 4.9,
    reviews: 3421,
    trending: true,
  },
  {
    id: 8,
    name: 'London',
    country: 'UK',
    tagline: 'Royal Heritage',
    image: '/dest-london.jpg',
    rating: 4.7,
    reviews: 2987,
    trending: false,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'trending', label: 'Trending' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function DestinationsSection({
  dir = 'ltr',
}: {
  dir?: 'ltr' | 'rtl';
}) {
  const [filter, setFilter] = useState('all');

  const filteredDestinations = destinations.filter((dest) => {
    if (filter === 'all') return true;
    if (filter === 'trending') return dest.trending;
    if (filter === 'europe')
      return ['France', 'Spain', 'Italy', 'UK'].includes(dest.country);
    if (filter === 'asia')
      return ['Japan', 'UAE'].includes(dest.country);
    return true;
  });

  return (
    <section dir={dir} className="py-20 lg:py-28 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
        >
          <div>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f5f3ff] rounded-full mb-4"
            >
              <MapPin className="w-4 h-4 text-[#6443F4]" />
              <span className="text-sm font-medium text-[#6443F4]">
                Destinations
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-semibold text-[#0f0f0f] mb-2"
            >
              Popular <span className="text-gradient">Destinations</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#525252]"
            >
              Explore our most-loved travel destinations around the world
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.id
                    ? 'bg-[#6443F4] text-white'
                    : 'bg-white text-[#525252] hover:bg-[#f5f3ff] hover:text-[#6443F4]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              name={destination.name}
              country={destination.country}
              image={destination.image}
              rating={destination.rating}
              reviewCount={destination.reviews}
              trending={destination.trending}
              tagline={destination.tagline}
              href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
              dir={dir}
            />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex justify-center mt-10"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 border-2 border-[#e5e5e5] text-[#6443F4] hover:border-[#6443F4] hover:bg-[#f5f3ff] px-6 py-3 rounded-xl font-medium transition-all"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
