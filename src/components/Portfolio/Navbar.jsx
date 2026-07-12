import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderGit, BookOpen, Mail, FileText, ChevronDown, LogIn, LogOut, Edit3 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

const menuItems = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about-me', icon: User },
  { label: 'Services', href: '#services', icon: Briefcase },
  { label: 'Projects', href: '#projects', icon: FolderGit },
  { label: 'Blog', href: '#blog', icon: BookOpen },
  { label: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      setIsOpen(false);
      navigate('/');
    });
  };

  // Monitor scroll for subtle pill backdrop adjustments
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close the dropdown card
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Esc key down
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Navbar Pill Trigger */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-4 px-6 py-3 rounded-full cursor-pointer transition-all duration-500 shadow-xl ${scrolled
            ? 'bg-ink/95 border border-white/10 shadow-black/20'
            : 'bg-ink border border-transparent'
          }`}
        style={{ width: 'min(90vw, 240px)' }}
        id="navbar"
      >
        <div className="flex items-center gap-2">
          {/* Muted indicator dot */}
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-cream font-archivo font-bold text-sm tracking-tight select-none">
            Prakhar Satyam
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-cream/70"
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.nav>

      {/* Floating Card Dropdown (Solid black card with no glassmorphic opacity) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 12 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-[260px] rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/80 p-4 flex flex-col gap-1.5 z-50"
            id="navbar-dropdown"
          >
            {/* Contrasting Header banner inside the dropdown */}
            <div className="px-3 py-2.5 mb-2 rounded-xl bg-gradient-to-r from-accent/25 via-pink-500/10 to-transparent border-l-2 border-accent">
              <span className="block text-[10px] text-accent font-archivo uppercase font-bold tracking-wider">
                Explorer Menu
              </span>
              <span className="block text-[11px] text-cream/60 font-inter">
                Navigate or read resume
              </span>
            </div>

            {/* Menu options with icons */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-cream/70 hover:text-white transition-all duration-200 group"
                >
                  <Icon size={16} className="text-accent/80 group-hover:scale-110 transition-transform" />
                  <span className="font-inter text-sm font-medium">
                    {item.label}
                  </span>
                </a>
              );
            })}

            <div className="w-full h-px bg-white/5 my-1.5" />

            {/* Resume button inside card */}
            <a
              href="https://fra.cloud.appwrite.io/v1/storage/buckets/65ef5bdb9d7738e257f0/files/6a53c2cc002ad69dc314/view?project=65ef35f9b5829add241c&impersonateuserid=&mode=admin"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              download="cv.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-accent text-white font-inter text-sm font-semibold hover:bg-accent/95 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              <FileText size={15} />
              Download Resume
            </a>

            <div className="w-full h-px bg-white/5 my-1.5" />

            {/* Authentication Menu */}
            {authStatus ? (
              <>
                <Link
                  to="/add-post"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-cream/70 hover:text-white transition-all duration-200 group"
                >
                  <Edit3 size={16} className="text-accent/80 group-hover:scale-110 transition-transform" />
                  <span className="font-inter text-sm font-medium">Add Post</span>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400/70 hover:text-red-400 transition-all duration-200 group"
                >
                  <LogOut size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="font-inter text-sm font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-cream/70 hover:text-white transition-all duration-200 group"
              >
                <LogIn size={16} className="text-accent/80 group-hover:scale-110 transition-transform" />
                <span className="font-inter text-sm font-medium">Sign In</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
