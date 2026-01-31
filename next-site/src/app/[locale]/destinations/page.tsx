import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

export default function DestinationsPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            {t('nav.destinations')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('nav.destinations')}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Explore our curated collection of 17+ destinations worldwide.
          </p>
        </div>

        {/* Destination grid placeholder */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="p-6">
                <h3 className="text-lg font-semibold">Destination {i + 1}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Coming soon — powered by CMS.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
