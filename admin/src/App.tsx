import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Navigation, Image, MapPin,
  Grid3X3, BookOpen, Newspaper, Info, Footprints, FileText, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/SettingsPage';
import NavigationPage from './pages/NavigationPage';
import HeroPage from './pages/HeroPage';
import DestinationsPage from './pages/DestinationsPage';
import CategoriesPage from './pages/CategoriesPage';
import GuidesPage from './pages/GuidesPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import FooterPage from './pages/FooterPage';
import PagesPage from './pages/PagesPage';

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/settings', icon: Settings, label: 'Settings' },
  { to: '/navigation', icon: Navigation, label: 'Navigation' },
  { to: '/hero', icon: Image, label: 'Hero Section' },
  { to: '/destinations', icon: MapPin, label: 'Destinations' },
  { to: '/categories', icon: Grid3X3, label: 'Categories' },
  { to: '/guides', icon: BookOpen, label: 'Guides' },
  { to: '/news', icon: Newspaper, label: 'News' },
  { to: '/about', icon: Info, label: 'About Page' },
  { to: '/footer', icon: Footprints, label: 'Footer' },
  { to: '/pages', icon: FileText, label: 'Static Pages' },
];

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter basename="/admin">
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-none">TRAVI</h1>
              <p className="text-xs text-gray-400">Content Manager</p>
            </div>
            <button className="ml-auto lg:hidden" onClick={() => setOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-80px)]">
            {nav.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <n.icon className="w-4.5 h-4.5" />
                {n.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Overlay */}
        {open && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setOpen(false)} />}

        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
            <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-gray-900">TRAVI CMS</h2>
            <a href="/" target="_blank" className="ml-auto text-sm text-primary hover:underline">
              View Site →
            </a>
          </header>
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/navigation" element={<NavigationPage />} />
              <Route path="/hero" element={<HeroPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/footer" element={<FooterPage />} />
              <Route path="/pages" element={<PagesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
