import SplitText from '@/components/SplitText';
import GradientText from '@/components/GradientText';
import DecryptedText from '@/components/DecryptedText';
import ShinyText from '@/components/ShinyText';
import Aurora from '@/components/Aurora';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { useSiteData } from '@/lib/data';

export default function Hero() {
  const { hero } = useSiteData();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 opacity-30">
        <Aurora
          colorStops={['#3b82f6', '#6366f1', '#8b5cf6']}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="mb-4">
          <ShinyText
            text="Welcome to my portfolio"
            speed={3}
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
          />
        </div>

        {/* Name */}
        <div className="mb-6">
          <GradientText
            colors={['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6']}
            animationSpeed={6}
            className="text-6xl md:text-8xl font-extrabold leading-tight"
          >
            {hero.name}
          </GradientText>
        </div>

        {/* Title */}
        <div className="mb-8">
          <SplitText
            text={hero.title}
            className="text-2xl md:text-3xl font-light text-muted-foreground"
            delay={40}
            duration={0.8}
          />
        </div>

        {/* Tagline */}
        <div className="mb-12">
          <DecryptedText
            text={hero.tagline}
            animateOn="view"
            speed={30}
            className="text-lg text-muted-foreground/80"
            sequential={true}
            revealDirection="start"
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
          >
            View Projects
          </a>
          {hero.resume_url && (
            <a
              href={hero.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-border rounded-full text-foreground font-medium hover:bg-secondary transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <FileDown size={18} />
              Download Resume
            </a>
          )}
          <a
            href="#links"
            className="px-8 py-3 border border-border rounded-full text-foreground font-medium hover:bg-secondary transition-all hover:scale-105"
          >
            Get in Touch
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <a href={hero.github_url || 'https://github.com/YhaZt'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
            <Github size={22} />
          </a>
          <a href="#links" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
            <Linkedin size={22} />
          </a>
          <a href="#links" className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200">
            <Mail size={22} />
          </a>
        </div>
      </div>
    </section>
  );
}
