import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const contacts = [
  { icon: Mail, label: 'Email', value: 'mohdsaadkhan073@gmail.com', href: 'mailto:mohdsaadkhan073@gmail.com' },
  { icon: Github, label: 'GitHub', value: 'mohdsaadkhan073', href: 'https://github.com/mohdsaadkhan073' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Mohd Saad Khan', href: 'https://www.linkedin.com/in/mohd-saad-khan-967a05337/' },
  { icon: MapPin, label: 'Location', value: 'Antophill, Mumbai, India', href: '#' },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(),
      reply_to: formData.email
    };

    // Log the data being sent
    console.log("Sending message data to EmailJS:", templateParams);

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS Success Response:", response);
      
      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("EmailJS Error Response:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section-padding relative" id="contact" ref={ref}>
      <div className="max-w-6xl mx-auto">
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

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-gradient-card rounded-2xl p-8 border border-border/50 card-hover-glow"
          >
            <h3 className="text-2xl font-heading font-bold text-gradient-warm mb-6">Let's Connect</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'name' as const, label: 'Name', type: 'text' },
                { name: 'email' as const, label: 'Email', type: 'email' },
                { name: 'subject' as const, label: 'Subject', type: 'text' },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <label className="block text-sm font-body text-muted-foreground mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-muted/40 border border-border/50 text-foreground font-body text-sm outline-none transition-all glow-input focus:border-primary"
                    required
                    disabled={isSending}
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-body text-muted-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-muted/40 border border-border/50 text-foreground font-body text-sm outline-none transition-all resize-none glow-input focus:border-primary"
                  required
                  disabled={isSending}
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={isSending}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                whileHover={isSending ? {} : { scale: 1.02, y: -2 }}
                whileTap={isSending ? {} : { scale: 0.98 }}
                className={`ripple-container w-full py-3 rounded-lg font-heading font-semibold text-sm bg-gradient-primary text-primary-foreground glow-purple flex items-center justify-center gap-2 transition-transform ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSending ? 'Sending...' : 'Send Message'} <Send size={16} className={isSending ? 'animate-pulse' : ''} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {contacts.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="group flex items-center gap-4 bg-gradient-card rounded-xl p-6 border border-border/50 card-hover-glow transition-all"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary w-6 h-6 group-hover:drop-shadow-lg transition-all" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{label}</p>
                  <p className="text-foreground font-heading font-semibold text-sm">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
