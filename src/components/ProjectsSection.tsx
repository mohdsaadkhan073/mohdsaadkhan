import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Python Jarvis Desktop Assistant',
    description: 'Voice-controlled automation assistant capable of executing system commands and automating tasks.',
    tags: ['Python', 'Voice Recognition', 'Automation'],
    live: false,
  },
  {
    title: 'Haji Cloth Store',
    description: 'Live website developed for a clothing business.',
    tags: ['Web Development', 'Business', 'Live'],
    live: true,
    url: 'https://hajiclothstore.com',
  },
  {
    title: 'Student Data Analysis System',
    description: 'Python Pandas project that processes CSV data, performs filtering, and calculates statistics.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    live: false,
  },
  {
    title: 'Content Creation Workflow System',
    description: 'A structured workflow for recording, managing, and publishing digital content.',
    tags: ['Workflow', 'Content', 'Management'],
    live: false,
  },
  {
    title: 'Career Buddy Website',
    description: 'A web platform designed to help users explore career options and resources.',
    tags: ['Web Development', 'Career', 'Platform'],
    live: false,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="projects" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-card rounded-2xl border border-border/50 overflow-hidden hover:border-neon-blue/40 transition-all duration-300 shimmer"
            >
              {/* Preview area */}
              <div className="h-40 bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-cyan/10 flex items-center justify-center relative">
                <span className="text-3xl font-heading font-bold text-muted-foreground/20">{project.title.charAt(0)}</span>
                {project.live && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-gradient-to-r from-green-500 to-emerald-400 text-background"
                    style={{ boxShadow: '0 0 15px hsla(145,80%,50%,0.4)' }}
                  >
                    ● LIVE
                  </motion.span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-neon-blue/10 text-neon-blue border border-neon-blue/20 font-body">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-neon-cyan hover:text-neon-blue transition-colors font-body"
                    >
                      <ExternalLink size={14} /> Visit Website
                    </a>
                  )}
                  <a
                    href="https://github.com/mohdsaadkhan073"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    <Github size={14} /> GitHub
                  </a>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, hsla(217,91%,60%,0.05), transparent 70%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
