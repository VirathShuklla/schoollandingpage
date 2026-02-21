import React from 'react';
import { Gift, Check, Globe, Smartphone, Zap, Award } from 'lucide-react';
import { freeWebsiteBonus } from '../utils/mockData';

const FreeWebsiteBonusSection = () => {
  const featureIcons = [Globe, Zap, Smartphone, Check, Award, Check];

  return (
    <section id="bonus" className="section-padding bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-full px-4 py-2 mb-6">
              <Gift size={18} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm">₹40,000 Value - Included Free</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {freeWebsiteBonus.title}
            </h2>
            <p className="text-xl text-sky-400 mb-6 font-semibold">
              {freeWebsiteBonus.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              While others charge lakhs for a modern school website, we include it <span className="text-sky-400 font-semibold">completely free</span> when you choose ArcTrack ERP. 
              Your school deserves a premium digital presence - and we're making it happen.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {freeWebsiteBonus.features.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-sky-400" />
                    </div>
                    <span className="text-slate-300">{feature}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl shadow-amber-500/30"
            >
              Claim Your Free Website Today
            </button>
          </div>

          {/* Right: Website Mockup */}
          <div className="relative">
            {/* Browser Mockup */}
            <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              {/* Browser Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center space-x-2 border-b border-slate-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 bg-slate-800 rounded px-3 py-1 text-xs text-slate-400 flex items-center">
                  <Globe size={12} className="mr-2" />
                  www.yourschool.com
                </div>
              </div>

              {/* Website Preview */}
              <div className="bg-white p-6">
                {/* Mockup Header */}
                <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-6 rounded-lg mb-4">
                  <h3 className="text-2xl font-bold mb-2">Your School Name</h3>
                  <p className="text-blue-100 text-sm">Shaping Future Leaders Since 1995</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-semibold">
                      Apply Now
                    </button>
                    <button className="border border-white text-white px-4 py-2 rounded text-sm font-semibold">
                      Contact Us
                    </button>
                  </div>
                </div>

                {/* Mockup Content Cards */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {['Academics', 'Admissions', 'Events'].map((item, i) => (
                    <div key={i} className="bg-slate-100 p-3 rounded text-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                      <p className="text-xs font-semibold text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Mockup About Section */}
                <div className="bg-slate-50 p-4 rounded">
                  <div className="h-2 bg-slate-300 rounded w-3/4 mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white p-4 rounded-xl shadow-2xl transform rotate-6 animate-pulse-slow">
              <p className="text-sm font-bold">FREE</p>
              <p className="text-xs">Worth ₹40K</p>
            </div>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-16 glass-effect rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <p className="text-xl text-white font-semibold mb-3">
            Why This Matters
          </p>
          <p className="text-slate-300 leading-relaxed">
            In today's digital age, parents research schools online before visiting. A premium website isn't a luxury—it's essential for admissions. 
            We handle the complete setup, design, hosting, and maintenance. You just focus on running your school.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeWebsiteBonusSection;
