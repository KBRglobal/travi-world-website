import { useEffect, useState } from 'react';
import { MapPin, BookOpen, Newspaper, Globe, TrendingUp, Users, Eye, Star } from 'lucide-react';
import { api } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ destinations: 0, guides: 0, news: 0 });

  useEffect(() => {
    Promise.all([api.getDestinations(), api.getGuides(), api.getNews()]).then(
      ([d, g, n]) => setStats({ destinations: d.length, guides: g.length, news: n.length })
    );
  }, []);

  const cards = [
    { label: 'Destinations', value: stats.destinations, icon: MapPin, color: 'bg-blue-500' },
    { label: 'Guides', value: stats.guides, icon: BookOpen, color: 'bg-green-500' },
    { label: 'News Articles', value: stats.news, icon: Newspaper, color: 'bg-orange-500' },
    { label: 'Languages', value: 30, icon: Globe, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">{c.label}</span>
              <div className={`w-9 h-9 rounded-lg ${c.color} flex items-center justify-center`}>
                <c.icon className="w-4.5 h-4.5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Quick Stats
          </h3>
          <div className="space-y-4">
            {[
              { icon: Users, label: 'Monthly Visitors', val: '500K+' },
              { icon: Eye, label: 'Page Views', val: '2.1M' },
              { icon: Star, label: 'Avg. Rating', val: '4.8' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <s.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{s.label}</span>
                </div>
                <span className="font-semibold text-gray-900">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Getting Started</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5">1</span>
              Edit <strong>Settings</strong> to update site name, colors, and company info
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5">2</span>
              Manage <strong>Destinations</strong> – add, edit, or remove travel destinations
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5">3</span>
              Update <strong>News</strong> and <strong>Guides</strong> with fresh content
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5">4</span>
              Customize <strong>Hero</strong>, <strong>Footer</strong>, and <strong>About</strong> sections
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
