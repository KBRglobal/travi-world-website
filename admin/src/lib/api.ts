const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }
  return res.json();
}

// Settings
export const getSettings = () => request<any>('/settings');
export const updateSettings = (data: any) =>
  request<any>('/settings', { method: 'PUT', body: JSON.stringify(data) });

// Navigation
export const getNavigation = () => request<any[]>('/navigation');
export const updateNavigation = (data: any[]) =>
  request<any[]>('/navigation', { method: 'PUT', body: JSON.stringify(data) });

// Hero
export const getHero = () => request<any>('/hero');
export const updateHero = (data: any) =>
  request<any>('/hero', { method: 'PUT', body: JSON.stringify(data) });

// Destinations
export const getDestinations = () => request<any[]>('/destinations');
export const getDestination = (id: string) => request<any>(`/destinations/${id}`);
export const createDestination = (data: any) =>
  request<any>('/destinations', { method: 'POST', body: JSON.stringify(data) });
export const updateDestination = (id: string, data: any) =>
  request<any>(`/destinations/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteDestination = (id: string) =>
  request<void>(`/destinations/${id}`, { method: 'DELETE' });

// Categories
export const getCategories = () => request<any[]>('/categories');
export const updateCategories = (data: any[]) =>
  request<any[]>('/categories', { method: 'PUT', body: JSON.stringify(data) });

// Guides
export const getGuides = () => request<any[]>('/guides');
export const getGuide = (id: string) => request<any>(`/guides/${id}`);
export const createGuide = (data: any) =>
  request<any>('/guides', { method: 'POST', body: JSON.stringify(data) });
export const updateGuide = (id: string, data: any) =>
  request<any>(`/guides/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGuide = (id: string) =>
  request<void>(`/guides/${id}`, { method: 'DELETE' });

// News
export const getArticles = () => request<any[]>('/news');
export const getArticle = (id: string) => request<any>(`/news/${id}`);
export const createArticle = (data: any) =>
  request<any>('/news', { method: 'POST', body: JSON.stringify(data) });
export const updateArticle = (id: string, data: any) =>
  request<any>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteArticle = (id: string) =>
  request<void>(`/news/${id}`, { method: 'DELETE' });

// About
export const getAbout = () => request<any>('/about');
export const updateAbout = (data: any) =>
  request<any>('/about', { method: 'PUT', body: JSON.stringify(data) });

// Footer
export const getFooter = () => request<any>('/footer');
export const updateFooter = (data: any) =>
  request<any>('/footer', { method: 'PUT', body: JSON.stringify(data) });

// Pages (terms, privacy, contact)
export const getPages = () => request<any[]>('/pages');
export const getPage = (slug: string) => request<any>(`/pages/${slug}`);
export const updatePage = (slug: string, data: any) =>
  request<any>(`/pages/${slug}`, { method: 'PUT', body: JSON.stringify(data) });

// Media
export const getMedia = () => request<any[]>('/media');
export const uploadMedia = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${BASE_URL}/media`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};
export const deleteMedia = (id: string) =>
  request<void>(`/media/${id}`, { method: 'DELETE' });

// Dashboard stats
export const getDashboardStats = () => request<any>('/dashboard/stats');
