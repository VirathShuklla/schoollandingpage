import React from 'react';
import { Mail, MapPin, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">ArcTrack</h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Complete digital infrastructure platform for modern schools. 
              ERP + Mobile Apps + Premium Website included.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-400 hover:text-sky-500 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-sky-500 transition-colors">Pricing</a></li>
              <li><a href="#bonus" className="text-slate-400 hover:text-sky-500 transition-colors">Free Website</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-sky-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-slate-400">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>arctrackdev@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2 text-slate-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-sky-500" />
                <span>SSL Secured</span>
              </div>
              <span>•</span>
              <span>DPDP Act Compliant</span>
              <span>•</span>
              <span>PCI-DSS Certified</span>
            </div>
            <div className="text-sm text-slate-400">
              © {currentYear} ArcTrack. All rights reserved.
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-slate-500">
            <a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sky-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
