import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionSeparator = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="section-separator"
    />
  );
};

export default SectionSeparator;
