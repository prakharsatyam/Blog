import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-40 section-padding"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="about-text font-inter text-xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed text-ink/90 font-normal">
          From concept to deployment. Clean, scalable full-stack applications
          and intelligent AI solutions built to move fast, stay robust, and
          perform in production — driven by{' '}
          <span className="text-accent font-medium">curiosity</span>,{' '}
          <span className="text-accent font-medium">structured thinking</span>,
          and{' '}
          <span className="text-accent font-medium">intentional engineering</span>.
        </p>
      </div>
    </section>
  );
}
