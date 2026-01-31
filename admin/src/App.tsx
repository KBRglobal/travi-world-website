import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
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
import MediaPage from './pages/MediaPage';
import HotelsPage from './pages/HotelsPage';
import AttractionsPage from './pages/AttractionsPage';
import DiningPage from './pages/DiningPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <div className="flex min-h-screen bg-gray-900 text-gray-100">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
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
            <Route path="/media" element={<MediaPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
