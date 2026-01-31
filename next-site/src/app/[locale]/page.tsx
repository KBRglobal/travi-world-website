import { isRtl, type Locale } from '@/i18n/config';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationsSection from '@/components/sections/DestinationsSection';
import Stats from '@/components/Stats';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-white">
      <Navbar dir={dir} />
      <Hero dir={dir} />
      <DestinationsSection dir={dir} />
      <Stats dir={dir} />
      <Newsletter dir={dir} />
      <Footer dir={dir} />
    </div>
  );
}
