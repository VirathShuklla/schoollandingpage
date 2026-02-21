import React from 'react';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react';

const ROISection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increased Revenue Collection',
      description: 'Automated reminders and multiple payment options improve fee collection rates'
    },
    {
      icon: Clock,
      title: 'Save Administrative Time',
      description: 'Reduce manual work on attendance, reports, and parent communication'
    },
    {
      icon: Star,
      title: 'Improve Parent Satisfaction',
      description: 'Modern mobile app keeps parents engaged and informed in real-time'
    },
    {
      icon: Zap,
      title: 'Quick Implementation',
      description: 'Go live in days, not months, with dedicated onboarding support'
    }
  ];

  return (
    <section className="section-padding bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Schools <span className="gradient-text">Choose ArcTrack</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Modern infrastructure that transforms how your school operates
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="glass-effect rounded-2xl p-8 text-center hover:border-sky-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-500/30 transition-colors">
                  <Icon size={28} className="text-sky-400" />
                </div>
                <h3 className="text-white font-bold mb-3 text-lg">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ROISection;
