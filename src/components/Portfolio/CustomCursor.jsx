import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    // Initial hidden state
    gsap.set([cursor, dot], { opacity: 0 });

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Fade in on first move
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });

      // Outer ring follows with slight delay
      gsap.to(cursor, {
        x: x - 16,
        y: y - 16,
        duration: 0.4,
        ease: 'power3.out',
      });

      // Inner dot follows instantly
      gsap.to(dot, {
        x: x - 4,
        y: y - 4,
        duration: 0.1,
      });
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, .interactive');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { 
        scale: 2.5, 
        backgroundColor: 'rgba(255, 107, 139, 0.4)', 
        borderColor: 'rgba(255, 107, 139, 0.8)',
        boxShadow: '0 0 15px rgba(255, 107, 139, 0.5)',
        duration: 0.3 
      });
      gsap.to(dot, { scale: 1.5, duration: 0.3 });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'var(--color-accent)',
        boxShadow: 'none', 
        duration: 0.3 
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Small delay to ensure DOM is ready for listeners
    setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactives = document.querySelectorAll('a, button, input, textarea, select, .interactive');
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Hidden on mobile, block on md screens */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] hidden md:block" 
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[10000] hidden md:block shadow-[0_0_8px_rgba(255,107,139,0.8)]" 
      />
    </>
  );
}
