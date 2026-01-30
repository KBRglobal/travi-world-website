import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BookOpen, Newspaper, FileText, Plus, Settings, Image, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import { getDashboardStats } from '../lib/api';

interface Stats {
  destinations: number;
  guides: number;
  articles: number;
  pages: number;
  recentEdits: { type: string; title: string; time: string }[];
}

const defaultStats: Stats = {
  destinations: 0, guides: 0, articles: 0, pages: 0, recentEdits: [],
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => {
        setStats({
          destinations: 12,
          guides: 8,
          articles: 15,
          pages: 4,
          recentEdits: [
            { type: 'destination', title: 'Bali, Indonesia', time: '2 hours ago' },
            { type: 'guide', title: 'Tokyo Travel Guide', time: '5 hours ago' },
            { type: 'article', title: 'Best Beaches 2025', time: '1 day ago' },
          ],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Destinations', value: stats.destinations, icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-400/10', to: '/destinations' },
    { label: 'Guides', value: stats.guides, icon: BookOpen, color: 'text-green-400', bg: 'bg-green-400/10', to: '/guides' },
    { label: 'Articles', value: stats.articles, icon: Newspaper, color: 'text-purple-400', bg: 'bg-purple-400/10', to: '/news' },
    { label: 'Pages', value: stats.pages, icon: FileText, color: 'text-orange-400', bg: 'bg-orange-400/10', to: '/pages' },
  ];

  const quickActions = [
    { label: 'Add Destination', icon: Plus, to: '/destinations' },
    { label: 'Edit Hero', icon: Image, to: '/hero' },
    { label: 'Site Settings', icon: Settings, to: '/settings' },
    { label: 'New Article', icon: Plus, to: '/news' },
  ];

  return (
    <div>
      <TopBar title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link key={c.label} to={c.to} className="card hover:border-gray-600 transition-colors group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{c.label}</p>
                  <p className="text-3xl font-bold mt-1">
                    {loading ? '—' : c.value}
                  </p>
                </div>
                <div className={`${c.bg} p-3 rounded-lg`}>
                  <c.icon className={`w-6 h-6 ${c.color}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 group-hover:text-indigo-400 transition-colors">
                Manage <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Edits */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Edits</h3>
            {stats.recentEdits.length === 0 ? (
              <p className="text-sm text-gray-500">No recent edits</p>
            ) : (
              <div className="space-y-3">
                {stats.recentEdits.map((edit, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{edit.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{edit.type}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edit.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <action.icon className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
