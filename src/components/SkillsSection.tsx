import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const categories = [
  {
    title: 'Programming Languages',
    skills: ['C', 'C++', 'Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    title: 'CS Knowledge',
    skills: ['Data Structures', 'DBMS', 'OOP', 'Computer Graphics', 'Digital Techniques', 'Operating Systems', 'Computer Networking'],
    color: 'from-neon-purple to-neon-pink',
  },
  {
    title: 'Tools & Platforms',
    skills: ['GitHub', 'VS Code', 'Turbo C++', 'OBS Studio', 'Canva', 'Aternos', 'PaperMC'],
    color: 'from-neon-cyan to-neon-blue',
  },
];

const SkillCard = ({ skill, index, inView }: { skill: string; index: number; inView: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -5, rotateX: 5, rotateY: 5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative px-4 py-3 rounded-xl bg-muted/40 border border-border/50 text-center font-body text-sm text-foreground transition-all cursor-default overflow-hidden"
      style={{
        boxShadow: hovered ? '0 0 25px hsla(217,91%,60%,0.3), 0 10px 30px hsla(0,0%,0%,0.3)' : 'none',
        perspective: '500px',
      }}
    >
      <span className="relative z-10">{skill}</span>
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-primary opacity-10"
        />
      )}
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="skills" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: catIndex * 0.2 }}
            >
              <h3 className={`text-xl font-heading font-semibold mb-6 bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}>
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill} skill={skill} index={i + catIndex * 8} inView={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
