import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const contacts = [
  { icon: Mail, label: 'Email', value: 'mohdsaadkhan073@gmail.com', href: 'mailto:mohdsaadkhan073@gmail.com' },
  { icon: Github, label: 'GitHub', value: 'mohdsaadkhan073', href: 'https://github.com/mohdsaadkhan073' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Mohd Saad Khan', href: 'https://www.linkedin.com/in/mohd-saad-khan-967a05337/' },
  { icon: MapPin, label: 'Location', value: 'Antophill, Mumbai, India', href: '#' },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding relative" id="contact" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          <p className="text-muted-foreground font-body mt-4 max-w-lg mx-auto">
            Feel free to reach out for collaborations, opportunities, or just to say hi!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {contacts.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="group flex items-center gap-4 bg-gradient-card rounded-xl p-6 border border-border/50 hover:border-neon-blue/40 transition-all"
            >
              <div className="p-3 rounded-lg bg-neon-blue/10 group-hover:bg-neon-blue/20 transition-colors">
                <Icon className="text-neon-blue w-6 h-6 group-hover:drop-shadow-lg transition-all" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{label}</p>
                <p className="text-foreground font-heading font-semibold text-sm">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
