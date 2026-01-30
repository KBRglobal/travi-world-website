import { useEffect, useState } from 'react';
import { Plus, Search, Pencil, Trash2, Newspaper, Calendar, Tag } from 'lucide-react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import ImageUploader from '../components/ImageUploader';
import RichEditor from '../components/RichEditor';
import { getArticles, createArticle, updateArticle, deleteArticle } from '../lib/api';

interface ContentSection {
  type: 'text' | 'image' | 'quote';
  content: string;
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  content: ContentSection[];
  tags: string[];
  seo: { title: string; description: string };
  publishedAt: string;
  status: 'draft' | 'published';
}

const emptyArticle: Article = {
  id: '', title: '', subtitle: '', slug: '', category: 'Travel',
  author: '', image: '',
  content: [{ type: 'text', content: '' }],
  tags: [],
  seo: { title: '', description: '' },
  publishedAt: new Date().toISOString().split('T')[0],
  status: 'draft',
};

const categories = ['Travel', 'Adventure', 'Culture', 'Food', 'Tips', 'News'];

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Article | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .catch(() => {
        setArticles([
          { ...emptyArticle, id: '1', title: 'Best Beaches in 2025', category: 'Travel', author: 'Admin', status: 'published', publishedAt: '2025-01-15' },
          { ...emptyArticle, id: '2', title: 'Hidden Gems of Southeast Asia', category: 'Adventure', author: 'Admin', status: 'draft', publishedAt: '2025-01-20' },
        ]);
      });
  }, []);

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing({ ...emptyArticle, id: Date.now().toString() });
    setModalOpen(true);
  };

  const openEdit = (article: Article) => {
    setEditing({ ...article });
    setModalOpen(true);
  };

  const saveArticle = async () => {
    if (!editing) return;
    try {
      const exists = articles.find((a) => a.id === editing.id);
      if (exists) await updateArticle(editing.id, editing).catch(() => {});
      else await createArticle(editing).catch(() => {});
      setArticles((prev) => {
        const idx = prev.findIndex((a) => a.id === editing.id);
        if (idx >= 0) { const c = [...prev]; c[idx] = editing; return c; }
        return [...prev, editing];
      });
      setModalOpen(false);
    } catch { alert('Failed to save'); }
  };

  const removeArticle = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    await deleteArticle(id).catch(() => {});
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const addTag = () => {
    if (!editing || !tagInput.trim()) return;
    setEditing({ ...editing, tags: [...editing.tags, tagInput.trim()] });
    setTagInput('');
  };

  const removeTag = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, tags: editing.tags.filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <TopBar title="News & Articles">
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </TopBar>

      <div className="p-6 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input className="input pl-10" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="space-y-3">
          {filtered.map((article) => (
            <div key={article.id} className="card flex items-center gap-4">
              <div className="w-20 h-14 bg-gray-700 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                {article.image ? <img src={article.image} alt="" className="w-full h-full object-cover" /> : <Newspaper className="w-6 h-6 text-gray-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{article.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${article.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {article.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-0.5">
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {article.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.publishedAt}</span>
                  <span>{article.author}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(article)} className="p-2 hover:bg-gray-700 rounded"><Pencil className="w-4 h-4 text-gray-400" /></button>
                <button onClick={() => removeArticle(article.id)} className="p-2 hover:bg-gray-700 rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-gray-500 py-12">No articles found.</p>}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.title || 'New Article'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Title</label>
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <input className="input" value={editing.subtitle} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Author</label>
                <input className="input" value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
              </div>
              <div>
                <label className="label">Published Date</label>
                <input type="date" className="input" value={editing.publishedAt} onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })} />
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as 'draft' | 'published' })}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <ImageUploader label="Featured Image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />

            {/* Content Sections */}
            <div className="space-y-3">
              <label className="label">Content Sections</label>
              {editing.content.map((sec, i) => (
                <div key={i} className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <select className="input w-auto text-sm" value={sec.type} onChange={(e) => {
                      const c = [...editing.content]; c[i] = { ...c[i], type: e.target.value as any }; setEditing({ ...editing, content: c });
                    }}>
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="quote">Quote</option>
                    </select>
                    <button onClick={() => setEditing({ ...editing, content: editing.content.filter((_, j) => j !== i) })} className="text-red-400 text-sm">Remove</button>
                  </div>
                  {sec.type === 'text' ? (
                    <RichEditor value={sec.content} onChange={(v) => {
                      const c = [...editing.content]; c[i] = { ...c[i], content: v }; setEditing({ ...editing, content: c });
                    }} rows={4} />
                  ) : sec.type === 'image' ? (
                    <ImageUploader value={sec.content} onChange={(v) => {
                      const c = [...editing.content]; c[i] = { ...c[i], content: v }; setEditing({ ...editing, content: c });
                    }} />
                  ) : (
                    <textarea className="textarea" rows={2} value={sec.content} placeholder="Quote text..." onChange={(e) => {
                      const c = [...editing.content]; c[i] = { ...c[i], content: e.target.value }; setEditing({ ...editing, content: c });
                    }} />
                  )}
                </div>
              ))}
              <button onClick={() => setEditing({ ...editing, content: [...editing.content, { type: 'text', content: '' }] })} className="btn-secondary text-sm w-full justify-center">
                <Plus className="w-4 h-4" /> Add Section
              </button>
            </div>

            {/* Tags */}
            <div>
              <label className="label">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {editing.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(i)} className="text-gray-400 hover:text-red-400 ml-1">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="input flex-1" placeholder="Add tag..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                <button onClick={addTag} className="btn-secondary">Add</button>
              </div>
            </div>

            {/* SEO */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-300">SEO</h4>
              <div>
                <label className="label">SEO Title</label>
                <input className="input" value={editing.seo.title} onChange={(e) => setEditing({ ...editing, seo: { ...editing.seo, title: e.target.value } })} />
              </div>
              <div>
                <label className="label">SEO Description</label>
                <textarea className="textarea" rows={2} value={editing.seo.description} onChange={(e) => setEditing({ ...editing, seo: { ...editing.seo, description: e.target.value } })} />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
              <button onClick={saveArticle} className="btn-primary">Save Article</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
