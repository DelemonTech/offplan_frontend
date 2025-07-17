
import React from 'react';
import Header from '@/components/others/Header';
import Footer from '@/components/others/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Contact = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971529529687', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Contact Sahar
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Sahar is here to help you with your ideal property in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              
              {/* Sahar's Profile */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage 
                      src="/lovable-uploads/2ff560c2-04f0-4965-8ef2-8c03cbca3611.png" 
                      alt="Sahar - Senior Property Consultant" 
                    />
                    <AvatarFallback className="text-2xl font-bold bg-pink-100 text-pink-600">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Sahar</h3>
                  <p className="text-pink-600 font-semibold">Senior Property Consultant</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-pink-500" size={20} />
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold">+971 52 952 9687</p>
                    </div>
                    <button
                      onClick={handleWhatsAppClick}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="text-blue-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Sahar@offplan.market</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-purple-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="text-green-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Daily 10:00 AM – 8:00 PM (GST)</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                  <p className="text-gray-700 text-sm text-center">
                    "Sahar will personally get back to you within 30 minutes during working hours."
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Message Sahar Directly</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="+971 50 123 4567"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option>Investment Inquiry</option>
                    <option>Property Information</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Tell us about your investment goals..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
