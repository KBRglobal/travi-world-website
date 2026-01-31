/**
 * API client for Travi.world CMS
 * Connects to the Express backend at localhost:3001/api
 */

const CMS_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function cmsRequest<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${CMS_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    next: { revalidate: 300 }, // Cache for 5 minutes by default
  });

  if (!response.ok) {
    throw new Error(`CMS API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ----- Types -----

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  heroImage: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  locale: string;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  description: string;
  stars: number;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  locale: string;
}

export interface Attraction {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  locale: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  destinationId: string;
  author: string;
  publishedAt: string;
  heroImage: string;
  locale: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  destinationId: string;
  cuisine: string;
  description: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  locale: string;
}

// ----- API Methods -----

export const api = {
  // Destinations
  destinations: {
    list: (locale: string) =>
      cmsRequest<Destination[]>('/destinations', { params: { locale } }),
    get: (slug: string, locale: string) =>
      cmsRequest<Destination>(`/destinations/${slug}`, { params: { locale } }),
  },

  // Hotels
  hotels: {
    list: (destinationId: string, locale: string) =>
      cmsRequest<Hotel[]>('/hotels', { params: { destinationId, locale } }),
    get: (slug: string, locale: string) =>
      cmsRequest<Hotel>(`/hotels/${slug}`, { params: { locale } }),
  },

  // Attractions
  attractions: {
    list: (destinationId: string, locale: string) =>
      cmsRequest<Attraction[]>('/attractions', { params: { destinationId, locale } }),
    get: (slug: string, locale: string) =>
      cmsRequest<Attraction>(`/attractions/${slug}`, { params: { locale } }),
  },

  // Guides
  guides: {
    list: (locale: string, destinationId?: string) => {
      const params: Record<string, string> = { locale };
      if (destinationId) params.destinationId = destinationId;
      return cmsRequest<Guide[]>('/guides', { params });
    },
    get: (slug: string, locale: string) =>
      cmsRequest<Guide>(`/guides/${slug}`, { params: { locale } }),
  },

  // Restaurants / Dining
  restaurants: {
    list: (destinationId: string, locale: string) =>
      cmsRequest<Restaurant[]>('/restaurants', { params: { destinationId, locale } }),
    get: (slug: string, locale: string) =>
      cmsRequest<Restaurant>(`/restaurants/${slug}`, { params: { locale } }),
  },

  // Search
  search: (query: string, locale: string) =>
    cmsRequest<{
      destinations: Destination[];
      hotels: Hotel[];
      attractions: Attraction[];
      guides: Guide[];
    }>('/search', { params: { q: query, locale } }),
};

export default api;
