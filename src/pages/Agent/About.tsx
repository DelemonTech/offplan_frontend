
import React from 'react';
import Header from '@/components/others/Header';
import Footer from '@/components/others/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Users, TrendingUp, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Large Sahar Photo */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-6xl mx-auto">
            {/* Large Square Profile Image */}
            <div className="mb-8">
              <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto mb-6 border-4 border-white shadow-2xl rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/2ff560c2-04f0-4965-8ef2-8c03cbca3611.png" 
                  alt="Sahar Kalhor - Senior Property Consultant" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Meet Sahar Kalhor
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 mb-4">
              Senior Property Consultant & Off-Plan Expert
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Your trusted partner in Dubai's dynamic real estate market
            </p>
          </div>
        </div>
      </section>

      {/* About Sahar Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">About Sahar</h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  With over 6 years of experience in Dubai's real estate market, Sahar Kalhor has established herself as one of the most trusted and knowledgeable property consultants specializing in off-plan developments.
                </p>
                
                <p>
                  Sahar's deep understanding of Dubai's evolving skyline and her extensive network of developer relationships enable her to offer clients exclusive access to the most promising investment opportunities before they hit the general market.
                </p>
                
                <p>
                  Her personalized approach ensures that every client receives tailored advice based on their unique investment goals, whether they're first-time buyers, seasoned investors, or international clients looking to establish a presence in the UAE.
                </p>
                
                <p>
                  Sahar's commitment to excellence is reflected in her track record of over 150 successful transactions and her dedication to providing ongoing support throughout the entire property journey.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 mb-2">150+</div>
                  <div className="text-gray-600">Deals Closed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">6+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Contact Information & Office */}
            <div className="space-y-8">
              {/* Office Address */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Sahar's Office</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-pink-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Office Address:</p>
                      <p className="text-gray-700">
                        Floor 7, Amiri Tower<br />
                        TECOM, Dubai<br />
                        United Arab Emirates
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="text-blue-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">+971 52 952 9687</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="text-purple-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Sahar@offplan.market</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="text-green-500" size={20} />
                    <div>
                      <p className="text-gray-900 font-semibold">Daily 10:00 AM – 8:00 PM (GST)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertise Areas */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="text-pink-500" size={20} />
                    <span className="text-gray-700">Off-Plan Development Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="text-blue-500" size={20} />
                    <span className="text-gray-700">Investment Portfolio Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="text-purple-500" size={20} />
                    <span className="text-gray-700">International Client Services</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-green-500" size={20} />
                    <span className="text-gray-700">Prime Location Advisory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
