'use client';

import { useEffect, useRef, useState } from 'react';
import { Quote, Globe, Award, Users, Star, TrendingUp } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const statistics = [
  { value: 17, suffix: '+', label: 'Countries', icon: Globe },
  { value: 500, suffix: '+', label: 'Travel Guides', icon: Award },
  { value: 10, suffix: 'K+', label: 'Hotel Reviews', icon: Star },
  { value: 50, suffix: 'K+', label: 'Monthly Readers', icon: Users },
];

const testimonials = [
  {
    quote:
      'TRAVI transformed our honeymoon into an unforgettable adventure. Every recommendation was perfect!',
    author: 'The Johnsons',
    location: 'New York, USA',
    rating: 5,
  },
  {
    quote:
      "As a solo traveler, TRAVI gave me the confidence to explore places I never thought I'd visit alone.",
    author: 'Maria Garcia',
    location: 'Barcelona, Spain',
    rating: 5,
  },
  {
    quote:
      'The hotel reviews saved us from a disaster. We found the most amazing boutique hotel in Paris!',
    author: 'Chen Wei',
    location: 'Singapore',
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 80;
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
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Stats({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      dir={dir}
      className="py-20 lg:py-28 bg-[#0f0f0f]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 bg-[#6443F4]/20 rounded-full mb-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#6443F4]" />
            <span className="text-sm font-medium text-[#6443F4]">
              Trusted Worldwide
            </span>
          </div>
          <h2
            className={`text-3xl lg:text-4xl font-semibold text-white mb-2 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#6443F4] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl lg:text-4xl font-semibold text-white mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="relative p-6 lg:p-8 bg-white/5 rounded-2xl border border-white/10">
            <Quote className="absolute -top-4 left-6 w-8 h-8 text-[#6443F4] bg-[#0f0f0f] p-1.5 rounded-lg" />

            <div className="relative min-h-[140px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                >
                  <p className="text-lg text-white/80 mb-5">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6443F4] flex items-center justify-center text-white font-medium">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          {testimonial.author}
                        </p>
                        <p className="text-white/40 text-xs">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#6443F4] text-[#6443F4]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentTestimonial
                      ? 'w-6 bg-[#6443F4]'
                      : 'w-1.5 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-14 pt-8 border-t border-white/10 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-center text-white/30 text-sm mb-6">
            Featured in leading travel publications
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {[
              'National Geographic',
              'Lonely Planet',
              'TripAdvisor',
              'Booking.com',
              'Forbes',
            ].map((brand) => (
              <span
                key={brand}
                className="text-white/20 font-medium text-lg hover:text-white/40 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
