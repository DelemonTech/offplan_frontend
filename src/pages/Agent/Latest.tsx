
import React from 'react';
import Header from '@/components/others/Header';
import Footer from '@/components/others/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, TrendingUp, Zap } from 'lucide-react';

const Latest = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Zap className="mr-3" size={32} />
              <h2 className="text-4xl lg:text-6xl font-bold">
                Latest Projects
              </h2>
            </div>
            <p className="text-xl lg:text-2xl opacity-90">
              Newest off-plan developments just launched in Dubai
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Just Launched</h2>
            <p className="text-gray-600">Fresh projects added this week</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Clock size={14} className="mr-1" />
                      New
                    </span>
                    <div className="flex items-center text-blue-600">
                      <TrendingUp size={16} />
                      <span className="ml-1 text-sm font-semibold">Hot</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Modern Heights {item}</h3>
                  <p className="text-gray-600 mb-4">
                    Launched {item} days ago in Business Bay
                  </p>
                  <div className="text-2xl font-bold text-blue-600 mb-4">
                    From AED 950K
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors">
                    View Details
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

export default Latest;
