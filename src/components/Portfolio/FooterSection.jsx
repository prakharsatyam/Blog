const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function FooterSection() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-ink text-cream section-padding pt-16 md:pt-24 pb-8 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Headline */}
        <h2 className="font-archivo text-heading-1 md:text-display text-cream mb-16 md:mb-24 max-w-xl">
          Scaling Ideas<br />into Reality.
        </h2>

        {/* Links & Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24">
          {/* Quick Links */}
          <div>
            <h3 className="text-cream/50 font-inter text-sm mb-5 tracking-wider">
              /Quick links
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-5 py-2.5 rounded-lg bg-cream/10 text-cream/80 font-inter text-sm hover:bg-cream hover:text-ink transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream/50 font-inter text-sm mb-5 tracking-wider">
              /Contact
            </h3>
            <a
              href="mailto:prakhar.2k17@gmail.com"
              className="text-cream/70 hover:text-cream transition-colors font-inter text-base block mb-2"
            >
              prakhar.2k17@gmail.com
            </a>
            <a
              href="tel:+918292706413"
              className="text-cream/70 hover:text-cream transition-colors font-inter text-base block mb-4"
            >
              +91 8292706413
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/prakharsatyam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-cream transition-colors text-sm font-inter"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/prakhar-satyam-ps/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-cream transition-colors text-sm font-inter"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Watermark Name */}
      <div className="relative z-0 -mx-6 md:-mx-12 lg:-mx-20 xl:-mx-32">
        <h2
          className="font-archivo font-black text-center leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(5rem, 18vw, 16rem)',
            color: 'rgba(250, 247, 243, 0.05)',
            letterSpacing: '-0.02em',
          }}
        >
          PRAKHAR
        </h2>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-cream/5 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-cream/30 text-sm font-inter">
          © 2026 Prakhar Satyam. All rights reserved.
        </span>
        <span className="text-cream/30 text-sm font-inter">
          Built with React + Appwrite
        </span>
      </div>
    </footer>
  );
}
