import { useState, useMemo } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import ShinyText from '@/components/ShinyText';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { useSiteData } from '@/lib/data';

export default function Projects() {
  const { projects } = useSiteData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  // Build filters dynamically from project tags
  const filters = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tagSet.add(t)));
    return ['All', ...Array.from(tagSet)];
  }, [projects]);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => (p.tags || []).includes(activeFilter));

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Projects</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              A selection of projects I've worked on — replace these with your own!
            </p>
          </AnimatedContent>
        </div>

        {/* Filters */}
        <AnimatedContent distance={30} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => { setActiveFilter(filter); setShowAll(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimatedContent>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <AnimatedContent key={project.title} distance={50} delay={index * 0.1}>
              <SpotlightCard
                className="group p-0 rounded-2xl bg-card border border-border overflow-hidden h-full flex flex-col"
                spotlightColor="rgba(59, 130, 246, 0.1)"
              >
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent flex items-center justify-center border-b border-border overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                      {project.title.split(' ').map(w => w[0]).join('')}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    {project.featured && (
                      <ShinyText text="Featured" speed={4} className="text-xs text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border">
                    <a
                      href={project.live_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        {/* Show More */}
        {filteredProjects.length > 3 && !showAll && (
          <AnimatedContent distance={20} delay={0.3}>
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              >
                View All Projects
                <ChevronRight size={16} />
              </button>
            </div>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
