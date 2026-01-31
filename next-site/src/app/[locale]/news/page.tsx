'use client';

// News Listing — converted from Kimi's professional news portal design
import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  ChevronRight, Clock, Eye, Flame, Calendar, User, MapPin,
  Search, Filter, ArrowRight, TrendingUp,
  Newspaper, Plane, Hotel, Camera, Utensils, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const categories = [
  { id: 'all', name: 'All', icon: Newspaper },
  { id: 'destinations', name: 'Destinations', icon: MapPin },
  { id: 'aviation', name: 'Aviation', icon: Plane },
  { id: 'hotels', name: 'Hotels', icon: Hotel },
  { id: 'attractions', name: 'Attractions', icon: Camera },
  { id: 'dining', name: 'Dining', icon: Utensils },
  { id: 'tips', name: 'Travel Tips', icon: Info },
];

const featuredArticle = {
  id: 1, title: 'Louvre Museum Unveils Largest Exhibition in 10 Years',
  subtitle: 'Renaissance Masters collection opens March 2026 with 200+ artworks',
  image: '/dest-paris.jpg', category: 'Museums', destination: 'Paris',
  author: 'Sarah Mitchell', date: 'Jan 30, 2026', readingTime: 5,
  views: '12.5K', trending: true, breaking: false,
};

const sideStories = [
  { id: 2, title: 'Dubai Announces New Mega Tourism Project', category: 'Destinations', date: '2h ago', image: '/dest-dubai.jpg' },
  { id: 3, title: 'Tokyo Olympics Legacy: What Changed', category: 'Attractions', date: '4h ago', image: '/dest-tokyo.jpg' },
  { id: 4, title: 'New York Hotel Prices Drop 15% in 2026', category: 'Hotels', date: '6h ago', image: '/dest-newyork.jpg' },
];

const latestNews = [
  { id: 5, title: 'Abu Dhabi Opens Record-Breaking Adventure Park', excerpt: "The new attraction features the world's longest zipline and immersive desert experiences.", image: '/dest-dubai.jpg', category: 'Attractions', destination: 'Abu Dhabi', date: 'Jan 29, 2026', readingTime: 4, views: '8.2K' },
  { id: 6, title: 'Direct Flights Connect London to 5 New Asian Cities', excerpt: 'British Airways expands its network with new routes to Southeast Asia starting March.', image: '/dest-london.jpg', category: 'Aviation', destination: 'London', date: 'Jan 29, 2026', readingTime: 3, views: '6.7K' },
  { id: 7, title: "Ras Al Khaimah: The UAE's Hidden Gem", excerpt: 'Why this northern emirate is becoming the top choice for adventure travelers.', image: '/dest-dubai.jpg', category: 'Destinations', destination: 'Ras Al Khaimah', date: 'Jan 28, 2026', readingTime: 6, views: '9.1K' },
  { id: 8, title: 'Bangkok Street Food: 2026 Guide', excerpt: "From Michelin-starred stalls to night markets - where to eat in Thailand's capital.", image: '/dest-bangkok.jpg', category: 'Dining', destination: 'Bangkok', date: 'Jan 28, 2026', readingTime: 5, views: '11.3K' },
  { id: 9, title: "Singapore's New Airport Terminal Opens", excerpt: "Changi Terminal 5 features the world's largest indoor waterfall and rainforest.", image: '/dest-tokyo.jpg', category: 'Aviation', destination: 'Singapore', date: 'Jan 27, 2026', readingTime: 4, views: '15.2K' },
  { id: 10, title: 'Istanbul: 48-Hour Perfect Itinerary', excerpt: 'How to see the best of both continents in just two days.', image: '/dest-rome.jpg', category: 'Tips', destination: 'Istanbul', date: 'Jan 27, 2026', readingTime: 7, views: '7.8K' },
  { id: 11, title: 'Las Vegas: New Hotels Opening 2026', excerpt: 'Three luxury resorts debut on the Strip this year with record-breaking amenities.', image: '/dest-newyork.jpg', category: 'Hotels', destination: 'Las Vegas', date: 'Jan 26, 2026', readingTime: 4, views: '5.4K' },
  { id: 12, title: 'Hong Kong Disneyland Expansion Complete', excerpt: 'New Frozen-themed land opens with exclusive attractions.', image: '/dest-tokyo.jpg', category: 'Attractions', destination: 'Hong Kong', date: 'Jan 26, 2026', readingTime: 3, views: '8.9K' },
];

const trendingNews = [
  { id: 1, title: '10 Hidden Gems in Istanbul You Must Visit', category: 'Tips', views: '45K' },
  { id: 2, title: 'Dubai vs Abu Dhabi: Where to Go in 2026', category: 'Destinations', views: '38K' },
  { id: 3, title: 'New York City Pass: Is It Worth It?', category: 'Tips', views: '32K' },
  { id: 4, title: 'Tokyo Olympics Legacy: What Changed', category: 'Attractions', views: '28K' },
  { id: 5, title: 'Best Time to Visit Paris in 2026', category: 'Tips', views: '25K' },
];

const popularTags = ['Dubai', 'Paris', 'Tokyo', 'Budget Travel', 'Luxury', 'Family', 'Food', 'Adventure', 'Hotels', 'Flights'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = activeCategory === 'all'
    ? latestNews
    : latestNews.filter((article) => article.category.toLowerCase() === activeCategory);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="pt-4 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#573CD0] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#573CD0] font-medium">News</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Travel News & Updates</h1>
            <p className="text-gray-600 text-lg max-w-2xl">Latest news, tips, and announcements from 17 destinations worldwide</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="text" placeholder="Search news..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-12 rounded-xl border-gray-200 focus:border-[#573CD0]" />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500"><Filter className="w-4 h-4" /><span>Filter by category:</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-[#573CD0] text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                <cat.icon className="w-4 h-4" />{cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Link href={`/news/${featuredArticle.id}`}>
                <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                  <div className="aspect-[16/9] relative">
                    <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {featuredArticle.trending && <Badge className="bg-orange-500 text-white border-0"><Flame className="w-3 h-3 mr-1" />Trending</Badge>}
                      <Badge className="bg-[#573CD0] text-white border-0">{featuredArticle.category}</Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#573CD0] transition-colors">{featuredArticle.title}</h2>
                      <p className="text-white/80 text-lg mb-4 hidden md:block">{featuredArticle.subtitle}</p>
                      <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{featuredArticle.date}</span>
                        <span className="flex items-center gap-1"><User className="w-4 h-4" />{featuredArticle.author}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{featuredArticle.destination}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{featuredArticle.readingTime} min read</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-[#573CD0]" />Also Trending</h3>
              {sideStories.map((story) => (
                <Link key={story.id} href={`/news/${story.id}`}>
                  <article className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="text-[#573CD0] border-[#573CD0]/30 text-xs mb-2">{story.category}</Badge>
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-[#573CD0] transition-colors">{story.title}</h4>
                      <span className="text-xs text-gray-400 mt-1">{story.date}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest News Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#573CD0]" />Latest Articles
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((article) => (
              <motion.article key={article.id} variants={fadeInUp} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer">
                <Link href={`/news/${article.id}`}>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3"><Badge className="bg-[#573CD0] text-white border-0 text-xs">{article.category}</Badge></div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <MapPin className="w-3 h-3" />{article.destination}<span>•</span><Clock className="w-3 h-3" />{article.readingTime} min
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#573CD0] transition-colors">{article.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Button variant="outline" className="px-8 rounded-full">Load More Articles<ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* Trending & Tags */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-orange-500" />Most Read This Week</h3>
                <div className="space-y-4">
                  {trendingNews.map((news, index) => (
                    <div key={news.id} className="flex items-start gap-4 group cursor-pointer">
                      <span className="text-3xl font-bold text-orange-200 group-hover:text-orange-400 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-[#573CD0] transition-colors">{news.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">{news.category}</Badge>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{news.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-[#573CD0] hover:text-white hover:border-[#573CD0] transition-colors">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="bg-[#573CD0] rounded-2xl p-6 text-white">
                <Newspaper className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">Travel News Weekly</h3>
                <p className="text-white/80 text-sm mb-4">Get the latest updates from 17 destinations delivered to your inbox.</p>
                <div className="space-y-2">
                  <Input type="email" placeholder="your@email.com" className="bg-white/20 border-0 text-white placeholder:text-white/50" />
                  <Button className="w-full bg-white text-[#573CD0] hover:bg-white/90">Subscribe</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
