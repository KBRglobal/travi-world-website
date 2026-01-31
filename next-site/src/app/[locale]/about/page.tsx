import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Globe className="h-4 w-4" />
            {t('nav.about')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('nav.about')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Travi.world helps millions of travelers discover the best destinations, hotels,
            attractions, and dining experiences around the globe.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Make world-class travel information accessible in every language.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-xl font-semibold">17+ Languages</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Every guide, review, and recommendation — translated and localized.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="text-xl font-semibold">CMS-Powered</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Content managed through our custom headless CMS for speed and flexibility.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
