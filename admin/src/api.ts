const BASE = '/api';

async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (data: any) => request('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Navigation
  getNavigation: () => request('/navigation'),
  updateNavigation: (data: any) => request('/navigation', { method: 'PUT', body: JSON.stringify(data) }),

  // Hero
  getHero: () => request('/hero'),
  updateHero: (data: any) => request('/hero', { method: 'PUT', body: JSON.stringify(data) }),

  // Destinations
  getDestinations: () => request('/destinations'),
  getDestination: (id: number) => request(`/destinations/${id}`),
  createDestination: (data: any) => request('/destinations', { method: 'POST', body: JSON.stringify(data) }),
  updateDestination: (id: number, data: any) => request(`/destinations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteDestination: (id: number) => request(`/destinations/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: () => request('/categories'),
  getCategory: (type: string) => request(`/categories/${type}`),
  updateCategory: (type: string, data: any) => request(`/categories/${type}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Guides
  getGuides: () => request('/guides'),
  createGuide: (data: any) => request('/guides', { method: 'POST', body: JSON.stringify(data) }),
  updateGuide: (id: number, data: any) => request(`/guides/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGuide: (id: number) => request(`/guides/${id}`, { method: 'DELETE' }),

  // News
  getNews: () => request('/news'),
  createNews: (data: any) => request('/news', { method: 'POST', body: JSON.stringify(data) }),
  updateNews: (id: number, data: any) => request(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteNews: (id: number) => request(`/news/${id}`, { method: 'DELETE' }),

  // About
  getAbout: () => request('/about'),
  updateAbout: (data: any) => request('/about', { method: 'PUT', body: JSON.stringify(data) }),

  // Footer
  getFooter: () => request('/footer'),
  updateFooter: (data: any) => request('/footer', { method: 'PUT', body: JSON.stringify(data) }),

  // Pages
  getPage: (slug: string) => request(`/pages/${slug}`),
  updatePage: (slug: string, data: any) => request(`/pages/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Upload
  upload: async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form });
    return res.json();
  },
};
