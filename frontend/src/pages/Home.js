import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import PainPointsSection from '../components/PainPointsSection';
import SolutionPillarsSection from '../components/SolutionPillarsSection';
import FreeWebsiteBonusSection from '../components/FreeWebsiteBonusSection';
import ROISection from '../components/ROISection';
import PricingSection from '../components/PricingSection';
import LeadCaptureForm from '../components/LeadCaptureForm';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <HeroSection onCTAClick={handleOpenForm} />
        <PainPointsSection />
        <SolutionPillarsSection />
        <FreeWebsiteBonusSection />
        <ROISection />
        <PricingSection onCTAClick={handleOpenForm} />
        
        {/* Final CTA Section */}
        <section id="contact" className="section-padding bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-effect rounded-3xl p-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your School?
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-8">
                Join 500+ schools already using ArcTrack to modernize operations, boost revenue, 
                and delight parents with technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleOpenForm}
                  className="btn-primary bg-gradient-to-r from-sky-500 to-blue-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:from-sky-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-2xl shadow-sky-500/40 w-full sm:w-auto"
                >
                  Apply for Digital Upgrade Now
                </button>
              </div>
              <p className="text-slate-400 text-sm mt-6">
                ⚡ Quick setup in 7 days • 💰 Free premium website included • 🔒 Bank-grade security
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadCaptureForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
};

export default Home;
