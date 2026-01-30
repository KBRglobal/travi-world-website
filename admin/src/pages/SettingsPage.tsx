import { useEffect, useState } from 'react';
import { api } from '../api';
import { Save, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api.getSettings().then(setData); }, []);

  const save = async () => {
    setSaving(true);
    await api.updateSettings(data);
    setSaving(false);
  };

  if (!data) return <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
        </button>
      </div>
      <div className="grid gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">General</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[['siteName','Site Name'],['tagline','Tagline'],['primaryColor','Primary Color'],['accentColor','Accent Color']].map(([k,l]) => (
              <label key={k} className="block"><span className="text-sm text-gray-600 mb-1 block">{l}</span>
                <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={data[k]||''} onChange={e => setData({...data,[k]:e.target.value})} />
              </label>
            ))}
          </div>
          <label className="block mt-4"><span className="text-sm text-gray-600 mb-1 block">Description</span>
            <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" rows={3} value={data.description||''} onChange={e => setData({...data,description:e.target.value})} />
          </label>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[['name','Company Name'],['address','Address'],['email','Email'],['phone','Phone']].map(([k,l]) => (
              <label key={k} className="block"><span className="text-sm text-gray-600 mb-1 block">{l}</span>
                <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={data.company?.[k]||''} onChange={e => setData({...data,company:{...data.company,[k]:e.target.value}})} />
              </label>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Social Links</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(data.social || {}).map(([k, v]) => (
              <label key={k} className="block"><span className="text-sm text-gray-600 mb-1 block capitalize">{k}</span>
                <input className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" value={v as string} onChange={e => setData({...data,social:{...data.social,[k]:e.target.value}})} />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
