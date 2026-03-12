import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Python Jarvis Desktop Assistant',
    description: 'Voice-controlled automation assistant capable of executing system commands and automating tasks.',
    tags: ['Python', 'Voice Recognition', 'Automation'],
    live: false,
    tagColor: 'primary',
  },
  {
    title: 'Haji Cloth Store',
    description: 'Live website developed for a clothing business.',
    tags: ['Web Development', 'Business', 'Live'],
    live: true,
    url: 'https://hajiclothstore.com',
    tagColor: 'accent',
  },
  {
    title: 'Student Data Analysis System',
    description: 'Python Pandas project that processes CSV data, performs filtering, and calculates statistics.',
    tags: ['Python', 'Pandas', 'Data Analysis'],
    live: false,
    tagColor: 'secondary',
  },
  {
    title: 'Content Creation Workflow System',
    description: 'A structured workflow for recording, managing, and publishing digital content.',
    tags: ['Workflow', 'Content', 'Management'],
    live: false,
    tagColor: 'neon-pink',
  },
  {
    title: 'Career Buddy Website',
    description: 'A web platform designed to help users explore career options and resources.',
    tags: ['Web Development', 'Career', 'Platform'],
    live: false,
    tagColor: 'accent',
  },
];

const borderGradients = [
  'linear-gradient(135deg, hsl(217,91%,60%), hsl(186,90%,50%))',
  'linear-gradient(135deg, hsl(186,90%,50%), hsl(270,70%,60%))',
  'linear-gradient(135deg, hsl(270,70%,60%), hsl(330,90%,60%))',
  'linear-gradient(135deg, hsl(330,90%,60%), hsl(25,95%,60%))',
  'linear-gradient(135deg, hsl(25,95%,60%), hsl(217,91%,60%))',
];

const ProjectCard = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 150 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-gradient-card rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        transform: hovered ? 'translateY(-8px) scale(1.02)' : '',
        boxShadow: hovered ? '0 20px 40px hsla(0,0%,0%,0.3)' : 'none',
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          background: borderGradients[index % 5],
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Preview area */}
      <div className="h-40 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center relative">
        <span className="text-3xl font-heading font-bold text-muted-foreground/20">{project.title.charAt(0)}</span>
        {project.live && (
          <motion.span
            animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 15px hsla(145,80%,50%,0.4)', '0 0 25px hsla(145,80%,50%,0.6)', '0 0 15px hsla(145,80%,50%,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-gradient-to-r from-green-500 to-emerald-400 text-background"
          >
            ● LIVE
          </motion.span>
        )}

        {/* Card shine effect */}
        {hovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: 0.15 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(110deg, transparent, hsl(0 0% 100% / 0.3), transparent)',
              width: '50%',
            }}
          />
        )}
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-lg font-heading font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20 font-body"
              style={{
                boxShadow: hovered ? '0 0 8px hsl(217 91% 60% / 0.2)' : 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
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
              className="flex items-center gap-1 text-sm text-accent hover:text-primary transition-colors font-body"
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
    </motion.div>
  );
};

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
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
