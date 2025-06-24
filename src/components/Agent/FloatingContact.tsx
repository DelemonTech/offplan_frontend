
import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const FloatingContact = () => {
  const handlePhoneClick = () => {
    window.open('tel:+971529529687', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:email@example.com', '_self');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971529529687', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-row gap-2 md:flex lg:flex xl:flex hidden">
      {/* Phone Icon */}
      <button
        onClick={handlePhoneClick}
        className="group relative flex items-center justify-center w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Call us"
      >
        <Phone className="w-4 h-4" />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Call Now
        </div>
      </button>

      {/* Email Icon */}
      <button
        onClick={handleEmailClick}
        className="group relative flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Email us"
      >
        <Mail className="w-4 h-4" />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Send Email
        </div>
      </button>

      {/* WhatsApp Icon */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="WhatsApp us"
      >
        <MessageSquare className="w-4 h-4" />
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
        </div>
      </button>
    </div>
  );
};

export default FloatingContact;
