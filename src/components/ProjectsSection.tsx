import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { ProjectModal, ProjectData } from './ProjectModal';

const glowColors = [
  { border: 'hsl(270,70%,65%)', shadow: 'hsla(270,70%,65%,0.3)' },
  { border: 'hsl(186,90%,50%)', shadow: 'hsla(186,90%,50%,0.3)' },
  { border: 'hsl(330,90%,60%)', shadow: 'hsla(330,90%,60%,0.3)' },
  { border: 'hsl(25,95%,60%)', shadow: 'hsla(25,95%,60%,0.3)' },
  { border: 'hsl(150,80%,50%)', shadow: 'hsla(150,80%,50%,0.3)' },
];

const borderGradients = [
  'linear-gradient(135deg, hsl(270,70%,65%), hsl(186,90%,50%))',
  'linear-gradient(135deg, hsl(186,90%,50%), hsl(330,90%,60%))',
  'linear-gradient(135deg, hsl(330,90%,60%), hsl(25,95%,60%))',
  'linear-gradient(135deg, hsl(25,95%,60%), hsl(150,80%,50%))',
  'linear-gradient(135deg, hsl(150,80%,50%), hsl(270,70%,65%))',
];

const DEFAULT_PREVIEW_IMAGE = "/project-placeholder.png";

export const ProjectCard = ({ 
  project, 
  index, 
  inView,
  onClick 
}: { 
  project: ProjectData; 
  index: number; 
  inView: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const glow = glowColors[index % glowColors.length];
  const previewSource = project.preview || DEFAULT_PREVIEW_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 150 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="group relative bg-gradient-card rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col h-full"
      style={{
        transform: hovered ? 'translateY(-8px) scale(1.02)' : '',
        boxShadow: hovered
          ? `0 0 20px ${glow.shadow}, 0 0 40px ${glow.shadow}, 0 20px 40px hsla(0,0%,0%,0.3)`
          : 'none',
        borderColor: hovered ? glow.border : 'rgba(255,255,255,0.05)',
        borderWidth: '1px'
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: borderGradients[index % borderGradients.length],
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Preview area */}
      <div className="h-48 relative overflow-hidden bg-black/40 border-b border-white/5">
        {project.previewType === 'video' && project.preview ? (
          <video 
            src={project.preview} 
            muted 
            loop 
            playsInline
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
            ref={(el) => {
              if (el) {
                if (hovered) el.play().catch(()=>{});
                else el.pause();
              }
            }}
          />
        ) : (
          <img 
            src={previewSource} 
            alt={project.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'}`}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />

        {hovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: 0.15 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(110deg, transparent, hsl(0 0% 100% / 0.3), transparent)',
              width: '50%',
            }}
          />
        )}
      </div>

      <div className="p-6 relative z-10 flex flex-col flex-grow">
        <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground font-body mb-5 leading-relaxed flex-grow">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.category.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2.5 py-1 text-xs rounded-md bg-white/5 text-white/70 border border-white/10 font-body"
              style={{
                boxShadow: hovered ? `0 0 10px ${glow.shadow}` : 'none',
                borderColor: hovered ? glow.border : 'rgba(255,255,255,0.1)',
                color: hovered ? '#fff' : '',
                transition: 'all 0.3s',
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
          {project.live && (
            <div
              className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              onClick={(e) => e.stopPropagation()} // Prevent modal from opening if they click the link
            >
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          )}
          {project.github && (
            <div
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                <Github size={16} /> Code
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Filter for featured projects: 3 on mobile, 6 on desktop
  const featuredProjects = (projectsData as ProjectData[])
    .filter(p => p.featured)
    .slice(0, isMobile ? 3 : 6);

  return (
    <section className="section-padding relative min-h-screen" id="projects" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto text-sm md:text-base mb-6">
            A selection of my best engineering work, showcasing futuristic thinking, technical creativity, and intelligent system design.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full opacity-50" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, i) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={i} 
              inView={inView} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <Link 
            to="/projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-full font-heading font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden"
          >
            <span className="relative z-10">Explore All Projects</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default ProjectsSection;
