import { useEffect, useState, useMemo } from 'react';
import {
  BarChart3, Eye, Users, Clock, TrendingDown, TrendingUp, ArrowUpRight,
  ArrowDownRight, Loader2, Globe, Monitor, Smartphone, Tablet,
  RefreshCw, Calendar, FileText, ExternalLink
} from 'lucide-react';
import TopBar from '../components/TopBar';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string;
  change: number;
  icon: typeof Eye;
  color: string;
  bg: string;
}

interface TimeSeriesPoint {
  date: string;
  views: number;
  visitors: number;
}

interface CountryData {
  country: string;
  flag: string;
  visitors: number;
  percentage: number;
}

interface TopPage {
  path: string;
  title: string;
  views: number;
  unique: number;
  avgTime: string;
  bounceRate: number;
}

interface DeviceData {
  type: string;
  icon: typeof Monitor;
  percentage: number;
  sessions: number;
}

interface ReferrerData {
  source: string;
  visitors: number;
  percentage: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

function generateTimeSeries(days: number): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const base = 800 + Math.sin(i * 0.3) * 200;
    const dayOfWeek = d.getDay();
    const weekendDip = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1;
    points.push({
      date: d.toISOString().split('T')[0],
      views: Math.floor((base + Math.random() * 300) * weekendDip),
      visitors: Math.floor((base * 0.6 + Math.random() * 150) * weekendDip),
    });
  }
  return points;
}

const MOCK_COUNTRIES: CountryData[] = [
  { country: 'United States', flag: '🇺🇸', visitors: 12480, percentage: 28.4 },
  { country: 'United Kingdom', flag: '🇬🇧', visitors: 6720, percentage: 15.3 },
  { country: 'UAE', flag: '🇦🇪', visitors: 5230, percentage: 11.9 },
  { country: 'Germany', flag: '🇩🇪', visitors: 3890, percentage: 8.9 },
  { country: 'France', flag: '🇫🇷', visitors: 3450, percentage: 7.8 },
  { country: 'Japan', flag: '🇯🇵', visitors: 2810, percentage: 6.4 },
  { country: 'Australia', flag: '🇦🇺', visitors: 2340, percentage: 5.3 },
  { country: 'Netherlands', flag: '🇳🇱', visitors: 1980, percentage: 4.5 },
  { country: 'India', flag: '🇮🇳', visitors: 1650, percentage: 3.8 },
  { country: 'Canada', flag: '🇨🇦', visitors: 1420, percentage: 3.2 },
];

const MOCK_TOP_PAGES: TopPage[] = [
  { path: '/', title: 'Home', views: 18420, unique: 12300, avgTime: '2:45', bounceRate: 32.1 },
  { path: '/destinations/bali', title: 'Bali Travel Guide', views: 8930, unique: 6200, avgTime: '4:12', bounceRate: 21.5 },
  { path: '/destinations/dubai', title: 'Dubai Guide', views: 7650, unique: 5100, avgTime: '3:58', bounceRate: 24.3 },
  { path: '/destinations/maldives', title: 'Maldives Guide', views: 6210, unique: 4350, avgTime: '4:30', bounceRate: 19.8 },
  { path: '/guides', title: 'All Guides', views: 5880, unique: 3920, avgTime: '1:45', bounceRate: 45.2 },
  { path: '/destinations/paris', title: 'Paris Guide', views: 5340, unique: 3780, avgTime: '3:42', bounceRate: 22.7 },
  { path: '/destinations/tokyo', title: 'Tokyo Guide', views: 4920, unique: 3410, avgTime: '4:05', bounceRate: 20.1 },
  { path: '/news', title: 'Travel News', views: 4100, unique: 2870, avgTime: '2:15', bounceRate: 38.9 },
  { path: '/about', title: 'About Us', views: 2340, unique: 1890, avgTime: '1:30', bounceRate: 52.3 },
  { path: '/contact', title: 'Contact', views: 1280, unique: 980, avgTime: '1:05', bounceRate: 61.4 },
];

const MOCK_DEVICES: DeviceData[] = [
  { type: 'Desktop', icon: Monitor, percentage: 52.3, sessions: 22940 },
  { type: 'Mobile', icon: Smartphone, percentage: 39.1, sessions: 17150 },
  { type: 'Tablet', icon: Tablet, percentage: 8.6, sessions: 3770 },
];

const MOCK_REFERRERS: ReferrerData[] = [
  { source: 'Google Search', visitors: 18200, percentage: 41.4 },
  { source: 'Direct', visitors: 9840, percentage: 22.4 },
  { source: 'Instagram', visitors: 5620, percentage: 12.8 },
  { source: 'Facebook', visitors: 3210, percentage: 7.3 },
  { source: 'TripAdvisor', visitors: 2890, percentage: 6.6 },
  { source: 'Pinterest', visitors: 1950, percentage: 4.4 },
  { source: 'Twitter / X', visitors: 1340, percentage: 3.1 },
  { source: 'Other', visitors: 900, percentage: 2.0 },
];

// ─── Chart Components (CSS-based, no chart library needed) ────────────────────

function MiniChart({ data, height = 60, color = '#6366f1' }: { data: number[]; height?: number; color?: string }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data.map((v, i) => `${i * w},${100 - ((v - min) / range) * 80 - 10}`).join(' ');
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height, width: '100%' }} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function BarChartSimple({ data, maxValue }: { data: { label: string; value: number; color?: string }[]; maxValue: number }) {
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-28 truncate text-right">{item.label}</span>
          <div className="flex-1 bg-gray-700 rounded-full h-5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || '#6366f1',
              }}
            />
          </div>
          <span className="text-xs text-gray-300 w-16 text-right">{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      setTimeSeries(generateTimeSeries(days));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [dateRange]);

  const totalViews = useMemo(() => timeSeries.reduce((s, p) => s + p.views, 0), [timeSeries]);
  const totalVisitors = useMemo(() => timeSeries.reduce((s, p) => s + p.visitors, 0), [timeSeries]);

  const statCards: StatCard[] = [
    { label: 'Total Views', value: totalViews.toLocaleString(), change: 12.5, icon: Eye, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Unique Visitors', value: totalVisitors.toLocaleString(), change: 8.3, icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Avg Session', value: '3m 24s', change: 5.1, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Bounce Rate', value: '34.2%', change: -2.8, icon: TrendingDown, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      setTimeSeries(generateTimeSeries(days));
      setLastRefresh(new Date());
      setLoading(false);
    }, 800);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      <TopBar title="Analytics">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 hidden sm:block">
            Updated {lastRefresh.toLocaleTimeString()}
          </span>
          <button onClick={refresh} disabled={loading} className="btn-secondary text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
      </TopBar>

      <div className="p-6 space-y-6">
        {/* Date Range Picker */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div className="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button key={range} onClick={() => setDateRange(range)}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                    dateRange === range
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}>
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> All data is simulated for preview
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">{card.label}</p>
                <div className={`${card.bg} p-2 rounded-lg`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold">{loading ? '—' : card.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {card.change > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-medium ${card.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(card.change)}%
                </span>
                <span className="text-xs text-gray-500">vs previous period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Views Over Time Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Views Over Time</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-indigo-500 rounded-full" /> Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-emerald-500 rounded-full" /> Visitors
              </span>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-48 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading...
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <MiniChart data={timeSeries.map((p) => p.views)} height={120} color="#6366f1" />
                <div className="absolute inset-0" style={{ opacity: 0.5 }}>
                  <MiniChart data={timeSeries.map((p) => p.visitors)} height={120} color="#10b981" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>{timeSeries[0]?.date}</span>
                <span>{timeSeries[Math.floor(timeSeries.length / 2)]?.date}</span>
                <span>{timeSeries[timeSeries.length - 1]?.date}</span>
              </div>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic by Country */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> Traffic by Country
              </h3>
            </div>
            <div className="space-y-3">
              {MOCK_COUNTRIES.map((country) => (
                <div key={country.country} className="flex items-center gap-3">
                  <span className="text-lg w-8">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300 truncate">{country.country}</span>
                      <span className="text-xs text-gray-500">{country.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-700"
                        style={{ width: `${country.percentage}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">{country.visitors.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown + Referrers */}
          <div className="space-y-6">
            {/* Devices */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
              <div className="grid grid-cols-3 gap-3">
                {MOCK_DEVICES.map((device) => (
                  <div key={device.type} className="text-center">
                    <div className="bg-gray-700/50 rounded-xl p-4 mb-2">
                      <device.icon className="w-8 h-8 text-indigo-400 mx-auto mb-1" />
                      <p className="text-xl font-bold">{device.percentage}%</p>
                    </div>
                    <p className="text-xs text-gray-400">{device.type}</p>
                    <p className="text-xs text-gray-500">{device.sessions.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Referrers */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
              <BarChartSimple
                data={MOCK_REFERRERS.slice(0, 6).map((r) => ({
                  label: r.source,
                  value: r.visitors,
                }))}
                maxValue={MOCK_REFERRERS[0]?.visitors || 1}
              />
            </div>
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="card overflow-hidden !p-0">
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Top Pages
            </h3>
            <span className="text-xs text-gray-500">{dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : 'Last 90 days'}</span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Page</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right hidden sm:table-cell">Views</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right hidden md:table-cell">Unique</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right hidden lg:table-cell">Avg Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Bounce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {MOCK_TOP_PAGES.map((page, i) => (
                <tr key={page.path} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-5">{i + 1}.</span>
                      <div>
                        <p className="text-sm font-medium">{page.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          {page.path}
                          <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className="text-sm text-gray-400">{page.unique.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-right hidden lg:table-cell">
                    <span className="text-sm text-gray-400">{page.avgTime}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-medium ${
                      page.bounceRate < 30 ? 'text-green-400' :
                      page.bounceRate < 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{page.bounceRate}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Activity Indicator (mock) */}
        <div className="card flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          </div>
          <div>
            <p className="text-sm font-medium">23 active visitors right now</p>
            <p className="text-xs text-gray-500">Most popular: Bali Travel Guide (7 visitors)</p>
          </div>
          <span className="ml-auto text-xs text-gray-500">Real-time • Mock data</span>
        </div>
      </div>
    </div>
  );
}
