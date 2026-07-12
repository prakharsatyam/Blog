import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Multimodal ASD Detection',
    subtitle: 'ML Research • 90% Diagnostic Accuracy',
    description: 'Eye tracking, body movement, and speech analysis combined for autism spectrum disorder detection.',
    image: '/asd_detection.png',
    github: 'https://github.com/prakharsatyam',
    tags: ['Python', 'CNN', 'MediaPipe', 'SVM'],
  },
  {
    title: 'psbuilder CLI',
    subtitle: 'Developer Tool • npm Package',
    description: 'MERN scaffolding CLI reducing project setup time by 60% with automated configurations.',
    image: '/psbuilder.png',
    github: 'https://github.com/prakharsatyam/psbuilder',
    tags: ['Node.js', 'CLI', 'React', 'npm'],
  },
  {
    title: 'Blog Platform',
    subtitle: 'Full Stack • React + Appwrite',
    description: 'Full-stack blog with rich text editor, authentication, and 99.9% uptime on Vercel.',
    image: '/blog_platform.png',
    github: 'https://github.com/prakharsatyam/Blog',
    tags: ['React', 'Appwrite', 'TailwindCSS', 'Vercel'],
  },
  {
    title: 'Vidcort Streaming',
    subtitle: 'Video Platform • Node.js + Cloudinary',
    description: 'Video streaming platform with robust upload handling and optimized database operations.',
    image: '/vidcort.png',
    github: 'https://github.com/prakharsatyam/Vidcort',
    tags: ['Node.js', 'MongoDB', 'Cloudinary', 'Multer'],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 85%',
        },
        y: 80,
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
      id="projects"
      className="py-24 md:py-32 section-padding"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
        <h2 className="projects-title font-archivo text-heading-1 text-ink">
          Featured<br />Projects
        </h2>
        <a
          href="https://github.com/prakharsatyam"
          target="_blank"
          rel="noopener noreferrer"
          className="projects-title flex items-center gap-2 text-ink/60 hover:text-ink transition-colors font-inter text-sm group"
        >
          View All Work
          <span className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-hover:border-ink transition-colors">
            <ArrowUpRight size={14} />
          </span>
        </a>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card group cursor-pointer block"
          >
            {/* Preview Area */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-cream-dark transition-transform duration-500 ease-out-expo group-hover:scale-[1.02] group-hover:shadow-2xl">
              {/* Actual Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
              />

              {/* Gradient Overlay for Tech Tags */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4" />

              {/* Tags overlay */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 px-1">
              <h3 className="font-archivo text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                {project.title}
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="font-inter text-sm text-ink-light mt-1">
                {project.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
