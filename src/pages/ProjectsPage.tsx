import React, { Suspense } from 'react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import { ProjectCard } from '../components/ProjectCard';
import type { ProjectData } from '../components/ProjectModal';
import CustomCursor from '../components/CustomCursor';

const ProjectModal = React.lazy(() => import('../components/ProjectModal').then(m => ({ default: m.ProjectModal })));

const ALL_CATEGORIES = ['All', 'AI', 'Automation', 'Web', 'Systems', 'Tools', 'Experiments', 'Full Stack'];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const filteredProjects = useMemo(() => {
    return (projectsData as ProjectData[]).filter((project) => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-cyan-500/30 font-body pb-20">
      <CustomCursor />
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-heading font-semibold">Back to Terminal</span>
          </Link>
          
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Archive</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
            A comprehensive database of my engineering work, experiments, and system architectures. Search and filter to explore specific technical domains.
          </p>
        </motion.div>

        {/* Search and Filter System */}
        <div className="mb-12 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-2xl"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by title, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-cyan-500/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted-foreground/50 transition-all outline-none focus:ring-4 focus:ring-cyan-500/10 font-body shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            <div className="flex items-center gap-2 mr-2 text-muted-foreground">
              <Filter size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">Filters:</span>
            </div>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                  selectedCategory === cat 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Results Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project} 
                    index={i} 
                    inView={true} 
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Search size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Suspense fallback={null}>
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </Suspense>
    </div>
  );
};

export default ProjectsPage;
