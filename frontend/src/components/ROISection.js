import React from 'react';
import { TrendingUp, Clock, Star, Zap } from 'lucide-react';
import { roiMetrics } from '../utils/mockData';

const ROISection = () => {
  const icons = [TrendingUp, Clock, Star, Zap];

  return (
    <section className="section-padding bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Real Impact, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Join 500+ schools that have transformed their operations with ArcTrack
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {roiMetrics.map((metric, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={index}
                className="glass-effect rounded-2xl p-8 text-center card-hover group"
              >
                <div className="w-14 h-14 bg-sky-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-sky-400" />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2 stat-number">
                  {metric.value}
                </div>
                <div className="text-white font-semibold mb-2">
                  {metric.metric}
                </div>
                <div className="text-slate-400 text-sm">
                  {metric.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Before/After Comparison */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Before ArcTrack vs After ArcTrack
            </h3>
            <div className="space-y-4">
              {[
                { before: 'Manual fee tracking in Excel', after: 'Automated real-time fee dashboard' },
                { before: 'WhatsApp group chaos', after: 'Professional parent mobile app' },
                { before: 'No visibility on operations', after: 'CEO-level control panel' },
                { before: 'Hours spent on reconciliation', after: 'Instant financial reports' },
                { before: 'Generic or no school website', after: 'Premium modern website included' }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-medium mb-1">Before</p>
                    <p className="text-slate-300 text-sm">{item.before}</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 text-sm font-medium mb-1">After</p>
                    <p className="text-slate-300 text-sm">{item.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key Benefits */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              What School Owners Love Most
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Complete Financial Transparency',
                  description: 'Know exactly where every rupee is - in real-time. No more reconciliation nightmares.'
                },
                {
                  title: 'Parent Satisfaction Boost',
                  description: 'Parents love the app. Instant updates, easy fee payment, digital homework - they feel connected.'
                },
                {
                  title: 'Time Back for Strategy',
                  description: 'Stop firefighting daily admin tasks. Focus on growing your school and improving quality.'
                },
                {
                  title: 'Professional Digital Presence',
                  description: 'The free premium website positions your school as modern and trustworthy to prospective parents.'
                }
              ].map((benefit, index) => (
                <div key={index} className="border-l-4 border-sky-500 pl-4">
                  <h4 className="text-white font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full mt-8 bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-600 transition-all shadow-lg"
            >
              Experience These Benefits Yourself
            </button>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="mt-16 glass-effect rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">99.2%</div>
              <div className="text-slate-400 text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">2.5L+</div>
              <div className="text-slate-400 text-sm">Students Managed Daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">7 Days</div>
              <div className="text-slate-400 text-sm">Average Go-Live Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
