'use client';

// Destination Detail Client — Kimi's premium landing page design
// Visual storytelling, editorial magazine style

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight, Clock, Calendar, MapPin, ArrowRight,
  Plane, Hotel, Camera, Utensils, Star, Sun,
  Thermometer, Droplets, Users, Info,
  Bookmark, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface SeasonInfo {
  name: string;
  months: string;
  weather: string;
  crowds: 'Low' | 'Medium' | 'High';
  recommendation: string;
  temp: string;
  rain: string;
  icon: string;
}

interface FAQ {
  question: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/*  Static data helpers                                                */
/* ------------------------------------------------------------------ */
const defaultSeasons: SeasonInfo[] = [
  { name: 'Spring', months: 'Mar-May', weather: 'Mild & Pleasant', crowds: 'Medium', recommendation: 'Best for sightseeing', temp: '15-20°C', rain: 'Low', icon: '🌸' },
  { name: 'Summer', months: 'Jun-Aug', weather: 'Warm & Sunny', crowds: 'High', recommendation: 'Peak season', temp: '25-30°C', rain: 'Low', icon: '☀️' },
  { name: 'Autumn', months: 'Sep-Nov', weather: 'Cool & Crisp', crowds: 'Medium', recommendation: 'Ideal weather', temp: '12-18°C', rain: 'Medium', icon: '🍂' },
  { name: 'Winter', months: 'Dec-Feb', weather: 'Cold & Wet', crowds: 'Low', recommendation: 'Budget travel', temp: '5-10°C', rain: 'High', icon: '❄️' },
];

const defaultFaqs: FAQ[] = [
  { question: 'When is the best time to visit?', answer: 'The best time to visit is during spring (April-June) or autumn (September-October) when the weather is mild and crowds are manageable.' },
  { question: 'Do I need a visa?', answer: 'Most visitors from Western countries can enter visa-free for up to 90 days. Check specific requirements based on your nationality.' },
  { question: 'How many days should I stay?', answer: 'We recommend 4-7 days to see the main attractions and experience the local culture.' },
  { question: 'Is it expensive?', answer: 'Budget around $150-250 per day for mid-range travel including accommodation, food, and activities.' },
  { question: 'Is it safe for tourists?', answer: 'Yes, it\'s generally very safe for tourists. Standard precautions apply in crowded areas.' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DestinationHero({ dest, locale }: { dest: Destination; locale: string }) {
  const heroImage = dest.hero_image || dest.card_image || '/dest-placeholder.jpg';
  return (
    <section className="relative min-h-[85vh] flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      </div>
      <div className="relative w-full pb-16 pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${locale}/destinations`} className="hover:text-white transition-colors">Destinations</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{dest.name}</span>
            </nav>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
              {dest.hero_title || dest.name}
            </h1>
            {dest.mood_tagline && (
              <p className="text-2xl md:text-3xl text-white/90 font-light mb-6">
                {dest.mood_tagline}
              </p>
            )}
            {dest.summary && (
              <p className="text-lg text-white/80 max-w-2xl mb-8">
                {dest.summary}
              </p>
            )}

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-white/70" />
                <span className="text-white">{dest.country}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white">Top Destination</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 rounded-full px-8">
                Start Planning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full">
                <Bookmark className="w-5 h-5 mr-2" />
                Save for Later
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuickInfoRail({ dest }: { dest: Destination }) {
  const items = [
    { icon: MapPin, label: 'Country', value: dest.country },
    { icon: Clock, label: 'Duration', value: '4-7 days' },
    { icon: Sun, label: 'Best Time', value: 'Apr-Jun, Sep-Oct' },
    { icon: Info, label: 'Visa', value: 'Check requirements' },
    { icon: MapPin, label: 'Language', value: 'Local language' },
    { icon: Clock, label: 'Timezone', value: 'Local time' },
  ];

  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {items.map((item) => (
            <div key={item.label} className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors">
              <item.icon className="w-6 h-6 mx-auto mb-2 text-[#573CD0]" />
              <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
              <p className="font-semibold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryBentoGrid({ dest, locale }: { dest: Destination; locale: string }) {
  const slug = dest.slug || dest.id;
  const categories = [
    { name: 'Attractions', icon: Camera, description: 'Must-see landmarks', color: 'bg-blue-500', href: `/${locale}/attractions?destination=${slug}` },
    { name: 'Hotels', icon: Hotel, description: 'Where to stay', color: 'bg-green-500', href: `/${locale}/destinations/${slug}#hotels` },
    { name: 'Dining', icon: Utensils, description: 'Best restaurants', color: 'bg-orange-500', href: `/${locale}/destinations/${slug}#dining` },
    { name: 'Flights', icon: Plane, description: 'Book your trip', color: 'bg-purple-500', href: `/${locale}/search` },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore {dest.name}</h2>
          <p className="text-gray-600 mb-8">Discover the best of {dest.name} by category</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer h-full">
                  <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-gray-500 text-sm">{cat.description}</p>
                  <div className="flex items-center gap-1 text-[#573CD0] mt-4 text-sm font-medium">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedAttractions({ attractions, dest, locale }: { attractions: Attraction[]; dest: Destination; locale: string }) {
  if (!attractions.length) return null;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Attractions</h2>
              <p className="text-gray-600">Must-see places in {dest.name}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.slice(0, 6).map((attraction, index) => {
              const intro = typeof attraction.ai_content?.introduction === 'string'
                ? attraction.ai_content.introduction.slice(0, 120) + '…'
                : 'Discover this attraction';
              return (
                <motion.div
                  key={attraction.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <Link href={`/${locale}/attractions/${attraction.slug}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-[#573CD0]/20 to-[#6443F4]/20">
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900">{attraction.city_name}</Badge>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#573CD0] transition-colors">
                      {attraction.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{intro}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BestTimeToVisit({ dest }: { dest: Destination }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Time to Visit {dest.name}</h2>
          <p className="text-gray-600 mb-8">Plan your trip around the seasons</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultSeasons.map((season, index) => (
              <motion.div
                key={season.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{season.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{season.name}</h3>
                <p className="text-sm text-[#573CD0] font-medium mb-3">{season.months}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-gray-400" />
                    <span>{season.temp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-gray-400" />
                    <span>{season.rain} rain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{season.crowds} crowds</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">{season.recommendation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DestinationFAQ({ dest }: { dest: Destination }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-8">Everything you need to know about visiting {dest.name}</p>
          <div className="space-y-4">
            {defaultFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-xl p-6 hover:border-[#573CD0]/30 transition-colors"
              >
                <h3 className="font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-[#573CD0] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-8">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DestinationCTA({ dest, locale }: { dest: Destination; locale: string }) {
  const slug = dest.slug || dest.id;
  return (
    <section className="py-20 bg-[#573CD0]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Explore {dest.name}?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Start planning your perfect trip today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href={`/${locale}/destinations/${slug}#hotels`}>
              <Button size="lg" className="bg-white text-[#573CD0] hover:bg-white/90 rounded-full px-8">
                <Hotel className="w-5 h-5 mr-2" />
                Find Hotels
              </Button>
            </Link>
            <Link href={`/${locale}/search`}>
              <Button size="lg" className="bg-white text-[#573CD0] hover:bg-white/90 rounded-full px-8">
                <Plane className="w-5 h-5 mr-2" />
                Book Flights
              </Button>
            </Link>
            <Link href={`/${locale}/attractions?destination=${slug}`}>
              <Button size="lg" className="bg-white text-[#573CD0] hover:bg-white/90 rounded-full px-8">
                <Camera className="w-5 h-5 mr-2" />
                Get Tours
              </Button>
            </Link>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-4">
              📧 Get our free {dest.name} travel guide PDF
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-white/50 border-0"
              />
              <Button className="bg-white text-[#573CD0] hover:bg-white/90">
                Download
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Client Component                                              */
/* ------------------------------------------------------------------ */
interface Props {
  destination: Destination;
  attractions: Attraction[];
  locale: string;
}

export default function DestinationDetailClient({ destination, attractions, locale }: Props) {
  return (
    <main className="min-h-screen bg-white">
      <DestinationHero dest={destination} locale={locale} />
      <QuickInfoRail dest={destination} />
      <CategoryBentoGrid dest={destination} locale={locale} />
      <FeaturedAttractions attractions={attractions} dest={destination} locale={locale} />
      <BestTimeToVisit dest={destination} />
      <DestinationFAQ dest={destination} />
      <DestinationCTA dest={destination} locale={locale} />
    </main>
  );
}
