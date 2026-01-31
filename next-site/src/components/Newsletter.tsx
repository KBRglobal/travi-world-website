'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Users, CheckCircle, Mail, Gift, Bell } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const benefits = [
  { icon: Gift, text: 'Exclusive travel deals' },
  { icon: Bell, text: 'New destination alerts' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Newsletter({ dir = 'ltr' }: { dir?: 'ltr' | 'rtl' }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="py-20 lg:py-28 bg-[#6443F4]"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full mb-6 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <Mail className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Newsletter</span>
        </div>

        {/* Heading */}
        <h2
          className={`text-3xl lg:text-4xl font-semibold text-white mb-3 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Get Travel Inspiration
        </h2>
        <p
          className={`text-white/70 mb-8 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          Subscribe for exclusive guides, tips, and deals
        </p>

        {/* Benefits */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.text}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full"
              >
                <Icon className="w-4 h-4 text-white" />
                <span className="text-white/80 text-sm">{benefit.text}</span>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`max-w-md mx-auto mb-6 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          <div
            className={`flex items-center bg-white rounded-xl transition-all ${
              isFocused ? 'ring-2 ring-white/30' : ''
            }`}
          >
            <div className="flex items-center flex-1 px-4">
              <Mail
                className={`w-5 h-5 shrink-0 ltr:mr-3 rtl:ml-3 transition-colors ${
                  isFocused ? 'text-[#6443F4]' : 'text-[#a3a3a3]'
                }`}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isSubmitted}
                className="w-full bg-transparent border-0 outline-none py-4 text-sm text-gray-700 placeholder:text-[#a3a3a3] focus:ring-0 disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitted}
              className={`m-1.5 px-5 py-3 rounded-lg font-medium text-white text-sm transition-all flex items-center gap-2 shrink-0 ${
                isSubmitted
                  ? 'bg-emerald-500'
                  : 'bg-[#0f0f0f] hover:bg-[#1a1a1a]'
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Subscribed
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Fine print */}
        <p
          className={`text-white/40 text-sm mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          No spam, ever. Unsubscribe anytime.
        </p>

        {/* Subscriber count */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#6443F4] bg-white flex items-center justify-center"
                >
                  <Users className="w-3.5 h-3.5 text-[#6443F4]" />
                </div>
              ))}
            </div>
            <span className="text-white/80 text-sm">25,000+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
