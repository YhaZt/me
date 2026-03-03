-- ============================================
-- Supabase Schema for YhaZt Portfolio
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Hero Section
CREATE TABLE IF NOT EXISTS hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'YhaZt',
  title TEXT NOT NULL DEFAULT 'Full Stack Developer',
  tagline TEXT DEFAULT 'Building modern web experiences with passion and precision',
  resume_url TEXT,
  github_url TEXT DEFAULT 'https://github.com/YhaZt',
  email TEXT DEFAULT 'your@email.com',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Section
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  who_i_am TEXT DEFAULT '',
  what_i_do TEXT DEFAULT '',
  tags JSONB DEFAULT '["Full-Stack Development", "API Design", "Cloud Deployment", "Database Architecture", "UI/UX Implementation"]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stats
CREATE TABLE IF NOT EXISTS stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL DEFAULT 'Code2',
  value INTEGER NOT NULL DEFAULT 0,
  suffix TEXT DEFAULT '+',
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Skill Categories (skills embedded as JSONB)
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  color TEXT DEFAULT 'rgba(59, 130, 246, 0.15)',
  skills JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  tags JSONB DEFAULT '[]',
  image_url TEXT,
  live_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT '#',
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '#',
  icon_name TEXT NOT NULL DEFAULT 'Globe',
  color TEXT DEFAULT 'rgba(59, 130, 246, 0.2)',
  description TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

-- ============================================
-- Row Level Security (RLS)
-- Allow public read, restrict write  
-- ============================================

ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read hero" ON hero FOR SELECT USING (true);
CREATE POLICY "Public read about" ON about FOR SELECT USING (true);
CREATE POLICY "Public read stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read social_links" ON social_links FOR SELECT USING (true);

-- Allow anon insert/update/delete (protected by PIN in the app)
CREATE POLICY "Anon write hero" ON hero FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon write about" ON about FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon write stats" ON stats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon write skill_categories" ON skill_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon write projects" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon write social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Insert default data
-- ============================================

INSERT INTO hero (name, title, tagline, github_url, email) VALUES
  ('YhaZt', 'Full Stack Developer', 'Building modern web experiences with passion and precision', 'https://github.com/YhaZt', 'your@email.com');

INSERT INTO about (who_i_am, what_i_do, tags) VALUES (
  'I''m a developer with a deep passion for building full-stack web applications. My expertise spans across frontend frameworks like React and Vue, backend technologies like Node.js, Express, Laravel, and CodeIgniter 4, and cloud platforms like Firebase, Supabase, and Digital Ocean.\n\nI believe in writing clean, maintainable code and creating intuitive user experiences that make a real difference. Every project is an opportunity to push boundaries and learn something new.',
  'From responsive frontends to robust APIs, from database design to cloud deployment — I handle the full development lifecycle. I work with modern tools and frameworks to deliver production-ready applications.',
  '["Full-Stack Development", "API Design", "Cloud Deployment", "Database Architecture", "UI/UX Implementation"]'
);

INSERT INTO stats (icon, value, suffix, label, sort_order) VALUES
  ('Code2', 5, '+', 'Years Experience', 0),
  ('Briefcase', 30, '+', 'Projects Completed', 1),
  ('Rocket', 12, '+', 'Technologies', 2),
  ('Coffee', 999, '+', 'Cups of Coffee', 3);

INSERT INTO skill_categories (title, color, skills, sort_order) VALUES
  ('Frontend', 'rgba(59, 130, 246, 0.15)', '[{"name":"React","icon":"⚛️","level":90},{"name":"Vue","icon":"💚","level":85},{"name":"Quasar","icon":"🔷","level":80}]', 0),
  ('Backend', 'rgba(34, 197, 94, 0.15)', '[{"name":"Node.js","icon":"🟢","level":88},{"name":"Express","icon":"⚡","level":85},{"name":"Laravel","icon":"🔴","level":82},{"name":"CodeIgniter 4","icon":"🔥","level":80}]', 1),
  ('Cloud & BaaS', 'rgba(249, 115, 22, 0.15)', '[{"name":"Firebase","icon":"🔶","level":85},{"name":"Supabase","icon":"⚡","level":82},{"name":"Digital Ocean","icon":"🌊","level":78}]', 2),
  ('Databases', 'rgba(168, 85, 247, 0.15)', '[{"name":"PostgreSQL","icon":"🐘","level":85},{"name":"MongoDB","icon":"🍃","level":82}]', 3);

INSERT INTO projects (title, description, tags, live_url, github_url, featured, sort_order) VALUES
  ('Project One', 'A full-stack web application built with React, Node.js, and PostgreSQL.', '["React","Node.js","PostgreSQL","Express"]', '#', '#', true, 0),
  ('Project Two', 'E-commerce platform built with Vue.js and Laravel.', '["Vue","Laravel","MySQL","Stripe"]', '#', '#', true, 1),
  ('Project Three', 'Mobile-first application using Quasar with Firebase backend.', '["Quasar","Firebase","PWA"]', '#', '#', true, 2);

INSERT INTO social_links (name, url, icon_name, color, description, sort_order) VALUES
  ('GitHub', 'https://github.com/YhaZt', 'Github', 'rgba(255, 255, 255, 0.1)', 'Check out my repositories and open source work', 0),
  ('LinkedIn', '#', 'Linkedin', 'rgba(10, 102, 194, 0.2)', 'Connect with me professionally', 1),
  ('Email', 'mailto:your@email.com', 'Mail', 'rgba(234, 67, 53, 0.2)', 'Send me an email for inquiries', 2),
  ('Website', '#', 'Globe', 'rgba(59, 130, 246, 0.2)', 'Visit my personal website', 3),
  ('Twitter / X', '#', 'Twitter', 'rgba(29, 161, 242, 0.2)', 'Follow me for tech updates', 4),
  ('Facebook', '#', 'Facebook', 'rgba(24, 119, 242, 0.2)', 'Connect on Facebook', 5);
