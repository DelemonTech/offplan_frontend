import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Globe, Award, TrendingUp, Zap, MessageCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from "@/components/others/HomeHeader";
import Footer from "@/components/Agent/Footer";
import { SEOHead } from "@/components/SEOHead";

const AllAgentsPage = () => {
  const { t, i18n } = useTranslation();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const hostUrl = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    fetch(`${hostUrl}/agents/frontend/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAgents(Array.isArray(data.results) ? data.results : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching agents:", err);
        setAgents([]);
        setLoading(false);
      });
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || agent.languages.includes(selectedLanguage);
    return matchesSearch && matchesLanguage;
  });

  const handleLanguageChange = (lng: string, username: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'ar' || lng === 'fa' ? 'rtl' : 'ltr';
    window.location.href = `/${username}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">{t("Loading agents...")}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
      <SEOHead
        title="All Agents - OffPlan Market"
        description="Browse all our verified real estate agents. Find the perfect agent to help you with your property needs in UAE."
        keywords="real estate agents UAE, Dubai property agents, verified agents, real estate professionals"
        canonical="https://offplan.market/agents"
        type="website"
      />

      <Header />

      <main className="container mx-auto px-4 py-20">
        {/* Page Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6 shadow-xl">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-3xl lg:text-3xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("Our Expert Agents")}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Connect with verified, multilingual professionals who understand your needs.")}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-white rounded-2xl shadow p-4">
                <div className="flex items-center gap-4 flex-wrap">

                {/* Search Bar */}
                <div className="relative flex-1 min-w-[250px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                    type="text"
                    placeholder={t("Search agents by name...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                                focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    />
                </div>

                {/* Language Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="text-gray-600 w-4 h-4" />

                    <div className="flex flex-wrap gap-2">
                    {[
                        { key: "all", label: t("All Languages") },
                        { key: "en", label: t("English") },
                        { key: "ar", label: t("Arabic") },
                        { key: "fa", label: t("Farsi") },
                    ].map((item) => (
                        <button
                        key={item.key}
                        onClick={() => setSelectedLanguage(item.key)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            selectedLanguage === item.key
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        >
                        {item.label}
                        </button>
                    ))}
                    </div>
                </div>

                </div>
            </div>

            {/* Results Count */}
            <div className="text-center mt-3 text-gray-600 text-sm">
                {t("Showing")} <span className="font-semibold text-blue-600">{filteredAgents.length}</span> {t("agents")}
            </div>
        </div>


        {/* Agents Grid */}
        {filteredAgents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{t("No agents found")}</h3>
            <p className="text-gray-600">{t("Try adjusting your search or filters")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                t={t}
                handleLanguageChange={handleLanguageChange}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const AgentCard = ({ agent, t, handleLanguageChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
        relative bg-white rounded-3xl shadow-lg overflow-hidden
        transition-all duration-500 transform-gpu
        ${isHovered ? 'shadow-2xl scale-105 -translate-y-2' : 'shadow-lg scale-100'}
      `}
      >
        {/* Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`
            bg-gradient-to-r ${agent.color} px-4 py-2 rounded-full text-white text-sm font-bold
            shadow-lg transition-all duration-500
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          >
            {agent.badge}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Avatar */}
          <div className="relative mb-6 mx-auto w-32 h-32">
            <div
              className={`
              absolute inset-0 bg-gradient-to-br ${agent.color} rounded-full
              transition-all duration-700
              ${isHovered ? 'animate-pulse scale-110' : 'scale-100'}
            `}
            ></div>

            <div className="relative w-full h-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full border-4 border-white shadow-2xl overflow-hidden">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Name and Nationality */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <h3 className="font-black text-2xl text-gray-800">{agent.name}</h3>
              <img src={agent.nationality} alt="flag" className="w-8 h-6" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-100">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <div className="text-xl font-black text-green-600">{agent.totalSales}</div>
              </div>
              <div className="text-xs text-gray-600 font-medium text-center">{t("Total Sales")}</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-2xl border border-yellow-100">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-600" />
                <div className="text-sm font-black text-yellow-600">{agent.responseTime}</div>
              </div>
              <div className="text-xs text-gray-600 font-medium text-center">{t("Response Time")}</div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                {t("LANGUAGES")}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {agent.languages.map((langCode) => (
                <span
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode, agent.username)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 border-gray-200 cursor-pointer bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                >
                  {t(
                    langCode === 'en'
                      ? 'English'
                      : langCode === 'ar'
                      ? 'Arabic'
                      : 'Farsi'
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                {t("SPECIALTIES")}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {agent.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium border border-gray-200 hover:bg-gray-200 transition-all duration-300"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`
                    w-5 h-5 transition-all duration-300
                    ${
                      i < Math.floor(agent.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  `}
                />
              ))}
            </div>
            <span className="font-black text-gray-800 text-lg">{agent.rating}</span>
          </div>

          {/* CTA Button */}
          <Link
            to={`/${agent.username}`}
            className="block group/btn relative overflow-hidden rounded-2xl"
            rel="noopener noreferrer"
          >
            <div
              className={`relative bg-gradient-to-r ${agent.color} p-4 hover:shadow-2xl shadow-md transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 flex items-center justify-center">
                <span className="text-white font-bold text-base">
                  {t("View Full Profile")}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllAgentsPage;