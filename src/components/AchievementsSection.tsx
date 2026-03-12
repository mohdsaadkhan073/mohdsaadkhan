import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Zap, BookOpen, Target } from 'lucide-react';

const achievements = [
  { icon: Trophy, title: 'Technical Project Builder', color: 'text-neon-blue' },
  { icon: Zap, title: 'Automation Enthusiast', color: 'text-neon-purple' },
  { icon: BookOpen, title: 'Continuous Learner', color: 'text-neon-cyan' },
  { icon: Target, title: 'Problem Solver', color: 'text-neon-pink' },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Achievements</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map(({ icon: Icon, title, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15, type: 'spring' }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="bg-gradient-card rounded-2xl p-6 border border-border/50 text-center hover:border-neon-blue/30 transition-all group"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <Icon className={`${color} w-10 h-10 mx-auto mb-4 group-hover:drop-shadow-lg transition-all`} />
              </motion.div>
              <h3 className="font-heading font-semibold text-sm text-foreground">{title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
