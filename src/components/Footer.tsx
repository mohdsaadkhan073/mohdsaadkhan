import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="relative py-12 px-4">
    {/* Gradient divider */}
    <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent mb-8" />

    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground font-body">
        © 2025 Mohd Saad Khan. All rights reserved.
      </p>

      <div className="flex items-center gap-4">
        {[
          { icon: Github, href: 'https://github.com/mohdsaadkhan073' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/mohd-saad-khan-967a05337/' },
          { icon: Mail, href: 'mailto:mohdsaadkhan073@gmail.com' },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-neon-blue hover:bg-neon-blue/10 transition-all"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
