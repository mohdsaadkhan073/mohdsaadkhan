import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, FileText, Maximize } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type ProjectData = {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  features?: string[];
  category: string[];
  priority: string;
  featured: boolean;
  previewType: string;
  preview: string;
  github: string;
  live: string;
  readme: string;
  technologies: string[];
};

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PREVIEW_IMAGE = "/project-placeholder.png";

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isReadmeOpen) {
          setIsReadmeOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isReadmeOpen]);

  // Fetch README content when opening overlay
  useEffect(() => {
    if (isReadmeOpen && project?.readme) {
      fetch(project.readme)
        .then(res => {
          if (!res.ok) throw new Error("README not found");
          return res.text();
        })
        .then(text => setReadmeContent(text))
        .catch(err => setReadmeContent("# Error\nCould not load README file. Please ensure the file exists at the specified path."));
    }
  }, [isReadmeOpen, project]);

  if (!project) return null;

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const previewSource = project.preview || DEFAULT_PREVIEW_IMAGE;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Main Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 md:bg-transparent hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Left Side: Media Preview */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#111] flex-shrink-0 group">
                {project.previewType === 'video' && project.preview ? (
                  <>
                    <video 
                      ref={videoRef}
                      src={project.preview} 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={toggleFullScreen}
                      className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/10"
                      title="Fullscreen"
                    >
                      <Maximize size={18} />
                    </button>
                  </>
                ) : (
                  <img 
                    src={previewSource} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden pointer-events-none" />
              </div>

              {/* Right Side: Details */}
              <div className="w-full md:w-1/2 flex flex-col h-[50vh] md:h-auto overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                  
                  {/* Title & Short Desc */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 pr-8">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Architecture / Overview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2">Architecture / Overview</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Features */}
                  {(project.features && project.features.length > 0) && (
                    <div className="mb-8">
                      <h3 className="text-lg font-heading font-semibold text-white mb-3">Project features</h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                            <span className="text-cyan-500 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="mb-10">
                    <h3 className="text-lg font-heading font-semibold text-white mb-3">Tech stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/80 font-body">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons Grid */}
                  <div className="mt-auto flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      {project.github ? (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition-all text-sm"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      ) : (
                        <div 
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/5 text-white/40 font-semibold text-xs text-center cursor-not-allowed"
                          title="Source code is not public"
                        >
                          <Github size={16} />
                          Private Source
                        </div>
                      )}
                      
                      {project.live ? (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white/5 transition-all text-sm"
                        >
                          <ExternalLink size={16} />
                          Live project
                        </a>
                      ) : (
                        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/5 text-white/30 font-semibold cursor-not-allowed text-sm">
                          <ExternalLink size={16} />
                          Not Deployed
                        </div>
                      )}
                    </div>

                    {project.readme && (
                      <button 
                        onClick={() => setIsReadmeOpen(true)}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all text-sm w-full"
                      >
                        <FileText size={16} />
                        View README
                      </button>
                    )}
                  </div>
                  
                </div>
              </div>
            </motion.div>
          </div>

          {/* README Overlay Modal */}
          <AnimatePresence>
            {isReadmeOpen && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsReadmeOpen(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-4xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative z-10"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                      <FileText size={18} className="text-cyan-400" />
                      {project.title} - README.md
                    </h3>
                    <button
                      onClick={() => setIsReadmeOpen(false)}
                      className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Markdown Content */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    {readmeContent ? (
                      <div className="prose prose-invert prose-cyan max-w-none font-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {readmeContent}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground animate-pulse">
                        Loading README...
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </>
      )}
    </AnimatePresence>
  );
};
