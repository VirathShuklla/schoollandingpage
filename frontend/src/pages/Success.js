import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowLeft } from 'lucide-react';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('leadId');
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);

  useEffect(() => {
    // If no leadId, redirect to home
    if (!leadId) {
      navigate('/');
      return;
    }

    // Load Calendly embed script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setCalendlyLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [leadId, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Success Message */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Request Confirmed! 🎉
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Thank you for choosing ArcTrack Digital Infrastructure
          </p>
          <p className="text-slate-400">
            Our team has been notified and will contact you within 15 minutes
          </p>
        </div>

        {/* Calendly Embed Section */}
        <div className="glass-effect rounded-2xl p-8 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Schedule Your Digital Upgrade Consultation</h2>
              <p className="text-slate-400 text-sm">Pick a convenient 30-minute slot for a detailed demo</p>
            </div>
          </div>

          {/* Calendly Inline Widget */}
          <div 
            className="calendly-inline-widget bg-white rounded-lg overflow-hidden" 
            data-url="https://calendly.com/arctrackdev/schoolerp-call?hide_gdpr_banner=1&primary_color=0ea5e9"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>

          {!calendlyLoaded && (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
          )}
        </div>

        {/* What Happens Next */}
        <div className="glass-effect rounded-2xl p-8 mb-8 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-bold text-white mb-6">What Happens Next?</h3>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Instant Confirmation',
                description: 'You\'ll receive email and WhatsApp confirmation with meeting details'
              },
              {
                step: '2',
                title: 'Quick Follow-Up Call',
                description: 'Our team will call within 15 minutes to answer any immediate questions'
              },
              {
                step: '3',
                title: 'Detailed Demo Session',
                description: 'In your scheduled meeting, we\'ll showcase ArcTrack\'s complete platform tailored to your school size'
              },
              {
                step: '4',
                title: 'Custom Proposal',
                description: 'Receive a customized implementation plan with pricing, timeline, and your free premium website mockup'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-sky-400 hover:text-sky-300 transition-colors flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft size={20} />
            <span>Back to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
