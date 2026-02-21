import React from 'react';
import { Check } from 'lucide-react';
import { pricingPlans } from '../utils/mockData';

const PricingSection = ({ onCTAClick }) => {
  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            All plans include premium website, mobile apps, and complete ERP system
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`rounded-2xl p-8 relative ${
                plan.recommended
                  ? 'bg-gradient-to-br from-sky-500/20 to-blue-500/20 border-2 border-sky-500 shadow-2xl shadow-sky-500/20'
                  : 'glass-effect'
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.tagline}</p>
                <div className="text-3xl font-bold gradient-text">{plan.price}</div>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                onClick={onCTAClick}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.recommended
                    ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="glass-effect rounded-xl p-8 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Need Help Choosing?
          </h3>
          <p className="text-slate-400 mb-6">
            Schedule a consultation to find the perfect solution for your school.
          </p>
          <button 
            onClick={onCTAClick}
            className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-600 transition-all shadow-lg"
          >
            Talk to Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
