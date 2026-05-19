import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, ExternalLink, Mail, Download } from 'lucide-react';
import RobotAvatar from './RobotAvatar';

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
    }, 130);
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
      <RobotAvatar />
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10 pointer-events-none">
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
            Hi, I'm
            <br />
            <span className="whitespace-nowrap">
              <NameTypewriter text="Mohd Saad Khan" trigger={inView} />
            </span>
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
            className="flex flex-wrap gap-4 pointer-events-auto"
          >
            <a
              href="/MOHD_SAAD_KHAN_Resume.pdf"
              download="MOHD_SAAD_KHAN_Resume.pdf"
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
