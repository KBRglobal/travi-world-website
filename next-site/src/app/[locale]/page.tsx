import { useTranslations } from 'next-intl';
import { Search, Play, MapPin, BookOpen, Star } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-accent to-primary/80 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <MapPin className="h-4 w-4" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {t('hero.title')}{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="mt-10 flex max-w-xl gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                className="w-full rounded-xl border-0 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <button className="rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition-colors hover:bg-slate-800">
              {t('hero.searchButton')}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-slate-100">
              {t('hero.startExploring')}
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10">
              <Play className="h-5 w-5" />
              {t('hero.watchDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">17+</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('stats.countries')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">500+</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('stats.guides')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">10K+</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('stats.reviews')}
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder for more sections */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('nav.destinations')}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Coming soon — destination cards, featured guides, and more.
          </p>
        </div>
      </section>
    </main>
  );
}
