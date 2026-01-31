import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Navigation, Image, MapPin,
  Grid3X3, BookOpen, Newspaper, Users, PanelBottom,
  FileText, ImageIcon, Globe, Hotel, Ticket,
  UtensilsCrossed, BarChart3
} from 'lucide-react';

const sections = [
  {
    title: 'Content',
    links: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/hero', icon: Image, label: 'Hero' },
      { to: '/destinations', icon: MapPin, label: 'Destinations' },
      { to: '/hotels', icon: Hotel, label: 'Hotels' },
      { to: '/attractions', icon: Ticket, label: 'Attractions' },
      { to: '/dining', icon: UtensilsCrossed, label: 'Dining' },
      { to: '/categories', icon: Grid3X3, label: 'Categories' },
      { to: '/guides', icon: BookOpen, label: 'Guides' },
      { to: '/news', icon: Newspaper, label: 'News' },
    ],
  },
  {
    title: 'Site',
    links: [
      { to: '/navigation', icon: Navigation, label: 'Navigation' },
      { to: '/about', icon: Users, label: 'About' },
      { to: '/footer', icon: PanelBottom, label: 'Footer' },
      { to: '/pages', icon: FileText, label: 'Pages' },
      { to: '/media', icon: ImageIcon, label: 'Media' },
    ],
  },
  {
    title: 'System',
    links: [
      { to: '/analytics', icon: BarChart3, label: 'Analytics' },
      { to: '/users', icon: Users, label: 'Users' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 h-screen sticky top-0 flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8 text-indigo-500" />
          <div>
            <h1 className="text-lg font-bold text-white">travi.world</h1>
            <p className="text-xs text-gray-400">Content Manager</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest px-3 mb-1.5">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : 'text-gray-400'}`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-400 hover:text-indigo-400 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          View Live Site
        </a>
      </div>
    </aside>
  );
}
