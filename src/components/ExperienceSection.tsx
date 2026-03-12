import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Code, Bot, Video } from 'lucide-react';

const items = [
  { icon: Code, title: 'Academic Technical Projects', desc: 'Built multiple projects as part of computer engineering coursework.' },
  { icon: Briefcase, title: 'Software Development Experiments', desc: 'Explored various frameworks, languages, and development tools.' },
  { icon: Bot, title: 'Automation Projects', desc: 'Created automation tools and scripts for productivity.' },
  { icon: Video, title: 'Technical Content Creation', desc: 'Produced and managed technical content for digital platforms.' },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="experience" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan" />

          {items.map((item, i) => {
            const Icon = item.icon;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-primary -translate-x-1/2 z-10 animate-pulse-glow" />

                <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-gradient-card rounded-xl p-6 border border-border/50 hover:border-neon-blue/30 transition-all"
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <Icon className="text-neon-blue w-5 h-5" />
                      <h3 className="font-heading font-bold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
