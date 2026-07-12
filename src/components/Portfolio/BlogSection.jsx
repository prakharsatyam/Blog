import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Curated static posts written based on Prakhar's profile and achievements
const staticPosts = [
  {
    $id: 'agentic-research-intelligence',
    title: 'Building an 8-Agent RAG Intelligence Factory',
    $createdAt: '2026-06-20T10:00:00.000Z',
    content: 'An inside look into designing a 6-layer agentic architecture using LangGraph, vector/knowledge storage, and confidence scoring. Designed to ingest thousands of reports daily, this system uses hybrid retrieval (vector + SQL RAG) with confidence scoring to help analysts synthesize insights 50% faster, keeping private PII completely sanitized throughout ingestion.',
    isStatic: true
  },
  {
    $id: 'local-llm-comparison',
    title: 'Local LLM Benchmarks: MacBook M2 Air vs. RTX i9 Laptop',
    $createdAt: '2026-05-15T10:00:00.000Z',
    content: 'A detailed breakdown of running local open models like DeepSeek-R1 and Qwen2.5-Coder (30B) in a dev setup. Comparing the unified memory of Apple Silicon M2 against the sheer CUDA cores of a modern RTX i9 setup, using Ollama and OpenClaw for local agent orchestration during locus hackathon development.',
    isStatic: true
  },
  {
    $id: 'oracle-ebs-integration',
    title: 'Modernizing Legacy: Zero-Loss Oracle Web ADI Pipelines',
    $createdAt: '2026-03-10T10:00:00.000Z',
    content: 'How we engineered a custom Excel-to-Web ADI staging-table pipeline to bypass legacy Oracle EBS R12 validation bugs. Implementing robust PL/SQL packages, transaction staging, and error-handling routines directly within custom Excel layouts, cutting manual reconciliation entry times by 70% with zero data loss.',
    isStatic: true
  }
];

export default function BlogSection({ posts = [] }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.blog-card-item', {
        scrollTrigger: {
          trigger: '.blog-card-item',
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Merge Appwrite posts with our high-quality static writing pieces
  const allMergedPosts = [...posts, ...staticPosts].slice(0, 3);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateContent = (text) => {
    if (!text) return '';
    return text.length > 160 ? text.substring(0, 160) + '...' : text;
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-16 md:py-24 section-padding"
    >
      <div className="bg-ink rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16">
        {/* Title */}
        <h2 className="blog-title font-archivo text-heading-1 text-cream mb-12">
          Latest<br />Insights
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Blog Post Cards */}
          {allMergedPosts.map((post) => (
            <Link
              to={`/post/${post.$id}`}
              key={post.$id}
              className="blog-card-item group"
            >
              <div className="dark-card p-6 md:p-8 h-full flex flex-col justify-end min-h-[260px] hover:bg-white/10 transition-colors duration-300">
                <span className="text-cream/40 text-sm font-inter mb-3 flex items-center gap-2">
                  {formatDate(post.$createdAt)}
                  {post.isStatic && (
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-medium uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </span>
                <h3 className="font-archivo text-xl md:text-2xl font-bold text-cream mb-2 group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-cream/50 text-sm font-inter leading-relaxed">
                  {truncateContent(post.content)}
                </p>
              </div>
            </Link>
          ))}

          {/* CTA Card */}
          <div className="blog-card-item">
            <div className="dark-card p-8 md:p-10 h-full flex flex-col justify-between min-h-[260px]">
              <h3 className="font-archivo text-2xl md:text-3xl lg:text-4xl font-bold text-cream/90 leading-tight">
                Read my thoughts on engineering, AI agents, and systems architecture.
              </h3>
              <div className="mt-6">
                <Link
                  to="/all-posts"
                  className="inline-flex items-center gap-2 text-cream/60 hover:text-cream transition-colors font-inter text-sm group"
                >
                  View All Posts
                  <span className="w-8 h-8 rounded-full border border-cream/20 flex items-center justify-center group-hover:border-cream transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
