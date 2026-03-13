import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="education" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Education</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border/50 card-hover-glow transition-all text-center shimmer overflow-hidden relative"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 right-4 opacity-5"
          >
            <GraduationCap size={120} />
          </motion.div>

          <GraduationCap className="text-accent w-12 h-12 mx-auto mb-6" />
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
            Diploma in Computer Engineering
          </h3>
          <p className="text-lg text-primary font-heading mb-2">Vidyalankar Polytechnic</p>
          <p className="text-muted-foreground font-body">MSBTE – Maharashtra State Board of Technical Education</p>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
