import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import { getFooter, updateFooter } from '../lib/api';

interface LinkItem {
  name: string;
  href: string;
}

interface LinkGroup {
  title: string;
  links: LinkItem[];
}

interface FooterData {
  linkGroups: LinkGroup[];
  partners: { name: string; logo: string; href: string }[];
  popularDestinations: { name: string; href: string }[];
  contact: { email: string; phone: string; address: string };
  social: { instagram: string; twitter: string; facebook: string; youtube: string };
  copyright: string;
}

const defaultFooter: FooterData = {
  linkGroups: [
    { title: 'Explore', links: [{ name: 'Destinations', href: '/destinations' }, { name: 'Guides', href: '/guides' }] },
    { title: 'Company', links: [{ name: 'About', href: '/about' }, { name: 'Contact', href: '/contact' }] },
    { title: 'Legal', links: [{ name: 'Terms', href: '/terms' }, { name: 'Privacy', href: '/privacy' }] },
  ],
  partners: [],
  popularDestinations: [],
  contact: { email: '', phone: '', address: '' },
  social: { instagram: '', twitter: '', facebook: '', youtube: '' },
  copyright: '© 2025 travi.world. All rights reserved.',
};

export default function FooterPage() {
  const [footer, setFooter] = useState<FooterData>(defaultFooter);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('links');

  useEffect(() => {
    getFooter().then((d) => setFooter({ ...defaultFooter, ...d })).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await updateFooter(footer);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const sections = ['links', 'partners', 'destinations', 'contact', 'social'];

  return (
    <div>
      <TopBar title="Footer" saving={saving} saved={saved} onSave={save} />
      <div className="p-6 max-w-4xl space-y-6">
        <div className="flex gap-1 border-b border-gray-700 overflow-x-auto">
          {sections.map((s) => (
            <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap ${activeSection === s ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}>
              {s === 'links' ? 'Link Groups' : s === 'destinations' ? 'Popular Destinations' : s}
            </button>
          ))}
        </div>

        {/* Link Groups */}
        {activeSection === 'links' && (
          <div className="space-y-4">
            {footer.linkGroups.map((group, gi) => (
              <div key={gi} className="card space-y-3">
                <div className="flex justify-between items-center">
                  <input className="input w-48" value={group.title} placeholder="Group Title" onChange={(e) => {
                    const g = [...footer.linkGroups]; g[gi] = { ...g[gi], title: e.target.value }; setFooter({ ...footer, linkGroups: g });
                  }} />
                  <button onClick={() => setFooter({ ...footer, linkGroups: footer.linkGroups.filter((_, i) => i !== gi) })} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                </div>
                {group.links.map((link, li) => (
                  <div key={li} className="flex gap-3 items-center pl-4">
                    <input className="input flex-1" value={link.name} placeholder="Link name" onChange={(e) => {
                      const g = [...footer.linkGroups]; const l = [...g[gi].links]; l[li] = { ...l[li], name: e.target.value }; g[gi] = { ...g[gi], links: l }; setFooter({ ...footer, linkGroups: g });
                    }} />
                    <input className="input flex-1" value={link.href} placeholder="/path" onChange={(e) => {
                      const g = [...footer.linkGroups]; const l = [...g[gi].links]; l[li] = { ...l[li], href: e.target.value }; g[gi] = { ...g[gi], links: l }; setFooter({ ...footer, linkGroups: g });
                    }} />
                    <button onClick={() => {
                      const g = [...footer.linkGroups]; g[gi] = { ...g[gi], links: g[gi].links.filter((_, i) => i !== li) }; setFooter({ ...footer, linkGroups: g });
                    }} className="text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => {
                  const g = [...footer.linkGroups]; g[gi] = { ...g[gi], links: [...g[gi].links, { name: '', href: '' }] }; setFooter({ ...footer, linkGroups: g });
                }} className="btn-secondary text-xs ml-4"><Plus className="w-3 h-3" /> Add Link</button>
              </div>
            ))}
            <button onClick={() => setFooter({ ...footer, linkGroups: [...footer.linkGroups, { title: '', links: [] }] })} className="btn-secondary w-full justify-center">
              <Plus className="w-4 h-4" /> Add Link Group
            </button>
          </div>
        )}

        {/* Partners */}
        {activeSection === 'partners' && (
          <div className="card space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Partners</h3>
              <button onClick={() => setFooter({ ...footer, partners: [...footer.partners, { name: '', logo: '', href: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {footer.partners.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 items-start">
                <input className="input" value={p.name} placeholder="Partner name" onChange={(e) => {
                  const arr = [...footer.partners]; arr[i] = { ...arr[i], name: e.target.value }; setFooter({ ...footer, partners: arr });
                }} />
                <input className="input" value={p.logo} placeholder="Logo URL" onChange={(e) => {
                  const arr = [...footer.partners]; arr[i] = { ...arr[i], logo: e.target.value }; setFooter({ ...footer, partners: arr });
                }} />
                <div className="flex gap-2">
                  <input className="input" value={p.href} placeholder="URL" onChange={(e) => {
                    const arr = [...footer.partners]; arr[i] = { ...arr[i], href: e.target.value }; setFooter({ ...footer, partners: arr });
                  }} />
                  <button onClick={() => setFooter({ ...footer, partners: footer.partners.filter((_, j) => j !== i) })} className="text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {footer.partners.length === 0 && <p className="text-sm text-gray-500">No partners added.</p>}
          </div>
        )}

        {/* Popular Destinations */}
        {activeSection === 'destinations' && (
          <div className="card space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Popular Destinations</h3>
              <button onClick={() => setFooter({ ...footer, popularDestinations: [...footer.popularDestinations, { name: '', href: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {footer.popularDestinations.map((d, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input className="input flex-1" value={d.name} placeholder="Destination name" onChange={(e) => {
                  const arr = [...footer.popularDestinations]; arr[i] = { ...arr[i], name: e.target.value }; setFooter({ ...footer, popularDestinations: arr });
                }} />
                <input className="input flex-1" value={d.href} placeholder="/destinations/..." onChange={(e) => {
                  const arr = [...footer.popularDestinations]; arr[i] = { ...arr[i], href: e.target.value }; setFooter({ ...footer, popularDestinations: arr });
                }} />
                <button onClick={() => setFooter({ ...footer, popularDestinations: footer.popularDestinations.filter((_, j) => j !== i) })} className="text-red-400 shrink-0"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {footer.popularDestinations.length === 0 && <p className="text-sm text-gray-500">No destinations added.</p>}
          </div>
        )}

        {/* Contact */}
        {activeSection === 'contact' && (
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Email</label>
                <input className="input" value={footer.contact.email} onChange={(e) => setFooter({ ...footer, contact: { ...footer.contact, email: e.target.value } })} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" value={footer.contact.phone} onChange={(e) => setFooter({ ...footer, contact: { ...footer.contact, phone: e.target.value } })} />
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                <textarea className="textarea" rows={2} value={footer.contact.address} onChange={(e) => setFooter({ ...footer, contact: { ...footer.contact, address: e.target.value } })} />
              </div>
            </div>
            <div className="pt-4">
              <label className="label">Copyright Text</label>
              <input className="input" value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} />
            </div>
          </div>
        )}

        {/* Social */}
        {activeSection === 'social' && (
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(footer.social).map(([key, val]) => (
                <div key={key}>
                  <label className="label capitalize">{key}</label>
                  <input className="input" value={val} placeholder={`https://${key}.com/...`} onChange={(e) => setFooter({ ...footer, social: { ...footer.social, [key]: e.target.value } })} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
