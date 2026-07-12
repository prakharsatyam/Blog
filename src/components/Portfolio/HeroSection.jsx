import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const photoWrapperRef = useRef(null); // Direct React ref for bulletproof GSAP targeting
  const taglineText = "Engineering intelligent agent systems, robust full-stack applications, and predictive ML models built for maximum performance.";

  useEffect(() => {
    // Run animations after refs are fully bound to DOM elements
    if (!sectionRef.current || !photoWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-line-1', { y: 120, opacity: 0, duration: 1, delay: 0.5 })
        .from('.hero-line-2', { y: 120, opacity: 0, duration: 1 }, '-=0.6')
        .from('.hero-photo', { scale: 0.8, opacity: 0, duration: 1.2 }, '-=0.7')
        .from('.hero-deco-code-1', { scale: 0, rotation: -180, opacity: 0, duration: 1 }, '-=1')
        .from('.hero-deco-code-2', { scale: 0, rotation: 90, opacity: 0, duration: 1 }, '-=0.8')
        .from('.hero-bottom-left', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
        .from('.hero-bottom-right', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

      // 2. Scroll Triggered Animation to flip and enlarge profile photo - landing in the About Me section below
      gsap.to(photoWrapperRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current, // Target home section directly using Ref
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: '72vh',         // Slide down further to settle lower in the About Me slot
        rotationY: 180,    // Flip horizontally
        scale: 1.25,       // Enlarge slightly to fit About Me layout
        opacity: 1,        // Maintain full visibility
        ease: 'none',
      });

      // 3. Word-by-word tagline highlight tied to scroll progress
      gsap.to('.tagline-word', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
        opacity: 1,
        color: '#111111',
        stagger: 0.05,
        ease: 'none',
      });
    }, sectionRef);

    // Dynamic layout refresh to ensure ScrollTrigger measures page sizes correctly after all components render
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[100svh] relative z-30 flex flex-col justify-between pt-20"
      style={{ perspective: '1000px' }}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Coder Vibe Elements */}
        <div className="hero-deco-code-1 absolute top-[20%] left-[10%] md:left-[15%] animate-float z-10 opacity-30">
          <span className="font-mono text-4xl md:text-6xl text-ink font-bold">{"{ }"}</span>
        </div>

        <div className="hero-deco-code-2 absolute top-[40%] right-[10%] md:right-[15%] animate-float-delayed z-10 opacity-30">
          <span className="font-mono text-4xl md:text-6xl text-ink font-bold">{"</>"}</span>
        </div>

        {/* Hero Title and photo */}
        <div className="text-center relative z-20 w-full">
          <h1 className="font-archivo font-black text-ink leading-[0.9] tracking-tighter relative select-none z-20">
            <span className="hero-line-1 block text-display">
              FULL STACK
            </span>
            <span className="hero-line-2 block text-display relative z-20">
              DEVELOPER
            </span>
          </h1>

          {/* Profile Photo Centering Wrapper placed as a sibling of h1 to comply with HTML spec and avoid parser issues */}
          <div className="absolute left-1/2 top-[65%] md:top-[55%] -translate-x-1/2 z-10 pointer-events-none">
            {/* Clean GSAP Target Wrapper with React Ref */}
            <div 
              ref={photoWrapperRef}
              className="hero-photo-scroll-wrapper inline-block pointer-events-auto"
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              {/* Entrance target container */}
              <div className="hero-photo block w-40 h-52 md:w-56 md:h-72 lg:w-60 lg:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/35 relative bg-cream-dark opacity-85">
                <img
                  src="https://fra.cloud.appwrite.io/v1/storage/buckets/65ef5bdb9d7738e257f0/files/6a53c443000cae7be7c4/view?project=65ef35f9b5829add241c&impersonateuserid=&mode=admin"
                  alt="Prakhar Satyam"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Tagline showing progressive word-by-word scroll highlighting */}
          <p className="hero-tagline mt-12 md:mt-16 text-lg md:text-2xl max-w-3xl mx-auto font-inter text-ink/20 font-medium px-4 leading-relaxed">
            {taglineText.split(" ").map((word, idx) => (
              <span key={idx} className="tagline-word inline-block mr-2.5 transition-colors duration-200">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-end justify-between mt-12 md:mt-16 relative z-20">
        <div className="hero-bottom-left">
          <span className="font-archivo font-bold text-xl md:text-2xl text-ink">
            ©2026
          </span>
        </div>
        <div className="hero-bottom-right text-right">
          <span className="font-inter text-sm md:text-base text-ink-light tracking-wider uppercase">
            /Building Since 2022
          </span>
        </div>
      </div>
    </section>
  );
}
