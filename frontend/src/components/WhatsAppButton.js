import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    const phoneNumber = '919999999999'; // Format: country code + number (no + or spaces)
    const message = encodeURIComponent('Hi! I want to know more about ArcTrack School ERP.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 animate-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
    </button>
  );
};

export default WhatsAppButton;
