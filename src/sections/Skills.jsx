import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import LogoLoop from '@/components/LogoLoop';

// Skill categories with icons (using simple SVG or text-based logos)
const skillCategories = [
  {
    title: 'Frontend',
    color: 'rgba(59, 130, 246, 0.15)',
    skills: [
      { name: 'React', icon: '⚛️', level: 90 },
      { name: 'Vue', icon: '💚', level: 85 },
      { name: 'Quasar', icon: '🔷', level: 80 },
    ],
  },
  {
    title: 'Backend',
    color: 'rgba(34, 197, 94, 0.15)',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 88 },
      { name: 'Express', icon: '⚡', level: 85 },
      { name: 'Laravel', icon: '🔴', level: 82 },
      { name: 'CodeIgniter 4', icon: '🔥', level: 80 },
    ],
  },
  {
    title: 'Cloud & BaaS',
    color: 'rgba(249, 115, 22, 0.15)',
    skills: [
      { name: 'Firebase', icon: '🔶', level: 85 },
      { name: 'Supabase', icon: '⚡', level: 82 },
      { name: 'Digital Ocean', icon: '🌊', level: 78 },
    ],
  },
  {
    title: 'Databases',
    color: 'rgba(168, 85, 247, 0.15)',
    skills: [
      { name: 'PostgreSQL', icon: '🐘', level: 85 },
      { name: 'MongoDB', icon: '🍃', level: 82 },
    ],
  },
];

const techLogos = [
  { node: <span className="text-2xl font-bold text-blue-400">React</span> },
  { node: <span className="text-2xl font-bold text-green-400">Vue</span> },
  { node: <span className="text-2xl font-bold text-cyan-400">Quasar</span> },
  { node: <span className="text-2xl font-bold text-green-500">Node.js</span> },
  { node: <span className="text-2xl font-bold text-gray-300">Express</span> },
  { node: <span className="text-2xl font-bold text-red-500">Laravel</span> },
  { node: <span className="text-2xl font-bold text-orange-500">CI4</span> },
  { node: <span className="text-2xl font-bold text-amber-400">Firebase</span> },
  { node: <span className="text-2xl font-bold text-emerald-400">Supabase</span> },
  { node: <span className="text-2xl font-bold text-blue-500">DO</span> },
  { node: <span className="text-2xl font-bold text-blue-300">Postgres</span> },
  { node: <span className="text-2xl font-bold text-green-400">MongoDB</span> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Tech Stack</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Technologies and tools I use to bring ideas to life
            </p>
          </AnimatedContent>
        </div>

        {/* Logo Loop */}
        <AnimatedContent distance={40} delay={0.1}>
          <div className="mb-20">
            <LogoLoop
              logos={techLogos}
              speed={80}
              logoHeight={32}
              gap={48}
              pauseOnHover
            />
          </div>
        </AnimatedContent>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <AnimatedContent key={category.title} distance={50} delay={catIndex * 0.15}>
              <SpotlightCard
                className="p-6 rounded-2xl bg-card border border-border h-full"
                spotlightColor={category.color}
              >
                <h3 className="text-lg font-semibold text-foreground mb-5">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{skill.icon}</span>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
