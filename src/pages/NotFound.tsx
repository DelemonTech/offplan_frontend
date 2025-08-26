import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Building, Users, Globe, Sparkles, Star, ExternalLink } from 'lucide-react';
import Header from "@/components/others/HomeHeader";
import Footer from "@/components/Agent/Footer";
import { SEOHead } from '@/components/SEOHead';

const NotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
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
        title="404 - Page Not Found | OFFPLAN.MARKET"
        description="The page you're looking for doesn't exist. Explore our Dubai real estate platform for off-plan properties and connect with verified agents."
        keywords="404, page not found, Dubai real estate, off-plan properties"
        canonical="https://offplan.market/404"
        type="website"
      />
      <Header />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="relative">
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
                <Star className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-none animate-pulse">
              404
            </h1>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              The page you're looking for seems to have wandered off. Don't worry though - 
              we've got plenty of amazing properties waiting for you to discover!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              <Home size={24} />
              Go to Homepage
            </button>
            
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              <ArrowLeft size={24} />
              Go Back
            </button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link
              to="/"
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-purple-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Home className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Homepage</h3>
                <p className="text-gray-600">Discover Dubai's finest off-plan properties</p>
              </div>
            </Link>

            <Link
              to="/about"
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">About Us</h3>
                <p className="text-gray-600">Learn about OFFPLAN.MARKET</p>
              </div>
            </Link>

            <Link
              to="/contact"
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">Get in touch with our experts</p>
              </div>
            </Link>
          </div>

          {/* Popular Sections */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-blue-50/50"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-center">
                Popular Sections
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/blogs"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl">
                    <Search className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">Blogs</p>
                    <p className="text-sm text-gray-600">Market insights</p>
                  </div>
                </Link>

                <Link
                  to="/#agents"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Agents</p>
                    <p className="text-sm text-gray-600">Find experts</p>
                  </div>
                </Link>

                <Link
                  to="/#properties"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <Building className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Properties</p>
                    <p className="text-sm text-gray-600">Browse listings</p>
                  </div>
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Globe className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Support</p>
                    <p className="text-sm text-gray-600">Get help</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Helpful Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl border border-pink-100">
            <p className="text-gray-700 text-lg font-medium">
              💡 <strong>Tip:</strong> Use the search bar at the top to find specific properties, 
              or browse our categories to discover amazing investment opportunities in Dubai!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
