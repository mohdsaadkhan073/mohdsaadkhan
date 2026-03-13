import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ExternalLink, Mail, Download } from 'lucide-react';
import profileAvatar from '@/assets/profile-avatar.png';

const phrases = [
  'Computer Engineering Student',
  'Python Developer',
  'Automation Builder',
  'Problem Solver',
  'Technology Explorer',
];

const NameTypewriter = ({ text, trigger }: { text: string; trigger: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDisplayed('');
      setDone(false);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return (
    <span className={`text-gradient-name inline-block ${done ? 'animate-breathe' : ''}`}>
      {displayed}
      {!done && (
        <span
          className="inline-block w-0.5 h-[0.85em] ml-0.5 align-middle"
          style={{
            background: 'hsl(270,70%,65%)',
            boxShadow: '0 0 8px hsl(270,70%,65%)',
            animation: 'blink 0.7s step-end infinite',
          }}
        />
      )}
    </span>
  );
};

const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-100px' });

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
    <section className="min-h-screen flex items-center justify-center section-padding relative" id="hero" ref={ref}>
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
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
            className="text-accent font-body text-sm tracking-widest uppercase mb-4"
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
            <NameTypewriter text="Mohd Saad Khan" trigger={inView} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-heading mb-6 h-8"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, hsl(186,90%,50%), hsl(270,70%,65%))',
                filter: 'drop-shadow(0 0 8px hsla(186,90%,50%,0.4))',
              }}
            >
              {text}
            </span>
            <span
              className="inline-block w-0.5 h-6 ml-1 align-middle"
              style={{
                background: 'hsl(186,90%,50%)',
                boxShadow: '0 0 8px hsl(186,90%,50%)',
                animation: 'blink 1s step-end infinite',
              }}
            />
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
              href="#"
              className="ripple-container group relative px-6 py-3 rounded-lg font-heading font-semibold text-sm bg-gradient-primary text-primary-foreground overflow-hidden transition-transform hover:-translate-y-1 glow-purple"
            >
              <span className="relative z-10 flex items-center gap-2">
                Download Resume <Download size={16} />
              </span>
            </a>
            <a
              href="#projects"
              className="ripple-container group relative px-6 py-3 rounded-lg font-heading font-semibold text-sm border border-primary/30 text-foreground hover:border-primary/60 transition-all hover:-translate-y-1 hover:glow-pink"
            >
              <span className="flex items-center gap-2">
                View Projects <ExternalLink size={16} />
              </span>
            </a>
            <a
              href="#contact"
              className="ripple-container group relative px-6 py-3 rounded-lg font-heading font-semibold text-sm border border-accent/30 text-foreground hover:border-accent/60 transition-all hover:-translate-y-1 hover:glow-cyan"
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
          <div
            className="relative"
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          >
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, hsl(270,70%,65%), hsl(330,90%,60%), hsl(186,90%,50%), hsl(25,95%,60%), hsl(270,70%,65%))',
                padding: '3px',
                borderRadius: '50%',
                width: 'calc(100% + 16px)',
                height: 'calc(100% + 16px)',
                top: '-8px',
                left: '-8px',
                filter: 'blur(2px)',
              }}
            />
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 border-4 border-background transition-shadow duration-500"
              style={{
                boxShadow: profileHovered
                  ? '0 0 30px hsla(270,70%,65%,0.5), 0 0 60px hsla(330,90%,60%,0.3), 0 0 90px hsla(186,90%,50%,0.2)'
                  : '0 0 0px transparent',
              }}
            >
              <img
                src={profileAvatar}
                alt="Mohd Saad Khan"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'][i],
                  top: `${15 + Math.sin(i * 0.9) * 40}%`,
                  left: `${15 + Math.cos(i * 0.9) * 45}%`,
                  boxShadow: `0 0 8px ${['#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'][i]}`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, 12, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3 + i * 0.4,
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="text-muted-foreground" size={24} />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
