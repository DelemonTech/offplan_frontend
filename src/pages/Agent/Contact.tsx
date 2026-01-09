
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Agent/Header';
import Footer from '@/components/Agent/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SEOHead } from '@/components/SEOHead';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useLanguage();
  const { i18n } = useTranslation();
  const { username } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: '',
    agreeUpdates: false,
  });

  const [focusedField, setFocusedField] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const hostUrl = import.meta.env.VITE_HOST_URL;

      const response = await fetch(`${hostUrl}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.mobile,
          email: formData.email,
          message: formData.message,
          agree_updates: formData.agreeUpdates,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        throw new Error('Submission failed');
      }

      setSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        message: '',
        agreeUpdates: false,
      });
      alert('✅ Message sent successfully! Sahar will get back to you soon.');
       
    } catch (error) {
      console.error('Network or server error:', error);
      alert('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971552554245', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Contact Nasser - Senior Property Consultant | OFFPLAN.MARKET"
        description="Get in touch with Sahar Kalhor for expert property consultation in Dubai. Call +971 55 255 4245 or send a message for personalized real estate advice."
        keywords="contact Sahar Kalhor, Dubai property consultant, real estate agent contact, property investment advice"
        canonical={`https://offplan.market/${username}/contact`}
        type="website"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Contact Sahar
            </h2>
            <p className="text-xl lg:text-2xl opacity-90">
              Ready to find your perfect property in Dubai?
            </p>
            <p className="text-lg opacity-80 mt-4">
              Sahar is here to help you with personalized property consultation and investment guidance
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Nasser</h3>
                  <p className="text-pink-600 font-semibold">Senior Property Consultant</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-pink-500" size={20} />
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold">+971 55 255 4245</p>
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
                      <p className="text-gray-900 font-semibold">Floor 7, Amiri Tower, TECOM, Dubai</p>
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

              {/* Quick Contact Options */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact Options</h3>
                
                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp Chat</span>
                  </button>
                  
                  <a
                    href="tel:+971529529687"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Call Now</span>
                  </a>
                  
                  <a
                    href="mailto:Sahar@offplan.market"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail size={20} />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Message to Sahar</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200"
                    placeholder="Your name"
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name
                      ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                      : 'top-3 text-gray-500 transform scale-100'
                      }`}
                  >
                    Your name
                  </label>
                </div>

                {/* Mobile Field */}
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('mobile')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200"
                    placeholder="Mobile number"
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === 'mobile' || formData.mobile
                      ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                      : 'top-3 text-gray-500 transform scale-100'
                      }`}
                  >
                    Mobile number
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 transition-all duration-200"
                    placeholder="Email address"
                    required
                  />
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                      ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                      : 'top-3 text-gray-500 transform scale-100'
                      }`}
                  >
                    Email address
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    className="w-full px-3 pt-5 pb-2 border border-gray-300 rounded-md text-gray-900 placeholder-transparent focus:outline-none focus:border-pink-400 focus:ring-pink-300 resize-none transition-all duration-200"
                    placeholder="Your inquiry message"
                    rows={4}
                    required
                  ></textarea>
                  <label
                    className={`absolute left-3 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                      ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                      : 'top-3 text-gray-500 transform scale-100'
                      }`}
                  >
                    Your message
                  </label>
                </div>

                {/* Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="updates"
                    checked={formData.agreeUpdates}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeUpdates: checked as boolean }))
                    }
                    className="border-gray-400 data-[state=checked]:bg-pink-500 mt-1 transition-all duration-200"
                  />
                  <label
                    htmlFor="updates"
                    className="text-sm text-gray-600 leading-relaxed transition-all duration-200"
                  >
                    I agree to receive updates about new properties and market insights
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : success ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={20} />
                      <span>Message Sent!</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send size={20} />
                      <span>Send Message to Sahar</span>
                    </div>
                  )}
                </Button>
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
