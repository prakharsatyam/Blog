import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Award, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    role: 'Systems Engineer',
    company: 'Tata Consultancy Services',
    period: 'Aug 2025 – Present',
    description: 'Developing Web ADI integrations & PL/SQL pipelines. Built three AI agents: a LangGraph research factory, an EBS Codebase helper, and an Outlook pywin32 assistant.',
    icon: Briefcase,
  },
  {
    role: 'Full Stack Intern',
    company: 'Upraised',
    period: 'Oct 2024 – Jan 2025',
    description: 'Designed React, Next.js, and GraphQL automation workflows. Streamlined rendering pathways resulting in 40% page load decreases.',
    icon: Cpu,
  },
  {
    role: 'Software Developer Intern',
    company: 'Navodita Infotech',
    period: 'May 2024 – Jun 2024',
    description: 'Constructed MySQL databases, CMS portals, and Next.js business endpoints, gathering requirements directly from clients.',
    icon: Award,
  },
  {
    role: 'B.Tech in Computer Science',
    company: 'Heritage Institute of Technology',
    period: 'Graduated May 2025',
    description: 'Focus in Business Systems (CGPA: 8.16). Capstone: Multimodal ASD diagnostic framework using MediaPipe and voice signals (90% accuracy).',
    icon: GraduationCap,
  },
];

export default function AboutMe() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-intro', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.timeline-card', {
        scrollTrigger: {
          trigger: '.timeline-card',
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="py-24 md:py-32 section-padding bg-cream-dark/15 relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Short Bio & Technical Ambitions */}
        <div className="lg:col-span-4 space-y-6 about-intro">
          <h2 className="font-archivo text-heading-1 text-ink">
            About Me
          </h2>
          <p className="font-inter text-body-lg text-ink/80 leading-relaxed">
            I am a full-stack developer and AI engineer based in Bengaluru. Currently working at TCS, I bridge the gap between enterprise legacy modernization and edge-tier AI orchestration.
          </p>
          <p className="font-inter text-sm text-ink-light leading-relaxed">
            I believe in a documentation-first engineering model—understanding systems before writing code. My goals are focused on LangGraph agent networks, Model Context Protocol (MCP) server design, and modernizing legacy processes using local LLMs.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cream border border-ink/5 shadow-sm">
              <span className="block font-archivo text-xl font-bold text-accent">TCS</span>
              <span className="block font-inter text-xs text-ink-light mt-1">Systems Engineer</span>
            </div>
            <div className="p-4 rounded-2xl bg-cream border border-ink/5 shadow-sm">
              <span className="block font-archivo text-xl font-bold text-accent">HIT 22-25</span>
              <span className="block font-inter text-xs text-ink-light mt-1">B.Tech (CSBS)</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Visual Target Placeholder Slot where Hero Image lands on scroll */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center py-8 lg:py-0 relative">
          <div
            className="w-40 h-52 md:w-56 md:h-72 lg:w-60 lg:h-80"
            id="about-photo-slot"
          >
          </div>
        </div>

        {/* Right Column: Experience/Education Timeline */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-archivo text-heading-3 text-ink mb-6">
            Experience & Education
          </h3>
          <div className="relative border-l border-ink/10 pl-6 space-y-6 ml-3">
            {timelineEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.company}
                  className="timeline-card relative"
                >
                  <span className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-cream border border-ink/10 flex items-center justify-center text-accent shadow-sm z-10">
                    <Icon size={12} />
                  </span>

                  <div>
                    <span className="inline-block text-[10px] font-inter font-semibold text-accent uppercase tracking-wider mb-0.5">
                      {event.period}
                    </span>
                    <h4 className="font-archivo text-base font-bold text-ink leading-tight">
                      {event.role}
                    </h4>
                    <h5 className="font-inter text-xs text-ink-light font-medium mb-2">
                      {event.company}
                    </h5>
                    <p className="font-inter text-xs text-ink/75 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
