'use client';

// Guide Detail Page — converted from Kimi's comprehensive guide design
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronRight, Clock, Calendar, Star, Download, Bookmark, Share2,
  MapPin, Wallet, FileText, Globe, Clock3,
  Plane, Hotel, Camera, Utensils, Bike, Bus, Train,
  CheckCircle, Lightbulb, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock Paris Guide Data
const guideData = {
  title: 'The Ultimate Paris Travel Guide 2026',
  subtitle: 'Everything you need to plan your perfect trip to the City of Light',
  destination: 'Paris',
  country: 'France',
  image: '/dest-paris.jpg',
  readingTime: 25,
  lastUpdated: 'Jan 30, 2026',
  rating: 4.9,
  reviews: 1247,
  answerCapsule: 'Paris is best visited April-June or September-October. Budget $150-200/day. Must-sees: Eiffel Tower, Louvre, Montmartre. No visa needed for most Western passports (90 days visa-free).',
  quickInfo: { budget: '$180/day', duration: '4-7 days', bestTime: 'Apr-Oct', visa: 'Free 90d', language: 'French', timezone: 'GMT+1' },
  toc: [
    { id: 'overview', title: '📍 Overview' },
    { id: 'districts', title: '🗺️ Districts' },
    { id: 'attractions', title: '⭐ Top Attractions' },
    { id: 'food', title: '🍽️ Food & Dining' },
    { id: 'hotels', title: '🏨 Where to Stay' },
    { id: 'transport', title: '🚇 Getting Around' },
    { id: 'budget', title: '💰 Budget & Costs' },
    { id: 'best-time', title: '📅 Best Time to Visit' },
    { id: 'practical', title: '🛂 Practical Info' },
    { id: 'itineraries', title: '🗓️ Sample Itineraries' },
    { id: 'tips', title: '💡 Local Tips' },
    { id: 'faq', title: '❓ FAQ' },
  ],
  overview: {
    intro: "Paris is more than a city—it's a feeling. From the iconic silhouette of the Eiffel Tower to the cobblestone streets of Montmartre, the French capital has captivated travelers for centuries. Whether you're here for world-class art, culinary adventures, or simply to soak in the romantic atmosphere, Paris delivers unforgettable experiences.",
    highlights: [
      'World-class museums (Louvre, Musée d\'Orsay, Centre Pompidou)',
      'Iconic landmarks (Eiffel Tower, Notre-Dame, Arc de Triomphe)',
      'Culinary capital (Michelin stars, historic cafés, patisseries)',
      'Romantic atmosphere (Seine river, gardens, hidden courtyards)',
      'Fashion & shopping (Champs-Élysées, Le Marais, Saint-Germain)',
      'Rich history (Revolution sites, medieval streets, royal palaces)',
    ],
  },
  districts: [
    { name: 'Le Marais', arr: '3rd-4th', bestFor: 'History, LGBT+, boutique shopping', vibe: 'Trendy, historic, walkable', stayIf: 'You want central location + culture', topSpots: 'Place des Vosges, Jewish Quarter, Picasso Museum', icon: '🏛️' },
    { name: 'Montmartre', arr: '18th', bestFor: 'Art lovers, romantics, views', vibe: 'Bohemian, artistic, hilly', stayIf: 'You want authentic Paris charm', topSpots: 'Sacré-Cœur, Place du Tertre, Moulin Rouge', icon: '🎨' },
    { name: 'Eiffel Area', arr: '7th', bestFor: 'First-timers, iconic views', vibe: 'Elegant, touristy, grand', stayIf: 'Eiffel view is priority', topSpots: 'Eiffel Tower, Champ de Mars, Invalides', icon: '🗼' },
    { name: 'Saint-Germain', arr: '6th', bestFor: 'Literary history, cafés, shopping', vibe: 'Intellectual, sophisticated, lively', stayIf: 'You want classic Left Bank experience', topSpots: 'Café de Flore, Luxembourg Gardens, Odéon', icon: '☕' },
    { name: 'Latin Quarter', arr: '5th', bestFor: 'Students, nightlife, budget', vibe: 'Youthful, energetic, historic', stayIf: 'You want vibrant nightlife + history', topSpots: 'Panthéon, Shakespeare & Co, Rue Mouffetard', icon: '📚' },
    { name: 'Champs-Élysées', arr: '8th', bestFor: 'Luxury, shopping, landmarks', vibe: 'Grand, expensive, iconic', stayIf: 'Money is no object', topSpots: 'Arc de Triomphe, Grand Palais, luxury shops', icon: '🛍️' },
  ],
  attractions: {
    mustSee: [
      { name: 'Eiffel Tower', duration: '3hr', price: '€28', rating: 4.9, icon: '🗼' },
      { name: 'Louvre Museum', duration: '4hr', price: '€17', rating: 4.8, icon: '🖼️' },
      { name: 'Notre-Dame Cathedral', duration: '1hr', price: 'FREE', rating: 4.9, icon: '⛪' },
      { name: 'Montmartre', duration: '3hr', price: 'FREE', rating: 4.8, icon: '🏰' },
      { name: 'Palace of Versailles', duration: '5hr', price: '€21', rating: 4.7, icon: '👑' },
    ],
    museums: [
      { name: 'Musée d\'Orsay', price: '€16', rating: 4.8 },
      { name: 'Centre Pompidou', price: '€15', rating: 4.6 },
      { name: 'Musée de l\'Orangerie', price: '€12', rating: 4.7 },
      { name: 'Rodin Museum', price: '€13', rating: 4.7 },
    ],
    landmarks: [
      { name: 'Arc de Triomphe', price: '€16', rating: 4.7 },
      { name: 'Sainte-Chapelle', price: '€13', rating: 4.8 },
      { name: 'Panthéon', price: '€12', rating: 4.6 },
      { name: 'Conciergerie', price: '€12', rating: 4.5 },
    ],
  },
  food: {
    mustTry: [
      { dish: 'Croissant', where: 'Du Pain et des Idées (10th)', icon: '🥐' },
      { dish: 'Steak Frites', where: "Le Relais de l'Entrecôte", icon: '🥩' },
      { dish: 'French Onion Soup', where: 'Au Pied de Cochon', icon: '🧅' },
      { dish: 'Crêpes', where: 'Breizh Café', icon: '🥞' },
      { dish: 'Macarons', where: 'Ladurée or Pierre Hermé', icon: '🍬' },
    ],
    categories: ['Bistros', 'Fine Dining', 'Cafés', 'Bakeries', 'Markets'],
  },
  hotels: {
    quickRecommendation: [
      { type: 'First-timers', area: 'Le Marais or Saint-Germain' },
      { type: 'Families', area: 'Near Eiffel Tower (7th)' },
      { type: 'Budget', area: 'Montmartre or Bastille' },
      { type: 'Luxury', area: '8th arrondissement' },
      { type: 'Nightlife', area: 'Oberkampf or Pigalle' },
    ],
    budget: { range: '€80-120/night', description: 'Hostels, budget hotels' },
    midRange: { range: '€120-250/night', description: '3-star hotels, boutique' },
    luxury: { range: '€250+/night', description: '4-5 star hotels, palaces' },
  },
  transport: {
    airport: [
      { from: 'CDG', to: 'Paris', option: 'RER B', price: '€11', time: '35min' },
      { from: 'CDG', to: 'Paris', option: 'Taxi', price: '€55', time: '45min' },
      { from: 'Orly', to: 'Paris', option: 'Orlyval + RER', price: '€14', time: '35min' },
      { from: 'Orly', to: 'Paris', option: 'Taxi', price: '€35', time: '30min' },
    ],
    city: [
      { mode: 'Metro', bestFor: 'Speed', price: '€2.15', icon: Train },
      { mode: 'Bus', bestFor: 'Scenic routes', price: '€2.15', icon: Bus },
      { mode: 'Bike (Vélib\')', bestFor: 'Short trips', price: '€5/day', icon: Bike },
      { mode: 'Walking', bestFor: 'Central areas', price: 'FREE', icon: MapPin },
    ],
    tip: 'Buy Navigo Weekly Pass (€30) for unlimited metro, bus, and RER rides within central Paris.',
  },
  budgetData: {
    budget: { daily: '$100-130', hotel: '$40-60', food: '$30-40', transport: '$10', attractions: '$20-30' },
    midRange: { daily: '$180-250', hotel: '$120-150', food: '$50-60', transport: '$15', attractions: '$30-50' },
    luxury: { daily: '$400+', hotel: '$300+', food: '$100+', tours: '$100+' },
    tips: [
      'Museums free first Sunday of month',
      'Paris Museum Pass saves money if visiting 4+ museums',
      'Lunch menus (le menu) half price of dinner',
      'Bakeries for breakfast/lunch much cheaper than cafés',
    ],
  },
  bestTime: {
    seasons: [
      { name: 'Spring', months: 'Apr-Jun', temp: '18-24°C', note: '⭐ BEST', icon: '🌸' },
      { name: 'Summer', months: 'Jul-Aug', temp: '20-30°C', note: '👥 Busy', icon: '☀️' },
      { name: 'Fall', months: 'Sep-Nov', temp: '12-20°C', note: '⭐ BEST', icon: '🍂' },
      { name: 'Winter', months: 'Dec-Mar', temp: '3-10°C', note: '💰 Cheap', icon: '❄️' },
    ],
    best: 'April-June, September-October',
    avoid: 'August (locals leave, many shops closed)',
    cheapest: 'January-February',
  },
  practical: {
    visa: 'Visa-free 90 days for US/UK/EU/Israel citizens (Schengen Zone)',
    currency: 'Euro (€). $1 = €0.92 (as of Jan 2026)',
    power: 'Type C/E plugs, 230V (EU standard)',
    language: 'French. English widely spoken in tourist areas',
    sim: 'Orange, SFR, Free. €20-30 for 10GB data',
    emergency: '112 (EU emergency). Police: 17',
  },
  itineraries: [
    { days: 3, name: 'Paris Highlights', schedule: ['Eiffel Tower → Trocadéro → Seine Cruise', 'Louvre → Tuileries → Champs-Élysées', 'Montmartre → Sacré-Cœur → Le Marais'] },
    { days: 5, name: 'Complete Paris', schedule: ['+ Day 4: Versailles day trip', '+ Day 5: Orsay → Saint-Germain → Latin Quarter'] },
    { days: 7, name: 'Paris Deep Dive', schedule: ['+ Day 6: Hidden gems + local neighborhoods', '+ Day 7: Giverny or Champagne day trip'] },
  ],
  tips: [
    "Always say 'Bonjour' when entering any shop - it's essential",
    'Lunch menus (le menu) are half the price of dinner at same restaurant',
    "Best croissants from bakeries with 'Artisan Boulanger' sign",
    'Metro line 1 is automated and runs all night on weekends',
    'Skip Champs-Élysées restaurants - walk 2 blocks for real Parisian spots',
    'Free museum entry first Sunday of each month',
  ],
  faqs: [
    { q: 'How many days do you need in Paris?', a: '3-4 days minimum for highlights. 5-7 days ideal for a complete experience including day trips to Versailles and other nearby attractions.' },
    { q: 'Is Paris expensive?', a: 'Moderately expensive. Budget $150-200/day for mid-range travel including accommodation, food, and attractions.' },
    { q: 'What is the best area to stay in Paris?', a: 'Le Marais or Saint-Germain for first-timers - central, walkable, with great restaurants and shops.' },
    { q: 'Do I need to speak French in Paris?', a: "Not required but appreciated. Simple phrases like 'Bonjour' (hello) and 'Merci' (thank you) go a long way." },
    { q: 'Is Paris safe for tourists?', a: 'Very safe overall. Watch for pickpockets in metro and tourist areas.' },
    { q: 'Can I drink tap water in Paris?', a: "Yes, tap water is safe and high quality. You can also ask for 'une carafe d'eau' (free tap water) at restaurants." },
  ],
  relatedGuides: [
    { name: 'London', country: 'UK', image: '/dest-london.jpg' },
    { name: 'Rome', country: 'Italy', image: '/dest-rome.jpg' },
    { name: 'Barcelona', country: 'Spain', image: '/dest-barcelona.jpg' },
    { name: 'Amsterdam', country: 'Netherlands', image: '/dest-barcelona.jpg' },
  ],
};

export default function GuideDetailPage() {
  const g = guideData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[70vh] min-h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${g.image})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          </div>
          <div className="relative h-full flex flex-col justify-end pb-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/guides" className="hover:text-white">Guides</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white">{g.destination}</span>
                </nav>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">{g.title}</h1>
                <p className="text-xl text-white/80 mb-6">&ldquo;{g.subtitle}&rdquo;</p>
                <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-8">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{g.readingTime} min read</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Updated {g.lastUpdated}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{g.rating} ({g.reviews} reviews)</span>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-white text-gray-900 hover:bg-white/90"><Download className="w-4 h-4 mr-2" />Download PDF</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10"><Bookmark className="w-4 h-4 mr-2" />Save Guide</Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10"><Share2 className="w-4 h-4 mr-2" />Share</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Answer Capsule */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-[#573CD0]/10 to-[#573CD0]/5 border-l-4 border-[#573CD0] rounded-r-xl p-6">
            <p className="text-lg text-gray-800 font-medium leading-relaxed">{g.answerCapsule}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {([
              { icon: Wallet, label: 'Budget', value: g.quickInfo.budget },
              { icon: Clock, label: 'Duration', value: g.quickInfo.duration },
              { icon: Calendar, label: 'Best Time', value: g.quickInfo.bestTime },
              { icon: FileText, label: 'Visa', value: g.quickInfo.visa },
              { icon: Globe, label: 'Language', value: g.quickInfo.language },
              { icon: Clock3, label: 'Timezone', value: g.quickInfo.timezone },
            ] as const).map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <item.icon className="w-6 h-6 mx-auto mb-2 text-[#573CD0]" />
                <p className="text-xs text-gray-500 uppercase">{item.label}</p>
                <p className="font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* TOC Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contents</h3>
                <nav className="space-y-1">
                  {g.toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-[#573CD0] hover:bg-white rounded-lg transition-colors">
                      <span>{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Overview */}
              <motion.section id="overview" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Visit {g.destination}?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{g.overview.intro}</p>
                <div className="bg-gradient-to-br from-[#573CD0]/5 to-[#573CD0]/10 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span className="text-[#573CD0]">✨</span> Highlights</h3>
                  <ul className="space-y-2">
                    {g.overview.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700"><span className="text-[#573CD0]">•</span>{h}</li>
                    ))}
                  </ul>
                </div>
              </motion.section>

              {/* Districts */}
              <motion.section id="districts" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{g.destination} Neighborhoods Guide</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {g.districts.map((d) => (
                    <div key={d.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">{d.icon}</span>
                        <div><h3 className="font-bold text-gray-900">{d.name}</h3><p className="text-sm text-[#573CD0]">{d.arr}</p></div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2"><strong>Best for:</strong> {d.bestFor}</p>
                      <p className="text-sm text-gray-600 mb-2"><strong>Vibe:</strong> {d.vibe}</p>
                      <p className="text-sm text-gray-600 mb-3"><strong>Stay here if:</strong> {d.stayIf}</p>
                      <p className="text-sm text-gray-500">{d.topSpots}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Attractions */}
              <motion.section id="attractions" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Must-See {g.destination} Attractions</h2>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🏆</span> Top 5 Must-See</h3>
                  <div className="space-y-3">
                    {g.attractions.mustSee.map((a) => (
                      <div key={a.name} className="flex items-center justify-between bg-white rounded-lg p-3">
                        <div className="flex items-center gap-3"><span className="text-xl">{a.icon}</span><span className="font-medium">{a.name}</span></div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>⏱️ {a.duration}</span><span>{a.price}</span>
                          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{a.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Museums & Art</h3>
                    <div className="space-y-2">
                      {g.attractions.museums.map((m) => (
                        <div key={m.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>{m.name}</span><span className="text-sm text-gray-500">{m.price} ⭐{m.rating}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Landmarks & Monuments</h3>
                    <div className="space-y-2">
                      {g.attractions.landmarks.map((l) => (
                        <div key={l.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>{l.name}</span><span className="text-sm text-gray-500">{l.price} ⭐{l.rating}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Food */}
              <motion.section id="food" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{g.destination} Food Guide</h2>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">🥐 Must-Try Dishes</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {g.food.mustTry.map((f) => (
                      <div key={f.dish} className="flex items-center gap-3 bg-white rounded-lg p-3">
                        <span className="text-2xl">{f.icon}</span>
                        <div><p className="font-medium">{f.dish}</p><p className="text-sm text-gray-500">{f.where}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {g.food.categories.map((c) => (<Badge key={c} variant="outline" className="px-4 py-2">{c}</Badge>))}
                </div>
              </motion.section>

              {/* Hotels */}
              <motion.section id="hotels" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Where to Stay in {g.destination}</h2>
                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">Quick Recommendations</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {g.hotels.quickRecommendation.map((r) => (
                      <div key={r.type} className="bg-white rounded-lg p-3"><span className="font-medium">{r.type}:</span><span className="text-gray-600 ml-2">{r.area}</span></div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-green-700">{g.hotels.budget.range}</p><p className="text-sm text-gray-600">Budget</p><p className="text-xs text-gray-500">{g.hotels.budget.description}</p></div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-blue-700">{g.hotels.midRange.range}</p><p className="text-sm text-gray-600">Mid-Range</p><p className="text-xs text-gray-500">{g.hotels.midRange.description}</p></div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-purple-700">{g.hotels.luxury.range}</p><p className="text-sm text-gray-600">Luxury</p><p className="text-xs text-gray-500">{g.hotels.luxury.description}</p></div>
                </div>
              </motion.section>

              {/* Transport */}
              <motion.section id="transport" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Around {g.destination}</h2>
                <h3 className="font-bold text-gray-900 mb-4">From the Airport</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100"><tr><th className="p-3 text-left">From</th><th className="p-3 text-left">Option</th><th className="p-3 text-left">Price</th><th className="p-3 text-left">Time</th></tr></thead>
                    <tbody>
                      {g.transport.airport.map((a) => (
                        <tr key={`${a.from}-${a.option}`} className="border-b"><td className="p-3">{a.from} → {a.to}</td><td className="p-3">{a.option}</td><td className="p-3 font-medium">{a.price}</td><td className="p-3">{a.time}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="font-bold text-gray-900 mb-4">Getting Around the City</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {g.transport.city.map((c) => (
                    <div key={c.mode} className="bg-gray-50 rounded-xl p-4 text-center">
                      <c.icon className="w-8 h-8 mx-auto mb-2 text-[#573CD0]" />
                      <p className="font-medium">{c.mode}</p><p className="text-xs text-gray-500">{c.bestFor}</p><p className="font-bold text-[#573CD0]">{c.price}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{g.transport.tip}</p>
                </div>
              </motion.section>

              {/* Budget */}
              <motion.section id="budget" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How Much Does {g.destination} Cost?</h2>
                <div className="space-y-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-5">
                    <h3 className="font-bold text-green-800 mb-3">💰 Budget ({g.budgetData.budget.daily}/day)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div><strong>Hotel:</strong> {g.budgetData.budget.hotel}</div><div><strong>Food:</strong> {g.budgetData.budget.food}</div>
                      <div><strong>Transport:</strong> {g.budgetData.budget.transport}</div><div><strong>Attractions:</strong> {g.budgetData.budget.attractions}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="font-bold text-blue-800 mb-3">💰💰 Mid-Range ({g.budgetData.midRange.daily}/day)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div><strong>Hotel:</strong> {g.budgetData.midRange.hotel}</div><div><strong>Food:</strong> {g.budgetData.midRange.food}</div>
                      <div><strong>Transport:</strong> {g.budgetData.midRange.transport}</div><div><strong>Attractions:</strong> {g.budgetData.midRange.attractions}</div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-5">
                    <h3 className="font-bold text-purple-800 mb-3">💰💰💰 Luxury ({g.budgetData.luxury.daily}/day)</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div><strong>Hotel:</strong> {g.budgetData.luxury.hotel}</div><div><strong>Food:</strong> {g.budgetData.luxury.food}</div><div><strong>Tours:</strong> {g.budgetData.luxury.tours}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Money-Saving Tips</h3>
                  <ul className="space-y-2">
                    {g.budgetData.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{t}</li>
                    ))}
                  </ul>
                </div>
              </motion.section>

              {/* Best Time */}
              <motion.section id="best-time" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Visit {g.destination}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {g.bestTime.seasons.map((s) => (
                    <div key={s.name} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">{s.icon}</div>
                      <p className="font-bold">{s.name}</p><p className="text-sm text-gray-500">{s.months}</p><p className="text-sm">{s.temp}</p>
                      <Badge className="mt-2" variant="outline">{s.note}</Badge>
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center"><p className="font-bold text-green-700">✅ BEST</p><p className="text-sm">{g.bestTime.best}</p></div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center"><p className="font-bold text-amber-700">⚠️ AVOID</p><p className="text-sm">{g.bestTime.avoid}</p></div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center"><p className="font-bold text-blue-700">💰 CHEAPEST</p><p className="text-sm">{g.bestTime.cheapest}</p></div>
                </div>
              </motion.section>

              {/* Practical */}
              <motion.section id="practical" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Essential {g.destination} Travel Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {([
                    ['🛂 Visa', g.practical.visa],
                    ['💱 Currency', g.practical.currency],
                    ['🔌 Power', g.practical.power],
                    ['💬 Language', g.practical.language],
                    ['📱 SIM/Data', g.practical.sim],
                    ['🚨 Emergency', g.practical.emergency],
                  ] as const).map(([label, value]) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-5">
                      <p className="text-sm text-gray-500 mb-1">{label}</p>
                      <p className="text-gray-700">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Itineraries */}
              <motion.section id="itineraries" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{g.destination} Itineraries</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {g.itineraries.map((it) => (
                    <div key={it.days} className="bg-gradient-to-br from-[#573CD0]/5 to-[#573CD0]/10 rounded-2xl p-6">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="text-2xl font-bold text-gray-900">{it.days} DAYS</h3>
                      <p className="text-[#573CD0] font-medium mb-4">{it.name}</p>
                      <ul className="space-y-2 text-sm text-gray-700 mb-4">
                        {it.schedule.map((day, i) => (<li key={i}>{day}</li>))}
                      </ul>
                      <Button variant="outline" className="w-full">View Full Itinerary</Button>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Tips */}
              <motion.section id="tips" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{g.destination} Tips from Locals</h2>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><span>🤫</span> Insider Secrets</h3>
                  <ul className="space-y-3">
                    {g.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-3"><Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" /><span className="text-gray-700">&ldquo;{t}&rdquo;</span></li>
                    ))}
                  </ul>
                </div>
              </motion.section>

              {/* FAQ */}
              <motion.section id="faq" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About {g.destination}</h2>
                <div className="space-y-4">
                  {g.faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2"><ChevronRight className="w-5 h-5 text-[#573CD0]" />{faq.q}</h4>
                      <p className="text-gray-600 ml-7">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#573CD0]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-5xl mb-6">🗼</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Explore {g.destination}?</h2>
            <p className="text-white/80 text-lg mb-8">Start planning your perfect trip today</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-[#573CD0] hover:bg-white/90"><Hotel className="w-5 h-5 mr-2" />Book Hotels</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10"><Plane className="w-5 h-5 mr-2" />Find Flights</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10"><Camera className="w-5 h-5 mr-2" />Get Tours</Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
              <p className="text-white/80 text-sm mb-3">📧 Get our free {g.destination} PDF guide</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder:text-white/50 border-0" />
                <Button className="bg-white text-[#573CD0] hover:bg-white/90"><Download className="w-4 h-4 mr-2" />Download</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Travel Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {g.relatedGuides.map((rg) => (
              <Link key={rg.name} href={`/guides/${rg.name.toLowerCase()}`}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={rg.image} alt={rg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#573CD0] transition-colors">{rg.name}</h3>
                    <p className="text-sm text-gray-500">{rg.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
