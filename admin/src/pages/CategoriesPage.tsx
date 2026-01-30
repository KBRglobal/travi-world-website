import { useEffect, useState } from 'react';
import { api } from '../api';
import { Save, Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api.getCategories().then(setData).catch(console.error); }, []);

  const save = async () => {
    setSaving(true);
    try { alert("Use the JSON editor to save individual items."); } catch(e) { console.error(e); }
    setSaving(false);
  };

  if (!data) return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-sm text-gray-500 mb-4">{Array.isArray(data) ? data.length + ' items' : 'Edit content below'}</p>
        <textarea
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
          rows={25}
          value={JSON.stringify(data, null, 2)}
          onChange={e => { try { setData(JSON.parse(e.target.value)); } catch {} }}
        />
      </div>
    </div>
  );
}
