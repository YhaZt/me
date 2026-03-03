import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { iconNames } from '@/lib/icons';
import { getIcon } from '@/lib/icons';
import {
  Save, Plus, Trash2, ArrowLeft, Lock, AlertCircle,
  User, Code2, Briefcase, FolderOpen, Link2, RotateCcw,
} from 'lucide-react';

const ADMIN_PIN = '032620';

// ─── Tab Components ────────────────────────────────────────

function HeroTab({ data, onSave }) {
  const [form, setForm] = useState(data);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { setForm(data); }, [data]);

  return (
    <div className="space-y-4">
      <Input label="Name" value={form.name || ''} onChange={v => set('name', v)} />
      <Input label="Title" value={form.title || ''} onChange={v => set('title', v)} />
      <Textarea label="Tagline" value={form.tagline || ''} onChange={v => set('tagline', v)} />
      <Input label="Resume URL" value={form.resume_url || ''} onChange={v => set('resume_url', v)} placeholder="https://drive.google.com/..." />
      <Input label="GitHub URL" value={form.github_url || ''} onChange={v => set('github_url', v)} />
      <Input label="Email" value={form.email || ''} onChange={v => set('email', v)} />
      <SaveButton onClick={() => onSave('hero', form, true)} />
    </div>
  );
}

function AboutTab({ data, onSave }) {
  const [form, setForm] = useState(data);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  useEffect(() => { setForm(data); }, [data]);

  return (
    <div className="space-y-4">
      <Textarea label="Who I Am" rows={6} value={form.who_i_am || ''} onChange={v => set('who_i_am', v)} />
      <Textarea label="What I Do" rows={4} value={form.what_i_do || ''} onChange={v => set('what_i_do', v)} />
      <Input label="Tags (comma separated)" value={(form.tags || []).join(', ')} onChange={v => set('tags', v.split(',').map(t => t.trim()).filter(Boolean))} />
      <SaveButton onClick={() => onSave('about', form, true)} />
    </div>
  );
}

function StatsTab({ data, onSave, onDelete, onAdd }) {
  const [items, setItems] = useState(data);
  const update = (i, k, v) => setItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  useEffect(() => { setItems(data); }, [data]);

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={item.id || i} className="p-4 rounded-xl bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Stat #{i + 1}</span>
            <button onClick={() => onDelete('stats', item.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Icon" value={item.icon} options={iconNames} onChange={v => update(i, 'icon', v)} />
            <Input label="Value" type="number" value={item.value} onChange={v => update(i, 'value', parseInt(v) || 0)} />
            <Input label="Suffix" value={item.suffix || ''} onChange={v => update(i, 'suffix', v)} />
            <Input label="Label" value={item.label || ''} onChange={v => update(i, 'label', v)} />
            <Input label="Sort Order" type="number" value={item.sort_order ?? 0} onChange={v => update(i, 'sort_order', parseInt(v) || 0)} />
          </div>
          <SaveButton small onClick={() => onSave('stats', items[i])} />
        </div>
      ))}
      <AddButton onClick={() => onAdd('stats', { icon: 'Code2', value: 0, suffix: '+', label: 'New Stat', sort_order: items.length })} />
    </div>
  );
}

function SkillsTab({ data, onSave, onDelete, onAdd }) {
  const [items, setItems] = useState(data);
  const update = (i, k, v) => setItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));
  const updateSkill = (catI, skillI, k, v) => {
    setItems(p => p.map((cat, ci) => {
      if (ci !== catI) return cat;
      const skills = [...cat.skills];
      skills[skillI] = { ...skills[skillI], [k]: v };
      return { ...cat, skills };
    }));
  };
  const addSkill = (catI) => {
    setItems(p => p.map((cat, ci) => ci === catI ? { ...cat, skills: [...cat.skills, { name: 'New Skill', icon: '⭐', level: 50 }] } : cat));
  };
  const removeSkill = (catI, skillI) => {
    setItems(p => p.map((cat, ci) => ci === catI ? { ...cat, skills: cat.skills.filter((_, si) => si !== skillI) } : cat));
  };

  useEffect(() => { setItems(data); }, [data]);

  return (
    <div className="space-y-6">
      {items.map((cat, ci) => (
        <div key={cat.id || ci} className="p-4 rounded-xl bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{cat.title}</span>
            <button onClick={() => onDelete('skill_categories', cat.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Title" value={cat.title || ''} onChange={v => update(ci, 'title', v)} />
            <Input label="Color (rgba)" value={cat.color || ''} onChange={v => update(ci, 'color', v)} />
            <Input label="Sort Order" type="number" value={cat.sort_order ?? 0} onChange={v => update(ci, 'sort_order', parseInt(v) || 0)} />
          </div>
          <div className="pl-4 border-l-2 border-border space-y-3 mt-3">
            <span className="text-xs text-muted-foreground font-medium">Skills</span>
            {cat.skills.map((skill, si) => (
              <div key={si} className="grid grid-cols-4 gap-2 items-end">
                <Input label="Name" value={skill.name} onChange={v => updateSkill(ci, si, 'name', v)} />
                <Input label="Icon" value={skill.icon} onChange={v => updateSkill(ci, si, 'icon', v)} />
                <Input label="Level %" type="number" value={skill.level} onChange={v => updateSkill(ci, si, 'level', parseInt(v) || 0)} />
                <button onClick={() => removeSkill(ci, si)} className="text-red-400 hover:text-red-300 p-2 mb-1"><Trash2 size={14} /></button>
              </div>
            ))}
            <button onClick={() => addSkill(ci)} className="text-xs text-primary hover:underline flex items-center gap-1"><Plus size={12} /> Add Skill</button>
          </div>
          <SaveButton small onClick={() => onSave('skill_categories', items[ci])} />
        </div>
      ))}
      <AddButton onClick={() => onAdd('skill_categories', { title: 'New Category', color: 'rgba(59, 130, 246, 0.15)', skills: [], sort_order: items.length })} />
    </div>
  );
}

function ProjectsTab({ data, onSave, onDelete, onAdd }) {
  const [items, setItems] = useState(data);
  const update = (i, k, v) => setItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  useEffect(() => { setItems(data); }, [data]);

  return (
    <div className="space-y-6">
      {items.map((proj, i) => (
        <div key={proj.id || i} className="p-4 rounded-xl bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{proj.title}</span>
            <button onClick={() => onDelete('projects', proj.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Title" value={proj.title || ''} onChange={v => update(i, 'title', v)} />
            <Input label="Image URL" value={proj.image_url || ''} onChange={v => update(i, 'image_url', v)} />
            <Input label="Live URL" value={proj.live_url || ''} onChange={v => update(i, 'live_url', v)} />
            <Input label="GitHub URL" value={proj.github_url || ''} onChange={v => update(i, 'github_url', v)} />
            <Input label="Tags (comma)" value={(proj.tags || []).join(', ')} onChange={v => update(i, 'tags', v.split(',').map(t => t.trim()).filter(Boolean))} />
            <Input label="Sort Order" type="number" value={proj.sort_order ?? 0} onChange={v => update(i, 'sort_order', parseInt(v) || 0)} />
          </div>
          <Textarea label="Description" value={proj.description || ''} onChange={v => update(i, 'description', v)} />
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={proj.featured || false} onChange={e => update(i, 'featured', e.target.checked)} className="rounded" />
            Featured
          </label>
          <SaveButton small onClick={() => onSave('projects', items[i])} />
        </div>
      ))}
      <AddButton onClick={() => onAdd('projects', { title: 'New Project', description: '', tags: [], live_url: '#', github_url: '#', featured: false, sort_order: items.length })} />
    </div>
  );
}

function SocialLinksTab({ data, onSave, onDelete, onAdd }) {
  const [items, setItems] = useState(data);
  const update = (i, k, v) => setItems(p => p.map((item, idx) => idx === i ? { ...item, [k]: v } : item));

  useEffect(() => { setItems(data); }, [data]);

  return (
    <div className="space-y-6">
      {items.map((link, i) => (
        <div key={link.id || i} className="p-4 rounded-xl bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{link.name}</span>
            <button onClick={() => onDelete('social_links', link.id)} className="text-red-400 hover:text-red-300 p-1"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Name" value={link.name || ''} onChange={v => update(i, 'name', v)} />
            <Input label="URL" value={link.url || ''} onChange={v => update(i, 'url', v)} />
            <Select label="Icon" value={link.icon_name} options={iconNames} onChange={v => update(i, 'icon_name', v)} />
            <Input label="Color (rgba)" value={link.color || ''} onChange={v => update(i, 'color', v)} />
            <Input label="Sort Order" type="number" value={link.sort_order ?? 0} onChange={v => update(i, 'sort_order', parseInt(v) || 0)} />
          </div>
          <Input label="Description" value={link.description || ''} onChange={v => update(i, 'description', v)} />
          <SaveButton small onClick={() => onSave('social_links', items[i])} />
        </div>
      ))}
      <AddButton onClick={() => onAdd('social_links', { name: 'New Link', url: '#', icon_name: 'Globe', color: 'rgba(59, 130, 246, 0.2)', description: '', sort_order: items.length })} />
    </div>
  );
}

// ─── Shared UI Components ──────────────────────────────────

function Input({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <textarea
        rows={rows}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SaveButton({ onClick, small = false }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer ${small ? 'px-3 py-1.5 text-xs' : 'px-5 py-2.5 text-sm'}`}
    >
      <Save size={small ? 14 : 16} /> Save
    </button>
  );
}

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
    >
      <Plus size={16} /> Add New
    </button>
  );
}

// ─── Main Admin Page ───────────────────────────────────────

const tabs = [
  { key: 'hero', label: 'Hero', icon: User },
  { key: 'about', label: 'About', icon: Code2 },
  { key: 'stats', label: 'Stats', icon: Briefcase },
  { key: 'skills', label: 'Skills', icon: Code2 },
  { key: 'projects', label: 'Projects', icon: FolderOpen },
  { key: 'links', label: 'Links', icon: Link2 },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [toast, setToast] = useState(null);

  // Data states
  const [hero, setHero] = useState({});
  const [about, setAbout] = useState({});
  const [stats, setStats] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
      setPinError(false);
      if (isSupabaseConfigured()) fetchAll();
      else setLoading(false);
    } else {
      setPinError(true);
    }
  };

  async function fetchAll() {
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    setLoading(true);
    try {
      const [h, a, st, sk, pr, sl] = await Promise.all([
        supabase.from('hero').select('*').limit(1).single(),
        supabase.from('about').select('*').limit(1).single(),
        supabase.from('stats').select('*').order('sort_order'),
        supabase.from('skill_categories').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('social_links').select('*').order('sort_order'),
      ]);
      if (h.data) setHero(h.data);
      if (a.data) setAbout({ ...a.data, tags: typeof a.data.tags === 'string' ? JSON.parse(a.data.tags) : (a.data.tags || []) });
      if (st.data) setStats(st.data);
      if (sk.data) setSkills(sk.data.map(c => ({ ...c, skills: typeof c.skills === 'string' ? JSON.parse(c.skills) : (c.skills || []) })));
      if (pr.data) setProjects(pr.data.map(p => ({ ...p, tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []) })));
      if (sl.data) setSocialLinks(sl.data);
    } catch (err) {
      showToast('Failed to load data: ' + err.message, 'error');
    }
    setLoading(false);
  }

  async function handleSave(table, data, isSingle = false) {
    if (!isSupabaseConfigured()) {
      showToast('Supabase not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env', 'error');
      return;
    }
    try {
      const payload = { ...data };
      delete payload.created_at;
      payload.updated_at = new Date().toISOString();

      if (isSingle) {
        // Upsert single-row tables (hero, about)
        if (payload.id) {
          const { error } = await supabase.from(table).update(payload).eq('id', payload.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from(table).insert(payload);
          if (error) throw error;
        }
      } else {
        // Upsert item by id
        if (payload.id) {
          const { error } = await supabase.from(table).update(payload).eq('id', payload.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from(table).insert(payload);
          if (error) throw error;
        }
      }
      showToast('Saved successfully!');
      fetchAll();
    } catch (err) {
      showToast('Save failed: ' + err.message, 'error');
    }
  }

  async function handleDelete(table, id) {
    if (!id || !isSupabaseConfigured()) return;
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      showToast('Deleted!');
      fetchAll();
    } catch (err) {
      showToast('Delete failed: ' + err.message, 'error');
    }
  }

  async function handleAdd(table, data) {
    if (!isSupabaseConfigured()) {
      showToast('Supabase not configured', 'error');
      return;
    }
    try {
      const { error } = await supabase.from(table).insert(data);
      if (error) throw error;
      showToast('Added!');
      fetchAll();
    } catch (err) {
      showToast('Add failed: ' + err.message, 'error');
    }
  }

  // ─── PIN Screen ──────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
              <Lock size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-2">Enter PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false); }}
              placeholder="Enter PIN"
              maxLength={6}
              className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-ring ${pinError ? 'border-red-500 shake' : 'border-input'}`}
              autoFocus
            />
            {pinError && (
              <p className="text-sm text-red-400 text-center flex items-center justify-center gap-1">
                <AlertCircle size={14} /> Invalid PIN
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all cursor-pointer"
            >
              Unlock
            </button>
          </form>
          <div className="text-center mt-6">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Back to site
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Not Configured Warning ──────────────────────────────
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <AlertCircle size={48} className="text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Supabase Not Configured</h1>
          <p className="text-muted-foreground mb-6">
            Create a <code className="px-1.5 py-0.5 bg-secondary rounded text-sm">.env</code> file in the project root with:
          </p>
          <div className="bg-card border border-border rounded-xl p-4 text-left font-mono text-sm text-foreground">
            <p>VITE_SUPABASE_URL=your-project-url</p>
            <p>VITE_SUPABASE_ANON_KEY=your-anon-key</p>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Then run the SQL from <code className="px-1.5 py-0.5 bg-secondary rounded text-sm">supabase-schema.sql</code> in your Supabase SQL Editor.
          </p>
          <a href="/" className="inline-flex items-center gap-1 mt-6 text-sm text-primary hover:underline">
            <ArrowLeft size={14} /> Back to site
          </a>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[200] px-4 py-3 rounded-xl text-sm font-medium shadow-lg ${toast.type === 'error' ? 'bg-red-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} />
            </a>
            <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
          </div>
          <button onClick={fetchAll} className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent" title="Refresh data">
            <RotateCcw size={16} />
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading...</div>
        ) : (
          <div className="max-w-2xl">
            {activeTab === 'hero' && <HeroTab data={hero} onSave={handleSave} />}
            {activeTab === 'about' && <AboutTab data={about} onSave={handleSave} />}
            {activeTab === 'stats' && <StatsTab data={stats} onSave={handleSave} onDelete={handleDelete} onAdd={handleAdd} />}
            {activeTab === 'skills' && <SkillsTab data={skills} onSave={handleSave} onDelete={handleDelete} onAdd={handleAdd} />}
            {activeTab === 'projects' && <ProjectsTab data={projects} onSave={handleSave} onDelete={handleDelete} onAdd={handleAdd} />}
            {activeTab === 'links' && <SocialLinksTab data={socialLinks} onSave={handleSave} onDelete={handleDelete} onAdd={handleAdd} />}
          </div>
        )}
      </div>
    </div>
  );
}
