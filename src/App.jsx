import { Code2, Globe, ExternalLink, Calendar, Mail } from 'lucide-react';
import Particles from '@/components/Particles';
import Dock from '@/components/Dock';

import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import WakaTime from '@/sections/WakaTime';
import Links from '@/sections/Links';
import Footer from '@/sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleCount={120}
          particleColors={['#3b82f6', '#6366f1', '#8b5cf6']}
          speed={0.05}
          particleBaseSize={80}
          alphaParticles={true}
          sizeRandomness={0.8}
          cameraDistance={25}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <WakaTime />
        <Links />
        <Footer />
      </div>

      {/* Floating Dock Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock
          items={[
            { icon: <div className="text-sm font-bold">H</div>, label: 'Home', onClick: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: <Code2 size={18} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: <Globe size={18} />, label: 'Skills', onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: <ExternalLink size={18} />, label: 'Projects', onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: <Calendar size={18} />, label: 'WakaTime', onClick: () => document.getElementById('wakatime')?.scrollIntoView({ behavior: 'smooth' }) },
            { icon: <Mail size={18} />, label: 'Links', onClick: () => document.getElementById('links')?.scrollIntoView({ behavior: 'smooth' }) },
          ]}
          baseItemSize={40}
          magnification={60}
          panelHeight={56}
          distance={150}
        />
      </div>
    </div>
  );
}
