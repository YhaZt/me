import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

// CONFIGURATION: Replace with your actual links
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/YhaZt',
    icon: <Github size={24} />,
    color: 'rgba(255, 255, 255, 0.1)',
    description: 'Check out my repositories and open source work',
  },
  {
    name: 'LinkedIn',
    url: '#', // Replace with your LinkedIn URL
    icon: <Linkedin size={24} />,
    color: 'rgba(10, 102, 194, 0.2)',
    description: 'Connect with me professionally',
  },
  {
    name: 'Email',
    url: 'mailto:your@email.com', // Replace with your email
    icon: <Mail size={24} />,
    color: 'rgba(234, 67, 53, 0.2)',
    description: 'Send me an email for inquiries',
  },
  {
    name: 'Website',
    url: '#', // Replace with your website
    icon: <Globe size={24} />,
    color: 'rgba(59, 130, 246, 0.2)',
    description: 'Visit my personal website',
  },
  {
    name: 'Twitter / X',
    url: '#', // Replace with your Twitter URL
    icon: <Twitter size={24} />,
    color: 'rgba(29, 161, 242, 0.2)',
    description: 'Follow me for tech updates',
  },
  {
    name: 'Facebook',
    url: '#', // Replace with your Facebook URL
    icon: <Facebook size={24} />,
    color: 'rgba(24, 119, 242, 0.2)',
    description: 'Connect on Facebook',
  },
];

export default function Links() {
  return (
    <section id="links" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Let's Connect</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Find me on these platforms — feel free to reach out!
            </p>
          </AnimatedContent>
        </div>

        {/* Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => (
            <AnimatedContent key={link.name} distance={40} delay={index * 0.08}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <SpotlightCard
                  className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full"
                  spotlightColor={link.color}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5">
                      {link.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{link.name}</h3>
                        <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            </AnimatedContent>
          ))}
        </div>

        {/* Contact CTA */}
        <AnimatedContent distance={40} delay={0.5}>
          <div className="mt-16 text-center">
            <SpotlightCard className="inline-block p-8 rounded-2xl bg-card border border-border" spotlightColor="rgba(59, 130, 246, 0.15)">
              <h3 className="text-xl font-semibold text-foreground mb-3">Have a project in mind?</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                I'm always open to new opportunities and interesting projects. Let's build something amazing together.
              </p>
              <a
                href="mailto:your@email.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
              >
                <Mail size={18} />
                Say Hello
              </a>
            </SpotlightCard>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
