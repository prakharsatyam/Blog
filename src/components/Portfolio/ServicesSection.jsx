import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Full Stack Development',
    description:
      'End-to-end web applications from ideation to deployment. I build performant, maintainable systems with modern JavaScript frameworks, robust backends, and cloud infrastructure — always documentation-first.',
    tags: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Appwrite'],
  },
  {
    number: '02',
    title: 'AI & Agentic Engineering',
    description:
      'Multi-agent LLM orchestration, RAG pipelines, and intelligent automation. From the Agentic Research Intelligence Factory (8-agent pipeline with hybrid retrieval) to enterprise tools that cut onboarding time by 60%.',
    tags: ['LangGraph', 'LangChain', 'RAG', 'GraphRAG', 'FAISS', 'Pinecone', 'Claude API', 'Ollama'],
  },
  {
    number: '03',
    title: 'Machine Learning',
    description:
      'Multimodal ML systems combining computer vision, speech analysis, and predictive modeling. My ASD detection framework achieved 90% diagnostic accuracy with 25% fewer false positives.',
    tags: ['Python', 'TensorFlow', 'MediaPipe', 'OpenCV', 'CNN', 'SVM', 'Random Forest', 'scikit-learn'],
  },
  {
    number: '04',
    title: 'Enterprise Solutions',
    description:
      'Enterprise-grade integrations, batch pipelines, and legacy system modernization. Built Excel-to-Web ADI integrations at TCS that cut manual data entry by 70% with zero data loss.',
    tags: ['Oracle EBS R12', 'PL/SQL', 'Web ADI', 'Spring Boot', 'Docker', 'REST APIs', 'SOAP'],
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.service-row', {
        scrollTrigger: {
          trigger: '.service-row',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-32 section-padding"
    >
      <h2 className="services-title font-archivo text-heading-1 text-ink mb-16">
        Services
      </h2>

      <div>
        {services.map((service, index) => (
          <div key={service.number} className="service-row">
            {/* Divider */}
            <div className="divider" />

            {/* Row */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-6 md:py-8 group cursor-pointer text-left"
              aria-expanded={openIndex === index}
              id={`service-toggle-${index}`}
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="font-inter text-sm text-ink-muted font-medium">
                  {service.number}
                </span>
                <span className="font-archivo text-xl md:text-3xl font-bold text-ink group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </span>
              </div>

              <div className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-300">
                {openIndex === index ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-0 md:pl-20">
                    <p className="text-ink/70 text-body-lg max-w-2xl mb-6 font-inter">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="pill-tag-light text-xs md:text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {/* Final divider */}
        <div className="divider" />
      </div>
    </section>
  );
}
