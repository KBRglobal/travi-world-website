import type { Metadata } from 'next';
import { Inter, Noto_Sans_Arabic, Noto_Sans_Hebrew } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, isRtl, type Locale } from '@/i18n/config';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-noto-hebrew',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Travi.world — Explore the World',
  description:
    'Discover 17+ destinations with travel guides, hotel reviews, attraction reviews, and dining recommendations.',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

  // Pick font based on script
  const fontClass = ['ar', 'ur', 'fa'].includes(locale)
    ? notoArabic.variable
    : locale === 'he'
      ? notoHebrew.variable
      : inter.variable;

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoArabic.variable} ${notoHebrew.variable}`}>
      <body className={`${fontClass} font-sans antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
