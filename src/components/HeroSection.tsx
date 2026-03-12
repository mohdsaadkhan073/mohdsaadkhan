import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Mail } from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.png';

const phrases = [
  'Computer Engineering Student',
  'Python Developer',
  'Automation Builder',
  'Problem Solver',
  'Technology Explorer',
];

const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timeout = setTimeout(() => {
        setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center section-padding relative" id="hero">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neon-cyan font-body text-sm tracking-widest uppercase mb-4"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-gradient">Mohd Saad Khan</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-heading text-muted-foreground mb-6 h-8"
          >
            <span>{text}</span>
            <span className="animate-pulse text-neon-blue">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground font-body max-w-lg mb-8 leading-relaxed"
          >
            A passionate Computer Engineering student focused on building innovative
            software solutions, automation tools, and exploring cutting-edge technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group relative px-6 py-3 rounded-lg font-heading font-semibold text-sm bg-gradient-primary text-primary-foreground overflow-hidden transition-transform hover:-translate-y-1 glow-blue"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects <ExternalLink size={16} />
              </span>
            </a>
            <a
              href="#contact"
              className="group relative px-6 py-3 rounded-lg font-heading font-semibold text-sm border border-neon-blue/30 text-foreground hover:border-neon-blue/60 transition-all hover:-translate-y-1"
            >
              <span className="flex items-center gap-2">
                Contact Me <Mail size={16} />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, hsl(217,91%,60%), hsl(270,70%,60%), hsl(186,90%,50%), hsl(330,90%,60%), hsl(217,91%,60%))',
                padding: '3px',
                borderRadius: '50%',
                width: 'calc(100% + 16px)',
                height: 'calc(100% + 16px)',
                top: '-8px',
                left: '-8px',
                filter: 'blur(2px)',
              }}
            />
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 border-4 border-background">
              <img
                src={profileAvatar}
                alt="Mohd Saad Khan"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#4F8EF7', '#8B5CF6', '#06B6D4', '#EC4899', '#4F8EF7', '#8B5CF6'][i],
                  top: `${20 + Math.sin(i * 1.2) * 40}%`,
                  left: `${20 + Math.cos(i * 1.2) * 40}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
