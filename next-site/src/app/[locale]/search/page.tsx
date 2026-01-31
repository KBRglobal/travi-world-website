'use client';

// Search Results Page — converted from Kimi's design
import { useState } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Search, Star, ArrowRight, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const searchResults = {
  destinations: [
    { id: 1, name: 'Paris', country: 'France', type: 'destination', image: '/dest-paris.jpg', rating: 4.9 },
    { id: 2, name: 'Tokyo', country: 'Japan', type: 'destination', image: '/dest-tokyo.jpg', rating: 4.8 },
    { id: 3, name: 'Barcelona', country: 'Spain', type: 'destination', image: '/dest-barcelona.jpg', rating: 4.7 },
  ],
  hotels: [
    { id: 1, name: 'Le Meurice', location: 'Paris, France', type: 'hotel', image: '/dest-paris.jpg', rating: 5, price: 850 },
    { id: 2, name: 'Park Hyatt Tokyo', location: 'Tokyo, Japan', type: 'hotel', image: '/dest-tokyo.jpg', rating: 5, price: 800 },
  ],
  attractions: [
    { id: 1, name: 'Eiffel Tower', location: 'Paris, France', type: 'attraction', image: '/dest-paris.jpg', rating: 4.8 },
    { id: 2, name: 'Senso-ji Temple', location: 'Tokyo, Japan', type: 'attraction', image: '/dest-tokyo.jpg', rating: 4.9 },
  ],
  guides: [
    { id: 1, title: 'Complete Guide to Japan', author: 'Sarah Mitchell', type: 'guide', image: '/guide-japan.jpg', readTime: '15 min' },
    { id: 2, title: 'Hidden Gems of Europe', author: 'James Cooper', type: 'guide', image: '/guide-mediterranean.jpg', readTime: '8 min' },
  ],
};

function ResultCard({ result }: { result: any }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="group">
      <Link href={result.type === 'guide' ? `/guides/${result.id}` : `/${result.type === 'destination' ? 'destinations' : result.type + 's'}/${result.id}`}>
        <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-[#573CD0]/30 transition-colors">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img src={result.image} alt={result.name || result.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 bg-[#573CD0]/10 text-[#573CD0] rounded-full capitalize">{result.type}</span>
              {result.rating && (<div className="flex items-center gap-1"><Star className="w-3 h-3 fill-[#573CD0] text-[#573CD0]" /><span className="text-sm">{result.rating}</span></div>)}
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-[#573CD0] transition-colors truncate">{result.name || result.title}</h4>
            <p className="text-sm text-gray-500 truncate">{result.location || result.author || result.country}</p>
            {result.price && <p className="text-sm text-[#573CD0] font-medium mt-1">${result.price}<span className="text-gray-400 font-normal">/night</span></p>}
            {result.readTime && <p className="text-sm text-gray-400 mt-1">{result.readTime} read</p>}
          </div>
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#573CD0] transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { id: 'all', label: 'All Results', count: 8 },
    { id: 'destinations', label: 'Destinations', count: 3 },
    { id: 'hotels', label: 'Hotels', count: 2 },
    { id: 'attractions', label: 'Attractions', count: 2 },
    { id: 'guides', label: 'Guides', count: 2 },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getFilteredResults = () => {
    if (activeFilter === 'all') {
      return [
        ...searchResults.destinations,
        ...searchResults.hotels,
        ...searchResults.attractions,
        ...searchResults.guides,
      ];
    }
    return searchResults[activeFilter as keyof typeof searchResults] || [];
  };

  const filteredResults = getFilteredResults();

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gray-50 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
              Search Results <span className="text-gray-400">for &quot;{searchQuery || 'travel'}&quot;</span>
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search destinations, hotels, attractions..." className="pl-12 pr-4 py-4 rounded-xl border-gray-200 text-lg focus:border-[#573CD0]" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#573CD0] hover:bg-[#573CD0]/90">Search</Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-64 flex-shrink-0">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="p-2">{showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}</button>
              </div>
              <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="space-y-2">
                  {filters.map((filter) => (<button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${activeFilter === filter.id ? 'bg-[#573CD0] text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#573CD0]/10 hover:text-[#573CD0]'}`}>
                    <span className="font-medium">{filter.label}</span><span className={`text-sm ${activeFilter === filter.id ? 'text-white/70' : 'text-gray-400'}`}>{filter.count}</span>
                  </button>))}
                </div>
                <div className="hidden lg:block mt-8 p-6 bg-[#573CD0]/5 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-500 mb-4">Can&apos;t find what you&apos;re looking for?</p>
                  <Button variant="outline" className="w-full border-[#573CD0] text-[#573CD0]">Contact Support</Button>
                </div>
              </div>
            </motion.aside>

            {/* Results */}
            <div className="flex-1">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-500 mb-4">{filteredResults.length} results found</motion.p>
              <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-3">
                {filteredResults.map((result) => (<ResultCard key={`${result.type}-${result.id}`} result={result} />))}
              </motion.div>
              {filteredResults.length === 0 && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center"><Search className="w-8 h-8 text-gray-400" /></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </motion.div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
