import { useTranslations } from 'next-intl';
import { BookOpen } from 'lucide-react';

export default function GuidesPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BookOpen className="h-4 w-4" />
            {t('nav.guides')}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t('nav.guides')}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            In-depth travel guides written by locals and experts.
          </p>
        </div>

        {/* Guides list placeholder */}
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <article
              key={i}
              className="flex gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="hidden h-32 w-48 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 sm:block" />
              <div>
                <h3 className="text-xl font-semibold">Travel Guide {i + 1}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Coming soon — powered by CMS.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
