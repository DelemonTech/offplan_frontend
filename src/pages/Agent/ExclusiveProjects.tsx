
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, Calendar } from 'lucide-react';

const ExclusiveProjects = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Exclusive Projects
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Premium off-plan developments available only to select investors
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-pink-200 to-blue-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Exclusive
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} className="fill-current" />
                      <span className="ml-1 text-sm font-semibold">VIP</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Elite Tower {item}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin size={16} className="mr-2" />
                    <span>Downtown Dubai</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>Launch: Q{item} 2025</span>
                  </div>
                  <div className="text-2xl font-bold text-pink-600 mb-4">
                    From AED 1.2M
                  </div>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-blue-600 transition-colors">
                    Request Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExclusiveProjects;
