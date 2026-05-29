import React, { Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import type { ProjectData } from './ProjectModal';

const ProjectModal = React.lazy(() => import('./ProjectModal').then(m => ({ default: m.ProjectModal })));

import { ProjectCard } from './ProjectCard';

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

      <Suspense fallback={null}>
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </Suspense>
    </section>
  );
};

export default ProjectsSection;
