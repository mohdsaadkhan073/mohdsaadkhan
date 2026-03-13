import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const categories = [
  {
    title: 'Programming Languages',
    skills: ['C', 'C++', 'Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    gradient: 'from-primary to-accent',
    glowColor: 'hsl(270,70%,65%)',
  },
  {
    title: 'CS Knowledge',
    skills: ['Data Structures', 'DBMS', 'OOP', 'Computer Graphics', 'Digital Techniques', 'Operating Systems', 'Computer Networking'],
    gradient: 'from-secondary to-neon-pink',
    glowColor: 'hsl(330,90%,60%)',
  },
  {
    title: 'Tools & Platforms',
    skills: ['GitHub', 'VS Code', 'Turbo C++', 'OBS Studio', 'Canva', 'Aternos', 'PaperMC'],
    gradient: 'from-accent to-primary',
    glowColor: 'hsl(186,90%,50%)',
  },
];

const SkillCard = ({ skill, index, inView, glowColor }: { skill: string; index: number; inView: boolean; glowColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative px-4 py-3 rounded-xl bg-muted/40 border border-border/50 text-center font-body text-sm text-foreground cursor-default overflow-hidden shimmer"
      style={{
        transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-4px) scale(1.06)' : ''}`,
        boxShadow: hovered
          ? `0 0 20px ${glowColor}50, 0 0 40px ${glowColor}25, 0 10px 30px hsla(0,0%,0%,0.3)`
          : 'none',
        borderColor: hovered ? `${glowColor}60` : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease',
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
              <h3 className={`text-xl font-heading font-semibold mb-6 bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}>
                {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={skill} skill={skill} index={i + catIndex * 8} inView={inView} glowColor={cat.glowColor} />
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
