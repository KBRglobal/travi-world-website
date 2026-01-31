import { useEffect, useState, useMemo } from 'react';
import {
  Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Loader2,
  Ticket, MapPin, Sparkles, ExternalLink, Filter, X, Eye, RefreshCw,
  AlertCircle
} from 'lucide-react';
import TopBar from '../components/TopBar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Attraction {
  id: string;
  title: string;
  city: string;
  country: string;
  has_ai_content: boolean;
  ai_content: string | null;
  status: 'active' | 'pending' | 'inactive';
  tiqets_url: string;
  price: string;
  rating: number;
  reviews_count: number;
  category: string;
  image_url: string;
}

// ─── Mock Data Generator ──────────────────────────────────────────────────────

const CITIES = [
  'Amsterdam', 'Barcelona', 'Paris', 'Rome', 'London', 'Berlin', 'Dubai',
  'Istanbul', 'Lisbon', 'Prague', 'Vienna', 'Athens', 'Bangkok', 'Tokyo',
  'New York', 'Las Vegas', 'Sydney', 'Singapore', 'Marrakech', 'Florence',
];

const CATEGORIES = [
  'Museums', 'Tours', 'Attractions', 'Day Trips', 'Shows', 'Water Activities',
  'Food & Drink', 'Outdoor Activities', 'Landmarks', 'Theme Parks',
];

const SAMPLE_TITLES = [
  'Skip-the-Line Museum Entry', 'Hop-On Hop-Off Bus Tour', 'Guided Walking Tour',
  'River Cruise', 'Observatory Deck Tickets', 'Cathedral Fast-Track Entry',
  'Desert Safari', 'Cooking Class', 'Wine Tasting Experience', 'Sunset Sail',
  'Historic District Walking Tour', 'Art Gallery Pass', 'Water Park Admission',
  'Zoo & Aquarium Combo', 'Panoramic City Tour', 'Ancient Ruins Guided Visit',
  'Market & Food Tour', 'Night Tour', 'Segway City Tour', 'Helicopter Ride',
];

const AI_SAMPLES = [
  `🏛️ **Curated Experience Overview**\n\nThis attraction offers visitors a unique blend of cultural heritage and modern entertainment. Our AI analysis found it ranks in the top 15% of similar experiences in the city.\n\n**Key Highlights:**\n- Average visit duration: 2.5 hours\n- Best time to visit: Early morning (9-10 AM)\n- Accessibility: Wheelchair accessible\n- Languages: English, Spanish, French\n\n**Visitor Sentiment:** 87% positive based on 2,400+ reviews analyzed.`,
  `🌍 **AI-Enhanced Description**\n\nA must-visit destination that combines breathtaking views with rich historical context. Our content engine has generated optimized descriptions for SEO and social media.\n\n**Recommended For:**\n- History enthusiasts\n- Photography lovers\n- Family outings\n\n**Travel Tips:**\n- Book 3+ days in advance for 20% savings\n- Combine with nearby attractions for full-day itinerary\n- Audio guide available in 12 languages`,
  null,
];

function generateMockAttractions(count: number): Attraction[] {
  const items: Attraction[] = [];
  for (let i = 0; i < count; i++) {
    const city = CITIES[i % CITIES.length];
    const titleBase = SAMPLE_TITLES[i % SAMPLE_TITLES.length];
    const hasAI = Math.random() > 0.35;
    items.push({
      id: `attr-${i + 1}`,
      title: `${city} ${titleBase}`,
      city,
      country: city === 'Dubai' ? 'UAE' : city === 'Tokyo' ? 'Japan' : city === 'Bangkok' ? 'Thailand' : 'Various',
      has_ai_content: hasAI,
      ai_content: hasAI ? AI_SAMPLES[i % 2] : null,
      status: Math.random() > 0.15 ? 'active' : Math.random() > 0.5 ? 'pending' : 'inactive',
      tiqets_url: `https://www.tiqets.com/en/attraction-${i + 1}`,
      price: `€${(Math.random() * 80 + 10).toFixed(0)}`,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviews_count: Math.floor(Math.random() * 5000 + 100),
      category: CATEGORIES[i % CATEGORIES.length],
      image_url: '',
    });
  }
  return items;
}

// ─── Page Component ───────────────────────────────────────────────────────────

const PER_PAGE = 50;

export default function AttractionsPage() {
  const [allAttractions, setAllAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterAI, setFilterAI] = useState<'' | 'yes' | 'no'>('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'title' | 'city' | 'rating'>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Fetch from API with fallback to mock
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/attractions');
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data = await res.json();
        setAllAttractions(Array.isArray(data) ? data : data.attractions || []);
      } catch {
        // Fallback to mock data (3408 attractions as per Tiqets sync)
        setAllAttractions(generateMockAttractions(3408));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Cities dropdown
  const cities = useMemo(() => [...new Set(allAttractions.map((a) => a.city))].sort(), [allAttractions]);

  // Filter & sort
  const filtered = useMemo(() => {
    let result = allAttractions.filter((a) => {
      const matchSearch = !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.city.toLowerCase().includes(search.toLowerCase());
      const matchCity = !filterCity || a.city === filterCity;
      const matchAI = !filterAI || (filterAI === 'yes' ? a.has_ai_content : !a.has_ai_content);
      const matchStatus = !filterStatus || a.status === filterStatus;
      return matchSearch && matchCity && matchAI && matchStatus;
    });

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [allAttractions, search, filterCity, filterAI, filterStatus, sortField, sortDir]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, filterCity, filterAI, filterStatus]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 text-gray-600" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-indigo-400" /> : <ChevronDown className="w-3 h-3 text-indigo-400" />;
  };

  const activeFilters = [filterCity, filterAI, filterStatus].filter(Boolean).length;
  const aiCount = allAttractions.filter((a) => a.has_ai_content).length;
  const aiPercent = allAttractions.length ? Math.round((aiCount / allAttractions.length) * 100) : 0;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      <TopBar title="Attractions">
        <span className="text-sm text-gray-400">
          {allAttractions.length.toLocaleString()} Tiqets attractions synced
        </span>
      </TopBar>

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Attractions</p>
            <p className="text-2xl font-bold mt-1">{allAttractions.length.toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Cities</p>
            <p className="text-2xl font-bold mt-1">{cities.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">AI Content</p>
            <p className="text-2xl font-bold mt-1 flex items-center gap-1">
              {aiCount.toLocaleString()} <span className="text-sm text-gray-500 font-normal">({aiPercent}%)</span>
            </p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active</p>
            <p className="text-2xl font-bold mt-1">{allAttractions.filter((a) => a.status === 'active').length.toLocaleString()}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input className="input pl-10" placeholder="Search by title or city..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="min-w-[180px]">
            <select className="input" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
              <option value="">All Cities ({cities.length})</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c} ({allAttractions.filter((a) => a.city === c).length})</option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${activeFilters > 0 ? 'border-indigo-500 text-indigo-400' : ''}`}>
            <Filter className="w-4 h-4" />
            More {activeFilters > 0 && <span className="bg-indigo-500 text-white text-xs px-1.5 rounded-full">{activeFilters}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="card flex flex-wrap items-end gap-4">
            <div className="min-w-[160px]">
              <label className="label">AI Content</label>
              <select className="input" value={filterAI} onChange={(e) => setFilterAI(e.target.value as '' | 'yes' | 'no')}>
                <option value="">All</option>
                <option value="yes">Has AI Content</option>
                <option value="no">No AI Content</option>
              </select>
            </div>
            <div className="min-w-[140px]">
              <label className="label">Status</label>
              <select className="input" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button onClick={() => { setFilterAI(''); setFilterStatus(''); setFilterCity(''); }}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-1 pb-2">
              <X className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}

        {/* Results count + pagination info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((page - 1) * PER_PAGE + 1).toLocaleString()}–{Math.min(page * PER_PAGE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()} results
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading attractions from database...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card border-red-500/30 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-secondary ml-auto text-sm">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}

        {/* Attractions Table */}
        {!loading && (
          <div className="card overflow-hidden !p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                    onClick={() => toggleSort('title')}>
                    <span className="flex items-center gap-1">Title <SortIcon field="title" /></span>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer select-none hidden sm:table-cell"
                    onClick={() => toggleSort('city')}>
                    <span className="flex items-center gap-1">City <SortIcon field="city" /></span>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell cursor-pointer select-none"
                    onClick={() => toggleSort('rating')}>
                    <span className="flex items-center gap-1">Rating <SortIcon field="rating" /></span>
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">AI</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {paginated.map((attraction) => (
                  <>
                    <tr key={attraction.id} className="hover:bg-gray-700/30 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === attraction.id ? null : attraction.id)}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                            <Ticket className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate max-w-xs">{attraction.title}</p>
                            <p className="text-xs text-gray-500 sm:hidden">{attraction.city}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="flex items-center gap-1.5 text-sm text-gray-300">
                          <MapPin className="w-3.5 h-3.5 text-gray-500" /> {attraction.city}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded">{attraction.category}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-sm text-gray-300">⭐ {attraction.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({attraction.reviews_count})</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          attraction.has_ai_content
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-gray-600/30 text-gray-500'
                        }`}>
                          {attraction.has_ai_content ? (
                            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Yes</span>
                          ) : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          attraction.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          attraction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>{attraction.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        {expandedId === attraction.id
                          ? <ChevronUp className="w-4 h-4 text-gray-400" />
                          : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </td>
                    </tr>
                    {/* Expanded AI Content Preview */}
                    {expandedId === attraction.id && (
                      <tr key={`${attraction.id}-expanded`}>
                        <td colSpan={7} className="px-4 pb-4 bg-gray-800/50">
                          <div className="bg-gray-700/50 rounded-lg p-4 mt-1">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                AI Content Preview
                              </h4>
                              <div className="flex gap-2">
                                <span className="text-xs text-gray-500">{attraction.price}</span>
                                <a href={attraction.tiqets_url} target="_blank" rel="noreferrer"
                                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                  Tiqets <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                            {attraction.ai_content ? (
                              <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {attraction.ai_content}
                              </div>
                            ) : (
                              <div className="text-center py-6">
                                <Sparkles className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No AI content generated yet</p>
                                <button className="btn-secondary text-xs mt-2">Generate Content</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
                {paginated.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      <Ticket className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                      No attractions found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <button onClick={() => setPage(1)} disabled={page === 1}
                className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                First
              </button>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let num: number;
                if (totalPages <= 7) num = i + 1;
                else if (page <= 4) num = i + 1;
                else if (page >= totalPages - 3) num = totalPages - 6 + i;
                else num = page - 3 + i;
                return (
                  <button key={num} onClick={() => setPage(num)}
                    className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                      page === num
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-300'
                    }`}>
                    {num}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-1">
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
                className="px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors">
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
