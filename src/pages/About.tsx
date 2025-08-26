import React, { useState } from 'react';
import Header from "@/components/others/HomeHeader";
import Footer from "@/components/Agent/Footer";
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, TrendingUp, MapPin, Phone, Mail, Clock, Shield, Database, Brain, Globe, CheckCircle, Building, Home, Target, Star, Sparkles, ExternalLink, UserCheck } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import '@/i18n';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      document.dir = lng === 'fa' ? 'rtl' : 'ltr';
      setIsOpen(false);
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
        title="About OFFPLAN.MARKET - Leading Dubai Real Estate Platform"
        description="Discover OFFPLAN.MARKET, Dubai's premier platform for off-plan properties. Connect with verified agents, access exclusive developer deals, and find your dream property."
        keywords="OFFPLAN.MARKET, Dubai real estate, off-plan properties, property investment, real estate platform, Dubai properties"
        canonical="https://offplan.market/about"
        type="website"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* Additional background effects for hero */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur-3xl animate-pulse delay-150"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 py-3">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="relative">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
            {t('About OFFPLAN.MARKET')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed mb-4">
            {t('Dubai\'s Premier Off-Plan Property Platform')}
          </p>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            {t('Connecting investors with the best off-plan opportunities through verified agents and exclusive developer partnerships')}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleContactAgent}
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
          >
            <UserCheck size={24} />
            {t('Connect with Our Team')}
            <ExternalLink size={20} />
          </button>
        </div>
      </section>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mission & Vision */}
        <section className="py-2">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-blue-50/50"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{t('Our Mission')}</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    {t('At OFFPLAN.MARKET, we\'re revolutionizing the way people discover and invest in Dubai\'s off-plan properties. Our mission is to provide a transparent, efficient, and trustworthy platform that connects investors with the most promising real estate opportunities.')}
                  </p>
                  
                  <p>
                    {t('We believe that everyone deserves access to premium off-plan investments, regardless of their location or experience level. By partnering with Dubai\'s top developers and verified real estate agents, we ensure that our clients receive exclusive access to the most lucrative investment opportunities.')}
                  </p>
                  
                  <p>
                    {t('Our platform combines cutting-edge technology with deep market expertise to deliver personalized property recommendations, real-time market insights, and seamless transaction experiences.')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('Why Choose OFFPLAN.MARKET?')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-lg">
                        <Shield className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Verified Agents & Developers')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                        <Database className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Real-time Market Data')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                        <Brain className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('AI-Powered Matching')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                        <Globe className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Global Investor Support')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">{t('Our Values')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl shadow-lg">
                        <Target className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Transparency & Trust')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                        <Star className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Excellence in Service')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                        <Users className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Client-Centric Approach')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl shadow-lg">
                        <TrendingUp className="text-white" size={16} />
                      </div>
                      <span className="text-gray-700 font-medium">{t('Innovation & Growth')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20 relative overflow-hidden mb-16">
            {/* Background effects */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-20 h-20 bg-pink-200 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-200 rounded-full blur-2xl animate-pulse delay-300"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-200 rounded-full blur-3xl animate-pulse delay-150"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {t('OFFPLAN.MARKET by the Numbers')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {t('Our platform has transformed the way investors discover and invest in Dubai\'s off-plan market')}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-pink-600 mb-2">500+</div>
                  <div className="text-gray-600 font-medium">{t('Properties Listed')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600 font-medium">{t('Verified Agents')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">25+</div>
                  <div className="text-gray-600 font-medium">{t('Developer Partners')}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">1000+</div>
                  <div className="text-gray-600 font-medium">{t('Happy Investors')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t('What Makes Us Different')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('We combine technology, expertise, and personalized service to deliver exceptional results')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-purple-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Verified Partners')}</h3>
                <p className="text-gray-600">
                  {t('All our agents and developers are thoroughly vetted and RERA-registered for your security and peace of mind.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Database className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Real-Time Data')}</h3>
                <p className="text-gray-600">
                  {t('Access up-to-the-minute property information, pricing, and availability directly from developer systems.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Smart Matching')}</h3>
                <p className="text-gray-600">
                  {t('Our AI-powered system matches you with properties that perfectly fit your investment criteria and budget.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-red-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Global Reach')}</h3>
                <p className="text-gray-600">
                  {t('Serve international investors with multilingual support and comprehensive market insights.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-pink-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('End-to-End Support')}</h3>
                <p className="text-gray-600">
                  {t('Complete assistance from property discovery to handover, with ongoing investment guidance.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t('Exclusive Deals')}</h3>
                <p className="text-gray-600">
                  {t('Access to off-plan opportunities before they hit the general market, with special pricing for our clients.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t('Our Expert Team')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('Meet the professionals behind OFFPLAN.MARKET\'s success')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                  <Building className="text-pink-600" size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('Real Estate Experts')}</h3>
                <p className="text-gray-600">
                  {t('Seasoned professionals with deep knowledge of Dubai\'s property market and investment strategies.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                  <Home className="text-blue-600" size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('Property Consultants')}</h3>
                <p className="text-gray-600">
                  {t('Dedicated consultants providing personalized guidance and market insights to help you make informed decisions.')}
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
                  <Users className="text-green-600" size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('Customer Success')}</h3>
                <p className="text-gray-600">
                  {t('Our support team ensures smooth transactions and provides ongoing assistance throughout your investment journey.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Agent Section */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 text-white relative overflow-hidden mb-16">
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
                {t('Ready to Get Started?')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                {t('Join thousands of successful investors who trust OFFPLAN.MARKET for their Dubai real estate journey. Our expert team is ready to guide you to your perfect investment.')}
              </p>
            </div>
            
            <button
              onClick={handleContactAgent}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 hover:bg-white/30 rounded-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105 font-semibold text-xl border border-white/30"
            >
              <UserCheck size={24} />
              {t('Contact Our Team Today')}
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;