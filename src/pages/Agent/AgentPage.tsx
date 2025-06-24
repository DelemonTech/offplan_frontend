import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For dynamic username
import Header from '@/components/Agent/Header';
import HeroSection from '@/components/Agent/HeroSection';
import SearchFilters from '@/components/Agent/SearchFilters';
import Footer from '@/components/Agent/Footer';
import FeaturedProjects from '@/components/Agent/FeaturedProjects';
import CallToAction from '@/components/Agent/CallToAction';
import AgentProfile from '@/components/Agent/AgentProfile';
import StatisticsSection from '@/components/Agent/StatisticsSection';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Search, MessageCircle, Sparkles } from 'lucide-react';
import NotFound from '../NotFound';
import LoadingOverlay from '@/components/ui/LoadingOverlay';



const AgentPageContent = () => {
  const { username } = useParams();  // Gets 'username' from the route like /agent/:username
  const [agentData, setAgentData] = useState(null);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [properties, setPropertiesData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [agentRes, propertiesRes] = await Promise.all([
          fetch(`https://offplan-backend.onrender.com/agent/${username}`),
          fetch('https://offplan-backend.onrender.com/properties/')
        ]);

        const agentData = await agentRes.json();
        const propertiesData = await propertiesRes.json();

        // Set agent data
        if (agentRes.ok && agentData.status) {
          setAgentData(agentData);
        } else {
          setAgentData(null);
        }

         // Properties + Pagination
      if (propertiesRes.ok && propertiesData.status) {
        const props = propertiesData.data;
        setPropertiesData(props.results);
        const safeUrl =(props.next_page_url)?.replace('http://', 'https://'); // Ensure URL is secure
        setNextPageUrl(safeUrl);
      } else {
        setPropertiesData([]);
        setNextPageUrl(null);
      }

      console.log("Agent fetched:", agentData);
      console.log("Properties fetched:", propertiesData.data.results);

    } catch (error) {
      console.error("Error during data fetching:", error);
      setAgentData(null);
      setPropertiesData([]);
      setNextPageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  fetchAll();
}, [username]);
  
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        {loading && <LoadingOverlay message={t("Loading Projects...")} />}
      </div>
    );
  }

  if (!agentData?.status || !agentData.data) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        <NotFound />
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <HeroSection agent={agentData} />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Featured Projects */}
      <FeaturedProjects agent={agentData} properties={properties}
        nextPageUrl={nextPageUrl}
        setProperties={setPropertiesData} // ✅ Pass correct setter
        setNextPageUrl={setNextPageUrl} />

      {/* Agent Profile Section */}
      <AgentProfile agent={agentData} />

      {/* Redesigned "Still Searching?" Section */}
      <div className="relative py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        {/* Cityscape Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-300 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Main Heading with Gradient and Animation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="relative">
                <Search className="w-8 h-8 md:w-12 md:h-12 text-pink-500 animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 animate-bounce" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                Still searching?
              </h2>
            </div>

            {/* Warm Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 font-medium">
              We're here to help – {agentData.data.name} is ready to guide you every step of the way!
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Improved Desktop Layout */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full blur-3xl"></div>
        </div>

        {/* Mobile Layout (unchanged) */}
        <div className="lg:hidden py-12 sm:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            {/* Main Search Content */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/20">
              <SearchFilters />
            </div>

            {/* Mobile Side Elements */}
            <div className="mt-6 sm:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl mb-2">🧭</div>
                  <p className="text-sm font-medium text-gray-700">{t('search.smart')}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <p className="text-sm font-medium text-gray-700">{t('search.roi')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side Design with Responsive Heights */}
        <div className="hidden lg:block py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-12 gap-8 items-stretch">
              {/* Search Box - Left Side (8 columns) */}
              <div className="col-span-8">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-white/20 h-full">
                  <SearchFilters />
                </div>
              </div>

              {/* Feature Icons - Right Side (4 columns) with Responsive Height */}
              <div className="col-span-4 h-full">
                <div className="grid grid-rows-4 gap-6 h-full">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-center">
                    <div className="text-2xl xl:text-3xl 2xl:text-4xl mb-2 xl:mb-3">🧭</div>
                    <p className="text-sm xl:text-base font-semibold text-gray-700 mb-1">Smart Navigation</p>
                    <p className="text-xs xl:text-sm text-gray-500">AI-powered search</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-center">
                    <div className="text-2xl xl:text-3xl 2xl:text-4xl mb-2 xl:mb-3">📍</div>
                    <p className="text-sm xl:text-base font-semibold text-gray-700 mb-1">Prime Locations</p>
                    <p className="text-xs xl:text-sm text-gray-500">Best areas in Dubai</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-center">
                    <div className="text-2xl xl:text-3xl 2xl:text-4xl mb-2 xl:mb-3">🏙️</div>
                    <p className="text-sm xl:text-base font-semibold text-gray-700 mb-1">Urban Excellence</p>
                    <p className="text-xs xl:text-sm text-gray-500">Premium developments</p>
                  </div>

                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 xl:p-6 shadow-sm text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col justify-center">
                    <div className="text-2xl xl:text-3xl 2xl:text-4xl mb-2 xl:mb-3">💰</div>
                    <p className="text-sm xl:text-base font-semibold text-gray-700 mb-1">Best ROI</p>
                    <p className="text-xs xl:text-sm text-gray-500">Find instant returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <CallToAction agent={agentData} />

      {/* Footer */}
      <Footer />
    </div>
  );

};
const Index = () => (
  <LanguageProvider>
    <AgentPageContent />
  </LanguageProvider>
);
export default Index;
