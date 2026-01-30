import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import ImageUploader from '../components/ImageUploader';
import { getAbout, updateAbout } from '../lib/api';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface AboutData {
  stats: { label: string; value: string }[];
  values: { title: string; description: string; icon: string }[];
  team: TeamMember[];
  timeline: TimelineItem[];
}

const defaultAbout: AboutData = {
  stats: [
    { label: 'Countries Covered', value: '50+' },
    { label: 'Travel Guides', value: '200+' },
    { label: 'Happy Travelers', value: '10K+' },
    { label: 'Years Experience', value: '5+' },
  ],
  values: [
    { title: 'Authenticity', description: 'Real experiences from real travelers', icon: 'Heart' },
    { title: 'Quality', description: 'Curated content you can trust', icon: 'Award' },
    { title: 'Community', description: 'Built by travelers, for travelers', icon: 'Users' },
  ],
  team: [
    { name: '', role: '', image: '', bio: '' },
  ],
  timeline: [
    { year: '2020', title: 'Founded', description: 'Started as a travel blog' },
  ],
};

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData>(defaultAbout);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('stats');

  useEffect(() => {
    getAbout().then((d) => setAbout({ ...defaultAbout, ...d })).catch(() => {});
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await updateAbout(about);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const sections = ['stats', 'values', 'team', 'timeline'];

  return (
    <div>
      <TopBar title="About Page" saving={saving} saved={saved} onSave={save} />
      <div className="p-6 max-w-4xl space-y-6">
        {/* Section Tabs */}
        <div className="flex gap-1 border-b border-gray-700">
          {sections.map((s) => (
            <button key={s} onClick={() => setActiveSection(s)} className={`px-4 py-2 text-sm font-medium capitalize ${activeSection === s ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Stats */}
        {activeSection === 'stats' && (
          <div className="card space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Stats</h3>
              <button onClick={() => setAbout({ ...about, stats: [...about.stats, { label: '', value: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {about.stats.map((stat, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Label</label>
                    <input className="input" value={stat.label} onChange={(e) => {
                      const s = [...about.stats]; s[i] = { ...s[i], label: e.target.value }; setAbout({ ...about, stats: s });
                    }} />
                  </div>
                  <div>
                    <label className="label">Value</label>
                    <input className="input" value={stat.value} onChange={(e) => {
                      const s = [...about.stats]; s[i] = { ...s[i], value: e.target.value }; setAbout({ ...about, stats: s });
                    }} />
                  </div>
                </div>
                <button onClick={() => setAbout({ ...about, stats: about.stats.filter((_, j) => j !== i) })} className="mt-7 text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}

        {/* Values */}
        {activeSection === 'values' && (
          <div className="card space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Core Values</h3>
              <button onClick={() => setAbout({ ...about, values: [...about.values, { title: '', description: '', icon: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {about.values.map((val, i) => (
              <div key={i} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Value {i + 1}</span>
                  <button onClick={() => setAbout({ ...about, values: about.values.filter((_, j) => j !== i) })} className="text-red-400 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Title</label>
                    <input className="input" value={val.title} onChange={(e) => {
                      const v = [...about.values]; v[i] = { ...v[i], title: e.target.value }; setAbout({ ...about, values: v });
                    }} />
                  </div>
                  <div>
                    <label className="label">Icon (Lucide)</label>
                    <input className="input" value={val.icon} onChange={(e) => {
                      const v = [...about.values]; v[i] = { ...v[i], icon: e.target.value }; setAbout({ ...about, values: v });
                    }} />
                  </div>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea className="textarea" rows={2} value={val.description} onChange={(e) => {
                    const v = [...about.values]; v[i] = { ...v[i], description: e.target.value }; setAbout({ ...about, values: v });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Team */}
        {activeSection === 'team' && (
          <div className="card space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <button onClick={() => setAbout({ ...about, team: [...about.team, { name: '', role: '', image: '', bio: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {about.team.map((member, i) => (
              <div key={i} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">{member.name || `Member ${i + 1}`}</span>
                  <button onClick={() => setAbout({ ...about, team: about.team.filter((_, j) => j !== i) })} className="text-red-400 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Name</label>
                    <input className="input" value={member.name} onChange={(e) => {
                      const t = [...about.team]; t[i] = { ...t[i], name: e.target.value }; setAbout({ ...about, team: t });
                    }} />
                  </div>
                  <div>
                    <label className="label">Role</label>
                    <input className="input" value={member.role} onChange={(e) => {
                      const t = [...about.team]; t[i] = { ...t[i], role: e.target.value }; setAbout({ ...about, team: t });
                    }} />
                  </div>
                </div>
                <ImageUploader label="Photo" value={member.image} onChange={(v) => {
                  const t = [...about.team]; t[i] = { ...t[i], image: v }; setAbout({ ...about, team: t });
                }} />
                <div>
                  <label className="label">Bio</label>
                  <textarea className="textarea" rows={2} value={member.bio} onChange={(e) => {
                    const t = [...about.team]; t[i] = { ...t[i], bio: e.target.value }; setAbout({ ...about, team: t });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {activeSection === 'timeline' && (
          <div className="card space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Timeline</h3>
              <button onClick={() => setAbout({ ...about, timeline: [...about.timeline, { year: '', title: '', description: '' }] })} className="btn-secondary text-sm"><Plus className="w-4 h-4" /> Add</button>
            </div>
            {about.timeline.map((item, i) => (
              <div key={i} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">{item.year || `Event ${i + 1}`}</span>
                  <button onClick={() => setAbout({ ...about, timeline: about.timeline.filter((_, j) => j !== i) })} className="text-red-400 text-sm">Remove</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="label">Year</label>
                    <input className="input" value={item.year} onChange={(e) => {
                      const t = [...about.timeline]; t[i] = { ...t[i], year: e.target.value }; setAbout({ ...about, timeline: t });
                    }} />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Title</label>
                    <input className="input" value={item.title} onChange={(e) => {
                      const t = [...about.timeline]; t[i] = { ...t[i], title: e.target.value }; setAbout({ ...about, timeline: t });
                    }} />
                  </div>
                </div>
                <div>
                  <label className="label">Description</label>
                  <textarea className="textarea" rows={2} value={item.description} onChange={(e) => {
                    const t = [...about.timeline]; t[i] = { ...t[i], description: e.target.value }; setAbout({ ...about, timeline: t });
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
