import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// ─── Helpers ───────────────────────────────────────────────
const dataDir = path.join(__dirname, 'data');

function readJSON(file: string) {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8'));
}

function writeJSON(file: string, data: any) {
  fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
}

// ─── Upload ────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'uploads'),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ─── Settings ──────────────────────────────────────────────
app.get('/api/settings', (_req, res) => res.json(readJSON('settings.json')));
app.put('/api/settings', (req, res) => { writeJSON('settings.json', req.body); res.json(req.body); });

// ─── Navigation ────────────────────────────────────────────
app.get('/api/navigation', (_req, res) => res.json(readJSON('navigation.json')));
app.put('/api/navigation', (req, res) => { writeJSON('navigation.json', req.body); res.json(req.body); });

// ─── Hero ──────────────────────────────────────────────────
app.get('/api/hero', (_req, res) => res.json(readJSON('hero.json')));
app.put('/api/hero', (req, res) => { writeJSON('hero.json', req.body); res.json(req.body); });

// ─── Destinations (CRUD) ───────────────────────────────────
app.get('/api/destinations', (_req, res) => res.json(readJSON('destinations.json')));
app.get('/api/destinations/:id', (req, res) => {
  const items = readJSON('destinations.json');
  const item = items.find((d: any) => d.id === Number(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/destinations', (req, res) => {
  const items = readJSON('destinations.json');
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  writeJSON('destinations.json', items);
  res.status(201).json(newItem);
});
app.put('/api/destinations/:id', (req, res) => {
  const items = readJSON('destinations.json');
  const idx = items.findIndex((d: any) => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeJSON('destinations.json', items);
  res.json(items[idx]);
});
app.delete('/api/destinations/:id', (req, res) => {
  let items = readJSON('destinations.json');
  items = items.filter((d: any) => d.id !== Number(req.params.id));
  writeJSON('destinations.json', items);
  res.json({ success: true });
});

// ─── Categories (CRUD) ─────────────────────────────────────
app.get('/api/categories', (_req, res) => res.json(readJSON('categories.json')));
app.get('/api/categories/:type', (req, res) => {
  const all = readJSON('categories.json');
  const cat = all[req.params.type];
  cat ? res.json(cat) : res.status(404).json({ error: 'Not found' });
});
app.put('/api/categories/:type', (req, res) => {
  const all = readJSON('categories.json');
  all[req.params.type] = req.body;
  writeJSON('categories.json', all);
  res.json(req.body);
});

// ─── Guides (CRUD) ─────────────────────────────────────────
app.get('/api/guides', (_req, res) => res.json(readJSON('guides.json')));
app.get('/api/guides/:id', (req, res) => {
  const items = readJSON('guides.json');
  const item = items.find((g: any) => g.id === Number(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/guides', (req, res) => {
  const items = readJSON('guides.json');
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  writeJSON('guides.json', items);
  res.status(201).json(newItem);
});
app.put('/api/guides/:id', (req, res) => {
  const items = readJSON('guides.json');
  const idx = items.findIndex((g: any) => g.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeJSON('guides.json', items);
  res.json(items[idx]);
});
app.delete('/api/guides/:id', (req, res) => {
  let items = readJSON('guides.json');
  items = items.filter((g: any) => g.id !== Number(req.params.id));
  writeJSON('guides.json', items);
  res.json({ success: true });
});

// ─── News (CRUD) ───────────────────────────────────────────
app.get('/api/news', (_req, res) => res.json(readJSON('news.json')));
app.get('/api/news/:id', (req, res) => {
  const items = readJSON('news.json');
  const item = items.find((n: any) => n.id === Number(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/news', (req, res) => {
  const items = readJSON('news.json');
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  writeJSON('news.json', items);
  res.status(201).json(newItem);
});
app.put('/api/news/:id', (req, res) => {
  const items = readJSON('news.json');
  const idx = items.findIndex((n: any) => n.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  writeJSON('news.json', items);
  res.json(items[idx]);
});
app.delete('/api/news/:id', (req, res) => {
  let items = readJSON('news.json');
  items = items.filter((n: any) => n.id !== Number(req.params.id));
  writeJSON('news.json', items);
  res.json({ success: true });
});

// ─── About ─────────────────────────────────────────────────
app.get('/api/about', (_req, res) => res.json(readJSON('about.json')));
app.put('/api/about', (req, res) => { writeJSON('about.json', req.body); res.json(req.body); });

// ─── Footer ────────────────────────────────────────────────
app.get('/api/footer', (_req, res) => res.json(readJSON('footer.json')));
app.put('/api/footer', (req, res) => { writeJSON('footer.json', req.body); res.json(req.body); });

// ─── Pages (by slug) ───────────────────────────────────────
app.get('/api/pages/:slug', (req, res) => {
  const pages = readJSON('pages.json');
  const page = pages[req.params.slug];
  page ? res.json(page) : res.status(404).json({ error: 'Page not found' });
});
app.put('/api/pages/:slug', (req, res) => {
  const pages = readJSON('pages.json');
  pages[req.params.slug] = req.body;
  writeJSON('pages.json', pages);
  res.json(req.body);
});

// ─── Upload ────────────────────────────────────────────────
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// ─── SPA fallback (serve main site) ────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 TRAVI CMS Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from public/`);
  console.log(`🔌 API available at http://localhost:${PORT}/api/`);
});
