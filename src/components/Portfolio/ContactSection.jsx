import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-40 section-padding"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="contact-content font-inter text-lg text-ink/50 mb-4 tracking-wide uppercase">
          Have a project in mind?
        </p>

        <h2 className="contact-content font-archivo text-display text-ink mb-12">
          Let's Talk
        </h2>

        <div className="contact-content flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Email Button */}
          <a
            href="mailto:prakhar.2k17@gmail.com"
            className="group flex items-center gap-3 bg-ink text-cream px-8 py-4 rounded-full font-inter font-medium text-base hover:bg-ink/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20"
            id="contact-email-btn"
          >
            <Mail size={18} />
            Email Me
            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
          </a>

          {/* Phone Button */}
          <a
            href="tel:+918292706413"
            className="group flex items-center gap-3 bg-transparent text-ink px-8 py-4 rounded-full font-inter font-medium text-base border-2 border-ink/15 hover:border-ink hover:bg-ink hover:text-cream transition-all duration-300 hover:scale-105"
            id="contact-phone-btn"
          >
            <Phone size={18} />
            Call Me
          </a>

          {/* Resume Button */}
          <a
            href="/cv_barclays.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-inter font-medium text-base hover:bg-accent/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20"
            id="contact-resume-btn"
          >
            Download Resume
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Social Links */}
        <div className="contact-content flex items-center justify-center gap-6 mt-10">
          <a
            href="https://github.com/prakharsatyam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/40 hover:text-ink transition-colors text-sm font-inter"
          >
            GitHub
          </a>
          <span className="text-ink/20">•</span>
          <a
            href="https://www.linkedin.com/in/prakhar-satyam-ps/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/40 hover:text-ink transition-colors text-sm font-inter"
          >
            LinkedIn
          </a>
          <span className="text-ink/20">•</span>
          <a
            href="mailto:prakhar.2k17@gmail.com"
            className="text-ink/40 hover:text-ink transition-colors text-sm font-inter"
          >
            prakhar.2k17@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
