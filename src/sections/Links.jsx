import { useState } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import ContactModal from '@/components/ContactModal';
import { ExternalLink, Mail } from 'lucide-react';
import { useSiteData } from '@/lib/data';
import { getIcon } from '@/lib/icons';

export default function Links() {
  const [contactOpen, setContactOpen] = useState(false);
  const { socialLinks } = useSiteData();

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
            <AnimatedContent key={link.id || link.name} distance={40} delay={index * 0.08}>
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
                      {getIcon(link.icon_name, { size: 24 })}
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
              <button
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 cursor-pointer"
              >
                <Mail size={18} />
                Say Hello
              </button>
            </SpotlightCard>
          </div>
        </AnimatedContent>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
