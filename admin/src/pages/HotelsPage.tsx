import { useEffect, useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, Hotel, Star, MapPin, Users,
  Filter, X, ChevronDown, Loader2, BedDouble, Tag, Target
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HotelItem {
  id: string;
  name: string;
  destination: string;
  location: string;
  star_rating: number;
  rooms: number;
  status: 'active' | 'draft' | 'archived';
  amenities: string[];
  room_types: string[];
  target_audience: string[];
  description: string;
  image: string;
  price_range: string;
  website: string;
  phone: string;
}

const emptyHotel: HotelItem = {
  id: '', name: '', destination: '', location: '', star_rating: 4, rooms: 0,
  status: 'draft', amenities: [], room_types: [], target_audience: [],
  description: '', image: '', price_range: '', website: '', phone: '',
};

const DESTINATIONS = [
  'Bali', 'Maldives', 'Dubai', 'Paris', 'Tokyo', 'New York', 'London',
  'Barcelona', 'Rome', 'Bangkok', 'Singapore', 'Istanbul', 'Marrakech',
  'Cape Town', 'Santorini', 'Cancun', 'Sydney', 'Zurich',
];

const AMENITY_OPTIONS = [
  'WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Room Service',
  'Parking', 'Beach Access', 'Airport Shuttle', 'Business Center',
  'Kids Club', 'Pet Friendly', 'Concierge', 'Laundry', 'EV Charging',
];

const ROOM_TYPE_OPTIONS = [
  'Standard', 'Deluxe', 'Suite', 'Presidential Suite', 'Villa',
  'Penthouse', 'Family Room', 'Bungalow', 'Overwater Villa', 'Studio',
];

const AUDIENCE_OPTIONS = [
  'Families', 'Couples', 'Solo Travelers', 'Business', 'Luxury',
  'Budget', 'Adventure', 'Wellness', 'Honeymooners', 'Digital Nomads',
];

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_HOTELS: HotelItem[] = [
  {
    ...emptyHotel, id: '1', name: 'Four Seasons Resort Bali', destination: 'Bali',
    location: 'Jimbaran Bay', star_rating: 5, rooms: 156, status: 'active',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access'],
    room_types: ['Deluxe', 'Suite', 'Villa'], target_audience: ['Luxury', 'Couples'],
    price_range: '$$$$$',
  },
  {
    ...emptyHotel, id: '2', name: 'Soneva Fushi', destination: 'Maldives',
    location: 'Baa Atoll', star_rating: 5, rooms: 63, status: 'active',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach Access', 'Kids Club'],
    room_types: ['Villa', 'Overwater Villa'], target_audience: ['Luxury', 'Families', 'Honeymooners'],
    price_range: '$$$$$',
  },
  {
    ...emptyHotel, id: '3', name: 'Ritz-Carlton DIFC', destination: 'Dubai',
    location: 'DIFC', star_rating: 5, rooms: 283, status: 'active',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Business Center'],
    room_types: ['Deluxe', 'Suite', 'Presidential Suite'], target_audience: ['Business', 'Luxury'],
    price_range: '$$$$',
  },
  {
    ...emptyHotel, id: '4', name: 'Hotel Le Marais', destination: 'Paris',
    location: 'Le Marais, 4th Arr.', star_rating: 4, rooms: 42, status: 'draft',
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Concierge'],
    room_types: ['Standard', 'Deluxe', 'Suite'], target_audience: ['Couples', 'Solo Travelers'],
    price_range: '$$$',
  },
  {
    ...emptyHotel, id: '5', name: 'Capsule Inn Shibuya', destination: 'Tokyo',
    location: 'Shibuya', star_rating: 3, rooms: 200, status: 'active',
    amenities: ['WiFi', 'Laundry'], room_types: ['Standard'],
    target_audience: ['Budget', 'Solo Travelers', 'Digital Nomads'],
    price_range: '$',
  },
  {
    ...emptyHotel, id: '6', name: 'Atlantis The Royal', destination: 'Dubai',
    location: 'Palm Jumeirah', star_rating: 5, rooms: 795, status: 'active',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Beach Access', 'Kids Club', 'Parking'],
    room_types: ['Deluxe', 'Suite', 'Presidential Suite', 'Penthouse', 'Villa'],
    target_audience: ['Luxury', 'Families', 'Couples'],
    price_range: '$$$$$',
  },
  {
    ...emptyHotel, id: '7', name: 'Novotel Barcelona City', destination: 'Barcelona',
    location: 'Eixample', star_rating: 4, rooms: 133, status: 'archived',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
    room_types: ['Standard', 'Deluxe', 'Family Room'], target_audience: ['Families', 'Business'],
    price_range: '$$',
  },
];

// ─── Tag Input Component ──────────────────────────────────────────────────────

function TagInput({
  label, value, onChange, options,
}: {
  label: string; value: string[]; onChange: (v: string[]) => void; options: string[];
}) {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const available = options.filter((o) => !value.includes(o) && o.toLowerCase().includes(input.toLowerCase()));

  const add = (tag: string) => {
    if (!value.includes(tag)) onChange([...value, tag]);
    setInput('');
    setShowDropdown(false);
  };
  const remove = (tag: string) => onChange(value.filter((v) => v !== tag));

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span key={tag} className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
            {tag}
            <button onClick={() => remove(tag)} className="hover:text-red-400">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          className="input"
          placeholder={`Add ${label.toLowerCase()}...`}
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        {showDropdown && available.length > 0 && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl max-h-40 overflow-y-auto">
            {available.map((opt) => (
              <button key={opt} onMouseDown={() => add(opt)}
                className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 transition-colors">
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" onClick={() => onChange?.(s)}
          className={`${onChange ? 'cursor-pointer' : 'cursor-default'}`}>
          <Star className={`w-4 h-4 ${s <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDest, setFilterDest] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStars, setFilterStars] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [editing, setEditing] = useState<HotelItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const timer = setTimeout(() => {
      setHotels(MOCK_HOTELS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filtering
  const filtered = hotels.filter((h) => {
    const matchSearch = !search ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.destination.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchDest = !filterDest || h.destination === filterDest;
    const matchStatus = !filterStatus || h.status === filterStatus;
    const matchStars = !filterStars || h.star_rating === filterStars;
    return matchSearch && matchDest && matchStatus && matchStars;
  });

  const destinations = [...new Set(hotels.map((h) => h.destination))].sort();
  const activeFilters = [filterDest, filterStatus, filterStars].filter(Boolean).length;

  // CRUD
  const openAdd = () => {
    setEditing({ ...emptyHotel, id: Date.now().toString() });
    setModalOpen(true);
  };
  const openEdit = (hotel: HotelItem) => {
    setEditing({ ...hotel });
    setModalOpen(true);
  };
  const saveHotel = () => {
    if (!editing || !editing.name.trim()) return;
    setHotels((prev) => {
      const idx = prev.findIndex((h) => h.id === editing.id);
      if (idx >= 0) { const c = [...prev]; c[idx] = editing; return c; }
      return [...prev, editing];
    });
    setModalOpen(false);
    setEditing(null);
  };
  const deleteHotel = (id: string) => {
    setHotels((prev) => prev.filter((h) => h.id !== id));
    setDeleteConfirm(null);
  };
  const clearFilters = () => {
    setFilterDest('');
    setFilterStatus('');
    setFilterStars(0);
  };

  // Stats
  const totalRooms = hotels.reduce((sum, h) => sum + h.rooms, 0);
  const avgStars = hotels.length ? (hotels.reduce((sum, h) => sum + h.star_rating, 0) / hotels.length).toFixed(1) : '0';

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div>
        <TopBar title="Hotels" />
        <div className="flex items-center justify-center h-64 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading hotels...
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Hotels">
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Hotel
        </button>
      </TopBar>

      <div className="p-6 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Hotels</p>
            <p className="text-2xl font-bold mt-1">{hotels.length}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Rooms</p>
            <p className="text-2xl font-bold mt-1">{totalRooms.toLocaleString()}</p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Rating</p>
            <p className="text-2xl font-bold mt-1 flex items-center gap-1">
              {avgStars} <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </p>
          </div>
          <div className="card">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active</p>
            <p className="text-2xl font-bold mt-1">{hotels.filter((h) => h.status === 'active').length}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input className="input pl-10" placeholder="Search hotels by name, destination..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary ${activeFilters > 0 ? 'border-indigo-500 text-indigo-400' : ''}`}>
            <Filter className="w-4 h-4" />
            Filters {activeFilters > 0 && <span className="bg-indigo-500 text-white text-xs px-1.5 rounded-full">{activeFilters}</span>}
          </button>
        </div>

        {/* Filter Bar */}
        {showFilters && (
          <div className="card flex flex-wrap items-end gap-4">
            <div className="min-w-[160px]">
              <label className="label">Destination</label>
              <select className="input" value={filterDest} onChange={(e) => setFilterDest(e.target.value)}>
                <option value="">All Destinations</option>
                {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="min-w-[140px]">
              <label className="label">Status</label>
              <select className="input" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="min-w-[140px]">
              <label className="label">Star Rating</label>
              <select className="input" value={filterStars} onChange={(e) => setFilterStars(Number(e.target.value))}>
                <option value={0}>All Stars</option>
                {[5, 4, 3, 2, 1].map((s) => <option key={s} value={s}>{s} Star{s > 1 ? 's' : ''}</option>)}
              </select>
            </div>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-white flex items-center gap-1 pb-2">
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-500">{filtered.length} hotel{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Hotels Table */}
        <div className="card overflow-hidden !p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Hotel</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Destination</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Rating</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Rooms</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filtered.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                        <Hotel className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{hotel.name}</p>
                        <p className="text-xs text-gray-500 truncate sm:hidden">{hotel.destination}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" /> {hotel.destination}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">{hotel.location}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <StarRating value={hotel.star_rating} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-gray-300">{hotel.rooms}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      hotel.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      hotel.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>{hotel.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(hotel)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors" title="Edit">
                        <Pencil className="w-4 h-4 text-gray-400" />
                      </button>
                      <button onClick={() => setDeleteConfirm(hotel.id)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    <Hotel className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                    No hotels found matching your criteria
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
            <h3 className="text-lg font-semibold text-white mb-2">Delete Hotel</h3>
            <p className="text-sm text-gray-400 mb-4">Are you sure? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => deleteHotel(deleteConfirm)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing?.id && hotels.find((h) => h.id === editing.id) ? 'Edit Hotel' : 'Add Hotel'} wide>
        {editing && (
          <div className="space-y-5">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label">Hotel Name *</label>
                <input className="input" placeholder="e.g. Four Seasons Resort" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Destination *</label>
                <select className="input" value={editing.destination} onChange={(e) => setEditing({ ...editing, destination: e.target.value })}>
                  <option value="">Select destination</option>
                  {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Location / Area</label>
                <input className="input" placeholder="e.g. Jimbaran Bay" value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
              </div>
              <div>
                <label className="label">Star Rating</label>
                <div className="mt-1">
                  <StarRating value={editing.star_rating} onChange={(v) => setEditing({ ...editing, star_rating: v })} />
                </div>
              </div>
              <div>
                <label className="label">Number of Rooms</label>
                <input type="number" className="input" min={0} value={editing.rooms || ''} onChange={(e) => setEditing({ ...editing, rooms: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="label">Price Range</label>
                <select className="input" value={editing.price_range} onChange={(e) => setEditing({ ...editing, price_range: e.target.value })}>
                  <option value="">Select range</option>
                  <option value="$">$ — Budget</option>
                  <option value="$$">$$ — Mid-range</option>
                  <option value="$$$">$$$ — Upscale</option>
                  <option value="$$$$">$$$$ — Luxury</option>
                  <option value="$$$$$">$$$$$ — Ultra Luxury</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as HotelItem['status'] })}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea className="textarea" rows={3} placeholder="Hotel description..."
                value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Website</label>
                <input className="input" placeholder="https://..." value={editing.website} onChange={(e) => setEditing({ ...editing, website: e.target.value })} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" placeholder="+1 234 567 890" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </div>
            </div>

            {/* Tags: Amenities */}
            <TagInput label="Amenities" value={editing.amenities} onChange={(v) => setEditing({ ...editing, amenities: v })} options={AMENITY_OPTIONS} />

            {/* Tags: Room Types */}
            <TagInput label="Room Types" value={editing.room_types} onChange={(v) => setEditing({ ...editing, room_types: v })} options={ROOM_TYPE_OPTIONS} />

            {/* Tags: Target Audience */}
            <TagInput label="Target Audience" value={editing.target_audience} onChange={(v) => setEditing({ ...editing, target_audience: v })} options={AUDIENCE_OPTIONS} />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button onClick={() => { setModalOpen(false); setEditing(null); }} className="btn-secondary">Cancel</button>
              <button onClick={saveHotel} disabled={!editing.name.trim()} className="btn-primary disabled:opacity-50">Save Hotel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
