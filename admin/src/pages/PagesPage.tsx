import { useEffect, useState } from 'react';
import { FileText, Pencil } from 'lucide-react';
import TopBar from '../components/TopBar';
import Modal from '../components/Modal';
import RichEditor from '../components/RichEditor';
import { getPages, updatePage } from '../lib/api';

interface PageSection {
  title: string;
  content: string;
}

interface PageData {
  slug: string;
  title: string;
  description: string;
  sections: PageSection[];
  lastUpdated: string;
}

const defaultPages: PageData[] = [
  {
    slug: 'terms',
    title: 'Terms of Service',
    description: 'Terms and conditions for using travi.world',
    sections: [
      { title: 'Introduction', content: 'Welcome to travi.world. By accessing this website, you agree to the following terms.' },
      { title: 'Use of Service', content: '' },
      { title: 'Intellectual Property', content: '' },
      { title: 'Limitation of Liability', content: '' },
    ],
    lastUpdated: '2025-01-01',
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: 'How we handle your data',
    sections: [
      { title: 'Data Collection', content: '' },
      { title: 'Data Usage', content: '' },
      { title: 'Cookies', content: '' },
      { title: 'Your Rights', content: '' },
    ],
    lastUpdated: '2025-01-01',
  },
  {
    slug: 'contact',
    title: 'Contact FAQ',
    description: 'Frequently asked questions about contacting us',
    sections: [
      { title: 'How to reach us', content: '' },
      { title: 'Response times', content: '' },
      { title: 'Support channels', content: '' },
    ],
    lastUpdated: '2025-01-01',
  },
];

export default function PagesPage() {
  const [pages, setPages] = useState<PageData[]>(defaultPages);
  const [editing, setEditing] = useState<PageData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPages()
      .then((data) => data.length > 0 && setPages(data))
      .catch(() => {});
  }, []);

  const openEdit = (page: PageData) => {
    setEditing(JSON.parse(JSON.stringify(page)));
    setModalOpen(true);
  };

  const savePage = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      await updatePage(editing.slug, editing);
    } catch {}
    setPages((prev) => prev.map((p) => (p.slug === editing.slug ? { ...editing, lastUpdated: new Date().toISOString().split('T')[0] } : p)));
    setSaving(false);
    setModalOpen(false);
  };

  const addSection = () => {
    if (!editing) return;
    setEditing({ ...editing, sections: [...editing.sections, { title: '', content: '' }] });
  };

  const removeSection = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, sections: editing.sections.filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <TopBar title="Static Pages" />
      <div className="p-6 max-w-4xl space-y-4">
        {pages.map((page) => (
          <div key={page.slug} className="card flex items-center gap-4 cursor-pointer hover:border-gray-600 transition-colors" onClick={() => openEdit(page)}>
            <div className="bg-gray-700 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{page.title}</h3>
              <p className="text-sm text-gray-400">{page.description}</p>
              <p className="text-xs text-gray-500 mt-1">{page.sections.length} sections · Updated {page.lastUpdated}</p>
            </div>
            <Pencil className="w-5 h-5 text-gray-500" />
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.title || 'Edit Page'} wide>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Title</label>
                <input className="input" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="label">Slug</label>
                <input className="input bg-gray-600" value={editing.slug} disabled />
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <input className="input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-300">Sections</h4>
              {editing.sections.map((sec, i) => (
                <div key={i} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <input className="input w-auto flex-1 mr-4" placeholder="Section Title" value={sec.title} onChange={(e) => {
                      const s = [...editing.sections]; s[i] = { ...s[i], title: e.target.value }; setEditing({ ...editing, sections: s });
                    }} />
                    <button onClick={() => removeSection(i)} className="text-red-400 text-sm">Remove</button>
                  </div>
                  <RichEditor value={sec.content} onChange={(v) => {
                    const s = [...editing.sections]; s[i] = { ...s[i], content: v }; setEditing({ ...editing, sections: s });
                  }} rows={6} />
                </div>
              ))}
              <button onClick={addSection} className="btn-secondary text-sm w-full justify-center">
                + Add Section
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button onClick={() => setModalOpen(false)} className="btn-secondary">Cancel</button>
              <button onClick={savePage} disabled={saving} className="btn-primary">
                {saving ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
