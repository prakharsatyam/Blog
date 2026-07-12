// Home page entry composing all portfolio modules
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/blogSlice';

import Navbar from '../components/Portfolio/Navbar';
import HeroSection from '../components/Portfolio/HeroSection';
import AboutSection from '../components/Portfolio/AboutSection';
import ServicesSection from '../components/Portfolio/ServicesSection';
import ProjectsSection from '../components/Portfolio/ProjectsSection';
import BlogSection from '../components/Portfolio/BlogSection';
import ContactSection from '../components/Portfolio/ContactSection';
import FooterSection from '../components/Portfolio/FooterSection';
import CoderBackground from '../components/Portfolio/CoderBackground';
import AboutMe from '../components/Portfolio/AboutMe';

function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts(false)); // Fetch cache-first
  }, [dispatch]);

  // Filter posts to show only those with featured flag on the homepage
  const featuredPosts = posts ? posts.filter((post) => post.featured === true) : [];

  return (
    <div className="bg-cream min-h-screen text-ink overflow-hidden relative">
      {/* Dynamic Coder background running fixed behind the page */}
      <CoderBackground />

      <Navbar />
      <HeroSection />
      
      {/* AboutMe placed directly below HeroSection */}
      <AboutMe />

      <ServicesSection />
      <ProjectsSection />
      
      {/* Blog section passed only featured posts cached in state */}
      <BlogSection posts={featuredPosts} />
      
      <ContactSection />
      <FooterSection />
    </div>
  );
}

export default Home;