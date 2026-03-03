import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

// ─── Fallback / Default Data ───────────────────────────────
const defaultHero = {
  name: 'YhaZt',
  title: 'Full Stack Developer',
  tagline: 'Building modern web experiences with passion and precision',
  resume_url: '',
  github_url: 'https://github.com/YhaZt',
  email: 'your@email.com',
};

const defaultAbout = {
  who_i_am: "I'm a developer with a deep passion for building full-stack web applications. My expertise spans across frontend frameworks like React and Vue, backend technologies like Node.js, Express, Laravel, and CodeIgniter 4, and cloud platforms like Firebase, Supabase, and Digital Ocean.\n\nI believe in writing clean, maintainable code and creating intuitive user experiences that make a real difference. Every project is an opportunity to push boundaries and learn something new.",
  what_i_do: "From responsive frontends to robust APIs, from database design to cloud deployment — I handle the full development lifecycle. I work with modern tools and frameworks to deliver production-ready applications.",
  tags: ['Full-Stack Development', 'API Design', 'Cloud Deployment', 'Database Architecture', 'UI/UX Implementation'],
};

const defaultStats = [
  { id: '1', icon: 'Code2', value: 5, suffix: '+', label: 'Years Experience', sort_order: 0 },
  { id: '2', icon: 'Briefcase', value: 30, suffix: '+', label: 'Projects Completed', sort_order: 1 },
  { id: '3', icon: 'Rocket', value: 12, suffix: '+', label: 'Technologies', sort_order: 2 },
  { id: '4', icon: 'Coffee', value: 999, suffix: '+', label: 'Cups of Coffee', sort_order: 3 },
];

const defaultSkillCategories = [
  {
    id: '1', title: 'Frontend', color: 'rgba(59, 130, 246, 0.15)', sort_order: 0,
    skills: [
      { name: 'React', icon: '⚛️', level: 90 },
      { name: 'Vue', icon: '💚', level: 85 },
      { name: 'Quasar', icon: '🔷', level: 80 },
    ],
  },
  {
    id: '2', title: 'Backend', color: 'rgba(34, 197, 94, 0.15)', sort_order: 1,
    skills: [
      { name: 'Node.js', icon: '🟢', level: 88 },
      { name: 'Express', icon: '⚡', level: 85 },
      { name: 'Laravel', icon: '🔴', level: 82 },
      { name: 'CodeIgniter 4', icon: '🔥', level: 80 },
    ],
  },
  {
    id: '3', title: 'Cloud & BaaS', color: 'rgba(249, 115, 22, 0.15)', sort_order: 2,
    skills: [
      { name: 'Firebase', icon: '🔶', level: 85 },
      { name: 'Supabase', icon: '⚡', level: 82 },
      { name: 'Digital Ocean', icon: '🌊', level: 78 },
    ],
  },
  {
    id: '4', title: 'Databases', color: 'rgba(168, 85, 247, 0.15)', sort_order: 3,
    skills: [
      { name: 'PostgreSQL', icon: '🐘', level: 85 },
      { name: 'MongoDB', icon: '🍃', level: 82 },
    ],
  },
];

const defaultProjects = [
  { id: '1', title: 'Project One', description: 'A full-stack web application built with React, Node.js, and PostgreSQL. Features real-time updates, authentication, and a modern dashboard.', tags: ['React', 'Node.js', 'PostgreSQL', 'Express'], image_url: null, live_url: '#', github_url: '#', featured: true, sort_order: 0 },
  { id: '2', title: 'Project Two', description: 'E-commerce platform built with Vue.js and Laravel. Includes payment integration, inventory management, and admin panel.', tags: ['Vue', 'Laravel', 'MySQL', 'Stripe'], image_url: null, live_url: '#', github_url: '#', featured: true, sort_order: 1 },
  { id: '3', title: 'Project Three', description: 'Mobile-first application using Quasar framework with Firebase backend. Real-time chat, push notifications, and offline support.', tags: ['Quasar', 'Firebase', 'PWA'], image_url: null, live_url: '#', github_url: '#', featured: true, sort_order: 2 },
];

const defaultSocialLinks = [
  { id: '1', name: 'GitHub', url: 'https://github.com/YhaZt', icon_name: 'Github', color: 'rgba(255, 255, 255, 0.1)', description: 'Check out my repositories and open source work', sort_order: 0 },
  { id: '2', name: 'LinkedIn', url: '#', icon_name: 'Linkedin', color: 'rgba(10, 102, 194, 0.2)', description: 'Connect with me professionally', sort_order: 1 },
  { id: '3', name: 'Email', url: 'mailto:your@email.com', icon_name: 'Mail', color: 'rgba(234, 67, 53, 0.2)', description: 'Send me an email for inquiries', sort_order: 2 },
  { id: '4', name: 'Website', url: '#', icon_name: 'Globe', color: 'rgba(59, 130, 246, 0.2)', description: 'Visit my personal website', sort_order: 3 },
  { id: '5', name: 'Twitter / X', url: '#', icon_name: 'Twitter', color: 'rgba(29, 161, 242, 0.2)', description: 'Follow me for tech updates', sort_order: 4 },
  { id: '6', name: 'Facebook', url: '#', icon_name: 'Facebook', color: 'rgba(24, 119, 242, 0.2)', description: 'Connect on Facebook', sort_order: 5 },
];

// ─── Context ───────────────────────────────────────────────
const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [hero, setHero] = useState(defaultHero);
  const [about, setAbout] = useState(defaultAbout);
  const [stats, setStats] = useState(defaultStats);
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);
  const [projects, setProjects] = useState(defaultProjects);
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [heroRes, aboutRes, statsRes, skillsRes, projRes, linksRes] = await Promise.all([
        supabase.from('hero').select('*').limit(1).single(),
        supabase.from('about').select('*').limit(1).single(),
        supabase.from('stats').select('*').order('sort_order'),
        supabase.from('skill_categories').select('*').order('sort_order'),
        supabase.from('projects').select('*').order('sort_order'),
        supabase.from('social_links').select('*').order('sort_order'),
      ]);

      if (heroRes.data) setHero(heroRes.data);
      if (aboutRes.data) {
        const d = aboutRes.data;
        setAbout({
          ...d,
          tags: typeof d.tags === 'string' ? JSON.parse(d.tags) : (d.tags || defaultAbout.tags),
        });
      }
      if (statsRes.data?.length) setStats(statsRes.data);
      if (skillsRes.data?.length) {
        setSkillCategories(skillsRes.data.map(cat => ({
          ...cat,
          skills: typeof cat.skills === 'string' ? JSON.parse(cat.skills) : (cat.skills || []),
        })));
      }
      if (projRes.data?.length) {
        setProjects(projRes.data.map(p => ({
          ...p,
          tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : (p.tags || []),
        })));
      }
      if (linksRes.data?.length) setSocialLinks(linksRes.data);
    } catch (err) {
      console.error('Failed to fetch site data:', err);
    }
    setLoading(false);
  }

  return (
    <SiteDataContext.Provider value={{
      hero, about, stats, skillCategories, projects, socialLinks,
      loading, refetch: fetchAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    // Return defaults if used outside provider (shouldn't happen)
    return {
      hero: defaultHero, about: defaultAbout, stats: defaultStats,
      skillCategories: defaultSkillCategories, projects: defaultProjects,
      socialLinks: defaultSocialLinks, loading: false, refetch: () => {},
    };
  }
  return ctx;
}

// ─── Icon Map (for dynamic icon rendering) ─────────────────
export const iconMap = {
  Code2: 'Code2', Coffee: 'Coffee', Briefcase: 'Briefcase', Rocket: 'Rocket',
  Github: 'Github', Linkedin: 'Linkedin', Mail: 'Mail', Globe: 'Globe',
  Twitter: 'Twitter', Facebook: 'Facebook', Instagram: 'Instagram',
  MessageCircle: 'MessageCircle', ExternalLink: 'ExternalLink',
  Calendar: 'Calendar', BarChart3: 'BarChart3', Clock: 'Clock',
  FileDown: 'FileDown', Heart: 'Heart', Star: 'Star', Zap: 'Zap',
  Target: 'Target', Award: 'Award', Users: 'Users', TrendingUp: 'TrendingUp',
  Monitor: 'Monitor', Smartphone: 'Smartphone', Database: 'Database',
  Server: 'Server', Shield: 'Shield', Terminal: 'Terminal', Layers: 'Layers',
};

// Exports for admin
export { defaultHero, defaultAbout, defaultStats, defaultSkillCategories, defaultProjects, defaultSocialLinks };
