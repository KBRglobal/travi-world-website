'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const stats = [
  { value: 17, suffix: '+', label: 'Countries' },
  { value: 500, suffix: '+', label: 'Guides' },
  { value: 10, suffix: 'K+', label: 'Reviews' },
];

const featuredDestinations = [
  { name: 'Santorini', country: 'Greece', image: '/hero-santorini.jpg', rating: 4.9 },
  { name: 'Kyoto', country: 'Japan', image: '/hero-kyoto.jpg', rating: 4.8 },
  { name: 'Bali', country: 'Indonesia', image: '/hero-bali.jpg', rating: 4.9 },
];

const popularSearches = ['Paris', 'Tokyo', 'Bali', 'Dubai'];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) setIsVisible(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Hero({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % featuredDestinations.length,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section dir={dir} className="relative min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Content ──────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f3ff] rounded-full border border-[#e9e5ff]"
            >
              <div className="w-2 h-2 bg-[#6443F4] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#6443F4]">
                Explore the World
              </span>
              <TrendingUp className="w-4 h-4 text-[#6443F4]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#0f0f0f]"
            >
              Discover Your
              <span className="block text-gradient">Next Adventure</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[#525252] max-w-lg leading-relaxed"
            >
              Expert travel guides, honest reviews, and insider tips to
              transform your trips into{' '}
              <span className="text-[#6443F4] font-medium">
                unforgettable experiences
              </span>
              .
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeInUp} className="relative max-w-md">
              <div className="flex items-center bg-white rounded-2xl border border-[#e5e5e5] p-1.5 focus-within:border-[#6443F4] focus-within:ring-2 focus-within:ring-[#6443F4]/10 transition-all">
                <div className="flex items-center flex-1 px-4">
                  <MapPin className="w-5 h-5 text-[#a3a3a3] shrink-0 ltr:mr-3 rtl:ml-3" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-0 outline-none text-sm text-gray-700 placeholder:text-[#a3a3a3] focus:ring-0"
                  />
                </div>
                <button className="bg-[#6443F4] hover:bg-[#4f35c7] text-white px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#6443F4]/20 flex items-center gap-2 text-sm font-medium shrink-0">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-[#a3a3a3]">Popular:</span>
                {popularSearches.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSearchQuery(city)}
                    className="text-xs px-3 py-1 bg-[#f5f5f5] rounded-full text-[#525252] hover:bg-[#f5f3ff] hover:text-[#6443F4] transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <button className="bg-[#6443F4] hover:bg-[#4f35c7] text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-[#6443F4]/20 hover:-translate-y-0.5 flex items-center gap-2">
                Start Exploring
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-[#e5e5e5] text-[#0f0f0f] px-6 py-3 rounded-xl font-medium hover:border-[#6443F4] hover:text-[#6443F4] transition-colors flex items-center gap-2">
                <Play className="w-4 h-4 fill-[#6443F4] text-[#6443F4]" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-8 pt-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-semibold text-gradient">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-[#8a8a8a]">{stat.label}</div>
                </div>
              ))}

              <div className="h-10 w-px bg-[#e5e5e5] hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-[#6443F4] flex items-center justify-center"
                    >
                      <Users className="w-3.5 h-3.5 text-white" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#6443F4] text-[#6443F4]" />
                    <span className="font-semibold text-[#0f0f0f]">4.9</span>
                  </div>
                  <span className="text-xs text-[#8a8a8a]">50K+ travelers</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Content — Image Grid ─────────────────────────── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative h-[520px]">
              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 end-0 w-[360px] h-[420px] rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={
                      featuredDestinations[currentImageIndex].image
                    }
                    alt={featuredDestinations[currentImageIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#8a8a8a]">Featured</p>
                          <p className="text-[#0f0f0f] font-medium">
                            {featuredDestinations[currentImageIndex].name},{' '}
                            {featuredDestinations[currentImageIndex].country}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-[#6443F4] px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-white fill-white" />
                          <span className="text-white text-sm font-medium">
                            {featuredDestinations[currentImageIndex].rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 start-0 w-[260px] h-[180px] rounded-xl overflow-hidden shadow-lg z-10"
              >
                <img
                  src={
                    featuredDestinations[
                      (currentImageIndex + 1) % featuredDestinations.length
                    ].image
                  }
                  alt="Next destination"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-16 start-0 bg-white rounded-xl p-4 shadow-lg border border-[#e5e5e5]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f5f3ff] flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#6443F4]" />
                  </div>
                  <div>
                    <p className="text-[#0f0f0f] font-semibold">120+</p>
                    <p className="text-xs text-[#8a8a8a]">Cities</p>
                  </div>
                </div>
              </motion.div>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {featuredDestinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'w-6 bg-[#6443F4]'
                        : 'w-2 bg-[#d4d4d4] hover:bg-[#a3a3a3]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
