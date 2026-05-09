import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    setIsOpen(false);
    setTimeout(() => ScrollSmoother.get()?.scrollTo(id), 100);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 mt-4 mx-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg py-3"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-heading font-black tracking-tighter uppercase group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Joshua<span className="text-accent group-hover:text-primary transition-colors">.K</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="font-heading text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <div className="flex items-center space-x-4 border-l border-primary/10 pl-8">
            <a href="https://github.com/joshbaz" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Github size={20} />
            </a>
            <a href="https://ug.linkedin.com/in/joshua-kimbareeba-03a005126" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 mx-4 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col items-center space-y-6 py-10 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="text-3xl font-heading font-black uppercase tracking-tighter hover:text-accent transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex space-x-6 pt-6 border-t border-primary/5 w-full justify-center">
                <a href="https://github.com/joshbaz" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-primary/5 hover:bg-accent hover:text-white transition-all duration-300">
                  <Github size={24} />
                </a>
                <a href="https://ug.linkedin.com/in/joshua-kimbareeba-03a005126" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-primary/5 hover:bg-accent hover:text-white transition-all duration-300">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
