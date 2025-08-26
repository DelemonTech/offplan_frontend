import React, { useState } from 'react';
import Header from "@/components/others/HomeHeader";
import Footer from "@/components/Agent/Footer";
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Building, Users, Globe, Sparkles, Star, UserCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { SEOHead } from '@/components/SEOHead';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      document.dir = lng === 'fa' ? 'rtl' : 'ltr';
      setIsOpen(false);
    };
  
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
      alert('✅ Message sent successfully! We will get back to you soon.');
       
    } catch (error) {
      console.error('Network or server error:', error);
      alert('❌ Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971529529687', '_blank');
  };

  const handleContactAgent = () => {
    window.open('https://offplan.market#agents', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <SEOHead
        title="Contact OFFPLAN.MARKET - Get in Touch | Dubai Real Estate"
        description="Contact OFFPLAN.MARKET for expert real estate consultation in Dubai. Get in touch with our team for property investment advice and support."
        keywords="contact OFFPLAN.MARKET, Dubai real estate contact, property investment consultation, real estate support"
        canonical="https://offplan.market/contact"
        type="website"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-2 lg:py-12 overflow-hidden">
        {/* Additional background effects for hero */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl animate-pulse delay-150"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10 py-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
            {t('Contact Us')}
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed mb-4">
            {t('Ready to start your Dubai property investment journey?')}
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('Our expert team is here to help you find the perfect off-plan property and guide you through every step')}
          </p>
          
          {/* CTA Button */}
          <div className="mt-10">
            <button
              onClick={handleContactAgent}
              className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              <UserCheck size={24} />
              {t('Connect with Our Experts')}
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-3 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {t('Get In Touch')}
              </h2>
              
              {/* Company Info */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Building className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{t('OFFPLAN.MARKET')}</h3>
                    <p className="text-pink-600 font-semibold">{t('Dubai\'s Premier Property Platform')}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                        <Phone className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-semibold">+971 52 952 9687</p>
                      </div>
                      <button
                        onClick={handleWhatsAppClick}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                        title="WhatsApp"
                      >
                        <MessageCircle size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                        <Mail className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">info@offplan.market</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                        <MapPin className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{t('Dubai, United Arab Emirates')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                        <Clock className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{t('Daily 9:00 AM – 9:00 PM (GST)')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
                    <p className="text-gray-700 text-sm text-center font-medium">
                      {t("\"Our team will get back to you within 2 hours during business hours.\"")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {t('Quick Contact Options')}
                  </h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl"
                    >
                      <MessageCircle size={20} />
                      <span>{t('WhatsApp Chat')}</span>
                    </button>
                    
                    <a
                      href="tel:+971529529687"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl"
                    >
                      <Phone size={20} />
                      <span>{t('Call Now')}</span>
                    </a>
                    
                    <a
                      href="mailto:info@offplan.market"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl"
                    >
                      <Mail size={20} />
                      <span>{t('Send Email')}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Services Info */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    {t('How We Can Help')}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl mt-1">
                        <Building className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{t('Property Investment')}</p>
                        <p className="text-gray-600 text-sm">{t('Expert guidance on off-plan investments')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mt-1">
                        <Users className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{t('Agent Matching')}</p>
                        <p className="text-gray-600 text-sm">{t('Connect with verified real estate agents')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mt-1">
                        <Globe className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold">{t('Market Insights')}</p>
                        <p className="text-gray-600 text-sm">{t('Latest Dubai real estate market trends')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {t('Send Us a Message')}
                </h3>
                
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
                      className="w-full px-4 pt-5 pb-2 border-0 rounded-2xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm shadow-lg"
                      placeholder="Your name"
                      required
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name
                        ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                        : 'top-3 text-gray-500 transform scale-100'
                        }`}
                    >
                      {t('Your name')}
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
                      className="w-full px-4 pt-5 pb-2 border-0 rounded-2xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm shadow-lg"
                      placeholder="Mobile number"
                      required
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'mobile' || formData.mobile
                        ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                        : 'top-3 text-gray-500 transform scale-100'
                        }`}
                    >
                      {t('Mobile number')}
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
                      className="w-full px-4 pt-5 pb-2 border-0 rounded-2xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm shadow-lg"
                      placeholder="Email address"
                      required
                    />
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                        ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                        : 'top-3 text-gray-500 transform scale-100'
                        }`}
                    >
                      {t('Email address')}
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
                      className="w-full px-4 pt-5 pb-2 border-0 rounded-2xl text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none transition-all duration-200 bg-white/70 backdrop-blur-sm shadow-lg"
                      placeholder="Your inquiry message"
                      rows={4}
                      required
                    ></textarea>
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                        ? '-top-2 text-xs text-pink-500 bg-white px-1 transform scale-90 font-medium'
                        : 'top-3 text-gray-500 transform scale-100'
                        }`}
                    >
                      {t('Your message')}
                    </label>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
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
                      {t('I agree to receive updates about new properties and market insights')}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('Sending...')}</span>
                      </div>
                    ) : success ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send size={20} />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Agent Section */}
      <div className="container mx-auto px-4 pb-16 relative z-10">
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-2xl animate-pulse delay-300"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full blur-3xl animate-pulse delay-150"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <UserCheck size={36} className="mx-auto mb-2 animate-bounce" />
              <h2 className="text-4xl md:text-4xl font-bold mb-4">
                {t('Ready to Invest?')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('Connect with our expert agents for personalized guidance and exclusive property opportunities in Dubai\'s thriving real estate market.')}
              </p>
            </div>
            
            <button
              onClick={handleContactAgent}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 font-semibold text-xl border border-white/30"
            >
              <UserCheck size={24} />
              {t('Contact Our Agents Now')}
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;