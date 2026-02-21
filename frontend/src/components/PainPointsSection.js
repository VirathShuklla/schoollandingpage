import React from 'react';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';
import { painPoints } from '../utils/mockData';

const PainPointsSection = () => {
  const icons = [AlertCircle, TrendingDown, Clock];

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Common School <span className="text-red-400">Challenges</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Traditional school management creates these operational bottlenecks
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((pain, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={pain.id} 
                className="glass-effect rounded-2xl p-8 card-hover group"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-red-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {pain.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-4 leading-relaxed">
                  {pain.description}
                </p>

                {/* Impact Badge */}
                <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
                  <span className="text-red-400 font-semibold text-sm">
                    {pain.impact}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            ArcTrack provides a complete solution to eliminate these challenges
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
