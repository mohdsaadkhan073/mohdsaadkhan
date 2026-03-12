import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Bot, Cpu, Lightbulb } from 'lucide-react';

const icons = [
  { Icon: Code2, label: 'Programming', color: 'text-neon-blue' },
  { Icon: Bot, label: 'Automation', color: 'text-neon-purple' },
  { Icon: Cpu, label: 'System Architecture', color: 'text-neon-cyan' },
  { Icon: Lightbulb, label: 'Problem Solving', color: 'text-neon-pink' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="about" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-card rounded-2xl p-8 md:p-12 border border-border shimmer relative overflow-hidden"
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed text-center max-w-3xl mx-auto mb-12">
            I am a Computer Engineering student passionate about programming, automation, and building
            technical systems. I enjoy solving problems through code and exploring innovative technology
            solutions. My focus is on developing practical tools, experimenting with new technologies, and
            continuously improving my technical skills.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {icons.map(({ Icon, label, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted/30 border border-border/50 hover:border-neon-blue/30 transition-colors"
              >
                <Icon className={`${color} w-8 h-8`} />
                <span className="text-sm text-muted-foreground font-body text-center">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
