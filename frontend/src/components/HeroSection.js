import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

const HeroSection = ({ onCTAClick }) => {
  useEffect(() => {
    // Load Calendly badge widget
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({ 
          url: 'https://calendly.com/arctrackdev/schoolerp-call', 
          text: 'Request a demo', 
          color: '#0EA5E9', 
          textColor: '#ffffff', 
          branding: false 
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1523961131990-5ea7c61b2107)',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-900/30"></div>
      </div>

      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/30 rounded-full px-4 py-2 mb-8 animate-fadeIn">
            <TrendingUp size={16} className="text-sky-400" />
            <span className="text-sky-400 text-sm font-medium">India's #1 School Digital Infrastructure Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeInUp leading-tight">
            Transform Your School Into A
            <span className="gradient-text block mt-2">Digital Powerhouse</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Complete ERP + Parent/Teacher Apps + <span className="text-sky-400 font-semibold">Free Premium Website</span> (₹40,000 Value)
            <br />
            <span className="text-base md:text-lg text-slate-400 mt-2 block">
              Stop revenue leakage. End WhatsApp chaos. Get CEO-level control.
            </span>
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {['Revenue Control', 'Parent App', 'Free Website', 'Go Live in 7 Days'].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-slate-200">
                <CheckCircle size={20} className="text-green-400" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={onCTAClick}
              className="btn-primary bg-sky-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-sky-600 transition-all transform hover:scale-105 shadow-2xl shadow-sky-500/40 flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-sky-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
