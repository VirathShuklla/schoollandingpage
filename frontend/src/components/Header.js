import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl md:text-3xl font-bold gradient-text">
              ArcTrack
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('modules')}
              className="text-slate-300 hover:text-sky-500 transition-colors font-medium"
            >
              Modules
            </button>
            <button 
              onClick={() => scrollToSection('bonus')}
              className="text-slate-300 hover:text-sky-500 transition-colors font-medium"
            >
              Why ArcTrack
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-slate-300 hover:text-sky-500 transition-colors font-medium"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-sky-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-600 transition-all transform hover:scale-105 shadow-lg shadow-sky-500/30"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('modules')}
                className="text-slate-300 hover:text-sky-500 transition-colors font-medium text-left"
              >
                Modules
              </button>
              <button 
                onClick={() => scrollToSection('bonus')}
                className="text-slate-300 hover:text-sky-500 transition-colors font-medium text-left"
              >
                Why ArcTrack
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-slate-300 hover:text-sky-500 transition-colors font-medium text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-sky-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-600 transition-colors text-left"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
