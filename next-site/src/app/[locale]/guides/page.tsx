'use client';

// Guides Listing — converted from Kimi's design
import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { BookOpen, Clock, Eye, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const guides = [
  { id: 1, title: 'Complete Guide to Japan: 2-Week Itinerary', excerpt: 'Discover the perfect blend of ancient traditions and modern marvels in this comprehensive Japan travel guide.', image: '/guide-japan.jpg', author: 'Sarah Mitchell', avatar: 'SM', date: 'Jan 15, 2026', readTime: '15 min', views: '12.5K', category: 'Itinerary', featured: true },
  { id: 2, title: 'Hidden Gems of Mediterranean Europe', excerpt: 'Explore the lesser-known treasures of the Mediterranean coast, from secret beaches to charming villages.', image: '/guide-mediterranean.jpg', author: 'James Cooper', avatar: 'JC', date: 'Jan 12, 2026', readTime: '8 min', views: '8.2K', category: 'Europe', featured: false },
  { id: 3, title: 'Ultimate Safari Guide: Tanzania & Kenya', excerpt: 'Everything you need to know about planning the perfect African safari adventure.', image: '/guide-safari.jpg', author: 'Emma Wilson', avatar: 'EW', date: 'Jan 10, 2026', readTime: '12 min', views: '6.8K', category: 'Africa', featured: false },
  { id: 4, title: 'Backpacking Southeast Asia on a Budget', excerpt: 'How to explore Thailand, Vietnam, and Cambodia without breaking the bank.', image: '/hero-bali.jpg', author: 'Michael Chen', avatar: 'MC', date: 'Jan 8, 2026', readTime: '10 min', views: '15.3K', category: 'Budget', featured: false },
  { id: 5, title: 'Paris Like a Local: Insider Tips', excerpt: 'Skip the tourist traps and experience the real Paris with these local recommendations.', image: '/dest-paris.jpg', author: 'Marie Dubois', avatar: 'MD', date: 'Jan 5, 2026', readTime: '7 min', views: '9.1K', category: 'Tips', featured: false },
  { id: 6, title: 'Iceland Ring Road: 10-Day Road Trip', excerpt: "The ultimate guide to driving Iceland's famous Ring Road with all the must-see stops.", image: '/dest-iceland.jpg', author: 'Olaf Hansen', avatar: 'OH', date: 'Jan 3, 2026', readTime: '18 min', views: '7.4K', category: 'Road Trip', featured: false },
];

const categories = ['All', 'Itinerary', 'Tips', 'Europe', 'Asia', 'Africa', 'Budget', 'Road Trip'];

function FeaturedGuide({ guide }: { guide: (typeof guides)[0] }) {
  return (
    <motion.div variants={fadeInUp} className="group grid lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <Link href={`/guides/${guide.id}`} className="relative h-[300px] lg:h-auto overflow-hidden">
        <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-[#573CD0] text-white text-sm font-medium rounded-lg">Featured</span>
      </Link>
      <div className="p-6 lg:p-8 flex flex-col justify-center">
        <span className="inline-flex w-fit px-3 py-1 bg-[#573CD0]/10 text-[#573CD0] text-sm rounded-full mb-4">{guide.category}</span>
        <Link href={`/guides/${guide.id}`}>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#573CD0] transition-colors">{guide.title}</h3>
        </Link>
        <p className="text-gray-600 mb-5">{guide.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{guide.views}</span>
          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{guide.readTime}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#573CD0] flex items-center justify-center text-white font-medium">{guide.avatar}</div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{guide.author}</p>
              <p className="text-xs text-gray-500">{guide.date}</p>
            </div>
          </div>
          <Link href={`/guides/${guide.id}`}>
            <Button className="bg-[#573CD0] hover:bg-[#573CD0]/90 text-white">
              Read Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function GuideCard({ guide }: { guide: (typeof guides)[0] }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <Link href={`/guides/${guide.id}`}>
        <div className="relative h-44 overflow-hidden">
          <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 text-[#573CD0] text-xs font-medium rounded">{guide.category}</span>
        </div>
        <div className="p-5">
          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#573CD0] transition-colors">{guide.title}</h4>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#573CD0] flex items-center justify-center text-white text-xs">{guide.avatar}</div>
              <span>{guide.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{guide.views}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{guide.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || guide.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGuide = guides.find((g) => g.featured);
  const regularGuides = filteredGuides.filter((g) => !g.featured || activeCategory !== 'All');

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#573CD0]/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-[#573CD0]" />
              <span className="text-sm font-medium text-[#573CD0]">Travel Guides</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Expert <span className="bg-gradient-to-r from-[#573CD0] to-[#6443F4] bg-clip-text text-transparent">Travel Guides</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              In-depth guides written by travel experts and locals who know the destinations inside out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-xl border-gray-200 focus:border-[#573CD0]"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat ? 'bg-[#573CD0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#573CD0]/10 hover:text-[#573CD0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {featuredGuide && activeCategory === 'All' && !searchQuery && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-10">
              <FeaturedGuide guide={featuredGuide} />
            </motion.div>
          )}

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </motion.div>

          {regularGuides.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-500">Try adjusting your search or category</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
