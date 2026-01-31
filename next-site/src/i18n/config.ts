export const locales = [
  'en', 'ar', 'hi', 'zh', 'ru', 'ur', 'fr', 'de',
  'fa', 'bn', 'fil', 'es', 'tr', 'it', 'ja', 'ko', 'he',
  'pt', 'nl', 'pl', 'th', 'vi', 'id', 'ms', 'el',
  'cs', 'sv', 'no', 'da', 'uk'
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar', 'ur', 'fa', 'he'];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  hi: 'हिन्दी',
  zh: '中文',
  ru: 'Русский',
  ur: 'اردو',
  fr: 'Français',
  de: 'Deutsch',
  fa: 'فارسی',
  bn: 'বাংলা',
  fil: 'Filipino',
  es: 'Español',
  tr: 'Türkçe',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  he: 'עברית',
  pt: 'Português',
  nl: 'Nederlands',
  pl: 'Polski',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ms: 'Bahasa Melayu',
  el: 'Ελληνικά',
  cs: 'Čeština',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  uk: 'Українська'
};
