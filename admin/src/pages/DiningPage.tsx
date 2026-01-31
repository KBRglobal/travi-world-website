import { useEffect, useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, UtensilsCrossed, MapPin, Filter, X,
  Loader2, Star, Clock, DollarSign, Phone, Globe, ChefHat, Tag
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Restaurant {
  id: string;
  name: string;
  destination: string;
  address: string;
  cuisine_type: string;
  price_range: '$' | '$$' | '$$$' | '$$$$';
  status: 'active' | 'draft' | 'closed';
  rating: number;
  description: string;
  phone: string;
  website: string;
  hours: string;
  image: string;
  tags: string[];
  reservations: boolean;
  delivery: boolean;
  outdoor_seating: boolean;
  halal: boolean;
  vegetarian_friendly: boolean;
}

const emptyRestaurant: Restaurant = {
  id: '', name: '', destination: '', address: '', cuisine_type: '',
  price_range: '$$', status: 'draft', rating: 0, description: '',
  phone: '', website: '', hours: '', image: '', tags: [],
  reservations: false, delivery: false, outdoor_seating: false,
  halal: false, vegetarian_friendly: false,
};

const CUISINE_TYPES = [
  'Italian', 'Japanese', 'French', 'Thai', 'Indian', 'Mexican',
  'Mediterranean', 'Chinese', 'Korean', 'Middle Eastern', 'American',
  'Seafood', 'Steakhouse', 'Vegetarian', 'Fusion', 'Cafe', 'Bakery',
  'Street Food', 'Fine Dining', 'International',
];

const DESTINATIONS = [
  'Bali', 'Maldives', 'Dubai', 'Paris', 'Tokyo', 'New York', 'London',
  'Barcelona', 'Rome', 'Bangkok', 'Singapore', 'Istanbul', 'Marrakech',
  'Cape Town', 'Santorini', 'Cancun', 'Sydney', 'Zurich',
];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    ...emptyRestaurant, id: '1', name: 'Locavore', destination: 'Bali',
    address: 'Jl. Dewi Sita, Ubud', cuisine_type: 'Fusion', price_range: '$$$$',
    status: 'active', rating: 4.8, description: 'Award-winning farm-to-table restaurant in the heart of Ubud.',
    hours: '12:00–22:00', reservations: true, tags: ['Fine Dining', 'Farm to Table', 'Award Winner'],
  },
  {
    ...emptyRestaurant, id: '2', name: 'Nobu Dubai', destination: 'Dubai',
    address: 'Atlantis The Royal, Palm Jumeirah', cuisine_type: 'Japanese', price_range: '$$$$',
    status: 'active', rating: 4.7, description: 'World-renowned Japanese-Peruvian fusion dining.',
    hours: '18:00–00:00', reservations: true, tags: ['Celebrity Chef', 'Waterfront', 'Cocktails'],
  },
  {
    ...emptyRestaurant, id: '3', name: 'Le Comptoir du Panthéon', destination: 'Paris',
    address: '5 Rue Soufflot, 75005', cuisine_type: 'French', price_range: '$$$',
    status: 'active', rating: 4.4, description: 'Classic French brasserie near the Panthéon.',
    hours: '08:00–23:30', outdoor_seating: true, tags: ['Classic', 'Terrace', 'Brunch'],
  },
  {
    ...emptyRestaurant, id: '4', name: 'Raan Jay Fai', destination: 'Bangkok',
    address: '327 Maha Chai Rd', cuisine_type: 'Thai', price_range: '$$',
    status: 'active', rating: 4.6, description: 'Michelin-starred street food legend. Famous for crab omelette.',
    hours: '14:00–21:00', tags: ['Street Food', 'Michelin Star', 'Local Favorite'],
  },
  {
    ...emptyRestaurant, id: '5', name: 'Can Culleretes', destination: 'Barcelona',
    address: 'Carrer d\'en Quintana, 5', cuisine_type: 'Mediterranean', price_range: '$$',
    status: 'active', rating: 4.3, description: 'Barcelona\'s oldest restaurant, serving since 1786.',
    hours: '13:00–22:00', outdoor_seating: true, tags: ['Historic', 'Traditional', 'Tapas'],
  },
  {
    ...emptyRestaurant, id: '6', name: 'Ichiran Ramen Shibuya', destination: 'Tokyo',
    address: '1-22-7 Jinnan, Shibuya', cuisine_type: 'Japanese', price_range: '$',
    status: 'active', rating: 4.5, description: 'Famous solo-dining ramen experience.',
    hours: '24h', tags: ['Ramen', 'Late Night', 'Solo Friendly'],
  },
  {
    ...emptyRestaurant, id: '7', name: 'Ithaa Undersea', destination: 'Maldives',
    address: 'Conrad Maldives Rangali Island', cuisine_type: 'Fine Dining', price_range: '$$$$',
    status: 'active', rating: 4.9, description: 'World\'s first underwater restaurant.',
    hours: '11:00–14:00, 18:30–22:00', reservations: true, tags: ['Underwater', 'Unique', 'Romantic'],
  },
  {
    ...emptyRestaurant, id: '8', name: 'Al Fanar', destination: 'Dubai',
    address: 'Festival City Mall', cuisine_type: 'Middle Eastern', price_range: '$$',
    status: 'draft', rating: 4.2, description: 'Traditional Emirati cuisine in a heritage-themed setting.',
    hours: '10:00–23:00', halal: true, tags: ['Traditional', 'Family Friendly', 'Halal'],
  },
  {
    ...emptyRestaurant, id: '9', name: 'Osteria da Enzo', destination: 'Rome',
    address: 'Via dei Vascellari, 29', cuisine_type: 'Italian', price_range: '$$',
    status: 'active', rating: 4.6, description: 'Authentic Roman trattoria in Trastevere.',
    hours: '12:30–15:00, 19:30–23:00', outdoor_seating: true, tags: ['Pasta', 'Authentic', 'Trastevere'],
  },
  {
    ...emptyRestaurant, id: '10', name: 'Sky Garden Café', destination: 'Bali',
    address: 'Jl. Raya Penelokan, Kintamani', cuisine_type: 'International', price_range: '$$',
    status: 'closed', rating: 4.1, description: 'Stunning volcano views over Batur caldera.',
    hours: '08:00–18:00', outdoor_seating: true, vegetarian_friendly: true,
    tags: ['View', 'Brunch', 'Instagram'],
  },
];

// ─── Price Badge Component ────────────────────────────────────────────────────

function PriceBadge({ range }: { range: string }) {
  const colors: Record<string, string> = {
    '$': 'bg-green-500/20 text-green-400',
    '$$': 'bg-blue-500/20 text-blue-400',
    '$$$': 'bg-yellow-500/20 text-yellow-400',
    '$$$$': 'bg-purple-500/20 text-purple-400',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[range] || 'bg-gray-600/30 text-gray-400'}`}>
      {range}
    </span>
  );
}

// ─── Checkbox Field ───────────────────────────────────────────────────────────

function CheckField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        checked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-600 group-hover:border-gray-500'
      }`}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>}
      </div>
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DiningPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDest, setFilterDest] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [editing, setEditing] = useState<Restaurant | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setRestaurants(MOCK_RESTAURANTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filtering
  const filtered = restaurants.filter((r) => {
    const matchSearch = !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.destination.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine_type.toLowerCase().includes(search.toLowerCase());
    const matchDest = !filterDest || r.destination === filterDest;
    const matchCuisine = !filterCuisine || r.cuisine_type === filterCuisine;
    const matchPrice = !filterPrice || r.price_range === filterPrice;
    const matchStatus = !filterStatus || r.status === filterStatus;
    return matchSearch && matchDest && matchCuisine && matchPrice && matchStatus;
  });

  const destinations = [...new Set(restaurants.map((r) => r.destination))].sort();
  const cuisines = [...new Set(restaurants.map((r) => r.cuisine_type))].sort();
  const activeFilters = [filterDest, filterCuisine, filterPrice, filterStatus].filter(Boolean).length;

  // CRUD
  const openAdd = () => {
    setEditing({ ...emptyRestaurant, id: Date.now().toString() });
    setModalOpen(true);
  };
  const openEdit = (r: Restaurant) => {
    setEditing({ ...r, tags: [...r.tags] });
    setModalOpen(true);
  };
  const saveRestaurant = () => {
    if (!editing || !editing.name.trim()) return;
    setRestaurants((prev) => {
      const idx = prev.findIndex((r) => r.id === editing.id);
      if (idx >= 0) { const c = [...prev]; c[idx] = editing; return c; }
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };
  const deleteRestaurant = (id: string) => {
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
    setDeleteConfirm(null);
  };
  const addTag = () => {
    if (!editing || !tagInput.trim()) return;
    if (!editing.tags.includes(tagInput.trim())) {
      setEditing({ ...editing, tags: [...editing.tags, tagInput.trim()] });
    }
    setTagInput('');
  };
  const removeTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((t) => t !== tag) });
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div>
        <TopBar title="Dining" />
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading restaurants...
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Dining">
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Restaurant
        </button>
      </TopBar>

      <div className="p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Restaurants</p>
            <p className="text-2xl font-bold mt-1">{restaurants.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Destinations</p>
            <p className="text-2xl font-bold mt-1">{destinations.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Cuisines</p>
            <p className="text-2xl font-bold mt-1">{cuisines.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active</p>
            <p className="text-2xl font-bold mt-1">{restaurants.filter((r) => r.status === 'active').length}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input className="input pl-10" placeholder="Search by name, destination, cuisine..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${activeFilters > 0 ? 'border-indigo-500 text-indigo-400' : ''}`}>
            <Filter className="w-4 h-4" />
            Filters {activeFilters > 0 && <span className="bg-indigo-500 text-white text-xs px-1.5 rounded-full">{activeFilters}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="card flex flex-wrap items-end gap-4">
            <div className="min-w-[160px]">
              <label className="label">Destination</label>
              <select className="input" value={filterDest} onChange={(e) => setFilterDest(e.target.value)}>
                <option value="">All</option>
                {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="min-w-[160px]">
              <label className="label">Cuisine</label>
              <select className="input" value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)}>
                <option value="">All</option>
                {cuisines.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="min-w-[120px]">
              <label className="label">Price</label>
              <select className="input" value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)}>
                <option value="">All</option>
                <option value="$">$ Budget</option>
                <option value="$$">$$ Mid</option>
                <option value="$$$">$$$ Upscale</option>
                <option value="$$$$">$$$$ Fine</option>
              </select>
            </div>
            <div className="min-w-[120px]">
              <label className="label">Status</label>
              <select className="input" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {activeFilters > 0 && (
              <button onClick={() => { setFilterDest(''); setFilterCuisine(''); setFilterPrice(''); setFilterStatus(''); }}
                className="text-sm text-gray-400 hover:text-white flex items-center gap-1 pb-2">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        )}

        <p className="text-sm text-gray-500">{filtered.length} restaurant{filtered.length !== 1 ? 's' : ''}</p>

        {/* Table */}
        <div className="card overflow-hidden !p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Restaurant</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Destination</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Cuisine</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Price</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Rating</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                        <UtensilsCrossed className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{r.name}</p>
                        <p className="text-xs text-gray-500 truncate">{r.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" /> {r.destination}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                      <ChefHat className="w-3.5 h-3.5 text-gray-500" /> {r.cuisine_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <PriceBadge range={r.price_range} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {r.rating > 0 ? (
                      <span className="flex items-center gap-1 text-sm text-gray-300">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {r.rating}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      r.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      r.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(r)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4 text-gray-400" />
                      </button>
                      <button onClick={() => setDeleteConfirm(r.id)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    <UtensilsCrossed className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                    No restaurants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-2">Delete Restaurant</h3>
            <p className="text-sm text-gray-400 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => deleteRestaurant(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }}
        title={editing?.id && restaurants.find((r) => r.id === editing.id) ? 'Edit Restaurant' : 'Add Restaurant'} wide>
        {editing && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label">Restaurant Name *</label>
                <input className="input" placeholder="e.g. Nobu Dubai" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Destination *</label>
                <select className="input" value={editing.destination} onChange={(e) => setEditing({ ...editing, destination: e.target.value })}>
                  <option value="">Select destination</option>
                  {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Address</label>
                <input className="input" placeholder="Street address" value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} />
              </div>
              <div>
                <label className="label">Cuisine Type *</label>
                <select className="input" value={editing.cuisine_type} onChange={(e) => setEditing({ ...editing, cuisine_type: e.target.value })}>
                  <option value="">Select cuisine</option>
                  {CUISINE_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Price Range</label>
                <select className="input" value={editing.price_range} onChange={(e) => setEditing({ ...editing, price_range: e.target.value as Restaurant['price_range'] })}>
                  <option value="$">$ — Budget</option>
                  <option value="$$">$$ — Mid-range</option>
                  <option value="$$$">$$$ — Upscale</option>
                  <option value="$$$$">$$$$ — Fine Dining</option>
                </select>
              </div>
              <div>
                <label className="label">Rating (0-5)</label>
                <input type="number" className="input" min={0} max={5} step={0.1} value={editing.rating || ''} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Restaurant['status'] })}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Description</label>
              <textarea className="textarea" rows={3} placeholder="Restaurant description..."
                value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="label">Phone</label>
                <input className="input" placeholder="+1 234 567 890" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </div>
              <div>
                <label className="label">Website</label>
                <input className="input" placeholder="https://..." value={editing.website} onChange={(e) => setEditing({ ...editing, website: e.target.value })} />
              </div>
              <div>
                <label className="label">Opening Hours</label>
                <input className="input" placeholder="e.g. 12:00–22:00" value={editing.hours} onChange={(e) => setEditing({ ...editing, hours: e.target.value })} />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="label">Features</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
                <CheckField label="Reservations" checked={editing.reservations} onChange={(v) => setEditing({ ...editing, reservations: v })} />
                <CheckField label="Delivery" checked={editing.delivery} onChange={(v) => setEditing({ ...editing, delivery: v })} />
                <CheckField label="Outdoor Seating" checked={editing.outdoor_seating} onChange={(v) => setEditing({ ...editing, outdoor_seating: v })} />
                <CheckField label="Halal" checked={editing.halal} onChange={(v) => setEditing({ ...editing, halal: v })} />
                <CheckField label="Vegetarian Friendly" checked={editing.vegetarian_friendly} onChange={(v) => setEditing({ ...editing, vegetarian_friendly: v })} />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="label">Tags</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {editing.tags.map((tag) => (
                  <span key={tag} className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="input flex-1" placeholder="Add tag..." value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                <button onClick={addTag} className="btn-secondary">Add</button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button onClick={() => { setModalOpen(false); setEditing(null); }} className="btn-secondary">Cancel</button>
              <button onClick={saveRestaurant} disabled={!editing.name.trim()} className="btn-primary disabled:opacity-50">Save Restaurant</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
