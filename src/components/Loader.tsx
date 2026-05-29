import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fast but satisfying progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Realistic step: jumps by random numbers between 3 and 7
        const step = Math.floor(Math.random() * 5) + 3;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Handle completion animation
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
        // Let the fadeout animation finish before telling parent it is done
        setTimeout(onComplete, 800);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -40,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07070a]"
        >
          {/* Subtle cyber grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.01),rgba(0,0,255,0.04))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-30" />
          
          <div className="relative flex flex-col items-center max-w-lg w-full px-6 text-center select-none">
            {/* Title: Mohd Saad Khan */}
            <motion.h1
              initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-2"
            >
              Mohd Saad <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Khan</span>
            </motion.h1>

            {/* Subtitle: Software Developer */}
            <motion.p
              initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sm md:text-base font-body tracking-[0.25em] text-cyan-400/80 uppercase font-semibold mb-12"
            >
              Software Developer
            </motion.p>

            {/* Simple Elegant Loading Bar & Percentage Container */}
            <div className="flex flex-col items-center w-64">
              {/* Thin progress track */}
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
                {/* Subtle glow underneath */}
                <div 
                  className="absolute top-0 bottom-0 left-0 bg-cyan-400/50 blur-sm rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Minimal percentage display */}
              <motion.span 
                className="text-xs font-mono tracking-widest text-white/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
