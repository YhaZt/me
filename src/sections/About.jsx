import AnimatedContent from '@/components/AnimatedContent';
import CountUp from '@/components/CountUp';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import { Code2, Coffee, Briefcase, Rocket } from 'lucide-react';

const stats = [
  { icon: <Code2 size={24} />, value: 5, suffix: '+', label: 'Years Experience' },
  { icon: <Briefcase size={24} />, value: 30, suffix: '+', label: 'Projects Completed' },
  { icon: <Rocket size={24} />, value: 12, suffix: '+', label: 'Technologies' },
  { icon: <Coffee size={24} />, value: 999, suffix: '+', label: 'Cups of Coffee' },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">About Me</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              A passionate full-stack developer who loves turning ideas into clean, scalable, modern web applications.
            </p>
          </AnimatedContent>
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <AnimatedContent distance={60} direction="horizontal" reverse>
            <SpotlightCard className="h-full p-8 rounded-2xl bg-card border border-border" spotlightColor="rgba(59, 130, 246, 0.15)">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a developer with a deep passion for building full-stack web applications. 
                My expertise spans across frontend frameworks like React and Vue, backend technologies 
                like Node.js, Express, Laravel, and CodeIgniter 4, and cloud platforms like Firebase, 
                Supabase, and Digital Ocean.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code and creating intuitive user experiences 
                that make a real difference. Every project is an opportunity to push boundaries and 
                learn something new.
              </p>
            </SpotlightCard>
          </AnimatedContent>

          <AnimatedContent distance={60} direction="horizontal">
            <SpotlightCard className="h-full p-8 rounded-2xl bg-card border border-border" spotlightColor="rgba(139, 92, 246, 0.15)">
              <h3 className="text-xl font-semibold mb-4 text-foreground">What I Do</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From responsive frontends to robust APIs, from database design to cloud deployment — 
                I handle the full development lifecycle. I work with modern tools and frameworks to 
                deliver production-ready applications.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Full-Stack Development', 'API Design', 'Cloud Deployment', 'Database Architecture', 'UI/UX Implementation'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedContent key={stat.label} distance={40} delay={index * 0.1}>
              <SpotlightCard className="p-6 rounded-2xl bg-card border border-border text-center" spotlightColor="rgba(99, 102, 241, 0.1)">
                <div className="text-primary mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <CountUp from={0} to={stat.value} duration={2.5} separator="," />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
